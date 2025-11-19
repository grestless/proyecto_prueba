"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import toast from "react-hot-toast"
import type { OrderItem } from "@/types"

interface ReorderButtonProps {
  orderItems: OrderItem[]
}

export function ReorderButton({ orderItems }: ReorderButtonProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleReorder = async () => {
    setLoading(true)

    try {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        toast.error("Debes iniciar sesión")
        return
      }

      // Add all items from the order to cart
      for (const item of orderItems) {
        const { error } = await supabase.from("cart_items").upsert(
          {
            user_id: user.id,
            product_id: item.product_id,
            quantity: item.quantity,
            selected_size: item.selected_size,
            selected_color: item.selected_color,
          },
          {
            onConflict: "user_id,product_id",
          },
        )

        if (error) throw error
      }

      toast.success("Productos agregados al carrito")
      router.push("/cart")
    } catch (error) {
      console.error("[v0] Error reordering:", error)
      toast.error("Error al repetir el pedido")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleReorder}
      disabled={loading}
      size="sm"
      variant="outline"
      className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 bg-transparent"
    >
      <ShoppingCart className="h-4 w-4 mr-2" />
      {loading ? "Agregando..." : "Repetir pedido"}
    </Button>
  )
}
