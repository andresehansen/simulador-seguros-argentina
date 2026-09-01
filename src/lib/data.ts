import tarifasBaseData from '@data/tarifas-base.json';
import factoresRiesgoData from '@data/factores-riesgo.json';
import ciudadesData from '@data/ciudades.json';
import perfilesData from '@data/perfiles.json';

import {
  TarifasBaseMap,
  FactoresRiesgo,
  CiudadItem,
  PerfilItem,
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

export function getPerfiles(): PerfilItem[] {
  return perfilesData as PerfilItem[];
}

export function getCiudadBySlug(slug: string): CiudadItem | undefined {
  return getCiudades().find((c) => c.slug.toLowerCase() === slug.toLowerCase());
}

export function getPerfilBySlug(slug: string): PerfilItem | undefined {
  return getPerfiles().find((p) => p.slug.toLowerCase() === slug.toLowerCase());
}
