"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export function AddProductDialog() {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      const priceInDollars = Number.parseFloat(formData.get("price") as string)
      const stock = Number.parseInt(formData.get("stock") as string)

      // Validate inputs
      if (isNaN(priceInDollars) || priceInDollars <= 0) {
        toast.error("El precio debe ser un número mayor a 0")
        return
      }

      if (isNaN(stock) || stock < 0) {
        toast.error("El stock debe ser un número mayor o igual a 0")
        return
      }

      const priceInCents = Math.round(priceInDollars * 100)

      const { error } = await supabase.from("products").insert({
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        price: priceInCents,
        category: formData.get("category") as string,
        stock: stock,
        image_url: formData.get("image_url") as string,
      })

      if (error) {
        console.error("[v0] Error adding product:", error)
        throw new Error("Error al agregar el producto")
      }

      toast.success("¡Producto agregado exitosamente!")
      setOpen(false)
      router.refresh()
    } catch (error) {
      console.error("[v0] Error in handleSubmit:", error)
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Error al agregar el producto. Por favor, intenta nuevamente.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4 mr-2" />
          Agregar Producto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-emerald-900">Agregar Nuevo Producto</DialogTitle>
          <DialogDescription className="text-emerald-700">Crea un nuevo producto en tu catálogo</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-emerald-900">
              Nombre del Producto
            </Label>
            <Input
              id="name"
              name="name"
              required
              placeholder="Ingresa el nombre del producto"
              className="border-emerald-200 focus:border-emerald-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-emerald-900">
              Descripción
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Ingresa la descripción del producto"
              className="border-emerald-200 focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price" className="text-emerald-900">
                Precio ($)
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0.01"
                required
                placeholder="0.00"
                className="border-emerald-200 focus:border-emerald-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock" className="text-emerald-900">
                Stock
              </Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                min="0"
                required
                placeholder="0"
                className="border-emerald-200 focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-emerald-900">
              Categoría
            </Label>
            <Input
              id="category"
              name="category"
              placeholder="ej: Té, Cuidado de la piel, Fitness"
              className="border-emerald-200 focus:border-emerald-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image_url" className="text-emerald-900">
              URL de Imagen
            </Label>
            <Input
              id="image_url"
              name="image_url"
              type="url"
              placeholder="https://ejemplo.com/imagen.jpg"
              className="border-emerald-200 focus:border-emerald-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 bg-transparent"
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-emerald-600 hover:bg-emerald-700">
              {isLoading ? "Agregando..." : "Agregar Producto"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
