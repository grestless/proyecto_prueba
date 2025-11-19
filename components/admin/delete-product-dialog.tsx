"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { AlertTriangle } from "lucide-react"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import type { Product } from "@/types"
import toast from "react-hot-toast"

interface DeleteProductDialogProps {
  product: Product
  onClose: () => void
}

export function DeleteProductDialog({ product, onClose }: DeleteProductDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleDelete = async () => {
    setIsLoading(true)

    try {
      const { error } = await supabase.from("products").delete().eq("id", product.id)

      if (error) {
        console.error("[v0] Error deleting product:", error)
        throw new Error("Error al eliminar el producto")
      }

      toast.success("Producto eliminado exitosamente")
      onClose()
      router.refresh()
    } catch (error) {
      console.error("[v0] Error in handleDelete:", error)
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Error al eliminar el producto. Por favor, intenta nuevamente.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <DialogTitle className="text-center text-red-900">Eliminar Producto</DialogTitle>
          <DialogDescription className="text-center text-red-700">
            ¿Estás seguro de que deseas eliminar "{product.name}"? Esta acción no se puede deshacer.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-3 sm:justify-center">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 bg-transparent"
          >
            Cancelar
          </Button>
          <Button onClick={handleDelete} disabled={isLoading} className="bg-red-600 hover:bg-red-700 text-white">
            {isLoading ? "Eliminando..." : "Eliminar Producto"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
