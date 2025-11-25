import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AddProductDialog } from "@/components/admin/add-product-dialog"
import { Header } from "@/components/header"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { mockProducts } from "@/lib/mock-products"

export default async function AdminPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (!profile || profile.role !== "admin") {
    redirect("/?error=access_denied")
  }

  // Fetch products from Supabase
  const { data: supabaseProducts } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })

  const products = supabaseProducts && supabaseProducts.length > 0 ? supabaseProducts : mockProducts

  // Fetch orders with user info
  const { data: orders } = await supabase
    .from("orders")
    .select(
      `
      *,
      profiles(email, name),
      order_items(*)
    `,
    )
    .order("created_at", { ascending: false })

  const { data: allUsers } = await supabase.from("profiles").select("*").order("created_at", { ascending: false })

  return (
    <>
      <Header />
      <div className="min-h-screen bg-zinc-950 transition-colors duration-300 pt-24 sm:pt-28 md:pt-32">
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-forest-300 mb-2">Panel de Administracion</h1>
            <p className="text-forest-400/80 text-sm sm:text-base">Gestiona productos, pedidos y usuarios</p>
          </div>

          <div className="flex justify-end mb-4 sm:mb-6">
            <AddProductDialog />
          </div>

          <AdminDashboard products={products || []} orders={orders || []} users={allUsers || []} />
        </div>
      </div>
    </>
  )
}
