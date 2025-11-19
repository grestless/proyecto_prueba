"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart, Plus, Minus } from "lucide-react"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import type { Product } from "@/types"
import toast from "react-hot-toast"
import { addToCartSchema } from "@/lib/validations/product"
import { SizeGuideModal } from "@/components/size-guide-modal"

interface AddToCartButtonProps {
  product: Product
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [selectedColor, setSelectedColor] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleAddToCart = async () => {
    setIsLoading(true)

    try {
      const validation = addToCartSchema.safeParse({
        product_id: product.id,
        quantity,
        selected_size: selectedSize,
        selected_color: selectedColor,
      })

      if (!validation.success) {
        const errors = validation.error.errors.map((e) => e.message).join(", ")
        toast.error(errors)
        setIsLoading(false)
        return
      }

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser()

      if (authError) {
        console.error("[v0] Auth error:", authError)
        toast.error("Error de autenticación. Por favor, inicia sesión.")
        router.push("/auth/login")
        return
      }

      if (!user) {
        toast.error("Debes iniciar sesión para agregar productos al carrito")
        router.push("/auth/login")
        return
      }

      const { data: existingItem, error: fetchError } = await supabase
        .from("cart_items")
        .select("*")
        .eq("user_id", user.id)
        .eq("product_id", product.id)
        .eq("selected_size", selectedSize)
        .eq("selected_color", selectedColor)
        .single()

      if (fetchError && fetchError.code !== "PGRST116") {
        console.error("[v0] Error fetching cart item:", fetchError)
        throw new Error("Error al verificar el carrito")
      }

      if (existingItem) {
        // Update quantity
        const newQuantity = existingItem.quantity + quantity

        if (newQuantity > product.stock) {
          toast.error(`Solo hay ${product.stock} unidades disponibles`)
          return
        }

        const { error: updateError } = await supabase
          .from("cart_items")
          .update({ quantity: newQuantity })
          .eq("id", existingItem.id)

        if (updateError) {
          console.error("[v0] Error updating cart:", updateError)
          throw new Error("Error al actualizar el carrito")
        }

        toast.success(`Cantidad actualizada en el carrito (${newQuantity})`)
      } else {
        const { error: insertError } = await supabase.from("cart_items").insert({
          user_id: user.id,
          product_id: product.id,
          quantity: quantity,
          selected_size: selectedSize,
          selected_color: selectedColor,
        })

        if (insertError) {
          console.error("[v0] Error adding to cart:", insertError)
          throw new Error("Error al agregar al carrito")
        }

        toast.success("¡Producto agregado al carrito!")
      }
    } catch (error) {
      console.error("[v0] Error in handleAddToCart:", error)
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Error al agregar al carrito. Por favor, intenta nuevamente.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-foreground">Talle:</label>
          <SizeGuideModal />
        </div>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-4 py-2 border-2 rounded-lg font-medium transition-all ${
                selectedSize === size
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:border-primary/50 text-foreground"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-semibold text-foreground">Color:</label>
        <div className="flex flex-wrap gap-2">
          {product.colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`px-4 py-2 border-2 rounded-lg font-medium transition-all ${
                selectedColor === color
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:border-primary/50 text-foreground"
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Selector de cantidad */}
      <div className="flex items-center gap-4">
        <span className="text-foreground font-medium">Cantidad:</span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
            className="border-border text-foreground hover:bg-muted"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center font-semibold text-foreground">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
            disabled={quantity >= product.stock}
            className="border-border text-foreground hover:bg-muted"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Button
        onClick={handleAddToCart}
        disabled={isLoading || product.stock === 0}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6"
      >
        <ShoppingCart className="mr-2 h-5 w-5" />
        {isLoading ? "Agregando..." : "Agregar al Carrito"}
      </Button>
    </div>
  )
}
