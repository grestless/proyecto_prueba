import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { XCircle } from "lucide-react"

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
      <Card className="max-w-md w-full border-red-800/50 bg-zinc-900/50 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-900/50">
            <XCircle className="h-12 w-12 text-red-400" />
          </div>
          <CardTitle className="text-3xl text-red-300">Checkout Cancelled</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <p className="text-red-400">Your order was not completed. Your cart items are still saved.</p>

          <div className="flex flex-col gap-3">
            <Button asChild className="w-full bg-forest-600 hover:bg-forest-700">
              <Link href="/cart">Return to Cart</Link>
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
