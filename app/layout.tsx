import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import "./scroll-animations.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ErrorBoundary } from "@/components/error-boundary"
import { ToastProvider } from "@/components/toast-provider"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Urban Style - Moda Urbana Minimalista",
    template: "%s | Urban Style",
  },
  description:
    "Descubre nuestra colección de ropa urbana minimalista. Calzado, remeras, pantalones y accesorios con estilo único.",
  keywords: ["moda", "ropa urbana", "minimalista", "calzado", "remeras", "pantalones", "accesorios", "argentina"],
  authors: [{ name: "Urban Style" }],
  creator: "Urban Style",
  publisher: "Urban Style",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://celutronix.vercel.app/"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Urban Style - Moda Urbana Minimalista",
    description: "Descubre nuestra colección de ropa urbana minimalista con estilo único.",
    url: "https://celutronix.vercel.app/",
    siteName: "Urban Style",
    images: [
      {
        url: "/og-image.jpg", // Ensure this image exists or use a placeholder
        width: 1200,
        height: 630,
        alt: "Urban Style",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Urban Style - Moda Urbana Minimalista",
    description: "Descubre nuestra colección de ropa urbana minimalista.",
    creator: "@urbanstyle",
    images: ["/og-image.jpg"],
  },
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
  manifest: "/site.webmanifest",
  generator: 'v0.app'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          storageKey="urban-style-theme"
        >
          <ErrorBoundary>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <ToastProvider />
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
}
