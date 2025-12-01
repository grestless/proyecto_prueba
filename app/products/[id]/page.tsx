import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, Package, Ruler, Palette } from "lucide-react"
import { ProductImageGallery } from "@/components/product-image-gallery"
import { SizeGuideModal } from "@/components/size-guide-modal"
import { getRelatedProducts } from "@/app/actions/products"
import { ProductCard } from "@/components/product-card"

function isValidUUID(id: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return uuidRegex.test(id)
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  let product = null

  console.log("[v0] Product ID:", id)
  console.log("[v0] Is valid UUID:", isValidUUID(id))

  if (isValidUUID(id)) {
    const supabase = await createClient()
    const { data } = await supabase.from("products").select("*").eq("id", id).single()
    product = data
    console.log("[v0] Product from Supabase:", product)
  }

  if (!product) {
    notFound()
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

  const productImages =
    product.images && product.images.length > 0 ? product.images : product.image_url ? [product.image_url] : []

  console.log("[v0] Product images array:", productImages)
  console.log("[v0] Product images length:", productImages.length)

  // Get related products
  const relatedProducts = product ? await getRelatedProducts(product.id, product.category || "") : []

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 to-muted/50">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6 text-foreground hover:text-primary hover:bg-muted">
          <Link href="/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Productos
          </Link>
        </Button>

        <div className="grid md:grid-cols-2 gap-8 bg-card rounded-2xl shadow-lg p-8 items-start">
          <ProductImageGallery images={productImages} productName={product.name} />

          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                {product.category && (
                  <Badge className="bg-secondary text-secondary-foreground hover:bg-secondary/80">
                    {product.category}
                  </Badge>
                )}
                {product.stock > 0 ? (
                  <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100">
                    En Stock ({product.stock})
                  </Badge>
                ) : (
                  <Badge variant="destructive">Sin Stock</Badge>
                )}
              </div>

              <h1 className="text-4xl font-bold text-foreground mb-4">{product.name}</h1>

              <p className="text-3xl font-bold text-primary mb-6">{formatPrice(product.price)}</p>

              <div className="prose prose-neutral dark:prose-invert mb-8">
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </div>

              <div className="border-t border-border pt-6 mb-6 space-y-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-foreground">Detalles del Producto</h3>
                  <SizeGuideModal />
                </div>

                <div className="flex items-start gap-3">
                  <Package className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Categoría</p>
                    <p className="text-muted-foreground">{product.category || "General"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Ruler className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Talles Disponibles</p>
                    <p className="text-muted-foreground">{product.sizes.join(", ")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Palette className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Colores Disponibles</p>
                    <p className="text-muted-foreground">{product.colors.join(", ")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Package className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Stock</p>
                    <p className="text-muted-foreground">{product.stock} unidades disponibles</p>
                  </div>
                </div>
              </div>
            </div>

            <AddToCartButton product={product} />
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Productos Relacionados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
