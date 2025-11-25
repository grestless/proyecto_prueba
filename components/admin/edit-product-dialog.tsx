"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { X, ImagePlus } from "lucide-react"
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
  const [images, setImages] = useState<string[]>(
    product.images && product.images.length > 0 ? product.images : [product.image_url || ""],
  )
  const [featured, setFeatured] = useState(product.featured || false)
  const router = useRouter()
  const supabase = createClient()

  const addImageField = () => {
    if (images.length < 5) {
      setImages([...images, ""])
    }
  }

  const removeImageField = (index: number) => {
    if (images.length > 1) {
      setImages(images.filter((_, i) => i !== index))
    }
  }

  const updateImage = (index: number, value: string) => {
    const newImages = [...images]
    newImages[index] = value
    setImages(newImages)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      const priceInDollars = Number.parseFloat(formData.get("price") as string)
      const stock = Number.parseInt(formData.get("stock") as string)

      if (isNaN(priceInDollars) || priceInDollars <= 0) {
        toast.error("El precio debe ser un numero mayor a 0")
        return
      }

      if (isNaN(stock) || stock < 0) {
        toast.error("El stock debe ser un numero mayor o igual a 0")
        return
      }

      const priceInCents = Math.round(priceInDollars * 100)
      const validImages = images.filter((img) => img.trim() !== "")

      const { error } = await supabase
        .from("products")
        .update({
          name: formData.get("name") as string,
          description: formData.get("description") as string,
          price: priceInCents,
          category: formData.get("category") as string,
          stock: stock,
          image_url: validImages[0] || "",
          images: validImages,
          featured: featured,
          updated_at: new Date().toISOString(),
        })
        .eq("id", product.id)

      if (error) {
        console.error("Error updating product:", error)
        throw new Error("Error al actualizar el producto")
      }

      toast.success("Producto actualizado exitosamente!")
      onClose()
      router.refresh()
    } catch (error) {
      console.error("Error in handleSubmit:", error)
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
      <DialogContent className="sm:max-w-[550px] bg-zinc-900 border-zinc-800 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white">Editar Producto</DialogTitle>
          <DialogDescription className="text-zinc-400">Actualiza la informacion del producto</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">
              Nombre del Producto
            </Label>
            <Input
              id="name"
              name="name"
              required
              defaultValue={product.name}
              className="bg-zinc-800 border-zinc-700 text-white focus:border-forest-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-white">
              Descripcion
            </Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={product.description || ""}
              className="bg-zinc-800 border-zinc-700 text-white focus:border-forest-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price" className="text-white">
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
                className="bg-zinc-800 border-zinc-700 text-white focus:border-forest-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock" className="text-white">
                Stock
              </Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                min="0"
                required
                defaultValue={product.stock}
                className="bg-zinc-800 border-zinc-700 text-white focus:border-forest-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-white">
              Categoria
            </Label>
            <Input
              id="category"
              name="category"
              defaultValue={product.category || ""}
              className="bg-zinc-800 border-zinc-700 text-white focus:border-forest-500"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-white">Imagenes del Producto</Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={addImageField}
                disabled={images.length >= 5}
                className="text-forest-400 hover:text-forest-300 hover:bg-forest-900/20"
              >
                <ImagePlus className="h-4 w-4 mr-1" />
                Agregar
              </Button>
            </div>
            <div className="space-y-2">
              {images.map((image, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={image}
                    onChange={(e) => updateImage(index, e.target.value)}
                    placeholder={index === 0 ? "URL imagen principal" : `URL imagen ${index + 1}`}
                    className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-forest-500"
                  />
                  {images.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeImageField(index)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-900/20 shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <p className="text-xs text-zinc-500">Puedes agregar hasta 5 imagenes. La primera sera la principal.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="featured"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-4 h-4 rounded border-zinc-700 bg-zinc-800 text-forest-500 focus:ring-forest-500"
            />
            <Label htmlFor="featured" className="text-white cursor-pointer">
              Producto destacado (aparece en el inicio)
            </Label>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-zinc-700 text-white hover:bg-zinc-800 bg-transparent"
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-forest-600 hover:bg-forest-700 text-white">
              {isLoading ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
