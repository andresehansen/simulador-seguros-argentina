import React from 'react';
import { Info } from 'lucide-react';

export function DisclaimerBanner() {
  return (
    <aside className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-slate-300 border-b border-slate-700/60 text-[11px] sm:text-xs py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex-shrink-0 inline-flex items-center justify-center w-4 h-4 rounded-full bg-brand-500/20 text-brand-400">
            <Info className="w-3 h-3" />
          </span>
          <p className="leading-snug">
            <strong className="text-white font-semibold">Simulador 100% Gratuito y Educativo:</strong> Estimaciones actuariales no vinculantes. No vendemos pólizas ni brindamos asesoramiento financiero.
          </p>
        </div>
        <span className="hidden md:inline-block text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
          Sin registro requerido
        </span>
      </div>
    </aside>
  );
}
