import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/area-padres/', '/admin/', '/api/', '/auth/'],
      },
    ],
    sitemap: 'https://atlantissincro.com/sitemap.xml',
  };
}
