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
  const baseEstimada = tipo === 'auto' ? 35000 : 18000;
  const description = `Descubrí cuánto cuesta el seguro de ${tipoNombre.toLowerCase()} en ${ciudad.nombre} para ${perfil.nombre}. Estimación de ${formatCurrency(baseEstimada * ciudad.factorRiesgoUrbano * 0.9)} a ${formatCurrency(baseEstimada * 2.5 * ciudad.factorRiesgoUrbano * 1.1)}, análisis actuarial de ${ciudad.climaExtremoRiesgo.toLowerCase()} y desglose de factores de riesgo.`;

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
  const esAuto = tipo === 'auto';
  const tipoNombre = esAuto ? 'Automóvil' : 'Hogar';

  let result: CalculationResult;

  if (esAuto) {
    result = calcularCotizacion({
      tipoSeguro: 'auto',
      ciudadSlug: ciudad.slug,
      edad: perfil.edad,
      antiguedadLicenciaAnios: perfil.antiguedadLicenciaAnios,
      segmentoVehiculo: perfil.segmentoVehiculo || 'hatchback_sedan',
      guardaHabitual: perfil.guardaHabitual || 'cochera_privada',
      antiguedadVehiculoAnios: perfil.antiguedadVehiculoAnios || 4,
      historialSiniestros: perfil.historialSiniestros,
    });
  } else {
    result = calcularCotizacion({
      tipoSeguro: 'hogar',
      ciudadSlug: ciudad.slug,
      tipoPropiedad: perfil.tipoPropiedad || 'depto_piso_alto',
      superficieM2: perfil.superficieM2 || '60_120',
      medidasSeguridad: perfil.medidasSeguridad || 'rejas_puerta_blindada',
      antiguedadInmuebleAnios: perfil.antiguedadInmuebleAnios || 8,
      historialSiniestros: perfil.historialSiniestros,
    });
  }

  const variacionPorcentual = Math.round((result.factorGlobalMultiplicador - 1) * 100);

  // Análisis Actuarial Profundo y Único por Combinación (Anti-Thin Content)
  let analisisPerfilCiudad = '';

  if (esAuto) {
    if (perfil.slug === 'joven-novato') {
      analisisPerfilCiudad = `En la jurisdicción de ${ciudad.nombre}, los conductores jóvenes (18 a 24 años) con carnet inicial afrontan una de las primas ponderadas más elevadas del mercado, situándose en un factor global de ${result.factorGlobalMultiplicador}x (${variacionPorcentual > 0 ? '+' : ''}${variacionPorcentual}% respecto a la prima base nacional). Esto se debe a la convergencia entre la mayor siniestralidad nocturna y urbana según datos de CESVI, sumada a las condiciones locales de ${ciudad.nombre}, donde el índice de robos y el fenómeno de ${ciudad.climaExtremoRiesgo.toLowerCase()} elevan el costo de reposición para las aseguradoras.`;
    } else if (perfil.slug === 'conductor-experimentado') {
      analisisPerfilCiudad = `Para el perfil de conductor experimentado (más de 10 años de licencia y récord sin siniestros) radicado en ${ciudad.nombre}, las compañías aseguradoras aplican su escala máxima de bonificación comercial. Aunque el factor urbano de ${ciudad.nombre} es de ${ciudad.factorRiesgoUrbano}x, la solvencia estadística de este tramo etario permite acceder a coberturas amplias (Terceros Completo o Todo Riesgo) con cuotas mensuales altamente competitivas, desde ${formatCurrency(result.coberturasEstimadas[1]?.estimadoMin || 0)}.`;
    } else if (perfil.slug === 'conductor-familiar') {
      analisisPerfilCiudad = `Los vehículos de uso familiar en ${ciudad.nombre} registran un uso intensivo mixto (traslados escolares, laborales y rutas interurbanas de fin de semana). Con un factor ponderado de ${result.factorGlobalMultiplicador}x, las prioridades de contratación en esta localidad se centran en amparos de destrucción total al 80% y cláusulas de daños por ${ciudad.climaExtremoRiesgo.toLowerCase()}, protegiendo el patrimonio familiar ante eventualidades climáticas frecuentes.`;
    } else {
      analisisPerfilCiudad = `Para el segmento de conductores senior (+65 años) en ${ciudad.nombre}, el perfil de manejo se caracteriza por un menor kilometraje anual acumulado pero con consideraciones actuariales específicas en tiempos de reacción y cobertura médica a ocupantes. En ${ciudad.nombre}, este perfil alcanza una prima estimada promedio de ${formatCurrency(result.rangoMontoTotal.promedio)}/mes, optimizable mediante la elección de franquicias fijas o coberturas de Terceros Completo Premium.`;
    }
  } else {
    // Narrativas exclusivas para Hogar (cero términos vehiculares)
    if (perfil.slug === 'propietario-casa') {
      analisisPerfilCiudad = `En la plaza inmobiliaria de ${ciudad.nombre}, las viviendas unifamiliares y dúplex afrontan una exposición directa perimetral a nivel de calle y techos independientes. Con un factor combinado de ${result.factorGlobalMultiplicador}x (${variacionPorcentual > 0 ? '+' : ''}${variacionPorcentual}% frente a la prima base), las pólizas para propietarios requieren amparar simultáneamente el continente (estructura, mampostería y cubiertas ante ${ciudad.climaExtremoRiesgo.toLowerCase()}) y el contenido de valor, siendo clave contar con medidas pasivas como rejas o cerramientos perimetrales para evitar recargos.`;
    } else if (perfil.slug === 'propietario-departamento') {
      analisisPerfilCiudad = `Los departamentos en edificios residenciales de ${ciudad.nombre} se benefician de una reducción de riesgo de intrusión externa por altura (bonificación actuarial en tipo de propiedad). Con un multiplicador global de ${result.factorGlobalMultiplicador}x, la siniestralidad habitual en esta jurisdicción no proviene del exterior sino de filtraciones de cañerías del consorcio, rotura de cristales y riesgos eléctricos, permitiendo obtener pólizas completas a valores altamente accesibles desde ${formatCurrency(result.rangoMontoTotal.min)}/mes.`;
    } else if (perfil.slug === 'inquilino') {
      analisisPerfilCiudad = `El perfil de inquilino o arrendatario en ${ciudad.nombre} accede a una de las tarifas más convenientes del mercado (factor global de ${result.factorGlobalMultiplicador}x) gracias a que no necesita asegurar la estructura edilicia (continente), cuya responsabilidad recae en el dueño o consorcio. La cobertura se enfoca exclusivamente en electrodomésticos, mobiliario, tecnología y Responsabilidad Civil Locativa ante el propietario, con una prima media estimada de ${formatCurrency(result.rangoMontoTotal.promedio)}/mes.`;
    } else {
      analisisPerfilCiudad = `Las viviendas en barrios privados o countries de ${ciudad.nombre} cuentan con un entorno de seguridad perimetral controlada y vigilancia 24 horas, reduciendo sustancialmente el factor de riesgo por robo e intrusión. No obstante, al poseer amplias superficies construidas y parques abiertos, el factor actuarial (${result.factorGlobalMultiplicador}x) prioriza sumas aseguradas elevadas para reconstrucción estructural y amparos integrales ante eventualidades meteorológicas como ${ciudad.climaExtremoRiesgo.toLowerCase()}.`;
    }
  }

  const consejoTexto = esAuto
    ? (ciudad.consejoAuto || ciudad.consejoLocal)
    : (ciudad.consejoHogar || ciudad.consejoLocal);

  const estadisticaTexto = esAuto
    ? (ciudad.estadisticaAuto || ciudad.estadisticaLocal)
    : (ciudad.estadisticaHogar || ciudad.estadisticaLocal);

  const faqs = esAuto
    ? [
        {
          question: `¿Cuánto cuesta en promedio el seguro de automóvil en ${ciudad.nombre} para un ${perfil.nombre.toLowerCase()}?`,
          answer: `El valor estimado oscila entre ${formatCurrency(result.rangoMontoTotal.min)} y ${formatCurrency(result.rangoMontoTotal.max)} mensuales, con una prima promedio de ${formatCurrency(result.rangoMontoTotal.promedio)}/mes, según el nivel de amparo seleccionado (Responsabilidad Civil básica hasta Todo Riesgo sin Franquicia).`,
        },
        {
          question: `¿Cómo incide el factor de riesgo específico de ${ciudad.nombre} en la cotización?`,
          answer: `En ${ciudad.nombre} (${ciudad.provincia}), el factor de riesgo zonal está fijado en ${ciudad.factorRiesgoUrbano}x debido a su índice de robo ${ciudad.indiceRobo.toLowerCase()} y a la exposición ante ${ciudad.climaExtremoRiesgo.toLowerCase()}. ${estadisticaTexto}`,
        },
        {
          question: `¿Por qué el perfil de ${perfil.nombre} tiene un multiplicador de ${result.factorGlobalMultiplicador}x?`,
          answer: `${perfil.descripcionPerfil} En nuestro modelo determinístico, esto genera un impacto del ${variacionPorcentual > 0 ? `+${variacionPorcentual}%` : `${variacionPorcentual}%`} sobre la prima base pura de referencia.`,
        },
        {
          question: `¿Qué cláusula de seguro es prioritaria contratar en ${ciudad.nombre}?`,
          answer: `${consejoTexto} Se recomienda verificar en póliza si los daños por ${ciudad.climaExtremoRiesgo.toLowerCase()} cuentan con tope anual o reposición ilimitada.`,
        },
      ]
    : [
        {
          question: `¿Cuánto cuesta en promedio el seguro de hogar en ${ciudad.nombre} para un ${perfil.nombre.toLowerCase()}?`,
          answer: `El valor estimado oscila entre ${formatCurrency(result.rangoMontoTotal.min)} y ${formatCurrency(result.rangoMontoTotal.max)} mensuales, con una prima promedio de ${formatCurrency(result.rangoMontoTotal.promedio)}/mes, variando según la superficie construida y si se contrata cobertura básica o Multirriesgo Hogar con electrodomésticos.`,
        },
        {
          question: `¿Cómo afecta la ubicación en ${ciudad.nombre} a la prima de seguro de vivienda?`,
          answer: `En ${ciudad.nombre} (${ciudad.provincia}), el coeficiente zonal de ${ciudad.factorRiesgoUrbano}x responde al índice de seguridad ${ciudad.indiceRobo.toLowerCase()} y a los eventos de ${ciudad.climaExtremoRiesgo.toLowerCase()}. ${estadisticaTexto}`,
        },
        {
          question: `¿Qué amparos incluye la cotización para ${perfil.nombre} en ${ciudad.nombre}?`,
          answer: `${perfil.descripcionPerfil} El modelo aplica un ajuste actuarial global de ${result.factorGlobalMultiplicador}x (${variacionPorcentual > 0 ? `+${variacionPorcentual}%` : `${variacionPorcentual}%`}) sobre la base testigo.`,
        },
        {
          question: `¿Qué factores edilicios conviene revisar antes de contratar en ${ciudad.nombre}?`,
          answer: `${consejoTexto} Para viviendas particulares, es prioritario verificar la inclusión de daños por agua por rotura de cañerías y cobertura ante ${ciudad.climaExtremoRiesgo.toLowerCase()}.`,
        },
      ];

  return {
    result,
    faqs,
    tipoNombre,
    analisisPerfilCiudad,
  };
}
