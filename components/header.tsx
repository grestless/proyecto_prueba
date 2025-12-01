"use client"

import Link from "next/link"
import { ShoppingCart, LogOut, Package, Settings, ShoppingBag, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import type { User as SupabaseUser } from "@supabase/supabase-js"
import type { Profile } from "@/types"
import toast from "react-hot-toast"

export function Header() {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [cartCount, setCartCount] = useState(0)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser()

        if (authError) {
          // Solo loguear errores reales, no la falta de sesión
          if (authError.message !== "Auth session missing!") {
            console.error("[v0] Auth error:", authError.message)
          }
          setUser(null)
          setProfile(null)
          setCartCount(0)
          setIsLoading(false)
          return
        }

        setUser(user)

        if (user) {
          const { data: profileData, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single()

          if (profileError) {
            console.error("[v0] Error fetching profile:", profileError.message)
          } else {
            setProfile(profileData)
          }

          const { data: cartItems, error: cartError } = await supabase
            .from("cart_items")
            .select("quantity")
            .eq("user_id", user.id)

          if (cartError) {
            console.error("[v0] Error fetching cart:", cartError.message)
            setCartCount(0)
          } else {
            const totalItems = cartItems?.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0) || 0
            setCartCount(totalItems)
          }
        }
      } catch (error) {
        console.error("[v0] Error in getUser:", error)
        setUser(null)
        setProfile(null)
        setCartCount(0)
      } finally {
        setIsLoading(false)
      }
    }

    getUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event: string, session: any) => {
      setUser(session?.user ?? null)
      if (!session?.user) {
        setProfile(null)
        setCartCount(0)
      } else {
        try {
          const { data: profileData } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()
          setProfile(profileData)

          const { data: cartItems } = await supabase
            .from("cart_items")
            .select("quantity")
            .eq("user_id", session.user.id)
          const totalItems = cartItems?.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0) || 0
          setCartCount(totalItems)
        } catch (error) {
          console.error("[v0] Error updating user data:", error)
        }
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      setProfile(null)
      toast.success("Sesión cerrada exitosamente")
      window.location.href = "/"
    } catch (error) {
      console.error("[v0] Error signing out:", error)
      toast.error("Error al cerrar sesión")
    }
  }

  const getUserInitials = () => {
    if (profile?.name) {
      return profile.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    }
    return user?.email?.[0].toUpperCase() || "U"
  }

  return (
    <header className="fixed top-3 sm:top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.5rem)] sm:w-[calc(100%-3rem)] max-w-7xl">
      <div className="relative rounded-full border border-border/50 bg-background/50 dark:bg-card/50 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/20 transition-colors duration-300">
        <div className="flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6 md:px-8">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
            <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-forest-600 dark:bg-forest-500 shadow-md group-hover:shadow-lg transition-all">
              <Package className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <span className="text-sm sm:text-lg font-light tracking-tight text-foreground hidden xs:inline">
              Proyecto <span className="font-medium">Ecommerce</span>
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
            <nav className="hidden md:flex items-center gap-1">
              <Link
                href="/"
                className="px-4 md:px-5 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted/50"
              >
                Inicio
              </Link>
              <Link
                href="/products"
                className="px-4 md:px-5 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted/50"
              >
                Tienda
              </Link>
            </nav>

            {isLoading ? (
              <div className="h-8 w-8 sm:h-10 sm:w-10 animate-pulse rounded-full bg-muted" />
            ) : user ? (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="h-8 w-8 sm:h-10 sm:w-10 text-foreground hover:bg-muted rounded-full relative"
                >
                  <Link href="/cart">
                    <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-forest-600 dark:bg-forest-500 text-white text-[10px] sm:text-xs font-bold flex items-center justify-center shadow-md">
                        {cartCount > 9 ? "9+" : cartCount}
                      </span>
                    )}
                    <span className="sr-only">Carrito ({cartCount})</span>
                  </Link>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 sm:h-10 sm:w-10 rounded-full hover:bg-white/15 dark:hover:bg-white/10"
                    >
                      <Avatar className="h-8 w-8 sm:h-10 sm:w-10 ring-2 ring-forest-400/50 dark:ring-forest-500/50">
                        <AvatarImage src={profile?.avatar_url || undefined} alt={profile?.name || "Usuario"} />
                        <AvatarFallback className="bg-gradient-to-br from-forest-400 to-forest-600 dark:from-forest-500 dark:to-forest-700 text-white text-[10px] sm:text-xs">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-52 sm:w-56 bg-zinc-800/95 dark:bg-zinc-900/95 backdrop-blur-xl border-zinc-700/50 dark:border-zinc-800/50"
                    align="end"
                    forceMount
                  >
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none text-white dark:text-zinc-100">
                          {profile?.name || "Usuario"}
                        </p>
                        <p className="text-xs leading-none text-zinc-300 dark:text-zinc-400">{user.email}</p>
                        {profile?.role === "admin" && (
                          <span className="inline-flex items-center gap-1 text-xs text-forest-300 dark:text-forest-400 font-medium mt-1">
                            <Shield className="h-3 w-3" />
                            Administrador
                          </span>
                        )}
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-zinc-700/50 dark:bg-zinc-800/50" />
                    <DropdownMenuItem
                      asChild
                      className="text-white dark:text-zinc-100 focus:text-zinc-50 focus:bg-white/15 dark:focus:bg-white/10"
                    >
                      <Link href="/profile" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Mi Perfil</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      asChild
                      className="text-white dark:text-zinc-100 focus:text-zinc-50 focus:bg-white/15 dark:focus:bg-white/10"
                    >
                      <Link href="/profile?tab=orders" className="cursor-pointer">
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        <span>Mis Pedidos</span>
                      </Link>
                    </DropdownMenuItem>
                    {profile?.role === "admin" && (
                      <>
                        <DropdownMenuSeparator className="bg-zinc-700/50 dark:bg-zinc-800/50" />
                        <DropdownMenuItem
                          asChild
                          className="text-forest-300 dark:text-forest-400 focus:text-forest-200 focus:bg-white/15 dark:focus:bg-white/10"
                        >
                          <Link href="/admin" className="cursor-pointer">
                            <Shield className="mr-2 h-4 w-4" />
                            <span>Panel de Administración</span>
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator className="bg-zinc-700/50 dark:bg-zinc-800/50" />
                    <DropdownMenuItem
                      onClick={handleSignOut}
                      className="cursor-pointer text-red-300 dark:text-red-400 focus:text-red-200 focus:bg-white/15 dark:focus:bg-white/10"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Cerrar Sesión</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="h-8 w-8 sm:h-10 sm:w-10 text-foreground hover:bg-muted rounded-full"
                >
                  <Link href="/cart">
                    <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="sr-only">Carrito</span>
                  </Link>
                </Button>
                <Button
                  asChild
                  className="h-8 sm:h-10 px-4 sm:px-6 bg-forest-600 hover:bg-forest-700 dark:bg-forest-500 dark:hover:bg-forest-600 text-white font-medium rounded-full shadow-md text-xs sm:text-sm"
                >
                  <Link href="/auth/login">Ingresar</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
