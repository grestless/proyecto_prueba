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
import { Plus, X, ChevronDown } from "lucide-react"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const COMMON_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "38", "40", "42", "44", "46"]
const COMMON_COLORS = ["Negro", "Blanco", "Gris", "Azul", "Rojo", "Verde", "Beige", "Marrón", "Amarillo", "Rosa"]

export function AddProductDialog() {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [currentImageUrl, setCurrentImageUrl] = useState("")
  const [sizes, setSizes] = useState<string[]>([])
  const [currentSize, setCurrentSize] = useState("")
  const [colors, setColors] = useState<string[]>([])
  const [currentColor, setCurrentColor] = useState("")
  const router = useRouter()
  const supabase = createClient()

  const addImageUrl = () => {
    if (currentImageUrl.trim()) {
      setImageUrls([...imageUrls, currentImageUrl.trim()])
      setCurrentImageUrl("")
    }
  }

  const removeImageUrl = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index))
  }

  const addSize = () => {
    if (currentSize.trim()) {
      setSizes([...sizes, currentSize.trim()])
      setCurrentSize("")
    }
  }



  const addColor = () => {
    if (currentColor.trim()) {
      setColors([...colors, currentColor.trim()])
      setCurrentColor("")
    }
  }

  const removeSize = (index: number) => {
    setSizes(sizes.filter((_, i) => i !== index))
  }

  const toggleSize = (size: string) => {
    if (sizes.includes(size)) {
      setSizes(sizes.filter((s) => s !== size))
    } else {
      setSizes([...sizes, size])
    }
  }

  const removeColor = (index: number) => {
    setColors(colors.filter((_, i) => i !== index))
  }

  const toggleColor = (color: string) => {
    if (colors.includes(color)) {
      setColors(colors.filter((c) => c !== color))
    } else {
      setColors([...colors, color])
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      const priceInDollars = Number.parseFloat(formData.get("price") as string)
      const stock = Number.parseInt(formData.get("stock") as string)

      if (isNaN(priceInDollars) || priceInDollars <= 0) {
        toast.error("El precio debe ser un número mayor a 0")
        return
      }

      if (isNaN(stock) || stock < 0) {
        toast.error("El stock debe ser un número mayor o igual a 0")
        return
      }

      if (imageUrls.length === 0) {
        toast.error("Debe agregar al menos una imagen")
        return
      }

      // Check session before proceeding
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      if (sessionError || !session) {
        toast.error("Tu sesión ha expirado. Por favor, recarga la página e inicia sesión nuevamente.")
        return
      }

      const priceInCents = Math.round(priceInDollars * 100)

      // Create a promise that rejects after 10 seconds
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("La operación tardó demasiado. Por favor, verifica tu conexión.")), 10000)
      })

      const insertPromise = supabase.from("products").insert({
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        price: priceInCents,
        category: formData.get("category") as string,
        stock: stock,
        image_url: imageUrls[0],
        images: imageUrls,
        sizes: sizes,
        colors: colors,
      })

      // Race the insert against the timeout
      const { error } = await Promise.race([insertPromise, timeoutPromise]) as any

      if (error) {
        console.error("[v0] Error adding product:", error)
        throw new Error("Error al agregar el producto")
      }

      toast.success("¡Producto agregado exitosamente!")
      setOpen(false)
      setImageUrls([])
      setCurrentImageUrl("")
      setSizes([])
      setCurrentSize("")
      setColors([])
      setCurrentColor("")
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
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            <Label className="text-emerald-900">Talles Disponibles</Label>
            <div className="flex flex-wrap gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-emerald-200 text-emerald-700">
                    Seleccionar Talles <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  {COMMON_SIZES.map((size) => (
                    <DropdownMenuCheckboxItem
                      key={size}
                      checked={sizes.includes(size)}
                      onCheckedChange={() => toggleSize(size)}
                    >
                      {size}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Input
                value={currentSize}
                onChange={(e) => setCurrentSize(e.target.value)}
                placeholder="Otro talle..."
                className="border-emerald-200 focus:border-emerald-500 w-[120px]"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addSize()
                  }
                }}
              />
              <Button
                type="button"
                onClick={addSize}
                variant="outline"
                className="border-emerald-200 bg-transparent"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {sizes.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {sizes.map((size, index) => (
                  <div key={index} className="flex items-center gap-1 px-2 py-1 bg-emerald-50 rounded-md">
                    <span className="text-sm text-emerald-900">{size}</span>
                    <button
                      type="button"
                      onClick={() => removeSize(index)}
                      className="text-emerald-500 hover:text-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-emerald-900">Colores Disponibles</Label>
            <div className="flex flex-wrap gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-emerald-200 text-emerald-700">
                    Seleccionar Colores <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  {COMMON_COLORS.map((color) => (
                    <DropdownMenuCheckboxItem
                      key={color}
                      checked={colors.includes(color)}
                      onCheckedChange={() => toggleColor(color)}
                    >
                      {color}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Input
                value={currentColor}
                onChange={(e) => setCurrentColor(e.target.value)}
                placeholder="Otro color..."
                className="border-emerald-200 focus:border-emerald-500 w-[120px]"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addColor()
                  }
                }}
              />
              <Button
                type="button"
                onClick={addColor}
                variant="outline"
                className="border-emerald-200 bg-transparent"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {colors.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {colors.map((color, index) => (
                  <div key={index} className="flex items-center gap-1 px-2 py-1 bg-emerald-50 rounded-md">
                    <span className="text-sm text-emerald-900">{color}</span>
                    <button
                      type="button"
                      onClick={() => removeColor(index)}
                      className="text-emerald-500 hover:text-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-emerald-900">Imágenes del Producto</Label>
            <div className="flex flex-wrap gap-2">
              <Input
                type="url"
                value={currentImageUrl}
                onChange={(e) => setCurrentImageUrl(e.target.value)}
                placeholder="https://ejemplo.com/imagen.jpg"
                className="border-emerald-200 focus:border-emerald-500"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addImageUrl()
                  }
                }}
              />
              <Button
                type="button"
                onClick={addImageUrl}
                variant="outline"
                className="border-emerald-200 bg-transparent"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {imageUrls.length > 0 && (
              <div className="space-y-2 mt-3">
                {imageUrls.map((url, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-emerald-50 rounded-md">
                    <span className="text-sm text-emerald-900 flex-1 truncate">{url}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeImageUrl(index)}
                      className="h-6 w-6 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <p className="text-xs text-emerald-600">{imageUrls.length} imagen(es) agregada(s)</p>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setOpen(false)
                setImageUrls([])
                setCurrentImageUrl("")
                setSizes([])
                setCurrentSize("")
                setColors([])
                setCurrentColor("")
              }}
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
