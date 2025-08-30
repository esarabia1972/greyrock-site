# GreyRock Site (Next.js)

Base creada automáticamente el 2025-08-30.
Incluye: Next 14, Tailwind, MDX, sitemap/robots y páginas iniciales.

## Requisitos
- Node 18+

## Setup
```bash
npm install
npm run dev
```

## Estructura
- `app/` — App Router (Home, programa, criterios, startups, inversores, portfolio, sobre, contacto)
- `components/ui` — componentes reutilizables (copiados de shadcn del borrador MGX)
- `public/img` — assets importados del zip

## Variables
- `NEXT_PUBLIC_SITE_URL` — URL pública del sitio

## TODO
- Reemplazar iframe de contacto por tu formulario/CRM.
- Ajustar copy y secciones.
- Agregar seguimiento (GA4/GTM) con consentimiento.
