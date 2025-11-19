import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
      <Card className="max-w-md w-full border-forest-800/50 bg-zinc-900/50 backdrop-blur-sm">
        <CardContent className="pt-6 text-center space-y-6">
          <div className="text-9xl font-bold text-forest-900/50">404</div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-forest-300">Page Not Found</h1>
            <p className="text-forest-400">
              Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="bg-forest-600 hover:bg-forest-700">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-forest-700 text-forest-400 hover:bg-forest-900/50 bg-transparent"
            >
              <Link href="/products">
                <Search className="mr-2 h-4 w-4" />
                Browse Products
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
