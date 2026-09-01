import React from 'react';
import { CalculationResult } from '@/types';
import { formatCurrency } from '@/lib/seo';
import { ShieldCheck, Info, Sparkles, CheckCircle2 } from 'lucide-react';

interface EstimateSummaryProps {
  result: CalculationResult;
}

export function EstimateSummary({ result }: EstimateSummaryProps) {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-700/80 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Badge */}
      <div className="flex items-center justify-between gap-2 mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/20 text-brand-300 border border-brand-500/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Estimación en Tiempo Real</span>
        </div>
        <span className="text-xs font-medium bg-slate-800/90 text-slate-300 px-3 py-1 rounded-full border border-slate-700">
          📍 {result.ciudad.nombre}
        </span>
      </div>

      {/* Main Big Price Display */}
      <div className="mb-8">
        <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold block mb-1">
          Rango Mensual Estimado
        </span>
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {formatCurrency(result.rangoMontoTotal.min)}
          </span>
          <span className="text-lg sm:text-2xl font-light text-slate-400">a</span>
          <span className="text-3xl sm:text-5xl font-black text-emerald-400 tracking-tight">
            {formatCurrency(result.rangoMontoTotal.max)}
          </span>
          <span className="text-xs text-slate-400 font-medium">/mes</span>
        </div>
        <p className="text-xs text-slate-400 mt-2">
          Valores orientativos de mercado según tu perfil de riesgo actual en {result.ciudad.nombre}.
        </p>
      </div>

      {/* Coberturas Grid */}
      <div className="border-t border-slate-800/90 pt-6">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4 flex items-center justify-between">
          <span>Desglose por Tipo de Cobertura</span>
          <span className="text-[10px] text-slate-400 font-normal">Valores mensuales</span>
        </h4>

        <div className="space-y-3">
          {result.coberturasEstimadas.map((cobertura, index) => {
            const esRecomendado = index === 1; // Terceros Completo suele ser el más cotizado

            return (
              <div
                key={cobertura.id}
                className={`rounded-2xl p-4 transition-all relative ${
                  esRecomendado
                    ? 'bg-gradient-to-r from-brand-950/60 to-slate-850 border border-brand-500/40 shadow-lg'
                    : 'bg-slate-800/60 hover:bg-slate-800/90 border border-slate-700/60'
                }`}
              >
                {esRecomendado && (
                  <span className="absolute -top-2.5 right-4 bg-brand-500 text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm">
                    ★ Más Cotizado
                  </span>
                )}

                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                  <div className="pr-2">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className={`w-4 h-4 ${esRecomendado ? 'text-brand-400' : 'text-slate-400'}`} />
                      <span className="font-bold text-sm text-slate-100">{cobertura.nombre}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 pl-5">{cobertura.descripcion}</p>
                  </div>

                  <div className="text-left sm:text-right pl-5 sm:pl-0 flex-shrink-0">
                    <div className="font-black text-base sm:text-lg text-emerald-400">
                      {formatCurrency(cobertura.estimadoMin)} - {formatCurrency(cobertura.estimadoMax)}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Promedio: <span className="text-white font-semibold">{formatCurrency(cobertura.estimadoPromedio)}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info notice */}
      <div className="mt-6 flex items-start gap-2.5 bg-slate-800/40 p-3.5 rounded-xl border border-slate-700/40 text-xs text-slate-400">
        <Info className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
        <span>
          Cálculo estimado basado en fórmulas actuariales públicas. Las primas finales son definidas por cada aseguradora al momento de la contratación.
        </span>
      </div>
    </div>
  );
}
