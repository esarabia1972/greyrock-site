// app/layout.tsx
import type { Metadata } from "next";
import "@/styles/globals.css"; // <- ESTE IMPORT ACTIVA TUS ESTILOS

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: "GreyRock Venture Studio", template: "%s — GreyRock" },
  description:
    "Venture studio en Tandil. Seleccionamos, co-creamos y escalamos startups B2B con validación en territorio.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "GreyRock",
    title: "GreyRock Venture Studio",
    description:
      "Construimos en territorio, escalamos con datos. Programa en 3 etapas: MVP, revenue, escala.",
    images: [{ url: "/img/og.jpg", width: 1200, height: 630, alt: "GreyRock" }],
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "GreyRock Venture Studio",
    description:
      "Seleccionamos, co-creamos y escalamos startups B2B con validación en territorio.",
    images: ["/img/og.jpg"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
