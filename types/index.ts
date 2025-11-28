export interface Product {
  id: string
  name: string
  description: string | null
  price: number // in cents
  image_url: string | null
  images: string[] | null // Array de URLs de imágenes
  category: string | null
  stock: number
  sizes: string[] // Talles disponibles (ej: ['S', 'M', 'L'] o ['38', '40', '42'])
  colors: string[] // Colores disponibles
  featured: boolean | null
  created_at: string
  updated_at: string
}

export interface CartItem {
  id: string
  user_id: string
  product_id: string
  quantity: number
  selected_size: string | null // Talle seleccionado
  selected_color: string | null // Color seleccionado
  created_at: string
  product?: Product
}

export interface Order {
  id: string
  user_id: string
  total: number // in cents
  status: string
  stripe_session_id: string | null
  created_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  product_name: string
  product_price: number
  quantity: number
  selected_size: string | null // Talle seleccionado en el pedido
  selected_color: string | null // Color seleccionado en el pedido
  created_at: string
}

export interface Profile {
  id: string
  email: string
  name: string | null
  role: "user" | "admin"
  phone: string | null
  address: string | null
  avatar_url: string | null
  created_at: string
}
