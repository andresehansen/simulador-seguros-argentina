import fs from 'node:fs';
import path from 'node:path';

// Cargar JSONs directamente
const tarifas = JSON.parse(fs.readFileSync(path.resolve('./data/tarifas-base.json'), 'utf-8'));
const factores = JSON.parse(fs.readFileSync(path.resolve('./data/factores-riesgo.json'), 'utf-8'));
const ciudades = JSON.parse(fs.readFileSync(path.resolve('./data/ciudades.json'), 'utf-8'));
const perfiles = JSON.parse(fs.readFileSync(path.resolve('./data/perfiles.json'), 'utf-8'));

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

// 1. Validar integridad de datos
assert(ciudades.length >= 5, `Al menos 5 ciudades cargadas (Actual: ${ciudades.length})`);
assert(perfiles.length >= 4, `Al menos 4 perfiles cargados (Actual: ${perfiles.length})`);
assert(tarifas.auto && tarifas.hogar, 'Tarifas base presentes para Auto y Hogar');
assert(factores.auto && factores.hogar, 'Factores presentes para Auto y Hogar');

// 2. Probar consistencia de cálculo en todas las ciudades y perfiles para AUTO
console.log('\n🚗 Verificando consistencia en pólizas de Automóvil...');
for (const ciudad of ciudades) {
  for (const perfil of perfiles) {
    const edadMatch = factores.auto.rangoEdad.find((i) => perfil.edad >= i.min && perfil.edad <= i.max) || { multiplicador: 1.0 };
    const licenciaMatch = factores.auto.antiguedadLicenciaAnios.find((i) => perfil.antiguedadLicenciaAnios >= i.min && perfil.antiguedadLicenciaAnios <= i.max) || { multiplicador: 1.0 };
    const siniestroMatch = factores.auto.historialSiniestros.find((i) => i.id === perfil.historialSiniestros) || { multiplicador: 1.0 };
    const vehiculoMatch = factores.auto.antiguedadVehiculoAnios.find((i) => perfil.antiguedadVehiculoAnios >= i.min && perfil.antiguedadVehiculoAnios <= i.max) || { multiplicador: 1.0 };
    
    const factorEsperado = Number((edadMatch.multiplicador * licenciaMatch.multiplicador * siniestroMatch.multiplicador * vehiculoMatch.multiplicador * ciudad.factorRiesgoUrbano).toFixed(2));
    
    assert(!isNaN(factorEsperado) && factorEsperado > 0, `Auto: Factor válido para ${ciudad.slug} + ${perfil.slug} (${factorEsperado}x)`);
  }
}

// 3. Probar que en HOGAR no existan términos vehiculares en los factores
console.log('\n🏠 Verificando consistencia y ausencia de términos vehiculares en Hogar...');
for (const prop of factores.hogar.tipoPropiedad) {
  const containsVehicleTerm = /vehículo|auto|licencia|conductor/i.test(prop.nombre + ' ' + prop.etiqueta);
  assert(!containsVehicleTerm, `TipoPropiedad '${prop.id}' libre de términos vehiculares`);
}

for (const sec of factores.hogar.medidasSeguridad) {
  const containsVehicleTerm = /vehículo|auto|licencia|conductor/i.test(sec.nombre + ' ' + sec.etiqueta);
  assert(!containsVehicleTerm, `MedidasSeguridad '${sec.id}' libre de términos vehiculares`);
}

for (const sup of factores.hogar.superficieM2) {
  const containsVehicleTerm = /vehículo|auto|licencia|conductor/i.test(sup.nombre + ' ' + sup.etiqueta);
  assert(!containsVehicleTerm, `Superficie '${sup.id}' libre de términos vehiculares`);
}

for (const ant of factores.hogar.antiguedadInmuebleAnios) {
  const containsVehicleTerm = /vehículo|auto|licencia|conductor/i.test(ant.etiqueta);
  assert(!containsVehicleTerm, `AntiguedadInmueble [${ant.min}-${ant.max}] libre de términos vehiculares`);
}

console.log(`\n========================================`);
console.log(`Resumen: ${passedTests} pruebas pasadas, ${failedTests} falladas.`);
console.log(`========================================\n`);

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
