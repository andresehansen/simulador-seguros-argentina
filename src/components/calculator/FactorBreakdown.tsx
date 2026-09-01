import React from 'react';
import { FactorImpact } from '@/types';
import { TrendingUp, TrendingDown, MinusCircle, Gauge } from 'lucide-react';

interface FactorBreakdownProps {
  factores: FactorImpact[];
  factorGlobalMultiplicador: number;
}

export function FactorBreakdown({ factores, factorGlobalMultiplicador }: FactorBreakdownProps) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200/90 p-6 sm:p-7">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-brand-50 text-brand-600">
              <Gauge className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-lg text-slate-900">Análisis de Factores de Riesgo</h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">Cómo influye cada dato en el precio final calculado</p>
        </div>

        <div className="bg-slate-900 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-sm">
          Multiplicador: <span className="text-brand-400 text-sm font-black">{factorGlobalMultiplicador}x</span>
        </div>
      </div>

      <div className="space-y-3">
        {factores.map((factor, index) => {
          const esAumento = factor.porcentajeVariacion > 0;
          const esDescuento = factor.porcentajeVariacion < 0;

          return (
            <div
              key={index}
              className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/70 hover:bg-slate-50 border border-slate-100 transition-colors"
            >
              <div className="pr-2">
                <div className="font-semibold text-sm text-slate-800">{factor.nombreFactor}</div>
                <div className="text-xs text-slate-500 font-medium">{factor.etiqueta}</div>
              </div>

              <div className="flex-shrink-0">
                <span
                  className={`inline-flex items-center gap-1 text-xs font-extrabold px-3 py-1 rounded-full ${
                    esAumento
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : esDescuento
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}
                >
                  {esAumento && <TrendingUp className="w-3.5 h-3.5 text-rose-600" />}
                  {esDescuento && <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />}
                  {!esAumento && !esDescuento && <MinusCircle className="w-3.5 h-3.5 text-slate-400" />}
                  {factor.porcentajeVariacion > 0 ? `+${factor.porcentajeVariacion}%` : `${factor.porcentajeVariacion}%`}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
