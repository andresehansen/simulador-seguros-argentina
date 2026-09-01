import {
  CalculationInput,
  CalculationResult,
  FactorImpact,
  CoberturaEstimada,
} from '@/types';
import { getTarifasBase, getFactoresRiesgo, getCiudadBySlug } from './data';

function roundToHundreds(value: number): number {
  return Math.round(value / 100) * 100;
}

export function calcularCotizacion(input: CalculationInput): CalculationResult {
  const tarifasMap = getTarifasBase();
  const factores = getFactoresRiesgo();
  const tarifaBase = tarifasMap[input.tipoSeguro] || tarifasMap.auto;

  const ciudad = getCiudadBySlug(input.ciudadSlug) || {
    slug: 'standard',
    nombre: 'Zona Estándar',
    provincia: 'Nacional',
    factorRiesgoUrbano: 1.0,
    indiceRobo: 'Medio',
    climaExtremoRiesgo: 'Normal',
    consejoLocal: 'Verificar la cobertura contra granizo en zonas de tormentas frecuentes.',
    estadisticaLocal: 'Estimación basada en promedios nacionales.',
  };

  // 1. Factor Edad
  const edadMatch = factores.rangoEdad.find(
    (item) => input.edad >= item.min && input.edad <= item.max
  ) || { multiplicador: 1.0, etiqueta: 'Edad Estándar', impacto: 'Base (0%)' };

  // 2. Factor Antigüedad Licencia
  const licenciaMatch = factores.antiguedadLicenciaAnios.find(
    (item) => input.antiguedadLicenciaAnios >= item.min && input.antiguedadLicenciaAnios <= item.max
  ) || { multiplicador: 1.0, etiqueta: 'Experiencia Estándar', impacto: 'Base (0%)' };

  // 3. Factor Siniestros
  const siniestroMatch = factores.historialSiniestros.find(
    (item) => item.id === input.historialSiniestros
  ) || { multiplicador: 1.0, etiqueta: 'Sin Historial Registrado', impacto: 'Base (0%)' };

  // 4. Factor Antigüedad Vehículo/Propiedad
  const vehiculoMatch = factores.antiguedadVehiculoAnios.find(
    (item) => input.antiguedadVehiculoAnios >= item.min && input.antiguedadVehiculoAnios <= item.max
  ) || { multiplicador: 1.0, etiqueta: 'Antigüedad Estándar', impacto: 'Base (0%)' };

  // 5. Factor Ubicación Urbana
  const factorUbicacion = ciudad.factorRiesgoUrbano;

  const factorGlobalMultiplicador =
    edadMatch.multiplicador *
    licenciaMatch.multiplicador *
    siniestroMatch.multiplicador *
    vehiculoMatch.multiplicador *
    factorUbicacion;

  const desgloseFactores: FactorImpact[] = [
    {
      nombreFactor: 'Tramo de Edad',
      multiplicador: edadMatch.multiplicador,
      porcentajeVariacion: Math.round((edadMatch.multiplicador - 1) * 100),
      etiqueta: edadMatch.etiqueta,
      impactoTexto: edadMatch.impacto,
    },
    {
      nombreFactor: 'Experiencia de Licencia',
      multiplicador: licenciaMatch.multiplicador,
      porcentajeVariacion: Math.round((licenciaMatch.multiplicador - 1) * 100),
      etiqueta: licenciaMatch.etiqueta,
      impactoTexto: licenciaMatch.impacto,
    },
    {
      nombreFactor: 'Historial de Siniestros',
      multiplicador: siniestroMatch.multiplicador,
      porcentajeVariacion: Math.round((siniestroMatch.multiplicador - 1) * 100),
      etiqueta: siniestroMatch.etiqueta,
      impactoTexto: siniestroMatch.impacto,
    },
    {
      nombreFactor: 'Antigüedad del Bien',
      multiplicador: vehiculoMatch.multiplicador,
      porcentajeVariacion: Math.round((vehiculoMatch.multiplicador - 1) * 100),
      etiqueta: vehiculoMatch.etiqueta,
      impactoTexto: vehiculoMatch.impacto,
    },
    {
      nombreFactor: 'Riesgo Urbano (' + ciudad.nombre + ')',
      multiplicador: factorUbicacion,
      porcentajeVariacion: Math.round((factorUbicacion - 1) * 100),
      etiqueta: `Índice de robo ${ciudad.indiceRobo.toLowerCase()}`,
      impactoTexto: `${factorUbicacion > 1 ? '+' : ''}${Math.round((factorUbicacion - 1) * 100)}%`,
    },
  ];

  const coberturasEstimadas: CoberturaEstimada[] = tarifaBase.coberturas.map((cobertura) => {
    const montoBaseCalculado = tarifaBase.baseMensual * cobertura.multiplicador * factorGlobalMultiplicador;
    return {
      id: cobertura.id,
      nombre: cobertura.nombre,
      descripcion: cobertura.descripcion,
      estimadoMin: roundToHundreds(montoBaseCalculado * 0.92),
      estimadoMax: roundToHundreds(montoBaseCalculado * 1.12),
      estimadoPromedio: roundToHundreds(montoBaseCalculado),
    };
  });

  const todosMin = coberturasEstimadas.map((c) => c.estimadoMin);
  const todosMax = coberturasEstimadas.map((c) => c.estimadoMax);
  const todosPromedios = coberturasEstimadas.map((c) => c.estimadoPromedio);

  return {
    tipoSeguro: input.tipoSeguro,
    ciudad,
    rangoMontoTotal: {
      min: Math.min(...todosMin),
      max: Math.max(...todosMax),
      promedio: Math.round(todosPromedios.reduce((a, b) => a + b, 0) / todosPromedios.length),
    },
    factorGlobalMultiplicador: Number(factorGlobalMultiplicador.toFixed(2)),
    desgloseFactores,
    coberturasEstimadas,
  };
}
