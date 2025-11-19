import { createClient } from "@/lib/supabase/server"
import { ProductCard } from "@/components/product-card"
import { ProductFilters } from "@/components/product-filters"
import { Header } from "@/components/header"
import type { Product } from "@/types"

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string; sort?: string }>
}) {
  const params = await searchParams
  const supabase = await createClient()

  // Build query
  let query = supabase.from("products").select("*")

  // Apply search filter
  if (params.search) {
    query = query.or(`name.ilike.%${params.search}%,description.ilike.%${params.search}%`)
  }

  // Apply category filter
  if (params.category && params.category !== "all") {
    query = query.eq("category", params.category)
  }

  // Apply sorting
  if (params.sort === "price-asc") {
    query = query.order("price", { ascending: true })
  } else if (params.sort === "price-desc") {
    query = query.order("price", { ascending: false })
  } else if (params.sort === "name") {
    query = query.order("name", { ascending: true })
  } else {
    query = query.order("created_at", { ascending: false })
  }

  const { data: products, error } = await query

  if (error) {
    console.error("Error fetching products:", error)
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-forest-400">Error loading products</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-zinc-950 transition-colors duration-300 pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-forest-300">Nuestra Colección</h1>
            <p className="text-forest-400/80 text-lg">Descubre nuestra selección de moda urbana</p>
          </div>

          <ProductFilters />

          {products && products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-forest-400/80 text-lg">No se encontraron productos que coincidan con tu búsqueda.</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
