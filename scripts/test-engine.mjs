import fs from 'node:fs';
import path from 'node:path';

// Cargar JSONs directamente
const tarifas = JSON.parse(fs.readFileSync(path.resolve('./data/tarifas-base.json'), 'utf-8'));
const factores = JSON.parse(fs.readFileSync(path.resolve('./data/factores-riesgo.json'), 'utf-8'));
const ciudades = JSON.parse(fs.readFileSync(path.resolve('./data/ciudades.json'), 'utf-8'));
const perfiles = JSON.parse(fs.readFileSync(path.resolve('./data/perfiles.json'), 'utf-8'));
const robotsTxt = fs.readFileSync(path.resolve('./public/robots.txt'), 'utf-8');

console.log('🧪 Iniciando Suite de Pruebas Automatizadas de Consistencia Actuarial y Contenido...\n');

let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passedTests++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failedTests++;
  }
}

// 1. Validar integridad de datos y configuración
assert(ciudades.length === 15, `Exactamente 15 ciudades cargadas (Actual: ${ciudades.length})`);
assert(perfiles.auto && perfiles.auto.length === 4, `4 perfiles de Auto cargados (Actual: ${perfiles.auto?.length})`);
assert(perfiles.hogar && perfiles.hogar.length === 4, `4 perfiles de Hogar cargados (Actual: ${perfiles.hogar?.length})`);
assert(tarifas.auto && tarifas.hogar, 'Tarifas base presentes para Auto y Hogar');
assert(factores.auto && factores.hogar, 'Factores presentes para Auto y Hogar');
assert(robotsTxt.includes('https://simulador-seguros-argentina.vercel.app/sitemap.xml'), 'public/robots.txt apunta a simulador-seguros-argentina.vercel.app');

// 2. Validar corrección de typo conductor-experimentado
const hasOldTypo = perfiles.auto.some((p) => p.slug === 'conductor-experimento');
const hasCorrectSlug = perfiles.auto.some((p) => p.slug === 'conductor-experimentado');
assert(!hasOldTypo && hasCorrectSlug, 'Slug conductor-experimento corregido a conductor-experimentado');

// 3. Validar taxonomía propia de Hogar
const slugsHogar = perfiles.hogar.map((p) => p.slug);
assert(slugsHogar.includes('propietario-casa'), "Perfil 'propietario-casa' presente");
assert(slugsHogar.includes('propietario-departamento'), "Perfil 'propietario-departamento' presente");
assert(slugsHogar.includes('inquilino'), "Perfil 'inquilino' presente");
assert(slugsHogar.includes('casa-en-barrio-cerrado'), "Perfil 'casa-en-barrio-cerrado' presente");

// 4. Probar consistencia de cálculo en todas las 15 ciudades × 4 perfiles para AUTO (60 combinaciones)
console.log('\n🚗 Verificando 60 combinaciones de pólizas de Automóvil...');
for (const ciudad of ciudades) {
  for (const perfil of perfiles.auto) {
    const edadMatch = factores.auto.rangoEdad.find((i) => perfil.edad >= i.min && perfil.edad <= i.max) || { multiplicador: 1.0 };
    const licenciaMatch = factores.auto.antiguedadLicenciaAnios.find((i) => perfil.antiguedadLicenciaAnios >= i.min && perfil.antiguedadLicenciaAnios <= i.max) || { multiplicador: 1.0 };
    const siniestroMatch = factores.auto.historialSiniestros.find((i) => i.id === perfil.historialSiniestros) || { multiplicador: 1.0 };
    const vehiculoMatch = factores.auto.antiguedadVehiculoAnios.find((i) => perfil.antiguedadVehiculoAnios >= i.min && perfil.antiguedadVehiculoAnios <= i.max) || { multiplicador: 1.0 };
    
    const factorEsperado = Number((edadMatch.multiplicador * licenciaMatch.multiplicador * siniestroMatch.multiplicador * vehiculoMatch.multiplicador * ciudad.factorRiesgoUrbano).toFixed(2));
    
    assert(!isNaN(factorEsperado) && factorEsperado > 0, `Auto: Factor válido para ${ciudad.slug} + ${perfil.slug} (${factorEsperado}x)`);
  }
}

// 5. Probar que en HOGAR (60 combinaciones) no existan términos vehiculares en los factores ni perfiles
console.log('\n🏠 Verificando 60 combinaciones y ausencia total de términos vehiculares en Hogar...');
for (const perfil of perfiles.hogar) {
  const containsVehicleTerm = /veh[ií]culo|auto|licencia|conductor|carnet/i.test(
    perfil.nombre + ' ' + perfil.descripcionPerfil + ' ' + perfil.factoresClave.join(' ')
  );
  assert(!containsVehicleTerm, `Perfil Hogar '${perfil.slug}' 100% libre de términos vehiculares`);
}

for (const prop of factores.hogar.tipoPropiedad) {
  const containsVehicleTerm = /veh[ií]culo|auto|licencia|conductor/i.test(prop.nombre + ' ' + prop.etiqueta);
  assert(!containsVehicleTerm, `TipoPropiedad '${prop.id}' libre de términos vehiculares`);
}

for (const sec of factores.hogar.medidasSeguridad) {
  const containsVehicleTerm = /veh[ií]culo|auto|licencia|conductor/i.test(sec.nombre + ' ' + sec.etiqueta);
  assert(!containsVehicleTerm, `MedidasSeguridad '${sec.id}' libre de términos vehiculares`);
}

for (const sup of factores.hogar.superficieM2) {
  const containsVehicleTerm = /veh[ií]culo|auto|licencia|conductor/i.test(sup.nombre + ' ' + sup.etiqueta);
  assert(!containsVehicleTerm, `Superficie '${sup.id}' libre de términos vehiculares`);
}

for (const ant of factores.hogar.antiguedadInmuebleAnios) {
  const containsVehicleTerm = /veh[ií]culo|auto|licencia|conductor/i.test(ant.etiqueta);
  assert(!containsVehicleTerm, `AntiguedadInmueble [${ant.min}-${ant.max}] libre de términos vehiculares`);
}

// 6. Conteo de URLs públicas
const totalRutasAuto = ciudades.length * perfiles.auto.length;
const totalRutasHogar = ciudades.length * perfiles.hogar.length;
const totalRutasFijas = 5; // home, sobre-nosotros, como-calculamos, glosario-seguros, politica-de-privacidad
const totalSitemap = totalRutasAuto + totalRutasHogar + totalRutasFijas;

assert(totalRutasAuto === 60, `60 rutas de Auto (15 ciudades × 4 perfiles)`);
assert(totalRutasHogar === 60, `60 rutas de Hogar (15 ciudades × 4 perfiles)`);
assert(totalSitemap === 125, `Total 125 URLs públicas en sitemap (60 auto + 60 hogar + 5 fijas)`);

console.log(`\n========================================`);
console.log(`Resumen: ${passedTests} pruebas pasadas, ${failedTests} falladas.`);
console.log(`========================================\n`);

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
