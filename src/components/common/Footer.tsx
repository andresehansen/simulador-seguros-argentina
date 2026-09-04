import React from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 font-bold text-lg text-white mb-3">
              <ShieldCheck className="w-5 h-5 text-brand-500" />
              <span>SeguroSimulador</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Herramienta educativa independiente de simulación de primas de seguros. Diseñada para educar a los usuarios sobre los factores actuariales de riesgo que influyen en las cotizaciones en Argentina.
            </p>
            <p className="text-[11px] text-slate-500">
              Desarrollado y mantenido por <strong>Andrés Hansen</strong>.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Transparencia y E-E-A-T</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/sobre-nosotros" className="hover:text-white transition">
                  Quiénes Somos y Fuentes Oficiales (SSN/CESVI)
                </Link>
              </li>
              <li>
                <Link href="/como-calculamos" className="hover:text-white transition">
                  Metodología y Fórmulas Actuariales
                </Link>
              </li>
              <li>
                <Link href="/glosario-seguros" className="hover:text-white transition">
                  Glosario de Términos de Seguros
                </Link>
              </li>
              <li>
                <Link href="/politica-de-privacidad" className="hover:text-white transition text-slate-300 font-medium">
                  Política de Privacidad y Cookies
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition">
                  Calculadora Interactiva de Seguros
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Aviso Legal y Deontológico</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              SeguroSimulador no es una entidad aseguradora ni un productor asesor de seguros matriculado. No emitimos pólizas ni solicitamos datos personales bancarios. Los resultados exhibidos son estimaciones matemáticas basadas en modelos de riesgo públicos.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-2">
          <p>© {new Date().getFullYear()} SeguroSimulador Argentina. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <Link href="/politica-de-privacidad" className="hover:text-slate-300 transition underline">
              Política de Privacidad
            </Link>
            <span>·</span>
            <p className="mt-2 sm:mt-0">Proyecto Estático Optimizado para Alto Rendimiento SEO.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
