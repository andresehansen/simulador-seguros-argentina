import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { AdSlot } from '@/components/common/AdSlot';
import { BookOpen, Calculator, Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Glosario de Seguros | Diccionario de Términos Aseguradores',
  description:
    'Diccionario completo de términos de seguros en Argentina: franquicia, prima pura, responsabilidad civil, destrucción total, granizo y más.',
};

const terminos = [
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
          Comprendé los tecnicismos de las pólizas de seguro de auto y hogar explicados en lenguaje claro y accesible.
        </p>
      </div>

      <AdSlot slotId="glossary-top" label="Anuncio Glosario" className="my-6" />

      {/* Lista de Términos */}
      <div className="space-y-4 my-8">
        {terminos.map((item, index) => (
          <article
            key={index}
            className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-sm hover:border-brand-300 transition"
          >
            <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
              {item.termino}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {item.definicion}
            </p>
          </article>
        ))}
      </div>

      <AdSlot slotId="glossary-bottom" label="Anuncio de Cierre" className="my-8" />

      {/* CTA Final */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 text-center my-8">
        <h3 className="font-bold text-lg mb-2">¿Querés poner a prueba estos conceptos?</h3>
        <p className="text-xs text-slate-300 mb-6 max-w-lg mx-auto">
          Usá nuestro simulador de cotizaciones para ver cómo influyen la franquicia, la edad y tu ubicación en la prima final.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-5 py-2.5 rounded-lg font-semibold text-xs transition shadow-sm"
        >
          <Calculator className="w-4 h-4" />
          Ir al Simulador de Seguros
        </Link>
      </div>
    </div>
  );
}
