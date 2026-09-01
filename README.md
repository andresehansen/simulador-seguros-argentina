# Simulador de Seguros Argentina (SEO Programático $0 Costo)

Plataforma de simulación de cotizaciones de seguros de auto y hogar optimizada para SEO técnico programático *long-tail*, cumplimiento de estándares YMYL de Google y monetización mediante Google AdSense.

Diseñado bajo la restricción estricta de **costo de infraestructura $0 recurrente** (Next.js SSG + exportación estática HTML pura + hosting gratuito en Vercel/Cloudflare Pages).

---

## 🚀 Características Principales

1. **Calculadora Interactiva Client-Side**: Lógica reactiva sin backend que calcula cotizaciones y desglose de factores de riesgo en tiempo real.
2. **SEO Programático Automatizado**: Genera decenas o miles de páginas estáticas con URLs amigables (`/seguro-[tipo]/[ciudad]/[perfil]`), cada una con contenido único, tablas comparativas, consejos locales y Schema.org (`FAQPage` y `Service`).
3. **Cumplimiento YMYL y AdSense**:
   - Página de metodología transparente (`/como-calculamos`).
   - Glosario asegurador técnico (`/glosario-seguros`).
   - Avisos legales deontológicos de no-asesoramiento financiero en todo el sitio.
   - Componentes `<AdSlot />` modulares listos para colocar los IDs de anuncios al ser aprobada la cuenta de AdSense.
4. **Cero Dependencias de Pago**: No requiere base de datos gestionada, ni servidores activos 24/7, ni APIs externas pagas.

---

## 📁 Estructura del Proyecto

```
/
├── data/                       # BASE DE DATOS JSON ESTÁTICA
│   ├── tarifas-base.json       # Primas base de referencia por tipo de seguro y cobertura
│   ├── factores-riesgo.json    # Baremos actuariales y multiplicadores
│   ├── ciudades.json           # Ubicaciones, factor de riesgo urbano y contexto local
│   └── perfiles.json           # Perfiles demográficos para las páginas long-tail
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Layout con Header, Footer, Avisos y estilos globales
│   │   ├── page.tsx            # Página principal con el simulador interactivo
│   │   ├── seguro-[tipo]/
│   │   │   └── [ciudad]/
│   │   │       └── [perfil]/
│   │   │           └── page.tsx # Páginas programáticas generadas con generateStaticParams
│   │   ├── como-calculamos/    # Página de Metodología YMYL
│   │   ├── glosario-seguros/   # Glosario Técnico Asegurador
│   │   ├── sitemap.ts          # Generador de sitemap.xml
│   │   └── robots.ts           # Configuración de robots.txt
│   ├── components/
│   │   ├── calculator/         # Componentes de la calculadora y desglose de factores
│   │   ├── common/             # Header, Footer, DisclaimerBanner, AdSlot
│   │   └── seo/                # Componente JsonLd para datos estructurados
│   ├── lib/
│   │   ├── engine.ts           # Motor de cálculo puro determinístico en TypeScript
│   │   ├── data.ts             # Acceso tipado a los JSON de datos
│   │   └── seo.ts              # Generación dinámica de textos, FAQs y metadatos
│   └── types/                  # Definición de tipos e interfaces TypeScript
├── public/                     # Archivos estáticos y favicon
└── next.config.mjs             # Configuración de Next.js (output: 'export')
```

---

## ⚙️ Cómo Escalar el Contenido (Agregar Ciudades y Perfiles)

El sistema está diseñado para que **no tengas que tocar código TypeScript** al momento de agregar nuevas combinaciones. Todo se maneja editando los archivos en `/data/`.

### 1. Agregar una Nueva Ciudad
Abrí `data/ciudades.json` y agregá un nuevo objeto al array:

```json
{
  "slug": "mar-del-plata",
  "nombre": "Mar del Plata",
  "provincia": "Buenos Aires",
  "factorRiesgoUrbano": 1.15,
  "indiceRobo": "Medio",
  "climaExtremoRiesgo": "Vientos Costeros y Salinidad",
  "consejoLocal": "En zonas costeras es importante verificar la cobertura ante corrosión y rotura de parabrisas por tormentas de viento.",
  "estadisticaLocal": "Presenta una mayor afluencia vehicular en temporada estival."
}
```

### 2. Agregar un Nuevo Perfil de Conductor
Abrí `data/perfiles.json` y agregá un nuevo perfil:

```json
{
  "slug": "conductor-comercial-ligero",
  "nombre": "Conductor Profesional Independiente",
  "edad": 32,
  "antiguedadLicenciaAnios": 8,
  "historialSiniestros": "cero",
  "antiguedadVehiculoAnios": 3,
  "descripcionPerfil": "Conductores autónomos o profesionales que utilizan su vehículo particular para traslados comerciales frecuentes.",
  "factoresClave": ["Uso intensivo en áreas urbanas", "Alto kilometraje anual", "Mayor exposición horaria"]
}
```

Al ejecutar `npm run build`, Next.js automáticamente detectará las nuevas ciudades y perfiles, multiplicará las combinaciones (`ciudades × perfiles × tipos`), generará sus páginas HTML estáticas y las agregará al `sitemap.xml`.

---

## 🛠️ Comandos de Desarrollo y Compilación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo local
npm run dev

# Compilar y exportar el sitio 100% estático (a la carpeta /out)
npm run build
```

---

## 🌐 Despliegue en Vercel / Cloudflare Pages ($0 Costo)

### En Vercel:
1. Conectá tu repositorio de GitHub a tu cuenta gratuita de Vercel.
2. Vercel detectará el framework Next.js automáticamente.
3. El comando de build por defecto (`next build`) generará la exportación estática sin costo de computación de servidor.

### En Cloudflare Pages:
1. Creá un nuevo proyecto en Cloudflare Pages conectado al repositorio.
2. **Build command**: `npm run build`
3. **Build output directory**: `out`

---

## 💰 Monetización con Google AdSense

1. Modificá `src/components/common/AdSlot.tsx` reemplazando `adClient="ca-pub-0000000000000000"` por tu identificador real de publicador de AdSense.
2. En `src/app/layout.tsx`, una vez que tu cuenta esté aprobada, podés agregar el script oficial de AdSense en el `<head>`.
