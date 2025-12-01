import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Package, Mail, Calendar, Phone, MapPin } from "lucide-react"
import { OrderHistoryItem } from "@/components/order-history-item"
import { EditProfileDialog } from "@/components/profile/edit-profile-dialog"
import { AvatarUpload } from "@/components/profile/avatar-upload"


export default async function ProfilePage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (!profile) {
    redirect("/auth/login")
  }

  // Fetch orders with items
  const { data: orders } = await supabase
    .from("orders")
    .select(
      `
      *,
      order_items(*)
    `,
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <>

      <div className="min-h-screen bg-zinc-950 transition-colors duration-300 pt-24 sm:pt-28 md:pt-32">
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 sm:mb-8 text-center">Mi Cuenta</h1>

          <Tabs
            defaultValue={searchParams.tab === "orders" ? "orders" : "profile"}
            key={searchParams.tab === "orders" ? "orders" : "profile"}
            className="space-y-4 sm:space-y-6"
          >
            <TabsList className="bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm w-full sm:w-auto grid grid-cols-2 sm:flex">
              <TabsTrigger
                value="profile"
                className="data-[state=active]:bg-forest-900/50 data-[state=active]:text-forest-300 text-xs sm:text-sm"
              >
                <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Perfil
              </TabsTrigger>
              <TabsTrigger
                value="orders"
                className="data-[state=active]:bg-forest-900/50 data-[state=active]:text-forest-300 text-xs sm:text-sm"
              >
                <Package className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Historial
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                  <CardTitle className="text-forest-300 text-lg sm:text-xl">Información de la Cuenta</CardTitle>
                  <EditProfileDialog profile={profile} />
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 p-4 sm:p-6 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                    <AvatarUpload profile={profile} />
                    <div className="text-center sm:text-left">
                      <h3 className="font-semibold text-white text-lg sm:text-xl">{profile.name || "Usuario"}</h3>
                      <p className="text-zinc-400 text-sm sm:text-base">{profile.email}</p>
                      {profile.role === "admin" && (
                        <span className="inline-block mt-2 px-3 py-1 bg-forest-600 text-white text-xs font-semibold rounded-full">
                          Administrador
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="flex items-start gap-3 p-4 border border-zinc-800 rounded-lg bg-zinc-900/30">
                      <Mail className="h-5 w-5 text-forest-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-zinc-500 mb-1">Email</p>
                        <p className="font-semibold text-white">{profile.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 border border-zinc-800 rounded-lg bg-zinc-900/30">
                      <Calendar className="h-5 w-5 text-forest-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-zinc-500 mb-1">Miembro desde</p>
                        <p className="font-semibold text-white">
                          {profile.created_at ? formatDate(profile.created_at) : "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 border border-zinc-800 rounded-lg bg-zinc-900/30">
                      <Phone className="h-5 w-5 text-forest-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-zinc-500 mb-1">Teléfono</p>
                        <p className="font-semibold text-white">{profile.phone || "No especificado"}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 border border-zinc-800 rounded-lg bg-zinc-900/30">
                      <MapPin className="h-5 w-5 text-forest-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-zinc-500 mb-1">Dirección</p>
                        <p className="font-semibold text-white">{profile.address || "No especificada"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                    <h4 className="font-semibold text-white mb-3 text-sm sm:text-base">Estadísticas de la Cuenta</h4>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <p className="text-xl sm:text-2xl font-bold text-forest-400">{orders?.length || 0}</p>
                        <p className="text-xs sm:text-sm text-zinc-500">Pedidos Totales</p>
                      </div>
                      <div>
                        <p className="text-xl sm:text-2xl font-bold text-forest-400">
                          {orders?.filter((o: any) => o.status === "completed").length || 0}
                        </p>
                        <p className="text-xs sm:text-sm text-zinc-500">Pedidos Completados</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-forest-300">Historial de Pedidos</CardTitle>
                </CardHeader>
                <CardContent>
                  {orders && orders.length > 0 ? (
                    <div className="space-y-4">
                      {orders.map((order: any) => (
                        <OrderHistoryItem key={order.id} order={order} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Package className="mx-auto h-16 w-16 text-zinc-700 mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-2">No hay pedidos aún</h3>
                      <p className="text-zinc-400">¡Comienza a comprar para ver tus pedidos aquí!</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
