"use client"

import type React from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { useState } from "react"
import toast from "react-hot-toast"
import { Lock, Mail, ArrowRight, Sparkles, ShieldCheck, Zap, Heart, Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const supabase = createClient()

      // Create a promise that rejects after 10 seconds
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("La operación tardó demasiado. Por favor, verifica tu conexión.")), 10000)
      })

      const loginPromise = supabase.auth.signInWithPassword({
        email,
        password,
      })

      // Race the login against the timeout
      const { data, error } = await Promise.race([loginPromise, timeoutPromise]) as any

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          toast.error("Credenciales incorrectas. Verifica tu email y contraseña.")
        } else if (error.message.includes("Email not confirmed")) {
          toast.error("Por favor, confirma tu email antes de iniciar sesión.")
        } else {
          toast.error(error.message || "Error al iniciar sesión")
        }
        return
      }

      if (!data.user) {
        toast.error("Error al iniciar sesión. Por favor, intenta nuevamente.")
        return
      }

      toast.success("¡Bienvenido de nuevo!")

      // Use router for smoother transition, but refresh to ensure auth state is picked up
      router.refresh()
      router.push("/products")
    } catch (error) {
      console.error("[v0] Unexpected login error:", error)
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Error inesperado. Por favor, intenta nuevamente.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-zinc-950 via-zinc-900 to-forest-950/30 flex items-center justify-center p-4 md:p-8">
      <Card className="w-full max-w-6xl overflow-hidden shadow-2xl border-forest-800/50 bg-zinc-900/50 backdrop-blur-sm">
        <div className="grid lg:grid-cols-2">
          {/* Panel lateral izquierdo - Info/Branding */}
          <div className="bg-gradient-to-br from-zinc-850 via-forest-950 to-forest-800 px-8 md:px-12 py-12 flex flex-col justify-between relative overflow-hidden min-h-[600px] lg:min-h-full">
            {/* Elementos decorativos */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-20 left-20 w-72 h-72 bg-forest-400 rounded-full blur-3xl" />
              <div className="absolute bottom-20 right-20 w-72 h-72 bg-forest-400 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-forest-600/30 backdrop-blur-sm flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">Urban Style</span>
              </div>

              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">Bienvenido de vuelta</h1>
                  <p className="text-lg text-white/80 leading-relaxed">
                    Continúa explorando las últimas tendencias en moda urbana
                  </p>
                </div>

                <div className="space-y-4 pt-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-forest-600/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Compra Segura</h3>
                      <p className="text-sm text-white/70">Protección total de tus datos</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-forest-600/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Envío Rápido</h3>
                      <p className="text-sm text-white/70">Recibí tus productos en tiempo récord</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-forest-600/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Calidad Premium</h3>
                      <p className="text-sm text-white/70">Los mejores materiales</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-8">
              <p className="text-white/60 text-xs">© 2025 Urban Style. Todos los derechos reservados.</p>
            </div>
          </div>

          {/* Panel derecho - Formulario */}
          <div className="p-8 md:p-12 bg-background">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Iniciar Sesión</h2>
                <p className="text-muted-foreground">Ingresa tus credenciales para continuar</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground font-medium">
                    Correo Electrónico
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@ejemplo.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-11 bg-background border-input focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-foreground font-medium">
                      Contraseña
                    </Label>
                    <Link
                      href="/auth/forgot-password"
                      className="text-sm text-primary hover:underline font-medium"
                    >
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 h-11 bg-background border-input focus:border-primary"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                      <span className="sr-only">
                        {showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                      </span>
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium group"
                  disabled={isLoading}
                >
                  {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  ¿No tienes una cuenta?{" "}
                  <Link href="/auth/signup" className="text-primary font-medium hover:underline">
                    Regístrate aquí
                  </Link>
                </div>
              </form>

              <p className="text-center text-xs text-muted-foreground pt-4">
                Protegido con encriptación SSL de 256 bits
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
