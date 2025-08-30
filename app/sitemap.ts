import type { MetadataRoute } from 'next'
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const paths = ['', '/programa','/criterios','/startups','/inversores','/portfolio','/sobre','/contacto']
  const lastModified = new Date()
  return paths.map(p => ({ url: `${base}${p}`, lastModified }))
}
