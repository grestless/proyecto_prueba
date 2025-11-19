"use client"

import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Product } from "@/types"
import { ProductDetailModal } from "@/components/product-detail-modal"

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
    <ProductDetailModal product={product}>
      <Card className="group overflow-hidden border-zinc-800 hover:border-forest-500/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-zinc-900 cursor-pointer h-full flex flex-col">
        <div className="relative aspect-[4/5] overflow-hidden bg-zinc-800">
          <Image
            src={product.image_url || "/placeholder.svg?height=400&width=400&query=ropa"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <Badge variant="destructive" className="text-lg px-4 py-2">
                Sin Stock
              </Badge>
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>

        <CardContent className="p-5 flex-grow flex flex-col">
          <div className="mb-2">
            {product.category && (
              <Badge
                variant="secondary"
                className="bg-zinc-800 text-zinc-400 hover:bg-zinc-700 text-xs border-zinc-700"
              >
                {product.category}
              </Badge>
            )}
          </div>
          <h3 className="font-semibold text-forest-100 mb-2 group-hover:text-forest-400 transition-colors line-clamp-1 text-lg">
            {product.name}
          </h3>
          <p className="text-sm text-zinc-400 line-clamp-2 mb-4 flex-grow">{product.description}</p>
          <p className="text-xl font-bold text-forest-400">{formatPrice(product.price)}</p>
        </CardContent>

        <CardFooter className="p-5 pt-0 mt-auto">
          <Button 
            variant="default"
            className="w-full bg-forest-600 hover:bg-forest-500 text-white shadow-lg transition-all duration-300"
            disabled={product.stock === 0}
          >
            Ver Detalles
          </Button>
        </CardFooter>
      </Card>
    </ProductDetailModal>
  )
}
