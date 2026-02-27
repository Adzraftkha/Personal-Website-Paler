import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Navbar } from '@/components/navbar'
import { DesktopPageNav } from '@/components/desktop-page-nav'
import { Footer } from '@/components/footer'

import { ThemeProvider } from '@/components/theme-provider'
import { SystemThemeSync } from '@/components/system-theme-sync'

import { Toaster } from 'sonner'
import './globals.css'

const _geistSans = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Farell Elghifari Putratama - Professional Portfolio',
  description:
    'Professional portfolio showcasing multidisciplinary engineering expertise, business leadership, and research contributions',
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
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased w-full overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
        >
          {/* 🔥 AUTO FOLLOW SYSTEM (kecuali user override) */}
          <SystemThemeSync />

          <Navbar />
          <DesktopPageNav />

          <main className="w-full h-full top-0 bg-transparent">
            {children}
          </main>

          <div className="absolute inset-0 -z-1 overflow-hidden">
            <div className="absolute top-30 left-1/18 h-96 w-96 rounded-full bg-primary/20 blur-3xl dark:bg-primary/5" />
            <div className="absolute top-50 right-180 h-96 w-96 rounded-full bg-primary/20 blur-3xl dark:bg-primary/5" />
            <div className="absolute top-1/4 right-1/8 h-96 w-96 rounded-full bg-primary/20 blur-3xl dark:bg-primary/5" />
            <div className="absolute top-1/2 left-1/6 h-96 w-96 rounded-full bg-primary/20 blur-3xl dark:bg-primary/5" />
            <div className="absolute bottom-1/6 right-1/6 h-100 w-100 rounded-full bg-primary/15 blur-3xl dark:bg-primary/5" />
          </div>

          <Footer />
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}