export type TipoSeguro = 'auto' | 'hogar';

export interface CoberturaItem {
  id: string;
  nombre: string;
  multiplicador: number;
  descripcion: string;
}

export interface TarifaBaseItem {
  nombre: string;
  descripcion: string;
  baseMensual: number;
  coberturas: CoberturaItem[];
}

export type TarifasBaseMap = Record<TipoSeguro, TarifaBaseItem>;

export interface RangoEdadItem {
  min: number;
  max: number;
  multiplicador: number;
  etiqueta: string;
  impacto: string;
}

export interface AntiguedadLicenciaItem {
  min: number;
  max: number;
  multiplicador: number;
  etiqueta: string;
  impacto: string;
}

export interface HistorialSiniestrosItem {
  id: string;
  multiplicador: number;
  etiqueta: string;
  impacto: string;
}

export interface AntiguedadVehiculoItem {
  min: number;
  max: number;
  multiplicador: number;
  etiqueta: string;
  impacto: string;
}

export interface FactoresRiesgo {
  rangoEdad: RangoEdadItem[];
  antiguedadLicenciaAnios: AntiguedadLicenciaItem[];
  historialSiniestros: HistorialSiniestrosItem[];
  antiguedadVehiculoAnios: AntiguedadVehiculoItem[];
}

export interface CiudadItem {
  slug: string;
  nombre: string;
  provincia: string;
  factorRiesgoUrbano: number;
  indiceRobo: string;
  climaExtremoRiesgo: string;
  consejoLocal: string;
  estadisticaLocal: string;
}

export interface PerfilItem {
  slug: string;
  nombre: string;
  edad: number;
  antiguedadLicenciaAnios: number;
  historialSiniestros: string;
  antiguedadVehiculoAnios: number;
  descripcionPerfil: string;
  factoresClave: string[];
}

export interface CalculationInput {
  tipoSeguro: TipoSeguro;
  edad: number;
  antiguedadLicenciaAnios: number;
  historialSiniestros: string;
  antiguedadVehiculoAnios: number;
  ciudadSlug: string;
}

export interface FactorImpact {
  nombreFactor: string;
  multiplicador: number;
  porcentajeVariacion: number;
  etiqueta: string;
  impactoTexto: string;
}

export interface CoberturaEstimada {
  id: string;
  nombre: string;
  descripcion: string;
  estimadoMin: number;
  estimadoMax: number;
  estimadoPromedio: number;
}

export interface CalculationResult {
  tipoSeguro: TipoSeguro;
  ciudad: CiudadItem;
  rangoMontoTotal: {
    min: number;
    max: number;
    promedio: number;
  };
  factorGlobalMultiplicador: number;
  desgloseFactores: FactorImpact[];
  coberturasEstimadas: CoberturaEstimada[];
}
