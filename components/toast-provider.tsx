"use client"

import { Toaster } from "react-hot-toast"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ToastProvider() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = theme === "dark"

  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: isDark ? "#3a4229" : "#fff",
          color: isDark ? "#eef1e6" : "#556238",
          border: isDark ? "1px solid #556238" : "1px solid #dde3cd",
        },
        success: {
          iconTheme: {
            primary: isDark ? "#a8b67e" : "#6d7d45",
            secondary: isDark ? "#3a4229" : "#fff",
          },
        },
        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: isDark ? "#3a4229" : "#fff",
          },
          style: {
            background: isDark ? "#3a4229" : "#fff",
            color: "#dc2626",
            border: isDark ? "1px solid #7f1d1d" : "1px solid #fecaca",
          },
        },
      }}
    />
  )
}
