import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { CartItemComponent } from "@/components/cart-item"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingBag } from "lucide-react"
import Link from "next/link"
import { CheckoutButton } from "@/components/checkout-button"


export default async function CartPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch cart items with product details
  const { data: cartItems, error } = await supabase
    .from("cart_items")
    .select(
      `
      *,
      product:products(*)
    `,
    )
    .eq("user_id", user.id)

  if (error) {
    console.error("Error al cargar el carrito:", error)
    return <div className="container mx-auto px-4 py-8">Error al cargar el carrito</div>
  }

  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(cents / 100)
  }

  const subtotal = cartItems?.reduce((sum: number, item: any) => sum + (item.product?.price || 0) * item.quantity, 0) || 0

  const tax = Math.round(subtotal * 0.1) // 10% tax
  const total = subtotal + tax

  return (
    <>

      <div className="min-h-screen bg-zinc-950 transition-colors duration-300 pt-24 sm:pt-28 md:pt-32">
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 sm:mb-8 text-center">
            Carrito de Compras
          </h1>

          {cartItems && cartItems.length > 0 ? (
            <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="lg:col-span-2 space-y-3 sm:space-y-4">
                {cartItems.map((item: any) => (
                  <CartItemComponent key={item.id} item={item} />
                ))}
              </div>

              <div className="lg:col-span-1">
                <Card className="sticky top-24 sm:top-28 md:top-32 border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-forest-300 text-lg sm:text-xl">Resumen del Pedido</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 sm:space-y-4">
                    <div className="flex justify-between text-zinc-400 text-sm sm:text-base">
                      <span>Subtotal</span>
                      <span className="font-semibold">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400 text-sm sm:text-base">
                      <span>Impuestos (10%)</span>
                      <span className="font-semibold">{formatPrice(tax)}</span>
                    </div>
                    <div className="border-t border-zinc-800 pt-3 sm:pt-4 flex justify-between text-base sm:text-lg font-bold text-white">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>

                    <CheckoutButton cartItems={cartItems} total={total} />

                    <Button
                      variant="outline"
                      asChild
                      className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800 bg-transparent text-sm sm:text-base"
                    >
                      <Link href="/products">Seguir Comprando</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <Card className="text-center py-8 sm:py-12 border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
              <CardContent className="space-y-3 sm:space-y-4">
                <ShoppingBag className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-zinc-700" />
                <h2 className="text-xl sm:text-2xl font-semibold text-white">Tu carrito está vacío</h2>
                <p className="text-zinc-400 text-sm sm:text-base">¡Agrega algunos productos para comenzar!</p>
                <Button asChild className="bg-forest-600 hover:bg-forest-700 text-white text-sm sm:text-base">
                  <Link href="/products">Ver Productos</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  )
}
