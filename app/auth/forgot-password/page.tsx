"use client"

import type React from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import toast from "react-hot-toast"
import { Mail, ArrowRight, Sparkles, ShieldCheck, Zap, Heart, ArrowLeft } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/auth/reset-password`,
      })

      if (error) {
        toast.error(error.message || "Error al enviar el correo de recuperación")
        return
      }

      setIsSubmitted(true)
      toast.success("Correo de recuperación enviado")
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
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">Recupera tu acceso</h1>
                  <p className="text-lg text-white/80 leading-relaxed">
                    No te preocupes, te ayudaremos a restablecer tu contraseña para que puedas seguir comprando.
                  </p>
                </div>

                <div className="space-y-4 pt-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-forest-600/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Seguridad Garantizada</h3>
                      <p className="text-sm text-white/70">Proceso de recuperación seguro y encriptado</p>
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
                <Link 
                  href="/auth/login" 
                  className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver al inicio de sesión
                </Link>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">¿Olvidaste tu contraseña?</h2>
                <p className="text-muted-foreground">
                  {isSubmitted 
                    ? "Revisa tu correo electrónico para continuar con el proceso." 
                    : "Ingresa tu correo electrónico y te enviaremos un enlace para restablecerla."}
                </p>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleResetPassword} className="space-y-5">
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

                  <Button
                    type="submit"
                    className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium group"
                    disabled={isLoading}
                  >
                    {isLoading ? "Enviando..." : "Enviar enlace de recuperación"}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              ) : (
                <div className="bg-forest-900/20 border border-forest-800/50 rounded-lg p-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-forest-600/20 rounded-full flex items-center justify-center mx-auto">
                    <Mail className="w-8 h-8 text-forest-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Correo enviado</h3>
                    <p className="text-muted-foreground text-sm mt-2">
                      Hemos enviado un enlace de recuperación a <strong>{email}</strong>. 
                      Por favor revisa tu bandeja de entrada y spam.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-forest-700 hover:bg-forest-900/30 hover:text-forest-300"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Intentar con otro correo
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
