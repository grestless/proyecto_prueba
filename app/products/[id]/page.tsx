import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, Package, Ruler, Palette, Truck, Shield, Star } from "lucide-react"
import { SizeGuideModal } from "@/components/size-guide-modal"
import { mockProducts } from "@/lib/mock-products"
import { ProductImageGallery } from "@/components/product-image-gallery"

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)

  let product = null

  if (isUUID) {
    const { data } = await supabase.from("products").select("*").eq("id", id).single()
    product = data
  }

  if (!product) {
    product = mockProducts.find((p) => p.id === id) || null
  }

  if (!product) {
    notFound()
  }

  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(cents / 100)
  }

  const productImages = product.images || [product.image_url]

  return (
    <div className="min-h-screen bg-zinc-950 pt-20">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Button variant="ghost" asChild className="mb-6 text-forest-300 hover:text-forest-400 hover:bg-zinc-900">
          <Link href="/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Productos
          </Link>
        </Button>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <ProductImageGallery images={productImages} productName={product.name} />

          <div className="flex flex-col space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                {product.category && (
                  <Badge className="bg-zinc-800 text-forest-400 hover:bg-zinc-700 border-zinc-700">
                    {product.category}
                  </Badge>
                )}
                {product.stock > 0 ? (
                  <Badge className="bg-forest-900/50 text-forest-300 border-forest-700">
                    En Stock ({product.stock})
                  </Badge>
                ) : (
                  <Badge variant="destructive">Sin Stock</Badge>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                {product.name}
              </h1>

              <p className="text-3xl sm:text-4xl font-bold text-forest-400 mb-6">{formatPrice(product.price)}</p>

              <div className="prose prose-invert max-w-none mb-8">
                <p className="text-zinc-300 leading-relaxed text-base sm:text-lg">{product.description}</p>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="flex flex-col items-center text-center p-3 bg-zinc-900 rounded-lg border border-zinc-800">
                  <Truck className="h-5 w-5 text-forest-400 mb-2" />
                  <p className="text-xs text-zinc-400">Envío Gratis</p>
                </div>
                <div className="flex flex-col items-center text-center p-3 bg-zinc-900 rounded-lg border border-zinc-800">
                  <Shield className="h-5 w-5 text-forest-400 mb-2" />
                  <p className="text-xs text-zinc-400">Garantía</p>
                </div>
                <div className="flex flex-col items-center text-center p-3 bg-zinc-900 rounded-lg border border-zinc-800">
                  <Star className="h-5 w-5 text-forest-400 mb-2" />
                  <p className="text-xs text-zinc-400">Calidad</p>
                </div>
              </div>
            </div>

            <div className="border-t border-zinc-800 pt-6 space-y-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white text-lg">Detalles del Producto</h3>
                <SizeGuideModal />
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Package className="h-5 w-5 text-forest-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-white">Categoría</p>
                    <p className="text-zinc-400">{product.category || "General"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Ruler className="h-5 w-5 text-forest-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-white">Talles Disponibles</p>
                    <p className="text-zinc-400">{product.sizes.join(", ")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Palette className="h-5 w-5 text-forest-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-white">Colores Disponibles</p>
                    <p className="text-zinc-400">{product.colors.join(", ")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Package className="h-5 w-5 text-forest-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-white">Stock</p>
                    <p className="text-zinc-400">{product.stock} unidades disponibles</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
