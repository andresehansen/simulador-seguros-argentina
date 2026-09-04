import { MetadataRoute } from 'next';
import { getCiudades, getPerfiles } from '@/lib/data';
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
    {
      url: `${baseUrl}/politica-de-privacidad`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  const ciudades = getCiudades();
  const perfilesAuto = getPerfiles('auto');
  const perfilesHogar = getPerfiles('hogar');

  const programmaticRoutes: MetadataRoute.Sitemap = [];

  for (const ciudad of ciudades) {
    for (const perfil of perfilesAuto) {
      programmaticRoutes.push({
        url: `${baseUrl}/seguro-auto/${ciudad.slug}/${perfil.slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.9,
      });
    }
    for (const perfil of perfilesHogar) {
      programmaticRoutes.push({
        url: `${baseUrl}/seguro-hogar/${ciudad.slug}/${perfil.slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.9,
      });
    }
  }

  return [...staticRoutes, ...programmaticRoutes];
}
