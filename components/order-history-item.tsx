"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Package } from "lucide-react"
import { useState } from "react"
import type { Order, OrderItem } from "@/types"
import { ReorderButton } from "@/components/profile/reorder-button"

interface OrderHistoryItemProps {
  order: Order & { order_items: OrderItem[] }
}

export function OrderHistoryItem({ order }: OrderHistoryItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(cents / 100)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700"
      case "pending":
        return "bg-yellow-100 text-yellow-700"
      case "cancelled":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "COMPLETADO"
      case "pending":
        return "PENDIENTE"
      case "cancelled":
        return "CANCELADO"
      default:
        return status.toUpperCase()
    }
  }

  return (
    <Card className="border-emerald-100 bg-background">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
              <Package className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="font-semibold text-white">Pedido #{order.id.slice(0, 8)}</p>
              <p className="text-sm text-emerald-700">{formatDate(order.created_at)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge className={getStatusColor(order.status)}>{getStatusLabel(order.status)}</Badge>
            <p className="font-bold text-popover-foreground">{formatPrice(order.total)}</p>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-emerald-100 space-y-2">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-emerald-900">Productos del pedido:</h4>
              <ReorderButton orderItems={order.order_items} />
            </div>
            {order.order_items.map((item) => (
              <div key={item.id} className="flex justify-between items-center py-2 px-3 rounded bg-popover">
                <div>
                  <p className="font-medium text-foreground">{item.product_name}</p>
                  <div className="flex gap-3 text-sm text-emerald-700">
                    <span>Cantidad: {item.quantity}</span>
                    {item.selected_size && <span>Talle: {item.selected_size}</span>}
                    {item.selected_color && <span>Color: {item.selected_color}</span>}
                  </div>
                </div>
                <p className="font-semibold text-foreground">{formatPrice(item.product_price * item.quantity)}</p>
              </div>
            ))}
          </div>
        )}

        <Button
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full mt-2 hover:text-white hover:bg-emerald-500"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="h-4 w-4 mr-2" />
              Ocultar detalles
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-2" />
              Ver detalles
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
