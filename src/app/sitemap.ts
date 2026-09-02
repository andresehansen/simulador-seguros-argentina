import { MetadataRoute } from 'next';
import { getCiudades, getPerfiles } from '@/lib/data';
import { TipoSeguro } from '@/types';
import { SITE_URL } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL.replace(/\/$/, '');
  const currentDate = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/sobre-nosotros`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/como-calculamos`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/glosario-seguros`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  const tipos: TipoSeguro[] = ['auto', 'hogar'];
  const ciudades = getCiudades();
  const perfiles = getPerfiles();

  const programmaticRoutes: MetadataRoute.Sitemap = [];

  for (const tipo of tipos) {
    for (const ciudad of ciudades) {
      for (const perfil of perfiles) {
        programmaticRoutes.push({
          url: `${baseUrl}/seguro-${tipo}/${ciudad.slug}/${perfil.slug}`,
          lastModified: currentDate,
          changeFrequency: 'weekly',
          priority: 0.9,
        });
      }
    }
  }

  return [...staticRoutes, ...programmaticRoutes];
}
