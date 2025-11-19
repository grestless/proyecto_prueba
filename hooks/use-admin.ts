"use client"

import { useUser } from "./use-user"

export function useAdmin() {
  const { profile, loading } = useUser()

  const isAdmin = profile?.role === "admin"

  return {
    isAdmin,
    loading,
    canAccessAdmin: isAdmin,
  }
}
