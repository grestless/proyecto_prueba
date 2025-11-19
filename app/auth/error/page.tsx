import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AlertCircle } from "lucide-react"

export default async function AuthErrorPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 bg-zinc-950">
      <div className="w-full max-w-sm">
        <Card className="border-red-800/50 bg-zinc-900/50 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-900/50">
              <AlertCircle className="h-10 w-10 text-red-400" />
            </div>
            <CardTitle className="text-2xl text-red-300">Authentication Error</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            {params?.error ? (
              <p className="text-sm text-red-400 mb-6">Error: {params.error}</p>
            ) : (
              <p className="text-sm text-red-400 mb-6">An unexpected error occurred during authentication.</p>
            )}
            <Button asChild className="w-full bg-forest-600 hover:bg-forest-700">
              <Link href="/auth/login">Back to Login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
