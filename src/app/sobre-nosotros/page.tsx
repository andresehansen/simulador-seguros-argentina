import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { AdSlot } from '@/components/common/AdSlot';
import { ShieldCheck, Award, ExternalLink, Users, BookOpen, Calculator, CheckCircle2, Lock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sobre Nosotros y Fuentes Actuariales | SeguroSimulador',
  description:
    'Conocé quiénes somos, la misión de SeguroSimulador y las fuentes oficiales (SSN, CESVI, INDEC, SMN) que respaldan nuestras fórmulas de cálculo actuarial.',
};

export default function SobreNosotrosPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200/80 mb-4 shadow-sm">
          <Award className="w-3.5 h-3.5 text-brand-600" />
          <span>Transparencia y E-E-A-T (Experiencia, Autoridad y Confianza)</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Quiénes Somos y Fuentes Oficiales
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
          SeguroSimulador es un proyecto independiente de educación financiera y tecnología cívica creado para transparentar el mercado asegurador argentino mediante modelos actuariales abiertos.
        </p>
      </div>

      <AdSlot slotId="about-top" label="Anuncio Institucional" className="my-8" />

      {/* Misión y Autoría */}
      <section className="bg-white rounded-3xl p-6 sm:p-9 border border-slate-200/90 shadow-sm my-8">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="p-2 rounded-xl bg-brand-50 text-brand-600">
            <Users className="w-5 h-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Misión del Proyecto y Autoría
          </h2>
        </div>

        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <p>
            En la Argentina, cotizar un seguro suele implicar ingresar datos personales (teléfono, correo, DNI) en formularios comerciales, lo que deriva en llamadas de telemarketing insistentes antes de saber cuánto cuesta realmente una prima.
          </p>
          <p>
            <strong>SeguroSimulador</strong> nació como una iniciativa tecnológica independiente liderada por <strong>Andrés Hansen</strong> (desarrollador y analista de sistemas) junto a colaboradores del sector actuarial, con el objetivo de brindar una <strong>herramienta 100% anónima y determinística</strong>. No almacenamos cookies de rastreo invasivas ni intermediamos pólizas a comisión.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-100 text-xs">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span>Sin venta de datos ni llamadas comerciales</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span>Fórmulas matemáticas auditables</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span>Monetización 100% ética vía AdSense</span>
          </div>
        </div>
      </section>

      {/* Fuentes Oficiales de Datos */}
      <section className="my-10">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="p-2 rounded-xl bg-brand-50 text-brand-600">
            <BookOpen className="w-5 h-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Fuentes y Organismos de Referencia
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:border-brand-300 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-base text-slate-900">Superintendencia de Seguros de la Nación (SSN)</h3>
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              Organismo regulador de la actividad aseguradora en Argentina. Se utilizan sus circulares estadísticas de primas emitidas, balances patrimoniales de aseguradoras y topes obligatorios de Responsabilidad Civil.
            </p>
            <span className="text-[11px] font-semibold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-md">
              Regulación & Solvencia
            </span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:border-brand-300 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-base text-slate-900">CESVI Argentina</h3>
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              Centro de Experimentación y Seguridad Vial. Proveedor de las estadísticas sobre frecuencia de choques por tramo de edad, mapa de sustracción de ruedas/repuestos y costos de reparación por marca.
            </p>
            <span className="text-[11px] font-semibold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-md">
              Siniestralidad Vial
            </span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:border-brand-300 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-base text-slate-900">Servicio Meteorológico Nacional (SMN)</h3>
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              Datos climáticos históricos sobre corredores de tormentas severas, caída de granizo y ráfagas de viento Zonda para ponderar los recargos climatológicos regionales.
            </p>
            <span className="text-[11px] font-semibold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-md">
              Riesgo Climático
            </span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:border-brand-300 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-base text-slate-900">INDEC</h3>
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              Instituto Nacional de Estadística y Censos. Utilizado para clasificar aglomerados urbanos, densidad habitacional y características edilicias en cotizaciones de hogar.
            </p>
            <span className="text-[11px] font-semibold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-md">
              Demografía & Vivienda
            </span>
          </div>
        </div>
      </section>

      {/* AdSlot Intermedio */}
      <AdSlot slotId="about-mid" label="Anuncio Informativo" className="my-8" />

      {/* CTA Final */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-white rounded-3xl p-8 sm:p-10 text-center border border-slate-800 shadow-xl my-10">
        <h3 className="font-black text-xl mb-2">Probá el Simulador Actuarial</h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto mb-6 leading-relaxed">
          Accedé al simulador interactivo gratuito o revisá nuestras fórmulas paso a paso en la sección de metodología.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-6 py-3 rounded-xl font-bold text-xs transition shadow-md"
          >
            <Calculator className="w-4 h-4" />
            Abrir Calculadora
          </Link>
          <Link
            href="/como-calculamos"
            className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-6 py-3 rounded-xl font-bold text-xs transition border border-slate-700"
          >
            <BookOpen className="w-4 h-4" />
            Ver Fórmulas
          </Link>
        </div>
      </div>
    </div>
  );
}
