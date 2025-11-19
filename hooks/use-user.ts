"use client"

import { useAuth } from "./use-auth"

export function useUser() {
  const { user, profile, loading } = useAuth()

  return {
    user,
    profile,
    loading,
    isAuthenticated: !!user,
    email: user?.email,
    name: profile?.name,
    role: profile?.role,
    avatarUrl: profile?.avatar_url,
    address: profile?.address,
    phone: profile?.phone,
  }
}
