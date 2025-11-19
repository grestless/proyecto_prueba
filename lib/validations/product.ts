import { z } from "zod"

/**
 * Schema de validación para productos de ropa
 * Valida todos los campos requeridos incluyendo talles y colores
 */
export const productSchema = z.object({
  name: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres"),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(500, "La descripción no puede exceder 500 caracteres"),
  price: z.number().positive("El precio debe ser mayor a 0").int("El precio debe ser un número entero (en centavos)"),
  category: z.string().min(1, "La categoría es requerida"),
  stock: z.number().int("El stock debe ser un número entero").min(0, "El stock no puede ser negativo"),
  image_url: z.string().url("Debe ser una URL válida").optional().nullable(),
  sizes: z.array(z.string()).min(1, "Debe haber al menos un talle disponible"),
  colors: z.array(z.string()).min(1, "Debe haber al menos un color disponible"),
})

/**
 * Schema para agregar productos al carrito
 * Requiere talle y color seleccionados
 */
export const addToCartSchema = z.object({
  product_id: z.string().uuid("ID de producto inválido"),
  quantity: z.number().int().positive("La cantidad debe ser mayor a 0"),
  selected_size: z.string().min(1, "Debes seleccionar un talle"),
  selected_color: z.string().min(1, "Debes seleccionar un color"),
})

/**
 * Schema para actualizar cantidad en el carrito
 */
export const updateCartItemSchema = z.object({
  quantity: z.number().int().positive("La cantidad debe ser mayor a 0"),
})

export type ProductFormData = z.infer<typeof productSchema>
export type AddToCartData = z.infer<typeof addToCartSchema>
export type UpdateCartItemData = z.infer<typeof updateCartItemSchema>
