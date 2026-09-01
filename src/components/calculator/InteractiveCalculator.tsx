'use client';

import React, { useState, useMemo } from 'react';
import { TipoSeguro, CalculationInput } from '@/types';
import { getCiudades } from '@/lib/data';
import { calcularCotizacion } from '@/lib/engine';
import { EstimateSummary } from './EstimateSummary';
import { FactorBreakdown } from './FactorBreakdown';
import { AdSlot } from '../common/AdSlot';
import { Car, Home, User, MapPin, Award, ShieldAlert, SlidersHorizontal } from 'lucide-react';

interface InteractiveCalculatorProps {
  initialInput?: Partial<CalculationInput>;
}

export function InteractiveCalculator({ initialInput }: InteractiveCalculatorProps) {
  const ciudades = getCiudades();

  const [tipoSeguro, setTipoSeguro] = useState<TipoSeguro>(initialInput?.tipoSeguro || 'auto');
  const [edad, setEdad] = useState<number>(initialInput?.edad || 35);
  const [antiguedadLicencia, setAntiguedadLicencia] = useState<number>(
    initialInput?.antiguedadLicenciaAnios !== undefined ? initialInput.antiguedadLicenciaAnios : 10
  );
  const [historialSiniestros, setHistorialSiniestros] = useState<string>(
    initialInput?.historialSiniestros || 'cero'
  );
  const [antiguedadVehiculo, setAntiguedadVehiculo] = useState<number>(
    initialInput?.antiguedadVehiculoAnios !== undefined ? initialInput.antiguedadVehiculoAnios : 4
  );
  const [ciudadSlug, setCiudadSlug] = useState<string>(
    initialInput?.ciudadSlug || ciudades[0]?.slug || 'buenos-aires'
  );

  const input: CalculationInput = useMemo(
    () => ({
      tipoSeguro,
      edad: Number(edad),
      antiguedadLicenciaAnios: Number(antiguedadLicencia),
      historialSiniestros,
      antiguedadVehiculoAnios: Number(antiguedadVehiculo),
      ciudadSlug,
    }),
    [tipoSeguro, edad, antiguedadLicencia, historialSiniestros, antiguedadVehiculo, ciudadSlug]
  );

  const result = useMemo(() => calcularCotizacion(input), [input]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Columna Formulario */}
      <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/60 border border-slate-200/90">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-brand-50 text-brand-600">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">Parámetros del Cotizante</h2>
              <p className="text-xs text-slate-500">Ajustá las variables para recalcular en vivo</p>
            </div>
          </div>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            En vivo
          </span>
        </div>

        {/* Selector de Tipo de Seguro (Segmented Pill) */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
            Tipo de Seguro
          </label>
          <div className="grid grid-cols-2 gap-2 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200">
            <button
              type="button"
              onClick={() => setTipoSeguro('auto')}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                tipoSeguro === 'auto'
                  ? 'bg-white text-brand-600 shadow-md border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Car className="w-4 h-4" />
              Automóvil
            </button>

            <button
              type="button"
              onClick={() => setTipoSeguro('hogar')}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                tipoSeguro === 'hogar'
                  ? 'bg-white text-brand-600 shadow-md border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Home className="w-4 h-4" />
              Hogar
            </button>
          </div>
        </div>

        {/* Ubicación / Ciudad */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-brand-600" />
            Ubicación y Jurisdicción
          </label>
          <div className="relative">
            <select
              value={ciudadSlug}
              onChange={(e) => setCiudadSlug(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-brand-500 focus:bg-white focus:outline-none transition-all cursor-pointer"
            >
              {ciudades.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.nombre} ({c.provincia}) — Riesgo {c.indiceRobo}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sliders Container */}
        <div className="space-y-6 pt-2">
          {/* Edad del Conductor */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-4 h-4 text-brand-600" />
                Edad del Titular
              </label>
              <span className="text-xs font-black text-brand-600 bg-brand-50 border border-brand-200 px-3 py-1 rounded-lg">
                {edad} años
              </span>
            </div>
            <input
              type="range"
              min={18}
              max={85}
              value={edad}
              onChange={(e) => setEdad(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-medium">
              <span>18 años (Joven)</span>
              <span>45 años (Referencia)</span>
              <span>85 años (Senior)</span>
            </div>
          </div>

          {/* Antigüedad de Licencia */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4 text-brand-600" />
                Antigüedad de Licencia
              </label>
              <span className="text-xs font-black text-brand-600 bg-brand-50 border border-brand-200 px-3 py-1 rounded-lg">
                {antiguedadLicencia} {antiguedadLicencia === 1 ? 'año' : 'años'}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={40}
              value={antiguedadLicencia}
              onChange={(e) => setAntiguedadLicencia(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-medium">
              <span>0 años (Novato)</span>
              <span>5 años (Intermedio)</span>
              <span>+10 años (Experto)</span>
            </div>
          </div>

          {/* Antigüedad del Vehículo / Propiedad */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Car className="w-4 h-4 text-brand-600" />
                Antigüedad del {tipoSeguro === 'auto' ? 'Vehículo' : 'Inmueble'}
              </label>
              <span className="text-xs font-black text-brand-600 bg-brand-50 border border-brand-200 px-3 py-1 rounded-lg">
                {antiguedadVehiculo} {antiguedadVehiculo === 0 ? '(0 KM)' : antiguedadVehiculo === 1 ? 'año' : 'años'}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={25}
              value={antiguedadVehiculo}
              onChange={(e) => setAntiguedadVehiculo(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-medium">
              <span>0 km (Nuevo)</span>
              <span>5 años</span>
              <span>+15 años</span>
            </div>
          </div>
        </div>

        {/* Historial de Siniestros (Interactive Tag Buttons) */}
        <div className="mt-6 pt-6 border-t border-slate-100">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-brand-600" />
            Historial de Siniestros (últimos 3 años)
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'cero', label: 'Sin siniestros', badge: 'Bonificación' },
              { id: 'uno', label: '1 siniestro', badge: 'Moderado' },
              { id: 'dos_o_mas', label: '2+ siniestros', badge: 'Recargo' },
            ].map((item) => {
              const isSelected = historialSiniestros === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setHistorialSiniestros(item.id)}
                  className={`p-3 rounded-2xl text-center border transition-all ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="text-xs font-bold leading-tight">{item.label}</div>
                  <div
                    className={`text-[10px] mt-1 font-semibold ${
                      isSelected
                        ? 'text-brand-300'
                        : item.id === 'cero'
                        ? 'text-emerald-600'
                        : item.id === 'uno'
                        ? 'text-amber-600'
                        : 'text-rose-600'
                    }`}
                  >
                    {item.badge}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Columna Resultados */}
      <div className="lg:col-span-6 space-y-6">
        <EstimateSummary result={result} />
        <FactorBreakdown
          factores={result.desgloseFactores}
          factorGlobalMultiplicador={result.factorGlobalMultiplicador}
        />
        <AdSlot slotId="calc-result-bottom" label="Anuncio de Cotización" />
      </div>
    </div>
  );
}
