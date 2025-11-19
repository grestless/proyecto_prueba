import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle } from "lucide-react"

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 bg-zinc-950">
      <div className="w-full max-w-sm">
        <Card className="border-forest-800/50 bg-zinc-900/50 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-forest-900/50">
              <CheckCircle className="h-10 w-10 text-forest-400" />
            </div>
            <CardTitle className="text-2xl text-forest-300">Check Your Email</CardTitle>
            <CardDescription className="text-forest-400">We&apos;ve sent you a confirmation link</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-forest-400/80 mb-6">
              Please check your email and click the confirmation link to activate your account before signing in.
            </p>
            <Button asChild className="w-full bg-forest-600 hover:bg-forest-700">
              <Link href="/auth/login">Back to Login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
