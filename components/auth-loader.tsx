"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Loader2 } from "lucide-react"

export function AuthLoader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await supabase.auth.getSession()
      } catch (error) {
        console.error("[v0] Error checking auth:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [supabase.auth])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background transition-colors duration-300">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-olive-600 dark:text-olive-500" />
          <p className="text-sm text-olive-700 dark:text-olive-400">Verificando sesión...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
