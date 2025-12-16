"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, DollarSign, Users, Package, Info } from 'lucide-react'
import { ProductsTable } from "@/components/admin/products-table"
import { OrdersTable } from "@/components/admin/orders-table"
import { UsersTable } from "@/components/admin/users-table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import type { Product, Order, Profile, OrderItem } from "@/types"

interface AdminDashboardProps {
  products: Product[]
  orders: (Order & { profiles: { email: string; name: string | null } | null; order_items: OrderItem[] })[]
  users: Profile[]
}

export function AdminDashboard({ products, orders, users }: AdminDashboardProps) {
  const currentDate = new Date()
  const [selectedMonth, setSelectedMonth] = useState<string>(currentDate.getMonth().toString())
  const [selectedYear, setSelectedYear] = useState<string>(currentDate.getFullYear().toString())
  const [selectedStatus, setSelectedStatus] = useState<"pending" | "completed">("pending")

  // Filter orders by selected month, year, and status
  const filteredOrders = orders.filter((order) => {
    const orderDate = new Date(order.created_at)
    const matchesDate =
      orderDate.getMonth().toString() === selectedMonth && orderDate.getFullYear().toString() === selectedYear

    // For status filtering
    if (selectedStatus === "pending") {
      return matchesDate && order.status === "pending"
    } else {
      return matchesDate && order.status === "completed"
    }
  })

  // Calculate stats based on filtered orders (or all orders for the month?)
  // The original code calculated stats based on "filteredOrders" which was just date-filtered.
  // We should probably keep a separate "dateFilteredOrders" for stats if we want stats to show everything for the month,
  // OR we accept that stats now reflect the view. 
  // User asked to "make order history more useful". 
  // Usually stats like "Monthly Revenue" should include ALL orders for the month, not just pending ones.

  const ordersInMonth = orders.filter((order) => {
    const orderDate = new Date(order.created_at)
    return (
      orderDate.getMonth().toString() === selectedMonth && orderDate.getFullYear().toString() === selectedYear
    )
  })

  const monthlyOrdersCount = ordersInMonth.length
  const monthlyCompletedOrders = ordersInMonth.filter((o) => o.status === "completed").length
  const monthlyRevenue = ordersInMonth
    .filter((o) => o.status === "completed")
    .reduce((sum, order) => sum + order.total, 0)

  const totalUsers = users.length

  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(cents / 100)
  }

  const months = [
    { value: "0", label: "Enero" },
    { value: "1", label: "Febrero" },
    { value: "2", label: "Marzo" },
    { value: "3", label: "Abril" },
    { value: "4", label: "Mayo" },
    { value: "5", label: "Junio" },
    { value: "6", label: "Julio" },
    { value: "7", label: "Agosto" },
    { value: "8", label: "Septiembre" },
    { value: "9", label: "Octubre" },
    { value: "10", label: "Noviembre" },
    { value: "11", label: "Diciembre" },
  ]

  const currentMonthLabel = months.find(m => m.value === selectedMonth)?.label
  const years = Array.from({ length: 5 }, (_, i) => (currentDate.getFullYear() - i).toString())

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs sm:text-sm font-medium text-forest-400">
              Pedidos ({currentMonthLabel})
            </CardTitle>
            <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 text-forest-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-forest-300">{monthlyOrdersCount}</div>
            <p className="text-[10px] sm:text-xs text-forest-400/70 mt-1">{monthlyCompletedOrders} completados este mes</p>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <div className="flex items-center gap-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-forest-400">Ingresos Mensuales</CardTitle>
              <Popover>
                <PopoverTrigger>
                  <Info className="h-3 w-3 text-forest-500/70 hover:text-forest-400 cursor-pointer" />
                </PopoverTrigger>
                <PopoverContent className="w-auto p-2 text-xs bg-zinc-950 border-zinc-800 text-forest-300">
                  <p>Mostrando ingresos de {currentMonthLabel} {selectedYear}</p>
                </PopoverContent>
              </Popover>
            </div>
            <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-forest-500" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-forest-300">
                {formatPrice(monthlyRevenue)}
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="h-7 text-xs w-[100px] bg-zinc-950 border-zinc-800 text-forest-300">
                  <SelectValue placeholder="Mes" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-950 border-zinc-800 text-forest-300">
                  {months.map((month) => (
                    <SelectItem key={month.value} value={month.value}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="h-7 text-xs w-[80px] bg-zinc-950 border-zinc-800 text-forest-300">
                  <SelectValue placeholder="Año" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-950 border-zinc-800 text-forest-300">
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs sm:text-sm font-medium text-forest-400">Usuarios</CardTitle>
            <Users className="h-3 w-3 sm:h-4 sm:w-4 text-forest-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-forest-300">{totalUsers}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="products" className="space-y-4 sm:space-y-6">
        <TabsList className="bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm w-full sm:w-auto grid grid-cols-3 sm:flex">
          <TabsTrigger
            value="products"
            className="data-[state=active]:bg-forest-900/20 data-[state=active]:text-forest-300 text-forest-400 text-xs sm:text-sm"
          >
            <Package className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Productos</span>
            <span className="sm:hidden">Prod.</span>
          </TabsTrigger>
          <TabsTrigger
            value="orders"
            className="data-[state=active]:bg-forest-900/20 data-[state=active]:text-forest-300 text-forest-400 text-xs sm:text-sm"
          >
            <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Pedidos</span>
            <span className="sm:hidden">Ped.</span>
          </TabsTrigger>
          <TabsTrigger
            value="users"
            className="data-[state=active]:bg-forest-900/20 data-[state=active]:text-forest-300 text-forest-400 text-xs sm:text-sm"
          >
            <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Usuarios</span>
            <span className="sm:hidden">Users</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-forest-300">Gestión de Productos</CardTitle>
            </CardHeader>
            <CardContent className="text-forest-400/90 p-2 sm:p-6">
              <ProductsTable products={products} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <CardTitle className="text-forest-300">Gestión de Pedidos</CardTitle>
              <div className="flex bg-zinc-950 p-1 rounded-lg border border-zinc-800">
                <button
                  onClick={() => setSelectedStatus("pending")}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${selectedStatus === "pending"
                    ? "bg-yellow-900/30 text-yellow-300 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200"
                    }`}
                >
                  Pendientes
                </button>
                <button
                  onClick={() => setSelectedStatus("completed")}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${selectedStatus === "completed"
                    ? "bg-forest-900/30 text-forest-300 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200"
                    }`}
                >
                  Completados
                </button>
              </div>
            </CardHeader>
            <CardContent className="text-forest-400/90 p-2 sm:p-6">
              <div className="mb-4 text-xs text-forest-400/60">
                Mostrando pedidos {selectedStatus === "pending" ? "pendientes" : "completados"} de {currentMonthLabel} {selectedYear}
              </div>
              <OrdersTable
                orders={filteredOrders}
                emptyMessage={`No hay pedidos ${selectedStatus === "pending" ? "pendientes" : "completados"} para este mes`}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-forest-300">Gestión de Usuarios</CardTitle>
            </CardHeader>
            <CardContent className="text-forest-400/90 p-2 sm:p-6">
              <UsersTable users={users} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
