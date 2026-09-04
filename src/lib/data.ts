import tarifasBaseData from '@data/tarifas-base.json';
import factoresRiesgoData from '@data/factores-riesgo.json';
import ciudadesData from '@data/ciudades.json';
import perfilesData from '@data/perfiles.json';

import {
  TarifasBaseMap,
  FactoresRiesgo,
  CiudadItem,
  PerfilItem,
  PerfilesData,
  TipoSeguro,
} from '@/types';

export function getTarifasBase(): TarifasBaseMap {
  return tarifasBaseData as TarifasBaseMap;
}

export function getFactoresRiesgo(): FactoresRiesgo {
  return factoresRiesgoData as FactoresRiesgo;
}

export function getCiudades(): CiudadItem[] {
  return ciudadesData as CiudadItem[];
}

export function getPerfiles(tipo?: TipoSeguro): PerfilItem[] {
  const data = perfilesData as PerfilesData;
  if (tipo === 'auto') return data.auto;
  if (tipo === 'hogar') return data.hogar;
  return [...data.auto, ...data.hogar];
}

export function getCiudadBySlug(slug: string): CiudadItem | undefined {
  return getCiudades().find((c) => c.slug.toLowerCase() === slug.toLowerCase());
}

export function getPerfilBySlug(slug: string, tipo?: TipoSeguro): PerfilItem | undefined {
  const perfiles = getPerfiles(tipo);
  return perfiles.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
}
