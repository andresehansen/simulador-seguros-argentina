import React from 'react';
import Link from 'next/link';
import { InteractiveCalculator } from '@/components/calculator/InteractiveCalculator';
import { AdSlot } from '@/components/common/AdSlot';
import { getCiudades, getPerfiles } from '@/lib/data';
import {
  ShieldCheck,
  TrendingDown,
  BookOpen,
  ArrowRight,
  MapPin,
  Car,
  Home,
  Sliders,
  CheckCircle2,
} from 'lucide-react';

export default function HomePage() {
  const ciudades = getCiudades();
  const perfilesAuto = getPerfiles('auto');
  const perfilesHogar = getPerfiles('hogar');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200/80 mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Actualizado 2026 · Tarifas de Referencia Argentina</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
          Simulador de Seguros <span className="text-brand-600">Argentina</span>
        </h1>

        <p className="mt-4 sm:mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Estimá el costo mensual de tu cobertura de <strong>Automóvil</strong> o <strong>Hogar</strong> según tu perfil demográfico, ubicación geográfica y factores de riesgo actuarial.
        </p>
      </section>

      {/* Top Banner AdSlot */}
      <AdSlot slotId="home-top-leaderboard" label="Anuncio de Seguros" className="mb-12" />

      {/* Interactive Engine Component */}
      <div className="mb-20">
        <InteractiveCalculator />
      </div>

      {/* Mid Article AdSlot */}
      <AdSlot slotId="home-mid-article" label="Anuncio Intermedio" className="max-w-4xl mx-auto my-14" />

      {/* Directorio de Páginas Long-Tail por Ciudad (SEO Hub Interno) */}
      <section className="my-20 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl shadow-slate-200/40">
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 mb-3">
            <MapPin className="w-3.5 h-3.5 text-brand-600" />
            Directorio Actuarial Regional
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Cotizaciones por Ciudad, Vehículo y Vivienda
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Explorá informes actuariales individualizados con estadísticas locales de siniestralidad, índices de robo y factores específicos para cada perfil:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ciudades.map((ciudad) => (
            <div
              key={ciudad.slug}
              className="border border-slate-200/80 rounded-2xl p-5 bg-gradient-to-b from-slate-50/50 to-white hover:border-brand-300 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-base text-slate-900 group-hover:text-brand-600 transition-colors">
                  {ciudad.nombre}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {ciudad.provincia}
                </span>
              </div>

              <p className="text-xs text-slate-500 mb-4 flex items-center gap-1">
                <span>Riesgo Urbano:</span>
                <span className="font-bold text-slate-700">{ciudad.indiceRobo}</span>
                <span>(Factor {ciudad.factorRiesgoUrbano}x)</span>
              </p>

              {/* Subsección Auto */}
              <div className="border-t border-slate-100 pt-3 mb-3">
                <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  <Car className="w-3.5 h-3.5 text-brand-600" />
                  Seguro Automotor
                </div>
                <div className="space-y-1">
                  {perfilesAuto.map((perfil) => (
                    <Link
                      key={perfil.slug}
                      href={`/seguro-auto/${ciudad.slug}/${perfil.slug}`}
                      className="flex items-center justify-between text-xs font-medium text-slate-600 hover:text-brand-600 py-0.5 transition-colors group/link"
                    >
                      <span className="truncate pr-2">{perfil.nombre}</span>
                      <ArrowRight className="w-3 h-3 text-slate-300 group-hover/link:text-brand-600 transition-all flex-shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Subsección Hogar */}
              <div className="border-t border-slate-100 pt-3">
                <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  <Home className="w-3.5 h-3.5 text-brand-600" />
                  Seguro de Hogar
                </div>
                <div className="space-y-1">
                  {perfilesHogar.map((perfil) => (
                    <Link
                      key={perfil.slug}
                      href={`/seguro-hogar/${ciudad.slug}/${perfil.slug}`}
                      className="flex items-center justify-between text-xs font-medium text-slate-600 hover:text-brand-600 py-0.5 transition-colors group/link"
                    >
                      <span className="truncate pr-2">{perfil.nombre}</span>
                      <ArrowRight className="w-3 h-3 text-slate-300 group-hover/link:text-brand-600 transition-all flex-shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sección Educativa y de Transparencia YMYL */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 my-20">
        <div className="bg-white p-7 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center mb-5">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-slate-900 mb-2">¿Cómo se calcula el seguro?</h3>
          <p className="text-xs text-slate-600 leading-relaxed mb-5">
            Las aseguradoras calculan la prima pura mediante tablas actuariales combinando edad, lugar de radicación, historial de siniestros y tipo de cobertura contratada.
          </p>
          <Link
            href="/como-calculamos"
            className="text-xs font-bold text-brand-600 hover:text-brand-800 inline-flex items-center gap-1 group"
          >
            Ver metodología detallada
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="bg-white p-7 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-5">
            <TrendingDown className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-slate-900 mb-2">Consejos para Ahorrar</h3>
          <p className="text-xs text-slate-600 leading-relaxed mb-5">
            Mantener un historial sin siniestros durante 3 años puede bonificar hasta un 15% tu prima. Instalar alarmas homologadas y contratar franquicias adecuadas optimiza tu presupuesto.
          </p>
          <Link
            href="/como-calculamos"
            className="text-xs font-bold text-emerald-600 hover:text-emerald-800 inline-flex items-center gap-1 group"
          >
            Consejos de contratación
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="bg-white p-7 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-5">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-slate-900 mb-2">Glosario Asegurador</h3>
          <p className="text-xs text-slate-600 leading-relaxed mb-5">
            ¿No sabés qué significa franquicia, prima pura, continente vs contenido o destrucción total? Consultá nuestro diccionario técnico simplificado con secciones de Auto y Hogar.
          </p>
          <Link
            href="/glosario-seguros"
            className="text-xs font-bold text-amber-600 hover:text-amber-800 inline-flex items-center gap-1 group"
          >
            Explorar glosario
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Compromiso de Transparencia */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-white rounded-3xl p-8 sm:p-10 text-center border border-slate-800 shadow-xl">
        <h3 className="font-extrabold text-xl mb-3 flex items-center justify-center gap-2">
          <ShieldCheck className="w-6 h-6 text-emerald-400" />
          Herramienta 100% Independiente y Abierta
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          No cobramos comisiones por venta de pólizas ni vendemos tus datos a intermediarios comerciales. Las fórmulas actuariales están publicadas abiertamente para empoderar al consumidor.
        </p>
      </div>
    </div>
  );
}
