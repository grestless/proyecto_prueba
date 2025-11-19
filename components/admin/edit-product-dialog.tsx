"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import type { Product } from "@/types"
import toast from "react-hot-toast"

interface EditProductDialogProps {
  product: Product
  onClose: () => void
}

export function EditProductDialog({ product, onClose }: EditProductDialogProps) {
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

      const { error } = await supabase
        .from("products")
        .update({
          name: formData.get("name") as string,
          description: formData.get("description") as string,
          price: priceInCents,
          category: formData.get("category") as string,
          stock: stock,
          image_url: formData.get("image_url") as string,
          updated_at: new Date().toISOString(),
        })
        .eq("id", product.id)

      if (error) {
        console.error("[v0] Error updating product:", error)
        throw new Error("Error al actualizar el producto")
      }

      toast.success("¡Producto actualizado exitosamente!")
      onClose()
      router.refresh()
    } catch (error) {
      console.error("[v0] Error in handleSubmit:", error)
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Error al actualizar el producto. Por favor, intenta nuevamente.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-emerald-900">Editar Producto</DialogTitle>
          <DialogDescription className="text-emerald-700">Actualiza la información del producto</DialogDescription>
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
              defaultValue={product.name}
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
              defaultValue={product.description || ""}
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
                defaultValue={(product.price / 100).toFixed(2)}
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
                defaultValue={product.stock}
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
              defaultValue={product.category || ""}
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
              defaultValue={product.image_url || ""}
              className="border-emerald-200 focus:border-emerald-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 bg-transparent"
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-emerald-600 hover:bg-emerald-700">
              {isLoading ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
