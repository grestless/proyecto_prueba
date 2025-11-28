import { createBrowserClient } from "@supabase/ssr"

let client: ReturnType<typeof createBrowserClient> | null = null

export function createClient() {
  if (client) {
    return client
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("[v0] Supabase environment variables not configured. Some features may not work.")
    return {
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        getUser: async () => ({ data: { user: null }, error: null }),
        signOut: async () => ({ error: null }),
        signInWithPassword: async () => ({
          data: { user: null, session: null },
          error: { message: "Supabase not configured" },
        }),
        signUp: async () => ({ data: { user: null, session: null }, error: { message: "Supabase not configured" } }),
        resetPasswordForEmail: async () => ({ data: {}, error: { message: "Supabase not configured" } }),
        updateUser: async () => ({ data: { user: null }, error: { message: "Supabase not configured" } }),
      },
      from: () => ({
        select: () => ({
          eq: () => ({
            single: async () => ({ data: null, error: null }),
            then: async () => ({ data: [], error: null }),
          }),
          then: async () => ({ data: [], error: null }),
        }),
        insert: () => ({ select: () => ({ single: async () => ({ data: null, error: null }) }) }),
        update: () => ({ eq: () => ({ then: async () => ({ error: null }) }) }),
        delete: () => ({ eq: () => ({ then: async () => ({ error: null }) }) }),
      }),
    } as any
  }

  client = createBrowserClient(supabaseUrl, supabaseAnonKey)
  return client
}
