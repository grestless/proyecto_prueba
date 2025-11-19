"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, Trash2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import type { CartItem } from "@/types"
import toast from "react-hot-toast"

interface CartItemComponentProps {
  item: CartItem
}

export function CartItemComponent({ item }: CartItemComponentProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(cents / 100)
  }

  /**
   * Actualiza la cantidad del producto en el carrito
   * Valida que no exceda el stock disponible
   */
  const updateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1) return
    setIsLoading(true)

    try {
      if (item.product && newQuantity > item.product.stock) {
        toast.error(`Solo hay ${item.product.stock} unidades disponibles`)
        setIsLoading(false)
        return
      }

      const { error } = await supabase.from("cart_items").update({ quantity: newQuantity }).eq("id", item.id)

      if (error) {
        console.error("[v0] Error updating quantity:", error)
        throw new Error("Error al actualizar la cantidad")
      }

      toast.success("Cantidad actualizada")
      router.refresh()
    } catch (error) {
      console.error("[v0] Error in updateQuantity:", error)
      toast.error("Error al actualizar la cantidad")
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Elimina el producto del carrito
   */
  const removeItem = async () => {
    setIsLoading(true)

    try {
      const { error } = await supabase.from("cart_items").delete().eq("id", item.id)

      if (error) {
        console.error("[v0] Error removing item:", error)
        throw new Error("Error al eliminar el producto")
      }

      toast.success("Producto eliminado del carrito")
      router.refresh()
    } catch (error) {
      console.error("[v0] Error in removeItem:", error)
      toast.error("Error al eliminar el producto")
    } finally {
      setIsLoading(false)
    }
  }

  if (!item.product) return null

  return (
    <Card className="border-border">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="relative h-24 w-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
            <Image
              src={item.product.image_url || "/placeholder.svg?height=100&width=100&query=ropa"}
              alt={item.product.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-semibold text-foreground">{item.product.name}</h3>
              <p className="text-sm text-muted-foreground">{item.product.category}</p>

              <div className="flex gap-2 mt-2">
                {item.selected_size && (
                  <Badge variant="outline" className="text-xs">
                    Talle: {item.selected_size}
                  </Badge>
                )}
                {item.selected_color && (
                  <Badge variant="outline" className="text-xs">
                    Color: {item.selected_color}
                  </Badge>
                )}
              </div>

              <p className="text-lg font-bold text-primary mt-1">{formatPrice(item.product.price)}</p>
            </div>

            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.quantity - 1)}
                  disabled={isLoading || item.quantity <= 1}
                  className="h-8 w-8 border-border text-foreground hover:bg-muted"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center font-semibold text-foreground">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.quantity + 1)}
                  disabled={isLoading || item.quantity >= (item.product?.stock || 0)}
                  className="h-8 w-8 border-border text-foreground hover:bg-muted"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-bold text-foreground">{formatPrice(item.product.price * item.quantity)}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={removeItem}
                  disabled={isLoading}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
