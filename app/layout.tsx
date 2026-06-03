import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0B1B4D',
}

export const metadata: Metadata = {
  title: {
    default: 'Global Excellence Academy | Premium EdTech Platform',
    template: '%s | Global Excellence Academy'
  },
  description: 'A prestigious institution dedicated to academic excellence, holistic student development, and shaping the global leaders of tomorrow. Master practical skills with top-tier education.',
  keywords: ['school management', 'education', 'learning platform', 'academic excellence', 'EdTech', 'student portal', 'online education'],
  authors: [{ name: 'Global Excellence Academy' }],
  creator: 'Global Excellence Academy',
  publisher: 'Global Excellence Academy',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://globalexcellence.edu',
    title: 'Global Excellence Academy | Premium EdTech Platform',
    description: 'Experience world-class education designed to accelerate your career. Join a thriving professional community.',
    siteName: 'Global Excellence Academy',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Global Excellence Academy Campus',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Global Excellence Academy',
    description: 'Experience world-class education designed to accelerate your career.',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
