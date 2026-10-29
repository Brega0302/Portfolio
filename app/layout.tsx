import React from "react"
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LanguageProvider } from '@/src/context/language-context'
import './globals.css'

const inter = Inter({ subsets: ["latin", "latin-ext"], variable: '--font-inter', display: 'swap' });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: '--font-jetbrains', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://adinbrkic.netlify.app'),
  title: 'Adin Brkić | Software Engineering Portfolio',
  description: 'Software Engineering student at IUS, building practical web applications and looking for an internship. Explore Lens Caffe System, gradanski.ba and independent projects.',
  alternates: { canonical: '/' },
  keywords: ['software engineer', 'web developer', 'systems programming', 'React', 'Next.js', 'portfolio'],
  authors: [{ name: 'Adin Brkic' }],
  openGraph: {
    title: 'Adin Brkić | Software Engineering Portfolio',
    description: 'Practical web applications, systems projects and independent publishing. Open to software development internships.',
    type: 'website',
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
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
