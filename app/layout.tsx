import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GreyRock Venture Studio',
  description: 'Construimos y escalamos startups desde Tandil.',
  openGraph: {
    title: 'GreyRock Venture Studio',
    description: 'Construimos y escalamos startups desde Tandil.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    siteName: 'GreyRock',
    images: [{ url: '/img/og.jpg', width: 1200, height: 630 }],
    locale: 'es_AR',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GreyRock Venture Studio',
    description: 'Construimos y escalamos startups desde Tandil.',
    images: ['/img/og.jpg']
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-dvh">{children}</body>
    </html>
  )
}
