import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { getCiudades, getPerfiles, getCiudadBySlug, getPerfilBySlug } from '@/lib/data';
import { generatePageMetadata, generateLongTailData, formatCurrency } from '@/lib/seo';
import { EstimateSummary } from '@/components/calculator/EstimateSummary';
import { FactorBreakdown } from '@/components/calculator/FactorBreakdown';
import { AdSlot } from '@/components/common/AdSlot';
import { JsonLd } from '@/components/seo/JsonLd';
import { TipoSeguro } from '@/types';
import {
  MapPin,
  UserCheck,
  HelpCircle,
  CheckCircle2,
  ChevronRight,
  Calculator,
  ArrowRight,
  ShieldCheck,
  FileText,
} from 'lucide-react';

interface PageProps {
  params: {
    tipo: string;
    ciudad: string;
    perfil: string;
  };
}

export async function generateStaticParams() {
  const ciudades = getCiudades();
  const perfilesAuto = getPerfiles('auto');
  const perfilesHogar = getPerfiles('hogar');

  const paths: { tipo: string; ciudad: string; perfil: string }[] = [];

  for (const ciudad of ciudades) {
    for (const perfil of perfilesAuto) {
      paths.push({
        tipo: 'seguro-auto',
        ciudad: ciudad.slug,
        perfil: perfil.slug,
      });
    }
    for (const perfil of perfilesHogar) {
      paths.push({
        tipo: 'seguro-hogar',
        ciudad: ciudad.slug,
        perfil: perfil.slug,
      });
    }
  }

  return paths;
}

function parseTipo(tipoParam: string): TipoSeguro {
  return tipoParam?.toLowerCase().includes('hogar') ? 'hogar' : 'auto';
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const tipo = parseTipo(params.tipo);
  const ciudad = getCiudadBySlug(params.ciudad);
  const perfil = getPerfilBySlug(params.perfil, tipo);

  if (!ciudad || !perfil) {
    return {
      title: 'Cotización de Seguro | SeguroSimulador',
    };
  }

  return generatePageMetadata(tipo, ciudad, perfil);
}

export default function LongTailInsurancePage({ params }: PageProps) {
  const tipo = parseTipo(params.tipo);
  const ciudad = getCiudadBySlug(params.ciudad);
  const perfil = getPerfilBySlug(params.perfil, tipo);

  if (!ciudad || !perfil) {
    notFound();
  }

  const { result, faqs, tipoNombre, analisisPerfilCiudad } = generateLongTailData(
    tipo,
    ciudad,
    perfil
  );
  const todasLasCiudades = getCiudades();
  const perfilesMismaVertical = getPerfiles(tipo);

  return (
    <>
      <JsonLd type="FAQPage" faqs={faqs} />
      <JsonLd
        type="Service"
        title={`Simulación de Seguro de ${tipoNombre} en ${ciudad.nombre} para ${perfil.nombre}`}
        description={`Cálculo de prima estimada y factores de riesgo para ${perfil.nombre} en ${ciudad.nombre}.`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center text-xs text-slate-500 mb-6 flex-wrap gap-1.5 font-medium">
          <Link href="/" className="hover:text-brand-600 transition">
            Inicio
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-600">Seguro {tipoNombre}</span>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-600">{ciudad.nombre}</span>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">
            {perfil.nombre}
          </span>
        </nav>

        {/* H1 and Header Context */}
        <header className="mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200/80 mb-4 shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-brand-600" />
            <span>
              Informe Actuarial Regional: {ciudad.nombre} ({ciudad.provincia})
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Seguro de {tipoNombre} en {ciudad.nombre} para{' '}
            <span className="text-brand-600">{perfil.nombre}</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-4xl leading-relaxed">
            Estimación actuarial calculada para el perfil <strong>{perfil.nombre}</strong> radicado
            en la jurisdicción de <strong>{ciudad.nombre}</strong>. Conocé el rango de precios
            proyectado por cobertura y los factores específicos de siniestralidad local.
          </p>
        </header>

        {/* Top AdSlot */}
        <AdSlot slotId="longtail-top-slot" label="Anuncio de Coberturas" className="my-8" />

        {/* Dictamen de Riesgo Actuarial Único por Combinación */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm mb-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 rounded-lg bg-brand-50 text-brand-600">
              <FileText className="w-5 h-5" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Dictamen de Riesgo Actuarial para esta Jurisdicción
            </h2>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">{analisisPerfilCiudad}</p>
        </section>

        {/* Resultados del Cálculo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-8">
          <div className="lg:col-span-6 space-y-6">
            <EstimateSummary result={result} />

            {/* Estadística Local Contextual */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-lg bg-brand-50 text-brand-600">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-slate-900">
                  {tipo === 'auto'
                    ? `Siniestralidad Vial en ${ciudad.nombre}`
                    : `Riesgo Habitual y Edilicio en ${ciudad.nombre}`}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                {tipo === 'auto'
                  ? ciudad.estadisticaAuto || ciudad.estadisticaLocal
                  : ciudad.estadisticaHogar || ciudad.estadisticaLocal}
              </p>
              <div className="bg-amber-50/80 border border-amber-200/90 rounded-2xl p-4 text-xs text-amber-950 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <strong className="font-bold">Recomendación Local para {ciudad.nombre}:</strong>{' '}
                  {tipo === 'auto'
                    ? ciudad.consejoAuto || ciudad.consejoLocal
                    : ciudad.consejoHogar || ciudad.consejoLocal}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <FactorBreakdown
              factores={result.desgloseFactores}
              factorGlobalMultiplicador={result.factorGlobalMultiplicador}
            />

            {/* CTA a la Calculadora Principal */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-850 text-white rounded-3xl p-7 shadow-xl border border-slate-800 text-center">
              <div className="w-12 h-12 bg-brand-500/20 text-brand-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-brand-500/30">
                <Calculator className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">¿Querés ajustar estas variables?</h3>
              <p className="text-xs text-slate-300 mb-5 max-w-sm mx-auto leading-relaxed">
                {tipo === 'auto'
                  ? 'Modificá tu edad exacta, historial de siniestros o características de tu vehículo en la calculadora interactiva.'
                  : 'Modificá la superficie en m², medidas de seguridad o tipo de vivienda en la calculadora interactiva.'}
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-6 py-3 rounded-xl font-bold text-xs transition-all shadow-lg shadow-brand-600/30 hover:scale-105"
              >
                <span>Abrir Calculadora Interactiva</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Middle In-Article AdSlot */}
        <AdSlot slotId="longtail-mid-content" label="Anuncio Comparativa" className="my-12" />

        {/* Explicación de Perfil y Matriz Comparativa */}
        <section className="my-14 bg-white rounded-3xl p-6 sm:p-9 border border-slate-200/90 shadow-sm">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="p-2 rounded-xl bg-brand-50 text-brand-600">
              <UserCheck className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Análisis Específico del Perfil: {perfil.nombre}
            </h2>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed mb-6">
            {perfil.descripcionPerfil}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {perfil.factoresClave.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs font-medium text-slate-700"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="leading-snug">{item}</span>
              </div>
            ))}
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200/90">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-[11px] tracking-wider">
                <tr>
                  <th className="p-4">Variable de Riesgo</th>
                  <th className="p-4">Valor Asignado</th>
                  <th className="p-4">Impacto Actuarial en la Prima</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {tipo === 'auto' ? (
                  <>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 font-semibold text-slate-800">Edad del Conductor</td>
                      <td className="p-4 font-medium text-slate-600">{perfil.edad} años</td>
                      <td className="p-4 text-slate-700 font-bold">
                        {result.desgloseFactores[0]?.impactoTexto || 'Estándar'}
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 font-semibold text-slate-800">Experiencia de Licencia</td>
                      <td className="p-4 font-medium text-slate-600">
                        {perfil.antiguedadLicenciaAnios} {perfil.antiguedadLicenciaAnios === 1 ? 'año' : 'años'}
                      </td>
                      <td className="p-4 text-slate-700 font-bold">
                        {result.desgloseFactores[1]?.impactoTexto || 'Estándar'}
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 font-semibold text-slate-800">Segmento del Vehículo</td>
                      <td className="p-4 font-medium text-slate-600">Hatchback / Sedán Urbano</td>
                      <td className="p-4 text-slate-700 font-bold">
                        {result.desgloseFactores[2]?.impactoTexto || 'Base (0%)'}
                      </td>
                    </tr>
                  </>
                ) : (
                  <>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 font-semibold text-slate-800">Régimen y Tipo de Vivienda</td>
                      <td className="p-4 font-medium text-slate-600">
                        {result.desgloseFactores[0]?.etiqueta || 'Vivienda Residencial'}
                      </td>
                      <td className="p-4 text-slate-700 font-bold">
                        {result.desgloseFactores[0]?.impactoTexto || 'Estándar'}
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 font-semibold text-slate-800">Superficie Cubierta</td>
                      <td className="p-4 font-medium text-slate-600">
                        {result.desgloseFactores[1]?.etiqueta || 'Estándar'}
                      </td>
                      <td className="p-4 text-slate-700 font-bold">
                        {result.desgloseFactores[1]?.impactoTexto || 'Estándar'}
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 font-semibold text-slate-800">Medidas de Seguridad</td>
                      <td className="p-4 font-medium text-slate-600">
                        {result.desgloseFactores[2]?.etiqueta || 'Protección Estándar'}
                      </td>
                      <td className="p-4 text-slate-700 font-bold">
                        {result.desgloseFactores[2]?.impactoTexto || 'Estándar'}
                      </td>
                    </tr>
                  </>
                )}

                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-semibold text-slate-800">Ubicación Geográfica</td>
                  <td className="p-4 font-medium text-slate-600">{ciudad.nombre}</td>
                  <td className="p-4 text-slate-700 font-bold">
                    Factor Zonal {ciudad.factorRiesgoUrbano}x
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-semibold text-slate-800">
                    {tipo === 'auto'
                      ? 'Historial de Siniestralidad Vial'
                      : 'Historial de Reclamos en Hogar'}
                  </td>
                  <td className="p-4 font-medium text-slate-600">Sin antecedentes en 3 años</td>
                  <td className="p-4 text-emerald-600 font-black">Bonificación aplicada (-15%)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Sección Preguntas Frecuentes (FAQ) Dinámicas */}
        <section className="my-14 bg-slate-100/70 rounded-3xl p-6 sm:p-10 border border-slate-200">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 rounded-xl bg-brand-50 text-brand-600">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Preguntas Frecuentes sobre el Seguro en {ciudad.nombre}
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm"
              >
                <h3 className="font-bold text-sm sm:text-base text-slate-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Enlaces Internos a Otros Perfiles y Ciudades (SEO Siloing estricto por vertical) */}
        <section className="my-14 border-t border-slate-200/90 pt-10">
          <h3 className="font-black text-lg text-slate-900 mb-6">
            Explorar otras cotizaciones de Seguro de {tipoNombre}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h4 className="font-bold text-slate-800 text-sm mb-3">
                Otros perfiles en {ciudad.nombre}:
              </h4>
              <ul className="space-y-2">
                {perfilesMismaVertical
                  .filter((p) => p.slug !== perfil.slug)
                  .map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/seguro-${tipo}/${ciudad.slug}/${p.slug}`}
                        className="text-brand-600 hover:text-brand-800 hover:underline flex items-center gap-1 font-medium"
                      >
                        <ArrowRight className="w-3 h-3 text-brand-400" />
                        Seguro de {tipoNombre} para {p.nombre} en {ciudad.nombre}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h4 className="font-bold text-slate-800 text-sm mb-3">
                Cotizar {perfil.nombre} en otras ciudades:
              </h4>
              <ul className="space-y-2">
                {todasLasCiudades
                  .filter((c) => c.slug !== ciudad.slug)
                  .slice(0, 10)
                  .map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/seguro-${tipo}/${c.slug}/${perfil.slug}`}
                        className="text-brand-600 hover:text-brand-800 hover:underline flex items-center gap-1 font-medium"
                      >
                        <ArrowRight className="w-3 h-3 text-brand-400" />
                        Seguro de {tipoNombre} en {c.nombre} ({perfil.nombre})
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
