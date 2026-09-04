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
  const esAuto = input.tipoSeguro === 'auto';
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

  const factorUbicacion = ciudad.factorRiesgoUrbano;
  let factorGlobalMultiplicador = 1.0;
  const desgloseFactores: FactorImpact[] = [];

  if (esAuto) {
    const edad = input.edad !== undefined ? input.edad : 35;
    const antiguedadLicencia = input.antiguedadLicenciaAnios !== undefined ? input.antiguedadLicenciaAnios : 10;
    const antiguedadVehiculo = input.antiguedadVehiculoAnios !== undefined ? input.antiguedadVehiculoAnios : 4;
    const segmentoId = input.segmentoVehiculo || 'hatchback_sedan';
    const guardaId = input.guardaHabitual || 'cochera_comunitaria';
    const siniestroId = input.historialSiniestros || 'cero';

    const edadMatch = factores.auto.rangoEdad.find(
      (item) => edad >= item.min && edad <= item.max
    ) || { multiplicador: 1.0, etiqueta: 'Riesgo Estándar', impacto: 'Base (0%)' };

    const licenciaMatch = factores.auto.antiguedadLicenciaAnios.find(
      (item) => antiguedadLicencia >= item.min && antiguedadLicencia <= item.max
    ) || { multiplicador: 1.0, etiqueta: 'Experiencia Estándar', impacto: 'Base (0%)' };

    const segmentoMatch = factores.auto.segmentoVehiculo.find(
      (item) => item.id === segmentoId
    ) || { multiplicador: 1.0, etiqueta: 'Auto Estándar', impacto: 'Base (0%)', nombre: 'Hatchback / Sedán' };

    const guardaMatch = factores.auto.guardaHabitual.find(
      (item) => item.id === guardaId
    ) || { multiplicador: 1.0, etiqueta: 'Cochera Estándar', impacto: 'Base (0%)', nombre: 'Estacionamiento' };

    const vehiculoMatch = factores.auto.antiguedadVehiculoAnios.find(
      (item) => antiguedadVehiculo >= item.min && antiguedadVehiculo <= item.max
    ) || { multiplicador: 1.0, etiqueta: 'Antigüedad Estándar', impacto: 'Base (0%)' };

    const siniestroMatch = factores.auto.historialSiniestros.find(
      (item) => item.id === siniestroId
    ) || { multiplicador: 1.0, etiqueta: 'Sin Historial Registrado', impacto: 'Base (0%)' };

    factorGlobalMultiplicador =
      edadMatch.multiplicador *
      licenciaMatch.multiplicador *
      segmentoMatch.multiplicador *
      guardaMatch.multiplicador *
      vehiculoMatch.multiplicador *
      siniestroMatch.multiplicador *
      factorUbicacion;

    desgloseFactores.push(
      {
        nombreFactor: 'Tramo de Edad (Conductor)',
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
        nombreFactor: 'Segmento del Vehículo',
        multiplicador: segmentoMatch.multiplicador,
        porcentajeVariacion: Math.round((segmentoMatch.multiplicador - 1) * 100),
        etiqueta: segmentoMatch.etiqueta,
        impactoTexto: segmentoMatch.impacto,
      },
      {
        nombreFactor: 'Guarda Nocturna',
        multiplicador: guardaMatch.multiplicador,
        porcentajeVariacion: Math.round((guardaMatch.multiplicador - 1) * 100),
        etiqueta: guardaMatch.etiqueta,
        impactoTexto: guardaMatch.impacto,
      },
      {
        nombreFactor: 'Antigüedad del Auto',
        multiplicador: vehiculoMatch.multiplicador,
        porcentajeVariacion: Math.round((vehiculoMatch.multiplicador - 1) * 100),
        etiqueta: vehiculoMatch.etiqueta,
        impactoTexto: vehiculoMatch.impacto,
      },
      {
        nombreFactor: 'Historial de Siniestros',
        multiplicador: siniestroMatch.multiplicador,
        porcentajeVariacion: Math.round((siniestroMatch.multiplicador - 1) * 100),
        etiqueta: siniestroMatch.etiqueta,
        impactoTexto: siniestroMatch.impacto,
      },
      {
        nombreFactor: `Riesgo Jurisdiccional (${ciudad.nombre})`,
        multiplicador: factorUbicacion,
        porcentajeVariacion: Math.round((factorUbicacion - 1) * 100),
        etiqueta: `Índice de robo ${ciudad.indiceRobo.toLowerCase()}`,
        impactoTexto: `${factorUbicacion > 1 ? '+' : ''}${Math.round((factorUbicacion - 1) * 100)}%`,
      }
    );
  } else {
    // Modo Hogar
    const propiedadId = input.tipoPropiedad || 'depto_piso_alto';
    const superficieId = input.superficieM2 || '60_120';
    const seguridadId = input.medidasSeguridad || 'rejas_puerta_blindada';
    const antiguedadInmueble = input.antiguedadInmuebleAnios !== undefined ? input.antiguedadInmuebleAnios : (input.antiguedadVehiculoAnios || 8);
    const siniestroId = input.historialSiniestros || 'cero';

    const propiedadMatch = factores.hogar.tipoPropiedad.find(
      (item) => item.id === propiedadId
    ) || { multiplicador: 1.0, etiqueta: 'Propiedad Estándar', impacto: 'Base (0%)', nombre: 'Departamento' };

    const superficieMatch = factores.hogar.superficieM2.find(
      (item) => item.id === superficieId
    ) || { multiplicador: 1.0, etiqueta: 'Superficie Estándar', impacto: 'Base (0%)', nombre: '60 a 120 m²' };

    const seguridadMatch = factores.hogar.medidasSeguridad.find(
      (item) => item.id === seguridadId
    ) || { multiplicador: 1.0, etiqueta: 'Seguridad Estándar', impacto: 'Base (0%)', nombre: 'Protección Básica' };

    let inmuebleMatch = factores.hogar.antiguedadInmuebleAnios.find(
      (item) => antiguedadInmueble >= item.min && antiguedadInmueble <= item.max
    ) || { multiplicador: 1.0, etiqueta: 'Antigüedad Estándar', impacto: 'Base (0%)' };

    // Lógica específica por perfil de Hogar:
    // 1. Inquilino no asegura estructura ni cañerías del edificio (factor antigüedad neutro 1.0)
    if (propiedadId === 'inquilino_contenido') {
      inmuebleMatch = {
        multiplicador: 1.0,
        etiqueta: 'No Aplica a Inquilinos (Solo Contenido)',
        impacto: 'Neutro (0%)',
      };
    } else if (propiedadId === 'depto_piso_alto' && inmuebleMatch.multiplicador > 1.0) {
      // 2. En departamentos en altura, el consorcio cubre columnas montantes de agua
      inmuebleMatch = {
        multiplicador: 1.10,
        etiqueta: 'Antigüedad de Edificio (Riesgo Mitigado por Consorcio)',
        impacto: 'Bajo (+10%)',
      };
    }

    const siniestroMatch = factores.hogar.historialSiniestros.find(
      (item) => item.id === siniestroId
    ) || { multiplicador: 1.0, etiqueta: 'Sin Reclamos Previos', impacto: 'Base (0%)' };

    factorGlobalMultiplicador =
      propiedadMatch.multiplicador *
      superficieMatch.multiplicador *
      seguridadMatch.multiplicador *
      inmuebleMatch.multiplicador *
      siniestroMatch.multiplicador *
      factorUbicacion;

    desgloseFactores.push(
      {
        nombreFactor: 'Régimen y Tipo de Vivienda',
        multiplicador: propiedadMatch.multiplicador,
        porcentajeVariacion: Math.round((propiedadMatch.multiplicador - 1) * 100),
        etiqueta: propiedadMatch.etiqueta,
        impactoTexto: propiedadMatch.impacto,
      },
      {
        nombreFactor: 'Superficie Cubierta (m²)',
        multiplicador: superficieMatch.multiplicador,
        porcentajeVariacion: Math.round((superficieMatch.multiplicador - 1) * 100),
        etiqueta: superficieMatch.etiqueta,
        impactoTexto: superficieMatch.impacto,
      },
      {
        nombreFactor: 'Medidas de Seguridad',
        multiplicador: seguridadMatch.multiplicador,
        porcentajeVariacion: Math.round((seguridadMatch.multiplicador - 1) * 100),
        etiqueta: seguridadMatch.etiqueta,
        impactoTexto: seguridadMatch.impacto,
      },
      {
        nombreFactor: 'Antigüedad de Construcción',
        multiplicador: inmuebleMatch.multiplicador,
        porcentajeVariacion: Math.round((inmuebleMatch.multiplicador - 1) * 100),
        etiqueta: inmuebleMatch.etiqueta,
        impactoTexto: inmuebleMatch.impacto,
      },
      {
        nombreFactor: 'Historial de Reclamos en Hogar',
        multiplicador: siniestroMatch.multiplicador,
        porcentajeVariacion: Math.round((siniestroMatch.multiplicador - 1) * 100),
        etiqueta: siniestroMatch.etiqueta,
        impactoTexto: siniestroMatch.impacto,
      },
      {
        nombreFactor: `Riesgo Zonal (${ciudad.nombre})`,
        multiplicador: factorUbicacion,
        porcentajeVariacion: Math.round((factorUbicacion - 1) * 100),
        etiqueta: `Índice de robo ${ciudad.indiceRobo.toLowerCase()}`,
        impactoTexto: `${factorUbicacion > 1 ? '+' : ''}${Math.round((factorUbicacion - 1) * 100)}%`,
      }
    );
  }

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
