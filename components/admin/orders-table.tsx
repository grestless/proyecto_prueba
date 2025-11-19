"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import type { Order, OrderItem } from "@/types"

interface OrdersTableProps {
  orders: (Order & { profiles: { email: string; name: string | null } | null; order_items: OrderItem[] })[]
}

export function OrdersTable({ orders }: OrdersTableProps) {
  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(cents / 100)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-AR", {
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
        return "bg-forest-900/30 text-forest-300 border-forest-800"
      case "pending":
        return "bg-yellow-900/30 text-yellow-300 border-yellow-800"
      case "cancelled":
        return "bg-red-900/30 text-red-300 border-red-800"
      default:
        return "bg-zinc-800 text-zinc-300 border-zinc-700"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completado"
      case "pending":
        return "Pendiente"
      case "cancelled":
        return "Cancelado"
      default:
        return status
    }
  }

  return (
    <div className="rounded-md border border-zinc-800 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900/70">
            <TableHead className="text-white">ID Pedido</TableHead>
            <TableHead className="text-white">Cliente</TableHead>
            <TableHead className="text-white">Items</TableHead>
            <TableHead className="text-white">Total</TableHead>
            <TableHead className="text-white">Estado</TableHead>
            <TableHead className="text-white">Fecha</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <TableRow key={order.id} className="border-zinc-800 hover:bg-zinc-900/30">
                <TableCell className="font-mono text-sm text-white">{order.id.slice(0, 8)}</TableCell>
                <TableCell className="text-white">
                  <div>
                    <p className="font-medium">{order.profiles?.name || "Desconocido"}</p>
                    <p className="text-sm text-white/60">{order.profiles?.email}</p>
                  </div>
                </TableCell>
                <TableCell className="text-white">{order.order_items.length} items</TableCell>
                <TableCell className="font-semibold text-white">{formatPrice(order.total)}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(order.status)}>{getStatusText(order.status)}</Badge>
                </TableCell>
                <TableCell className="text-white">{formatDate(order.created_at)}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-white py-8">
                No se encontraron pedidos
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
