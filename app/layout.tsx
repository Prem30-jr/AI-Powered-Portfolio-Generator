import type React from "react"
import type { Metadata, Viewport } from "next"
import { DM_Sans } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  preload: true,
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#164e63" },
    { media: "(prefers-color-scheme: dark)", color: "#0891b2" },
  ],
}

export const metadata: Metadata = {
  title: {
    default: "AI Portfolio Generator | Create Stunning Portfolios in Minutes",
    template: "%s | AI Portfolio Generator",
  },
  description:
    "Create professional portfolio websites in minutes using AI. Just describe what you need, and our intelligent system will generate a complete, customized portfolio with modern design and clean code.",
  keywords: [
    "portfolio generator",
    "AI portfolio",
    "website generator",
    "portfolio builder",
    "AI web design",
    "automatic portfolio",
    "developer portfolio",
    "portfolio creator",
    "Next.js portfolio",
    "React portfolio",
    "TypeScript portfolio",
    "portfolio template",
    "web development",
    "portfolio website",
  ],
  authors: [{ name: "AI Portfolio Generator" }],
  creator: "AI Portfolio Generator",
  publisher: "AI Portfolio Generator",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ai-portfolio-generator.com",
    siteName: "AI Portfolio Generator",
    title: "AI Portfolio Generator | Create Stunning Portfolios in Minutes",
    description:
      "Create professional portfolio websites in minutes using AI. Describe what you need and get a complete, customized portfolio with modern design.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AI Portfolio Generator - Create Stunning Portfolios in Minutes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Portfolio Generator | Create Stunning Portfolios in Minutes",
    description:
      "Create professional portfolio websites in minutes using AI. Modern design, clean code, ready to deploy.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://ai-portfolio-generator.com",
  },
  category: "technology",
  classification: "Portfolio Generator",
  generator: "Next.js",
  applicationName: "AI Portfolio Generator",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={dmSans.variable} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
          storageKey="portfolio-generator-theme"
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
