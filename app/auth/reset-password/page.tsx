"use client"

import type React from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation'
import { useState } from "react"
import toast from "react-hot-toast"
import { Lock, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden")
      return
    }

    if (password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres")
      return
    }

    setIsLoading(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.updateUser({
        password: password,
      })

      if (error) {
        toast.error(error.message || "Error al actualizar la contraseña")
        return
      }

      toast.success("Contraseña actualizada correctamente")
      
      // Redirigir al login o al home después de un breve retraso
      setTimeout(() => {
        router.push("/auth/login")
      }, 2000)
      
    } catch (error) {
      console.error("[v0] Unexpected error:", error)
      toast.error("Error inesperado. Por favor, intenta nuevamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-zinc-950 via-zinc-900 to-forest-950/30 flex items-center justify-center p-4 md:p-8">
      <Card className="w-full max-w-6xl overflow-hidden shadow-2xl border-forest-800/50 bg-zinc-900/50 backdrop-blur-sm">
        <div className="grid lg:grid-cols-2">
          {/* Panel lateral izquierdo - Info/Branding */}
          <div className="bg-gradient-to-br from-forest-700 via-forest-800 to-forest-900 px-8 md:px-12 py-12 flex flex-col justify-between relative overflow-hidden min-h-[600px] lg:min-h-full">
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
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">Nueva Contraseña</h1>
                  <p className="text-lg text-white/80 leading-relaxed">
                    Crea una nueva contraseña segura para proteger tu cuenta.
                  </p>
                </div>

                <div className="space-y-4 pt-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-forest-600/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Seguridad Primero</h3>
                      <p className="text-sm text-white/70">Te recomendamos usar una combinación de letras, números y símbolos.</p>
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
          <div className="p-8 md:p-12 bg-background flex flex-col justify-center">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Restablecer Contraseña</h2>
                <p className="text-muted-foreground">Ingresa tu nueva contraseña a continuación</p>
              </div>

              <form onSubmit={handleUpdatePassword} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground font-medium">
                    Nueva Contraseña
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 h-11 bg-background border-input focus:border-primary"
                      placeholder="Mínimo 6 caracteres"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-foreground font-medium">
                    Confirmar Contraseña
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 h-11 bg-background border-input focus:border-primary"
                      placeholder="Repite tu nueva contraseña"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium group"
                  disabled={isLoading}
                >
                  {isLoading ? "Actualizando..." : "Actualizar Contraseña"}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
