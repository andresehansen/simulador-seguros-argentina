import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { DisclaimerBanner } from '@/components/common/DisclaimerBanner';

export const metadata: Metadata = {
  title: 'Simulador de Seguros Argentina | Cotizador Interactivo de Coberturas y Tarifas',
  description:
    'Simulá y compará el costo estimado de seguros de automóvil y hogar según tu ciudad, edad y perfil de riesgo. Herramienta gratuita e informativa.',
  metadataBase: new URL('https://simulador-seguros.vercel.app'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col antialiased">
        <DisclaimerBanner />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
