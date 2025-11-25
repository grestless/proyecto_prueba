"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2, Star } from "lucide-react"
import { EditProductDialog } from "./edit-product-dialog"
import { DeleteProductDialog } from "./delete-product-dialog"
import { useState } from "react"
import type { Product } from "@/types"
import Image from "next/image"

interface ProductsTableProps {
  products: Product[]
}

export function ProductsTable({ products }: ProductsTableProps) {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null)

  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(cents / 100)
  }

  return (
    <>
      <div className="rounded-md border border-zinc-800 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900/70">
              <TableHead className="text-white w-16">Imagen</TableHead>
              <TableHead className="text-white">Nombre</TableHead>
              <TableHead className="text-white">Categoria</TableHead>
              <TableHead className="text-white">Precio</TableHead>
              <TableHead className="text-white">Stock</TableHead>
              <TableHead className="text-white">Estado</TableHead>
              <TableHead className="text-white text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length > 0 ? (
              products.map((product) => (
                <TableRow key={product.id} className="border-zinc-800 hover:bg-zinc-900/30">
                  <TableCell>
                    <div className="relative w-12 h-12 rounded-md overflow-hidden bg-zinc-800">
                      <Image
                        src={product.image_url || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-white">
                    <div className="flex items-center gap-2">
                      {product.name}
                      {product.featured && <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />}
                    </div>
                  </TableCell>
                  <TableCell className="text-white">{product.category || "N/A"}</TableCell>
                  <TableCell className="text-white">{formatPrice(product.price)}</TableCell>
                  <TableCell className="text-white">{product.stock}</TableCell>
                  <TableCell>
                    {product.stock > 0 ? (
                      <Badge className="bg-forest-900/30 text-forest-300 border-forest-800">En Stock</Badge>
                    ) : (
                      <Badge variant="destructive" className="bg-red-900/30 text-red-300 border-red-800">
                        Sin Stock
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditingProduct(product)}
                        className="text-forest-400 hover:text-forest-300 hover:bg-forest-900/20"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeletingProduct(product)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-white py-8">
                  No se encontraron productos
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {editingProduct && <EditProductDialog product={editingProduct} onClose={() => setEditingProduct(null)} />}
      {deletingProduct && <DeleteProductDialog product={deletingProduct} onClose={() => setDeletingProduct(null)} />}
    </>
  )
}
