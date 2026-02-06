import React from "react"
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LanguageProvider } from '@/src/context/language-context'
import { GoldenParticles } from '@/src/components/ui/golden-particles'
import './globals.css'

const _inter = Inter({ subsets: ["latin"] });
const _jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Adin Brkic | Software Engineer',
  description: 'Software Engineer specializing in systems programming, simulations, and web engineering. View my portfolio with interactive 3D elements and explore my projects.',
  keywords: ['software engineer', 'web developer', 'systems programming', 'React', 'Next.js', 'portfolio'],
  authors: [{ name: 'Adin Brkic' }],
  openGraph: {
    title: 'Adin Brkic | Software Engineer',
    description: 'Software Engineer specializing in systems programming, simulations, and web engineering.',
    type: 'website',
  },
  generator: 'v0.app',
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
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <GoldenParticles />
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
