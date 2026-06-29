import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { JsonLd, getBandSchema, getWebsiteSchema } from '@/lib/structured-data'
import './globals.css'

// Load fonts with display swap for better performance
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
})

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0a0a0a' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://queenlesskings.com'),
  title: {
    default: 'Queenless Kings - Official Website',
    template: '%s | Queenless Kings',
  },
  description: 'Official website of Queenless Kings - Experience our music, upcoming events, and exclusive content.',
  keywords: ['Queenless Kings', 'band', 'music', 'events', 'concerts', 'rock', 'alternative rock', 'live performances'],
  authors: [{ name: 'Queenless Kings' }],
  creator: 'Queenless Kings',
  publisher: 'Queenless Kings',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Queenless Kings - Official Website',
    description: 'Official website of Queenless Kings - Experience our music, upcoming events, and exclusive content.',
    url: '/',
    siteName: 'Queenless Kings',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Queenless Kings - Official Website',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Queenless Kings - Official Website',
    description: 'Official website of Queenless Kings - Experience our music, upcoming events, and exclusive content.',
    images: ['/og-image.jpg'],
    creator: '@queenlesskings',
  },
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
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
  },
  alternates: {
    canonical: '/',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head>
        {/* Preconnect to external services for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.spotify.com" />
        {/* Favicon */}
        <link rel="icon" href="/qk-favicon.png" type="image/png" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/qk-logo-web.png" />
        <link rel="manifest" href="/manifest.json" />
        {/* Structured Data */}
        <JsonLd data={getBandSchema()} />
        <JsonLd data={getWebsiteSchema()} />
      </head>
      <body className="font-sans antialiased bg-background-primary text-white min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
