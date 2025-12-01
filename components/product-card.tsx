import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Product } from "@/types"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(cents / 100)
  }

  return (
    <Card className="group overflow-hidden border-olive-200 dark:border-olive-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-olive-50 dark:bg-olive-900/20">
          <Image
            src={product.image_url || "/placeholder.svg?height=400&width=400&query=ropa"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive" className="text-lg">
                Sin Stock
              </Badge>
            </div>
          )}
        </div>
      </Link>

      <CardContent className="p-3 sm:p-4">
        <div className="mb-1 sm:mb-2">
          {product.category && (
            <Badge
              variant="secondary"
              className="bg-olive-100 dark:bg-olive-800 text-olive-700 dark:text-olive-200 text-[10px] sm:text-xs px-1.5 py-0"
            >
              {product.category}
            </Badge>
          )}
        </div>
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-foreground mb-1 sm:mb-2 group-hover:text-olive-600 dark:group-hover:text-olive-400 transition-colors line-clamp-1 text-sm sm:text-base">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-2 sm:mb-3">{product.description}</p>
        <p className="text-lg sm:text-2xl font-bold text-olive-600 dark:text-olive-400">{formatPrice(product.price)}</p>
      </CardContent>

      <CardFooter className="p-3 sm:p-4 pt-0">
        <Button variant="default"
          asChild
          className="w-full hover:bg-olive-700 dark:bg-olive-700 dark:hover:bg-olive-600 text-white bg-accent h-8 sm:h-10 text-xs sm:text-sm"
          disabled={product.stock === 0}
        >
          <Link href={`/products/${product.id}`}>Ver Detalles</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
