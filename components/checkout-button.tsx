"use client"

import { Button } from "@/components/ui/button"
import { CreditCard } from "lucide-react"
import { useState } from "react"
import { createCheckoutSession } from "@/app/actions/stripe"
import type { CartItem } from "@/types"
import toast from "react-hot-toast"

interface CheckoutButtonProps {
  cartItems: CartItem[]
  total: number
}

export function CheckoutButton({ cartItems, total }: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckout = async () => {
    setIsLoading(true)

    try {
      if (!cartItems || cartItems.length === 0) {
        toast.error("Tu carrito está vacío")
        return
      }

      // Validate all products have required data
      const invalidItems = cartItems.filter((item) => !item.product || !item.product.name || !item.product.price)
      if (invalidItems.length > 0) {
        console.error("[v0] Invalid cart items:", invalidItems)
        toast.error("Algunos productos en tu carrito tienen datos inválidos")
        return
      }

      const lineItems = cartItems.map((item) => ({
        product_id: item.product_id,
        product_name: item.product!.name,
        product_description: item.product!.description || "",
        price: item.product!.price,
        quantity: item.quantity,
      }))

      toast.loading("Procesando pago...", { id: "checkout" })

      const checkoutUrl = await createCheckoutSession(lineItems, total)

      if (!checkoutUrl) {
        throw new Error("No se pudo generar la URL de pago")
      }

      toast.success("Redirigiendo a la página de pago...", { id: "checkout" })
      window.location.href = checkoutUrl
    } catch (error) {
      console.error("[v0] Error in handleCheckout:", error)
      toast.dismiss("checkout")

      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Error al procesar el pago. Por favor, intenta nuevamente.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleCheckout}
      disabled={isLoading || cartItems.length === 0}
      className="w-full bg-olive-600 hover:bg-olive-700 dark:bg-olive-700 dark:hover:bg-olive-800 text-white text-lg py-6"
    >
      <CreditCard className="mr-2 h-5 w-5" />
      {isLoading ? "Procesando..." : "Proceder al Pago"}
    </Button>
  )
}
