// app/sitemap.ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const now = new Date();

  const pages = [
    "",               // /
    "programa",
    "criterios",
    "startups",
    "inversores",
    "portfolio",
    "sobre",
    "contacto",
  ];

  return pages.map((p) => ({
    url: `${base}/${p}`,
    lastModified: now,
    changeFrequency: p ? "monthly" : "weekly",
    priority: p ? 0.7 : 1,
  }));
}
