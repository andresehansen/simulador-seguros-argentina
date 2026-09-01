import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Calculator, BookOpen, FileText, Sparkles } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 via-brand-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 group-hover:text-brand-600 transition-colors">
                  SeguroSimulador
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-bold tracking-wide uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 rounded">
                  Arg
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium leading-none hidden sm:block">
                Comparador y Simulador Actuarial
              </p>
            </div>
          </Link>

          <nav className="flex items-center gap-1 sm:gap-2">
            <Link
              href="/"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold text-slate-700 hover:text-brand-600 hover:bg-slate-50 transition"
            >
              <Calculator className="w-4 h-4 text-brand-600" />
              <span>Simulador</span>
            </Link>

            <Link
              href="/como-calculamos"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium text-slate-600 hover:text-brand-600 hover:bg-slate-50 transition"
            >
              <FileText className="w-4 h-4 text-slate-400" />
              <span>Metodología</span>
            </Link>

            <Link
              href="/glosario-seguros"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium text-slate-600 hover:text-brand-600 hover:bg-slate-50 transition"
            >
              <BookOpen className="w-4 h-4 text-slate-400" />
              <span>Glosario</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
