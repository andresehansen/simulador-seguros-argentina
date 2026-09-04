import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { AdSlot } from '@/components/common/AdSlot';
import { BookOpen, Calculator, Car, Home } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Glosario de Seguros | Diccionario Técnico de Auto y Hogar',
  description:
    'Diccionario completo de términos técnicos de seguros en Argentina: franquicia, prima pura, continente vs. contenido, RC comprensiva, ajuste automático y reposición a nuevo.',
};

const terminosAuto = [
  {
    termino: 'Prima Pura o de Riesgo',
    definicion:
      'Es el costo matemático estrictamente necesario para cubrir los siniestros previstos según las leyes de la probabilidad y las tablas estadísticas de siniestralidad, sin considerar gastos administrativos ni márgenes de utilidad.',
  },
  {
    termino: 'Premio Total',
    definicion:
      'Es el importe final que abona el asegurado. Surge de sumar a la prima comercial los impuestos (IVA, Ingresos Brutos), tasas de superintendencia y recargos financieros en caso de cuotas.',
  },
  {
    termino: 'Franquicia (Deducible)',
    definicion:
      'Monto o porcentaje estipulado en la póliza que queda a cargo exclusivo del asegurado ante un siniestro cubierto. La aseguradora indemniza únicamente el valor que supere dicho importe acordado.',
  },
  {
    termino: 'Responsabilidad Civil (Terceros)',
    definicion:
      'Cobertura de carácter obligatorio que indemniza los daños materiales o corporales causados involuntariamente a terceras personas o sus bienes con el vehículo asegurado, hasta el límite legal establecido.',
  },
  {
    termino: 'Destrucción Total (Cláusula del 80%)',
    definicion:
      'Condición contractual habitual en la que se declara pérdida total cuando el costo de reparación de los daños o repuestos supera el 80% del valor de plaza del vehículo asegurado a la fecha del siniestro.',
  },
  {
    termino: 'Cobertura de Granizo',
    definicion:
      'Amparo adicional dentro de pólizas de Terceros Completo o Todo Riesgo que cubre abolladuras y roturas de chapa y pintura provocadas por tormentas de granizo, frecuentemente sujeto a un tope o límite por evento anual.',
  },
  {
    termino: 'Reposición a 0 KM (Nuevo)',
    definicion:
      'Cláusula especial para vehículos nuevos que garantiza la entrega de una unidad 0 KM idéntica en caso de robo o destrucción total ocurrida durante el primer año de vigencia de la póliza.',
  },
  {
    termino: 'Endoso de Póliza',
    definicion:
      'Documento modificatorio emitido por la compañía aseguradora que altera, amplía o rectifica condiciones particulares de una póliza existente (cambio de domicilio, nuevo conductor, actualización de suma asegurada).',
  },
  {
    termino: 'Siniestro',
    definicion:
      'Acontecimiento imprevisto, súbito y accidental previsto en el contrato de seguro, que genera la obligación de indemnizar o prestar asistencia por parte de la entidad aseguradora.',
  },
  {
    termino: 'Suma Asegurada',
    definicion:
      'Límite máximo de responsabilidad económica que asume la aseguradora en caso de ocurrencia de un siniestro amparado por el contrato.',
  },
];

const terminosHogar = [
  {
    termino: 'Continente vs. Contenido',
    definicion:
      'El "Continente" comprende la estructura edilicia física y fija de la vivienda (cimientos, paredes, techos, cañerías e instalaciones empotradas). El "Contenido" abarca la totalidad de los bienes muebles, electrodomésticos, indumentaria y tecnología situados dentro del inmueble asegurado.',
  },
  {
    termino: 'Responsabilidad Civil Comprensiva (Hogar)',
    definicion:
      'Amparo que protege el patrimonio del asegurado y su grupo familiar conviviente ante demandas por daños y perjuicios ocasionados involuntariamente a terceros (incluyendo linderos) originados en la vivienda, como filtraciones de agua, caída de mampostería o mordedura de mascotas domésticas.',
  },
  {
    termino: 'Valor de Reposición a Nuevo (Vivienda)',
    definicion:
      'Modalidad de indemnización para mobiliario y electrodomésticos siniestrados según la cual la aseguradora liquida el monto necesario para adquirir un bien equivalente nuevo a precios actuales de mercado, sin deducir depreciación por antigüedad o uso.',
  },
  {
    termino: 'Riesgos Nombrados vs. Todo Riesgo Hogar',
    definicion:
      'Las pólizas por "Riesgos Nombrados" solo indemnizan siniestros originados por causas taxativamente enumeradas en el contrato (incendio, rayo, explosión, robo). Una póliza "Todo Riesgo Hogar" cubre cualquier daño accidental súbito e imprevisto sobre los bienes, salvo las exclusiones expresamente detalladas.',
  },
  {
    termino: 'Cláusula de Ajuste Automático de Suma Asegurada',
    definicion:
      'Mecanismo de indexación acordado en póliza (típicamente entre 20% y 50% anual) que incrementa progresivamente el capital asegurado para evitar el infraseguro ante el impacto inflacionario en los costos de reconstrucción y reposición de materiales en Argentina.',
  },
  {
    termino: 'Robo con Efracción y Escalamiento',
    definicion:
      'Cláusula de cobertura contra robo que exige la acreditación de violencia manifiesta en las cosas para penetrar en la vivienda (rotura de puertas, cerraduras, rejas, vidrios) o superación de muros/defensas perimetrales mediante escalamiento.',
  },
  {
    termino: 'Daños por Agua e Inundación Interna',
    definicion:
      'Cobertura que indemniza los daños materiales causados al continente y contenido de la vivienda debido a rotura súbita, obstrucción o desborde de cañerías de agua corriente, desagües pluviales o tanques de reserva del inmueble.',
  },
  {
    termino: 'Responsabilidad Civil Locativa (Inquilinos)',
    definicion:
      'Garantía específica para inquilinos que cubre la indemnización económica exigida por el propietario de la vivienda si ocurre un incendio o explosión originado negligentemente en el inmueble alquilado que cause daños estructurales.',
  },
];

export default function GlosarioSegurosPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200 mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          Educación Aseguradora YMYL
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Glosario de Términos y Conceptos de Seguros
        </h1>
        <p className="mt-3 text-base text-slate-600 leading-relaxed">
          Comprendé los tecnicismos de las pólizas de seguro de auto y hogar explicados en lenguaje claro, transparente y accesible.
        </p>
      </div>

      <AdSlot slotId="glossary-top" label="Anuncio Glosario" className="my-6" />

      {/* SECCIÓN 1: TÉRMINOS DE AUTOMÓVIL */}
      <section className="my-10">
        <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-slate-200">
          <div className="p-2 rounded-xl bg-brand-50 text-brand-600">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Términos de Seguro de Automóvil
            </h2>
            <p className="text-xs text-slate-500">
              Conceptos clave sobre franquicias, coberturas mecánicas y responsabilidad civil vial
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {terminosAuto.map((item, index) => (
            <article
              key={index}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm hover:border-brand-300 transition"
            >
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                {item.termino}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {item.definicion}
              </p>
            </article>
          ))}
        </div>
      </section>

      <AdSlot slotId="glossary-mid" label="Anuncio Comparativa" className="my-8" />

      {/* SECCIÓN 2: TÉRMINOS DE HOGAR */}
      <section className="my-12">
        <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-slate-200">
          <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
            <Home className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Términos de Seguro de Hogar
            </h2>
            <p className="text-xs text-slate-500">
              Conceptos esenciales para propietarios e inquilinos de viviendas y departamentos
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {terminosHogar.map((item, index) => (
            <article
              key={index}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm hover:border-emerald-300 transition"
            >
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                {item.termino}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {item.definicion}
              </p>
            </article>
          ))}
        </div>
      </section>

      <AdSlot slotId="glossary-bottom" label="Anuncio de Cierre" className="my-8" />

      {/* CTA Final */}
      <div className="bg-slate-900 text-white rounded-3xl p-7 sm:p-9 text-center my-10 border border-slate-800 shadow-xl">
        <h3 className="font-bold text-xl mb-2">¿Querés poner a prueba estos conceptos?</h3>
        <p className="text-xs sm:text-sm text-slate-300 mb-6 max-w-lg mx-auto leading-relaxed">
          Usá nuestro simulador de cotizaciones para ver cómo influyen la franquicia, la edad de la vivienda, la ubicación y las medidas de seguridad en la prima mensual.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-6 py-3 rounded-xl font-bold text-xs transition shadow-md hover:scale-105"
        >
          <Calculator className="w-4 h-4" />
          Ir al Simulador de Seguros
        </Link>
      </div>
    </div>
  );
}
