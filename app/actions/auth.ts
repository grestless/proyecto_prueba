"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function getCurrentUser() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error || !user) {
      return { user: null, profile: null, error: "No autenticado" }
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single()

    if (profileError) {
      console.error("[v0] Error fetching profile:", profileError)
      return { user, profile: null, error: "Error al obtener perfil" }
    }

    return { user, profile, error: null }
  } catch (error) {
    console.error("[v0] Error in getCurrentUser:", error)
    return { user: null, profile: null, error: "Error del servidor" }
  }
}

export async function requireAuth() {
  const { user, profile } = await getCurrentUser()

  if (!user) {
    redirect("/auth/login")
  }

  return { user, profile }
}

export async function requireAdmin() {
  const { user, profile } = await getCurrentUser()

  if (!user) {
    redirect("/auth/login")
  }

  if (!profile || profile.role !== "admin") {
    redirect("/?error=access_denied")
  }

  return { user, profile }
}

export async function checkIsAdmin(): Promise<boolean> {
  try {
    const { profile } = await getCurrentUser()
    return profile?.role === "admin"
  } catch (error) {
    console.error("[v0] Error checking admin status:", error)
    return false
  }
}

export async function updateUserProfile(data: {
  name?: string
  address?: string
  phone?: string
  avatar_url?: string
}) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { success: false, error: "No autenticado" }
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        ...data,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)

    if (error) {
      console.error("[v0] Error updating profile:", error)
      return { success: false, error: "Error al actualizar perfil" }
    }

    return { success: true, error: null }
  } catch (error) {
    console.error("[v0] Error in updateUserProfile:", error)
    return { success: false, error: "Error del servidor" }
  }
}

export async function changeUserRole(userId: string, newRole: "user" | "admin") {
  try {
    // Verificar que el usuario actual es admin
    const { profile } = await requireAdmin()

    const supabase = await createClient()

    const { error } = await supabase
      .from("profiles")
      .update({
        role: newRole,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId)

    if (error) {
      console.error("[v0] Error changing user role:", error)
      return { success: false, error: "Error al cambiar rol" }
    }

    return { success: true, error: null }
  } catch (error) {
    console.error("[v0] Error in changeUserRole:", error)
    return { success: false, error: "Error del servidor" }
  }
}
