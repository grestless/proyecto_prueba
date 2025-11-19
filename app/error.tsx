"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { useEffect } from "react"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
      <Card className="max-w-md w-full border-red-800/50 bg-zinc-900/50 backdrop-blur-sm">
        <CardContent className="pt-6 text-center space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-900/50">
            <AlertCircle className="h-8 w-8 text-red-400" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-red-300">Something went wrong!</h1>
            <p className="text-red-400">An unexpected error occurred. Please try again.</p>
          </div>
          <div className="flex flex-col gap-3">
            <Button onClick={reset} className="bg-forest-600 hover:bg-forest-700">
              Try Again
            </Button>
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/")}
              className="border-forest-700 text-forest-400 hover:bg-forest-900/50 bg-transparent"
            >
              Go Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
