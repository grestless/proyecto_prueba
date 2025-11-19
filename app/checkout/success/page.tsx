import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle, Package } from "lucide-react"
import { redirect } from "next/navigation"

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string; order_id?: string }>
}) {
  const params = await searchParams
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Update order status to completed
  if (params.order_id) {
    await supabase.from("orders").update({ status: "completed" }).eq("id", params.order_id).eq("user_id", user.id)

    // Clear cart
    await supabase.from("cart_items").delete().eq("user_id", user.id)
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
      <Card className="max-w-md w-full border-forest-800/50 bg-zinc-900/50 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-forest-900/50">
            <CheckCircle className="h-12 w-12 text-forest-400" />
          </div>
          <CardTitle className="text-3xl text-forest-300">Order Successful!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="space-y-2">
            <p className="text-forest-400">Thank you for your purchase!</p>
            <p className="text-sm text-forest-400/70">Your order has been confirmed and will be shipped soon.</p>
            {params.order_id && (
              <p className="text-xs text-forest-500 font-mono bg-forest-950/50 p-2 rounded">
                Order ID: {params.order_id}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <Button asChild className="w-full bg-forest-600 hover:bg-forest-700">
              <Link href="/profile">
                <Package className="mr-2 h-4 w-4" />
                View Order History
              </Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="w-full border-forest-700 text-forest-400 hover:bg-forest-900/50 bg-transparent"
            >
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
