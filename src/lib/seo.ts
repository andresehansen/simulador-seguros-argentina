import { CiudadItem, PerfilItem, TipoSeguro, CalculationResult } from '@/types';
import { calcularCotizacion } from './engine';

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function generatePageMetadata(tipo: TipoSeguro, ciudad: CiudadItem, perfil: PerfilItem) {
  const tipoNombre = tipo === 'auto' ? 'Automóvil' : 'Hogar';
  const title = `Seguro de ${tipoNombre} en ${ciudad.nombre} para ${perfil.nombre} | Cotización y Tarifas`;
  const description = `Descubrí cuánto cuesta el seguro de ${tipoNombre.toLowerCase()} en ${ciudad.nombre} para ${perfil.nombre}. Estimación de ${formatCurrency(35000 * ciudad.factorRiesgoUrbano)} a ${formatCurrency(120000 * ciudad.factorRiesgoUrbano)}, análisis actuarial de ${ciudad.climaExtremoRiesgo.toLowerCase()} y desglose de factores de riesgo.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'es_AR',
    },
  };
}

export function generateLongTailData(tipo: TipoSeguro, ciudad: CiudadItem, perfil: PerfilItem) {
  const result: CalculationResult = calcularCotizacion({
    tipoSeguro: tipo,
    edad: perfil.edad,
    antiguedadLicenciaAnios: perfil.antiguedadLicenciaAnios,
    historialSiniestros: perfil.historialSiniestros,
    antiguedadVehiculoAnios: perfil.antiguedadVehiculoAnios,
    ciudadSlug: ciudad.slug,
  });

  const esAuto = tipo === 'auto';
  const tipoNombre = esAuto ? 'Automóvil' : 'Hogar';
  const variacionPorcentual = Math.round((result.factorGlobalMultiplicador - 1) * 100);

  // Análisis Actuarial Profundo y Único por Combinación (Anti-Thin Content)
  let analisisPerfilCiudad = '';
  if (perfil.slug === 'joven-novato') {
    analisisPerfilCiudad = `En la jurisdicción de ${ciudad.nombre}, los conductores jóvenes (18 a 24 años) con carnet inicial afrontan una de las primas ponderadas más elevadas del mercado, situándose en un factor global de ${result.factorGlobalMultiplicador}x (${variacionPorcentual > 0 ? '+' : ''}${variacionPorcentual}% respecto a la prima base nacional). Esto se debe a la convergencia entre la mayor siniestralidad nocturna y urbana según datos de CESVI, sumada a las condiciones locales de ${ciudad.nombre}, donde el índice de robos y el fenómeno de ${ciudad.climaExtremoRiesgo.toLowerCase()} elevan el costo de reposición para las aseguradoras.`;
  } else if (perfil.slug === 'conductor-experimento') {
    analisisPerfilCiudad = `Para el perfil de conductor experimentado (más de 10 años de licencia y récord sin siniestros) radicado en ${ciudad.nombre}, las compañías aseguradoras aplican su escala máxima de bonificación comercial. Aunque el factor urbano de ${ciudad.nombre} es de ${ciudad.factorRiesgoUrbano}x, la solvencia estadística de este tramo etario permite acceder a coberturas amplias (Terceros Completo o Todo Riesgo) con cuotas mensuales altamente competitivas, desde ${formatCurrency(result.coberturasEstimadas[1]?.estimadoMin || 0)}.`;
  } else if (perfil.slug === 'conductor-familiar') {
    analisisPerfilCiudad = `Los vehículos de uso familiar en ${ciudad.nombre} registran un uso intensivo mixto (traslados escolares, laborales y rutas interurbanas de fin de semana). Con un factor ponderado de ${result.factorGlobalMultiplicador}x, las prioridades de contratación en esta localidad se centran en amparos de destrucción total al 80% y cláusulas de daños por ${ciudad.climaExtremoRiesgo.toLowerCase()}, protegiendo el patrimonio familiar ante eventualidades climáticas frecuentes.`;
  } else {
    analisisPerfilCiudad = `Para el segmento de conductores senior (+65 años) en ${ciudad.nombre}, el perfil de manejo se caracteriza por un menor kilometraje anual acumulado pero con consideraciones actuariales específicas en tiempos de reacción y cobertura médica a ocupantes. En ${ciudad.nombre}, este perfil alcanza una prima estimada promedio de ${formatCurrency(result.rangoMontoTotal.promedio)}/mes, optimizable mediante la elección de franquicias fijas o coberturas de Terceros Completo Premium.`;
  }

  const faqs = [
    {
      question: `¿Cuánto cuesta en promedio el seguro de ${tipoNombre.toLowerCase()} en ${ciudad.nombre} para un ${perfil.nombre.toLowerCase()}?`,
      answer: `El valor estimado oscila entre ${formatCurrency(result.rangoMontoTotal.min)} y ${formatCurrency(result.rangoMontoTotal.max)} mensuales, con una prima promedio de ${formatCurrency(result.rangoMontoTotal.promedio)}/mes, según el nivel de amparo seleccionado (Responsabilidad Civil básica hasta Todo Riesgo sin Franquicia).`,
    },
    {
      question: `¿Cómo incide el factor de riesgo específico de ${ciudad.nombre} en la cotización?`,
      answer: `En ${ciudad.nombre} (${ciudad.provincia}), el factor de riesgo zonal está fijado en ${ciudad.factorRiesgoUrbano}x debido a su índice de robo ${ciudad.indiceRobo.toLowerCase()} y a la exposición ante ${ciudad.climaExtremoRiesgo.toLowerCase()}. ${ciudad.estadisticaLocal}`,
    },
    {
      question: `¿Por qué el perfil de ${perfil.nombre} tiene un multiplicador de ${result.factorGlobalMultiplicador}x?`,
      answer: `${perfil.descripcionPerfil} En nuestro modelo determinístico, esto genera un impacto del ${variacionPorcentual > 0 ? `+${variacionPorcentual}%` : `${variacionPorcentual}%`} sobre la prima base pura de referencia.`,
    },
    {
      question: `¿Qué cláusula de seguro es prioritaria contratar en ${ciudad.nombre}?`,
      answer: `${ciudad.consejoLocal} Se recomienda verificar en póliza si los daños por ${ciudad.climaExtremoRiesgo.toLowerCase()} cuentan con tope anual o reposición ilimitada.`,
    },
  ];

  return {
    result,
    faqs,
    tipoNombre,
    analisisPerfilCiudad,
  };
}
