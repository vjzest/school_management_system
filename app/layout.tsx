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
  themeColor: '#27598C',
}

export const metadata: Metadata = {
  title: {
    default: 'Royal Public School | Teaching Kids Excellence',
    template: '%s | Royal Public School'
  },
  description: 'Royal Public School is a premier CBSE-affiliated institution dedicated to academic excellence, character building, and holistic student development. Admissions open for 2025–26.',
  keywords: ['Royal Public School', 'CBSE school', 'best school', 'school admissions', 'primary school', 'secondary school', 'education', 'academic excellence'],
  authors: [{ name: 'Royal Public School' }],
  creator: 'Royal Public School',
  publisher: 'Royal Public School',
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
    locale: 'en_IN',
    url: 'https://royalpublicschool.edu.in',
    title: 'Royal Public School | Teaching Kids Excellence',
    description: 'A premier CBSE-affiliated school offering world-class education and holistic development for grades Nursery to XII.',
    siteName: 'Royal Public School',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Royal Public School Campus',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Royal Public School',
    description: 'A premier CBSE school dedicated to Teaching Kids Excellence.',
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
