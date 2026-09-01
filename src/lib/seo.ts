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
  const description = `Descubrí cuánto cuesta el seguro de ${tipoNombre.toLowerCase()} en ${ciudad.nombre} para un perfil de ${perfil.nombre}. Estimación actualizada, tabla de coeficientes de riesgo y consejos locales.`;

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

  const tipoNombre = tipo === 'auto' ? 'Automóvil' : 'Hogar';

  const faqs = [
    {
      question: `¿Cuánto cuesta en promedio el seguro de ${tipoNombre.toLowerCase()} en ${ciudad.nombre} para un ${perfil.nombre.toLowerCase()}?`,
      answer: `El valor estimado oscila entre ${formatCurrency(result.rangoMontoTotal.min)} y ${formatCurrency(result.rangoMontoTotal.max)} mensuales, dependiendo de la aseguradora y el nivel de cobertura contratado (Terceros vs Todo Riesgo).`,
    },
    {
      question: `¿Por qué varía el precio del seguro en ${ciudad.nombre}?`,
      answer: `En ${ciudad.nombre}, el factor de riesgo urbano es de ${ciudad.factorRiesgoUrbano} (índice de robo ${ciudad.indiceRobo.toLowerCase()}). Además, fenómenos como ${ciudad.climaExtremoRiesgo.toLowerCase()} influyen en el costo final de las primas.`,
    },
    {
      question: `¿Cómo afecta el perfil de ${perfil.nombre} al costo del seguro?`,
      answer: `${perfil.descripcionPerfil} Esto genera ajustes en el coeficiente actuarial que las compañías aplican al calcular la prima pura de riesgo.`,
    },
    {
      question: `¿Qué cobertura se recomienda para ${ciudad.nombre}?`,
      answer: ciudad.consejoLocal,
    },
  ];

  return {
    result,
    faqs,
    tipoNombre,
  };
}
