"use client"

import type React from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"
import { Lock, Mail, ArrowRight, Sparkles, UserIcon, ShieldCheck, Zap, Heart } from "lucide-react"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (password !== repeatPassword) {
        toast.error("Las contraseñas no coinciden")
        setIsLoading(false)
        return
      }

      if (password.length < 8) {
        toast.error("La contraseña debe tener al menos 8 caracteres")
        setIsLoading(false)
        return
      }

      if (!/[A-Z]/.test(password)) {
        toast.error("La contraseña debe contener al menos una letra mayúscula")
        setIsLoading(false)
        return
      }

      if (!/[0-9]/.test(password)) {
        toast.error("La contraseña debe contener al menos un número")
        setIsLoading(false)
        return
      }

      const supabase = createClient()

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/products`,
          data: {
            name: name,
          },
        },
      })

      if (error) {
        if (error.message.includes("already registered")) {
          toast.error("Este email ya está registrado. Intenta iniciar sesión.")
        } else if (error.message.includes("Password")) {
          toast.error("La contraseña no cumple con los requisitos de seguridad.")
        } else {
          toast.error(error.message || "Error al crear la cuenta")
        }
        return
      }

      if (!data.user) {
        toast.error("Error al crear la cuenta. Por favor, intenta nuevamente.")
        return
      }

      toast.success("¡Cuenta creada exitosamente! Revisa tu email para confirmar.")
      router.push("/auth/signup-success")
    } catch (error) {
      console.error("[v0] Unexpected signup error:", error)
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
          <div className="bg-gradient-to-br from-forest-700 via-forest-800 to-forest-900 p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
            {/* Elementos decorativos */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-20 right-20 w-72 h-72 bg-forest-400 rounded-full blur-3xl" />
              <div className="absolute bottom-20 left-20 w-72 h-72 bg-forest-400 rounded-full blur-3xl" />
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
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
                    Únete a nuestra comunidad
                  </h1>
                  <p className="text-lg text-white/80 leading-relaxed">Descubre un mundo de moda urbana minimalista</p>
                </div>

                <div className="space-y-4 pt-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-forest-600/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Registro Seguro</h3>
                      <p className="text-sm text-white/70">Tus datos protegidos</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-forest-600/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Acceso Instantáneo</h3>
                      <p className="text-sm text-white/70">Comienza a comprar inmediatamente</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-forest-600/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Ofertas Exclusivas</h3>
                      <p className="text-sm text-white/70">Descuentos para miembros</p>
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
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Crear Cuenta</h2>
                <p className="text-muted-foreground">Completa tus datos para comenzar</p>
              </div>

              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground font-medium">
                    Nombre Completo
                  </Label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Juan Pérez"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 h-11 bg-background border-input focus:border-primary"
                    />
                  </div>
                </div>

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
                  <Label htmlFor="password" className="text-foreground font-medium">
                    Contraseña
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      required
                      minLength={8}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 h-11 bg-background border-input focus:border-primary"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Mínimo 8 caracteres, una mayúscula y un número</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="repeat-password" className="text-foreground font-medium">
                    Confirmar Contraseña
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="repeat-password"
                      type="password"
                      required
                      value={repeatPassword}
                      onChange={(e) => setRepeatPassword(e.target.value)}
                      className="pl-10 h-11 bg-background border-input focus:border-primary"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium group"
                  disabled={isLoading}
                >
                  {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  ¿Ya tienes una cuenta?{" "}
                  <Link href="/auth/login" className="text-primary font-medium hover:underline">
                    Inicia sesión aquí
                  </Link>
                </div>
              </form>

              <p className="text-center text-xs text-muted-foreground pt-2">
                Al registrarte, aceptas nuestros términos y condiciones
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
