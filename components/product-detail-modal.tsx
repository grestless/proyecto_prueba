"use client"

import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, Ruler, Palette, Check, Truck, ShieldCheck } from 'lucide-react'
import Image from "next/image"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { SizeGuideModal } from "@/components/size-guide-modal"
import type { Product } from "@/types"
import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ProductDetailModalProps {
  product: Product
  children: React.ReactNode
}

export function ProductDetailModal({ product, children }: ProductDetailModalProps) {
  const [open, setOpen] = useState(false)

  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(cents / 100)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-5xl p-0 bg-zinc-950 border-zinc-800 text-forest-100 sm:max-h-[90vh] h-auto overflow-hidden shadow-2xl w-full">
        <div className="sr-only">
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>{product.description}</DialogDescription>
        </div>
        
        <div className="grid md:grid-cols-2 h-full max-h-[90vh]">
          <div className="relative h-64 md:h-full bg-zinc-900 min-h-[400px]">
            <Image
              src={product.image_url || "/placeholder.svg?height=800&width=800&query=ropa minimalista"}
              alt={product.name}
              fill
              className="object-cover mx-[0] px-1 py-1"
              priority
            />
          </div>

          <ScrollArea className="h-full max-h-[50vh] md:max-h-[90vh]">
            <div className="p-8 md:p-10 flex flex-col h-max md:px-2.5 w-auto">
              <div className="flex items-center gap-3 mb-4">
                {product.category && (
                  <Badge className="bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border-zinc-700 px-3 py-1">
                    {product.category}
                  </Badge>
                )}
                {product.stock > 0 ? (
                  <Badge className="bg-forest-900/30 text-forest-400 border-forest-800/50 px-3 py-1 flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-forest-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-forest-500"></span>
                    </span>
                    En Stock
                  </Badge>
                ) : (
                  <Badge variant="destructive">Sin Stock</Badge>
                )}
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-forest-50 mb-2 tracking-tight">{product.name}</h2>

              <p className="text-2xl md:text-3xl font-medium text-forest-400 mb-6">{formatPrice(product.price)}</p>

              <div className="prose prose-invert mb-8 max-w-none">
                <p className="text-zinc-400 leading-relaxed text-base md:text-lg">{product.description}</p>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8 border-y border-zinc-800/50 py-6">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="p-2 rounded-full bg-zinc-900 text-forest-400">
                    <Truck className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-zinc-400 font-medium">Envío Rápido</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="p-2 rounded-full bg-zinc-900 text-forest-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-zinc-400 font-medium">Garantía</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="p-2 rounded-full bg-zinc-900 text-forest-400">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-zinc-400 font-medium">Calidad Premium</span>
                </div>
              </div>

              <div className="space-y-6 mb-8">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-forest-200">Seleccionar Talle</h3>
                  <SizeGuideModal />
                </div>

                <div className="w-full">
                   <AddToCartButton product={product} />
                </div>
              </div>
              
              <div className="mt-auto pt-4 text-center">
                 <p className="text-xs text-zinc-500">
                   ¿Dudas sobre este producto? <button className="text-forest-400 hover:underline">Contáctanos</button>
                 </p>
              </div>
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}
