import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="text-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-forest-500 mx-auto" />
        <p className="text-forest-400 text-lg">Cargando...</p>
      </div>
    </div>
  )
}
