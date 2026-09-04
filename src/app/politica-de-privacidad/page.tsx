import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Lock, Cookie, FileText, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Política de Privacidad y Cookies | SeguroSimulador Argentina',
  description:
    'Conocé cómo protegemos tu privacidad, el procesamiento local de datos en nuestro simulador y el uso de cookies publicitarias de Google AdSense.',
};

export default function PoliticaPrivacidadPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200 mb-3">
          <Lock className="w-3.5 h-3.5" />
          Transparencia y Seguridad de Datos
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Política de Privacidad y Cookies
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
          Última actualización: Septiembre de 2026. Esta política describe cómo se tratan los datos, el funcionamiento técnico de nuestra herramienta y las normas de publicidad aplicadas en <strong>SeguroSimulador Argentina</strong>.
        </p>
      </div>

      <div className="space-y-8 text-sm text-slate-700 leading-relaxed">
        {/* 1. Compromiso General y Ley 25.326 */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-3 text-slate-900 font-bold text-lg">
            <ShieldCheck className="w-5 h-5 text-brand-600" />
            <h2>1. Compromiso de Privacidad y Ley Aplicable</h2>
          </div>
          <p className="mb-3">
            En <strong>SeguroSimulador Argentina</strong> (accesible desde <code>simulador-seguros-argentina.vercel.app</code>), la privacidad de nuestros usuarios es una prioridad absoluta. Nuestras prácticas se rigen conforme a la <strong>Ley N° 25.326 de Protección de los Datos Personales</strong> de la República Argentina y las directrices internacionales de navegación segura.
          </p>
          <p>
            No solicitamos, no recopilamos ni almacenamos datos personales identificables como nombres completos, números de DNI, domicilios exactos, números de teléfono, correos electrónicos ni información bancaria o de tarjetas de crédito.
          </p>
        </section>

        {/* 2. Tratamiento de Datos en el Simulador */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-3 text-slate-900 font-bold text-lg">
            <Lock className="w-5 h-5 text-emerald-600" />
            <h2>2. Procesamiento Local de Variables de Cálculo</h2>
          </div>
          <p className="mb-3">
            Los parámetros que seleccionás en nuestra calculadora interactiva (tales como tramo de edad, provincia/ciudad, segmento de vehículo, superficie cubierta o medidas de seguridad) son procesados <strong>exclusivamente en el navegador de tu dispositivo (client-side)</strong> mediante código TypeScript en tiempo real.
          </p>
          <p>
            Dichos datos jamás son enviados a servidores externos ni quedan registrados en bases de datos de perfiles comerciales. Al cerrar o recargar la pestaña del navegador, los valores ingresados se reinician automáticamente.
          </p>
        </section>

        {/* 3. Cookies Publicitarias y Google AdSense (OBLIGATORIO ADSENSE) */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-3 text-slate-900 font-bold text-lg">
            <Cookie className="w-5 h-5 text-amber-600" />
            <h2>3. Cookies de Terceros y Publicidad de Google AdSense</h2>
          </div>
          <p className="mb-3">
            Para mantener este servicio 100% gratuito y de libre acceso sin muros de pago ni suscripciones pagas, el sitio web utiliza la red de publicidad digital de <strong>Google AdSense</strong>. Al respecto, informamos explícitamente lo siguiente:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4 text-xs sm:text-sm text-slate-600">
            <li>
              <strong>Proveedores de terceros:</strong> Proveedores externos, incluido Google, utilizan cookies para publicar anuncios basados en las visitas anteriores del usuario a este sitio web o a otros sitios de Internet.
            </li>
            <li>
              <strong>Cookies publicitarias de Google:</strong> El uso de cookies publicitarias permite a Google y a sus socios comerciales mostrar anuncios a los usuarios en función de sus visitas a este y otros sitios en la web.
            </li>
            <li>
              <strong>Control y exclusión de anuncios personalizados:</strong> Los usuarios pueden inhabilitar voluntariamente la publicidad personalizada ingresando a la configuración de anuncios de Google en{' '}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 hover:underline font-semibold inline-flex items-center gap-0.5"
              >
                Configuración de Anuncios de Google
                <ExternalLink className="w-3 h-3" />
              </a>
              . Alternativamente, los usuarios pueden optar por no recibir cookies de proveedores externos para publicidad personalizada visitando{' '}
              <a
                href="https://www.aboutads.info"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 hover:underline font-semibold inline-flex items-center gap-0.5"
              >
                www.aboutads.info
                <ExternalLink className="w-3 h-3" />
              </a>
              .
            </li>
          </ul>
          <p className="text-xs text-slate-500 bg-slate-50 p-4 rounded-xl border border-slate-100">
            También podés configurar tu navegador web (Google Chrome, Mozilla Firefox, Safari o Microsoft Edge) para bloquear o eliminar las cookies en cualquier momento a través de las opciones de configuración de privacidad de tu navegador.
          </p>
        </section>

        {/* 4. Archivos de Registro (Log Files) y Analítica */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-3 text-slate-900 font-bold text-lg">
            <FileText className="w-5 h-5 text-indigo-600" />
            <h2>4. Archivos de Registro y Métricas de Rendimiento</h2>
          </div>
          <p className="mb-3">
            Al igual que la gran mayoría de los sitios web estáticos de alto rendimiento, nuestra infraestructura de alojamiento (Vercel) puede recopilar automáticamente información técnica estándar no identificable, tal como:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 mb-3 text-xs sm:text-sm text-slate-600">
            <li>Tipo y versión de navegador web utilizado.</li>
            <li>Sistema operativo del dispositivo.</li>
            <li>Páginas solicitadas y fecha/hora de acceso.</li>
            <li>Páginas de referencia/salida para fines de monitoreo de disponibilidad técnica.</li>
          </ul>
          <p>
            Estos datos se utilizan de manera agregada y anónima exclusivamente para asegurar el correcto funcionamiento, velocidad y seguridad técnica del servidor.
          </p>
        </section>

        {/* 5. Enlaces a Sitios de Terceros */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <h2 className="text-slate-900 font-bold text-lg mb-3">5. Enlaces Externos y Fuentes Oficiales</h2>
          <p className="mb-3">
            Nuestro portal incluye hipervínculos a fuentes oficiales regulatorias de la República Argentina (como la Superintendencia de Seguros de la Nación — SSN, CESVI Argentina, INDEC o el Servicio Meteorológico Nacional).
          </p>
          <p>
            SeguroSimulador no tiene control ni asume responsabilidad sobre las políticas de privacidad, términos o contenidos de dichos sitios externos. Recomendamos leer detenidamente las políticas de cada sitio web que visites.
          </p>
        </section>

        {/* 6. Contacto del Responsable */}
        <section className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800">
          <h2 className="text-lg font-bold mb-2">6. Contacto y Consultas</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
            Si tenés preguntas, sugerencias o inquietudes referidas a esta Política de Privacidad o al funcionamiento técnico de la plataforma, podés ponerte en contacto a través de nuestro repositorio público oficial:
          </p>
          <a
            href="https://github.com/andresehansen/simulador-seguros-argentina"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-400 hover:text-brand-300 underline"
          >
            Repositorio Oficial en GitHub: andresehansen/simulador-seguros-argentina
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </section>
      </div>

      {/* Botón de Retorno */}
      <div className="mt-10 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-brand-600 hover:text-brand-800 bg-brand-50 hover:bg-brand-100 px-5 py-2.5 rounded-xl transition"
        >
          ← Volver al Simulador Principal
        </Link>
      </div>
    </div>
  );
}
