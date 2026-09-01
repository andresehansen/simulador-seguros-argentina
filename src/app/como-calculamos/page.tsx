import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { AdSlot } from '@/components/common/AdSlot';
import { ShieldCheck, BookOpen, Calculator, CheckCircle2, AlertTriangle, Layers, Percent } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Metodología de Cálculo y Transparencia Actuarial | SeguroSimulador',
  description:
    'Conocé la metodología y las fórmulas matemáticas utilizadas en nuestro simulador de seguros. Transparencia, factores de riesgo y fuentes de referencia.',
};

export default function ComoCalculamosPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200 mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          Transparencia y Estándares YMYL
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Metodología de Cálculo y Fórmulas Actuariales
        </h1>
        <p className="mt-3 text-base text-slate-600 leading-relaxed">
          Explicamos con total apertura cómo nuestro motor determinístico estima los rangos de prima de seguros en función de variables estadísticas de riesgo público.
        </p>
      </div>

      <AdSlot slotId="methodology-top" label="Anuncio Educativo" className="my-6" />

      {/* Descargo de Responsabilidad Destacado */}
      <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-xl my-8">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-amber-900 leading-relaxed">
            <strong>Aviso de Cumplimiento Deontológico y YMYL:</strong> SeguroSimulador es una herramienta informática educativa e independiente. No somos corredores ni intermediarios de seguros matriculados ante la Superintendencia de Seguros de la Nación (SSN). Las fórmulas aquí presentadas son modelos matemáticos simplificados para comprensión del consumidor y no constituyen una cotización vinculante ni asesoramiento financiero personalizado.
          </div>
        </div>
      </div>

      {/* Fórmula Principal */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm my-8">
        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Percent className="w-5 h-5 text-brand-500" />
          La Fórmula de Estimación
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          En la industria aseguradora, la prima pura o costo de riesgo se determina mediante la multiplicación de la prima base por los coeficientes relativos al perfil del asegurado:
        </p>

        <div className="bg-slate-900 text-slate-100 p-4 sm:p-6 rounded-xl font-mono text-xs sm:text-sm overflow-x-auto my-4">
          <code>
            Prima Estimada = Prima Base × F(Edad) × F(Licencia) × F(Siniestros) × F(Vehículo) × F(Ubicación)
          </code>
        </div>

        <p className="text-xs text-slate-500 mt-4">
          Donde cada <strong>F(Variable)</strong> representa un factor multiplicador indexado según los baremos actuariales configurados en nuestros conjuntos de datos abiertos.
        </p>
      </section>

      {/* Desglose de Factores */}
      <section className="space-y-6 my-8">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Layers className="w-5 h-5 text-brand-500" />
          Ponderación de Variables de Riesgo
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-sm text-slate-900 mb-1">1. Tramo de Edad del Conductor</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Los conductores entre 18 y 24 años presentan estadísticamente mayor frecuencia de reclamos debido a la menor experiencia en situaciones viales imprevistas, aplicando un multiplicador de hasta 1.65x.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-sm text-slate-900 mb-1">2. Antigüedad de la Licencia</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              A mayor cantidad de años continuos con carnet de conducir habilitado, menor es el coeficiente de recargo, estabilizándose a partir de los 6 años de experiencia comprobable.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-sm text-slate-900 mb-1">3. Historial de Siniestralidad</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mantener un récord de 3 años consecutivos sin siniestros con culpa imputable activa un factor bonificador de 0.85x (-15% de descuento sobre la prima de referencia).
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-sm text-slate-900 mb-1">4. Zona Geográfica y Robo</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              La radicación en grandes conglomerados urbanos (ej: CABA o Rosario) incluye ajustes por densidad de tráfico y tasa de robos parciales de repuestos y ruedas.
            </p>
          </div>
        </div>
      </section>

      {/* AdSlot Intermedio */}
      <AdSlot slotId="methodology-mid" label="Anuncio Informativo" className="my-8" />

      {/* Fuentes y Buenas Prácticas */}
      <section className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 my-8">
        <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-brand-500" />
          Fuentes y Referencias Actuariales
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
          Nuestros datos base y ponderaciones se construyen tomando como referencia informes estadísticos periódicos de siniestralidad vial, estadísticas de la Superintendencia de Seguros de la Nación (SSN) y relevamientos de precios promedio de mercado en el territorio argentino.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/glosario-seguros"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-800 bg-white px-3 py-2 rounded-lg border border-slate-200 shadow-sm"
          >
            <BookOpen className="w-4 h-4" />
            Ver Glosario de Conceptos de Seguros
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 px-3 py-2 rounded-lg shadow-sm"
          >
            <Calculator className="w-4 h-4" />
            Ir a la Calculadora
          </Link>
        </div>
      </section>
    </div>
  );
}
