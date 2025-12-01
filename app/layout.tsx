import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import "./scroll-animations.css"
import { Footer } from "@/components/footer"
import { ErrorBoundary } from "@/components/error-boundary"
import { ToastProvider } from "@/components/toast-provider"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Urban Style - Moda Urbana Minimalista",
  description:
    "Descubre nuestra colección de ropa urbana minimalista. Calzado, remeras, pantalones y accesorios con estilo único.",
  keywords: ["moda", "ropa urbana", "minimalista", "calzado", "remeras", "pantalones", "accesorios"],
  authors: [{ name: "Urban Style" }],
  openGraph: {
    title: "Urban Style - Moda Urbana Minimalista",
    description: "Descubre nuestra colección de ropa urbana minimalista con estilo único.",
    type: "website",
  },
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
            <main className="min-h-screen">{children}</main>
            <Footer />
            <ToastProvider />
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
}
