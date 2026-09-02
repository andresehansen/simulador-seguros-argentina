'use client';

import React, { useState, useMemo } from 'react';
import { TipoSeguro, CalculationInput } from '@/types';
import { getCiudades, getFactoresRiesgo } from '@/lib/data';
import { calcularCotizacion } from '@/lib/engine';
import { EstimateSummary } from './EstimateSummary';
import { FactorBreakdown } from './FactorBreakdown';
import { AdSlot } from '../common/AdSlot';
import {
  Car,
  Home,
  User,
  MapPin,
  Award,
  ShieldAlert,
  SlidersHorizontal,
  Building,
  KeyRound,
  Maximize2,
  Calendar,
  Lock,
} from 'lucide-react';

interface InteractiveCalculatorProps {
  initialInput?: Partial<CalculationInput>;
}

export function InteractiveCalculator({ initialInput }: InteractiveCalculatorProps) {
  const ciudades = getCiudades();
  const factores = getFactoresRiesgo();

  const [tipoSeguro, setTipoSeguro] = useState<TipoSeguro>(initialInput?.tipoSeguro || 'auto');
  const [ciudadSlug, setCiudadSlug] = useState<string>(
    initialInput?.ciudadSlug || ciudades[0]?.slug || 'buenos-aires'
  );

  // Estados específicos para Automóvil
  const [edad, setEdad] = useState<number>(initialInput?.edad || 35);
  const [antiguedadLicencia, setAntiguedadLicencia] = useState<number>(
    initialInput?.antiguedadLicenciaAnios !== undefined ? initialInput.antiguedadLicenciaAnios : 10
  );
  const [segmentoVehiculo, setSegmentoVehiculo] = useState<string>(
    initialInput?.segmentoVehiculo || 'hatchback_sedan'
  );
  const [guardaHabitual, setGuardaHabitual] = useState<string>(
    initialInput?.guardaHabitual || 'cochera_comunitaria'
  );
  const [antiguedadVehiculo, setAntiguedadVehiculo] = useState<number>(
    initialInput?.antiguedadVehiculoAnios !== undefined ? initialInput.antiguedadVehiculoAnios : 4
  );
  const [historialSiniestrosAuto, setHistorialSiniestrosAuto] = useState<string>(
    initialInput?.historialSiniestros || 'cero'
  );

  // Estados específicos para Hogar
  const [tipoPropiedad, setTipoPropiedad] = useState<string>(
    initialInput?.tipoPropiedad || 'depto_piso_alto'
  );
  const [superficieM2, setSuperficieM2] = useState<string>(
    initialInput?.superficieM2 || '60_120'
  );
  const [medidasSeguridad, setMedidasSeguridad] = useState<string>(
    initialInput?.medidasSeguridad || 'rejas_puerta_blindada'
  );
  const [antiguedadInmueble, setAntiguedadInmueble] = useState<number>(
    initialInput?.antiguedadInmuebleAnios !== undefined ? initialInput.antiguedadInmuebleAnios : 8
  );
  const [historialSiniestrosHogar, setHistorialSiniestrosHogar] = useState<string>(
    initialInput?.historialSiniestros || 'cero'
  );

  const input: CalculationInput = useMemo(() => {
    if (tipoSeguro === 'auto') {
      return {
        tipoSeguro: 'auto',
        ciudadSlug,
        edad: Number(edad),
        antiguedadLicenciaAnios: Number(antiguedadLicencia),
        segmentoVehiculo,
        guardaHabitual,
        antiguedadVehiculoAnios: Number(antiguedadVehiculo),
        historialSiniestros: historialSiniestrosAuto,
      };
    } else {
      return {
        tipoSeguro: 'hogar',
        ciudadSlug,
        tipoPropiedad,
        superficieM2,
        medidasSeguridad,
        antiguedadInmuebleAnios: Number(antiguedadInmueble),
        historialSiniestros: historialSiniestrosHogar,
      };
    }
  }, [
    tipoSeguro,
    ciudadSlug,
    edad,
    antiguedadLicencia,
    segmentoVehiculo,
    guardaHabitual,
    antiguedadVehiculo,
    historialSiniestrosAuto,
    tipoPropiedad,
    superficieM2,
    medidasSeguridad,
    antiguedadInmueble,
    historialSiniestrosHogar,
  ]);

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
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                Parámetros para {tipoSeguro === 'auto' ? 'Automóvil' : 'Hogar'}
              </h2>
              <p className="text-xs text-slate-500">Variables exclusivas para este tipo de póliza</p>
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

        {/* Ubicación / Ciudad (Común) */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-brand-600" />
            Ubicación y Jurisdicción
          </label>
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

        {/* -------------------- OPCIONES PARA AUTOMÓVIL -------------------- */}
        {tipoSeguro === 'auto' && (
          <div className="space-y-6 pt-1 animate-fadeIn">
            {/* Segmento del Auto */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Car className="w-4 h-4 text-brand-600" />
                Segmento / Tipo de Vehículo
              </label>
              <div className="grid grid-cols-2 gap-2">
                {factores.auto.segmentoVehiculo.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSegmentoVehiculo(item.id)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                      segmentoVehiculo === item.id
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {item.nombre}
                  </button>
                ))}
              </div>
            </div>

            {/* Guarda Habitual */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <KeyRound className="w-4 h-4 text-brand-600" />
                Guarda Nocturna / Estacionamiento
              </label>
              <div className="grid grid-cols-3 gap-2">
                {factores.auto.guardaHabitual.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setGuardaHabitual(item.id)}
                    className={`py-2.5 px-2 rounded-xl text-xs font-semibold border transition-all text-center ${
                      guardaHabitual === item.id
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {item.nombre}
                  </button>
                ))}
              </div>
            </div>

            {/* Sliders Auto */}
            <div className="space-y-5 pt-2">
              {/* Edad Conductor */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <User className="w-4 h-4 text-brand-600" />
                    Edad del Conductor
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
                  <span>45 años (Estándar)</span>
                  <span>85 años (Senior)</span>
                </div>
              </div>

              {/* Antigüedad Licencia */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-brand-600" />
                    Antigüedad de Licencia de Conducir
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

              {/* Antigüedad Auto */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-brand-600" />
                    Antigüedad del Automóvil
                  </label>
                  <span className="text-xs font-black text-brand-600 bg-brand-50 border border-brand-200 px-3 py-1 rounded-lg">
                    {antiguedadVehiculo === 0 ? '0 KM (Nuevo)' : `${antiguedadVehiculo} ${antiguedadVehiculo === 1 ? 'año' : 'años'}`}
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
                  <span>0 km</span>
                  <span>5 años</span>
                  <span>+15 años</span>
                </div>
              </div>
            </div>

            {/* Siniestros Auto */}
            <div className="pt-3 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-brand-600" />
                Historial de Siniestros Viales (Últimos 3 años)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'cero', label: 'Sin siniestros', badge: 'Bonificación (-15%)' },
                  { id: 'uno', label: '1 siniestro', badge: 'Moderado (+15%)' },
                  { id: 'dos_o_mas', label: '2+ siniestros', badge: 'Recargo (+60%)' },
                ].map((item) => {
                  const isSelected = historialSiniestrosAuto === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setHistorialSiniestrosAuto(item.id)}
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
        )}

        {/* -------------------- OPCIONES PARA HOGAR -------------------- */}
        {tipoSeguro === 'hogar' && (
          <div className="space-y-6 pt-1 animate-fadeIn">
            {/* Tipo de Propiedad */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Building className="w-4 h-4 text-brand-600" />
                Tipo de Vivienda
              </label>
              <div className="grid grid-cols-2 gap-2">
                {factores.hogar.tipoPropiedad.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTipoPropiedad(item.id)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                      tipoPropiedad === item.id
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {item.nombre}
                  </button>
                ))}
              </div>
            </div>

            {/* Superficie Construida */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Maximize2 className="w-4 h-4 text-brand-600" />
                Superficie Cubierta
              </label>
              <div className="grid grid-cols-2 gap-2">
                {factores.hogar.superficieM2.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSuperficieM2(item.id)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-semibold border transition-all text-center ${
                      superficieM2 === item.id
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {item.nombre}
                  </button>
                ))}
              </div>
            </div>

            {/* Medidas de Seguridad */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-brand-600" />
                Medidas de Seguridad Instaladas
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {factores.hogar.medidasSeguridad.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setMedidasSeguridad(item.id)}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all text-center ${
                      medidasSeguridad === item.id
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {item.nombre}
                  </button>
                ))}
              </div>
            </div>

            {/* Antigüedad de la Construcción */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-brand-600" />
                  Antigüedad de Construcción del Inmueble
                </label>
                <span className="text-xs font-black text-brand-600 bg-brand-50 border border-brand-200 px-3 py-1 rounded-lg">
                  {antiguedadInmueble === 0 ? 'A Estrenar' : `${antiguedadInmueble} ${antiguedadInmueble === 1 ? 'año' : 'años'}`}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={50}
                value={antiguedadInmueble}
                onChange={(e) => setAntiguedadInmueble(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-medium">
                <span>0 años (A estrenar)</span>
                <span>15 años (Estándar)</span>
                <span>+40 años (Antigua)</span>
              </div>
            </div>

            {/* Siniestros Hogar */}
            <div className="pt-3 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-brand-600" />
                Historial de Reclamos en Hogar (Últimos 3 años)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'cero', label: 'Sin reclamos', badge: 'Bonificación (-15%)' },
                  { id: 'uno', label: '1 reclamo', badge: 'Moderado (+15%)' },
                  { id: 'dos_o_mas', label: '2+ reclamos', badge: 'Recargo (+50%)' },
                ].map((item) => {
                  const isSelected = historialSiniestrosHogar === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setHistorialSiniestrosHogar(item.id)}
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
        )}
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
