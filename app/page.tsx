"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowRight, Shield, Zap, PackageIcon, Award, Users, Truck, CreditCard } from "lucide-react"
import Image from "next/image"
import { Header } from "@/components/header"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Product } from "@/types"

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    async function loadProducts() {
      try {
        const supabase = createClient()
        const { data: products, error } = await supabase
          .from("products")
          .select("*")
          .limit(6)
          .order("created_at", { ascending: false })

        if (error) {
          throw error
        }

        if (products) {
          setFeaturedProducts(products)
        }
      } catch (error) {
        console.error("[v0] Error loading products:", error)
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [])

  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(cents / 100)
  }

  const benefits = [
    {
      icon: Award,
      title: "Calidad Premium",
      description: "Productos seleccionados con los más altos estándares de calidad y durabilidad",
      gradient: "from-forest-600 via-forest-500 to-forest-600",
      iconBg: "from-forest-500 to-forest-600",
    },
    {
      icon: Users,
      title: "Ofertas Exclusivas",
      description: "Descuentos especiales y acceso anticipado a colecciones para miembros",
      gradient: "from-forest-700 via-forest-600 to-forest-700",
      iconBg: "from-forest-600 to-forest-700",
    },
    {
      icon: Truck,
      title: "Envío Gratis",
      description: "Sin costo de envío en compras superiores a $50.000 en todo el país",
      gradient: "from-forest-500 via-forest-400 to-forest-500",
      iconBg: "from-forest-400 to-forest-500",
    },
    {
      icon: CreditCard,
      title: "Pagos Flexibles",
      description: "Hasta 12 cuotas sin interés y múltiples medios de pago disponibles",
      gradient: "from-forest-800 via-forest-700 to-forest-800",
      iconBg: "from-forest-700 to-forest-800",
    },
  ]

  return (
    <>
      <div className="min-h-screen bg-zinc-950 transition-colors duration-300">
        <section className="relative min-h-screen pt-24 sm:pt-28 md:pt-32 pb-12 md:pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black" />

          <div className="container relative mx-auto px-4 sm:px-6 max-w-7xl h-full">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center min-h-[80vh]">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6 md:space-y-8"
              >
                <div className="space-y-3 md:space-y-4">
                  <h1 className="text-[clamp(3rem,12vw,12rem)] md:text-[clamp(4rem,15vw,12rem)] font-bold leading-[0.85] tracking-tighter text-white">
                    urb.
                  </h1>

                  <div className="max-w-xs space-y-2">
                    <p className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-widest font-medium">
                      Colección 2025 — Nueva era del streetwear
                    </p>
                    <p className="text-[10px] sm:text-xs text-zinc-400 leading-relaxed">
                      Diseños únicos que fusionan estilo urbano con comodidad premium. Cada pieza cuenta una historia.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 md:gap-6 pt-6 md:pt-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                      <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-forest-400" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-white">Envío Express</p>
                      <p className="text-[10px] sm:text-xs text-zinc-500">24-48 horas</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                      <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-forest-400" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-white">Garantía Total</p>
                      <p className="text-[10px] sm:text-xs text-zinc-500">30 días de devolución</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-forest-500 hover:bg-forest-600 text-white h-12 sm:h-14 px-8 sm:px-10 rounded-full text-sm sm:text-base font-medium shadow-xl group w-full sm:w-auto"
                  >
                    <Link href="/products">
                      Explorar colección
                      <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden bg-zinc-900 shadow-2xl">
                  <video
                    src="https://v1.pinimg.com/videos/mc/expMp4/13/31/84/133184929fb56609beac40a303599118_t3.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2">
                    <p className="text-[10px] sm:text-xs text-white font-medium tracking-widest uppercase [writing-mode:vertical-rl] rotate-180">
                      Nueva colección 2025
                    </p>
                  </div>

                  <div className="absolute top-4 sm:top-6 left-4 sm:left-6">
                    <Badge className="bg-forest-500/90 backdrop-blur-sm text-white border-0 px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium">
                      Edición limitada
                    </Badge>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 flex justify-between items-end">
                  <div>
                    <p className="text-[10px] sm:text-xs text-zinc-600 uppercase tracking-wider mb-1">Destacado</p>
                    <p className="text-xs sm:text-sm text-zinc-400">Diseños exclusivos urbanos</p>
                  </div>
                  <p className="text-[10px] sm:text-xs text-zinc-600">001 / 024</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="relative py-12 md:py-16">
          <div className="container relative mx-auto px-4 sm:px-6 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative rounded-2xl sm:rounded-3xl bg-zinc-900/90 backdrop-blur-sm p-6 sm:p-8 md:p-12 shadow-2xl border border-zinc-800/50 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-forest-950/60 via-zinc-900/80 to-zinc-950/90 rounded-2xl sm:rounded-3xl" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-forest-950/20 via-transparent to-transparent" />

              <div className="relative z-10 text-center mb-8 md:mb-10">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-2 sm:mb-3 tracking-tight"
                >
                  Experiencia premium
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto"
                >
                  Servicio de excelencia en cada detalle
                </motion.p>
              </div>

              <div className="relative z-10 grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
                {/* Card 1: Envío Rápido - MÁS CONTENIDO */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="relative rounded-2xl bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 backdrop-blur-md p-8 shadow-xl border border-zinc-700/50 hover:border-forest-500/50 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="inline-flex items-center gap-2 bg-forest-500/20 px-4 py-2 rounded-full border border-forest-500/30">
                      <Zap className="h-4 w-4 text-forest-400" />
                      <span className="text-xs font-semibold text-forest-300 uppercase tracking-wider">Express</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-forest-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ArrowRight className="h-5 w-5 text-forest-400" />
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="inline-block px-6 py-4 bg-gradient-to-br from-forest-500 to-forest-600 rounded-2xl shadow-lg">
                      <div className="text-4xl font-bold text-white mb-1">24-48</div>
                      <div className="text-xs text-forest-100 font-medium">horas</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-white">Envío ultra rápido</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      Delivery express en CABA y GBA. Seguimiento en tiempo real de tu pedido.
                    </p>

                    <div className="pt-4 space-y-2 border-t border-zinc-700/50">
                      <div className="flex items-center gap-2 text-xs text-zinc-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-forest-500" />
                        <span>Gratis en compras +$50.000</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-zinc-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-forest-500" />
                        <span>Tracking GPS incluido</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Card 2: Producto Featured - MÁS CONTENIDO */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="relative rounded-2xl bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 backdrop-blur-md p-8 shadow-xl border border-zinc-700/50 hover:border-forest-500/50 transition-all duration-300 group"
                >
                  {featuredProducts[0] && (
                    <>
                      <div className="relative aspect-square rounded-xl overflow-hidden mb-5 bg-zinc-800 shadow-lg">
                        <Image
                          src={featuredProducts[0].image_url || "/placeholder.svg"}
                          alt={featuredProducts[0].name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute top-3 right-3 bg-forest-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                          TOP
                        </div>
                        <div className="absolute bottom-3 left-3 right-3">
                          <div className="flex items-center gap-2">
                            {featuredProducts[0].sizes?.slice(0, 3).map((size: string) => (
                              <span
                                key={size}
                                className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-[10px] text-white font-medium"
                              >
                                {size}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-1">{featuredProducts[0].name}</h3>
                          <p className="text-xs text-zinc-400 uppercase tracking-wider">
                            {featuredProducts[0].category}
                          </p>
                        </div>

                        <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2">
                          {featuredProducts[0].description}
                        </p>

                        <div className="flex items-center justify-between pt-3 border-t border-zinc-700/50">
                          <div>
                            <div className="text-2xl font-bold text-white">
                              {formatPrice(featuredProducts[0].price)}
                            </div>
                            <div className="text-xs text-zinc-500">Stock disponible</div>
                          </div>
                          <Button
                            asChild
                            size="sm"
                            className="bg-forest-500 hover:bg-forest-600 text-white rounded-full px-5 h-10 shadow-lg text-xs font-medium"
                          >
                            <Link href={`/products/${featuredProducts[0].id}`}>
                              Ver más
                              <ArrowRight className="ml-1 h-3 w-3" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>

                {/* Card 3: Garantía - MÁS CONTENIDO */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="relative rounded-2xl bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 backdrop-blur-md p-8 shadow-xl border border-zinc-700/50 hover:border-forest-500/50 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="inline-flex items-center gap-2 bg-forest-500/20 px-4 py-2 rounded-full border border-forest-500/30">
                      <Shield className="h-4 w-4 text-forest-400" />
                      <span className="text-xs font-semibold text-forest-300 uppercase tracking-wider">Garantía</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-forest-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Shield className="h-5 w-5 text-forest-400" />
                    </div>
                  </div>

                  <div className="relative aspect-square rounded-2xl overflow-hidden mb-5 bg-gradient-to-br from-forest-500/10 via-forest-600/10 to-forest-500/10 flex items-center justify-center border border-forest-500/20 shadow-inner">
                    <div className="text-center">
                      <PackageIcon className="h-16 w-16 text-forest-500/40 mx-auto mb-3" />
                      <div className="text-3xl font-bold text-forest-400">30</div>
                      <div className="text-xs text-forest-500/80 font-medium uppercase tracking-wider">días</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-white">Garantía total</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      Devoluciones sin preguntas. Cambios ilimitados. Tu satisfacción garantizada.
                    </p>

                    <div className="pt-4 space-y-2 border-t border-zinc-700/50">
                      <div className="flex items-center gap-2 text-xs text-zinc-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-forest-500" />
                        <span>Reembolso completo</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-zinc-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-forest-500" />
                        <span>Cambios sin costo</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-zinc-950">
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 md:mb-16"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white mb-3 md:mb-4">
                Explora por categoría
              </h2>
              <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto">
                Encuentra exactamente lo que buscas
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                {
                  name: "Remeras",
                  description: "Esenciales para tu guardarropa",
                  image: "/mannequin-wearing-black-t-shirt-on-olive-green-bac.jpg",
                },
                {
                  name: "Pantalones",
                  description: "Comodidad y estilo urbano",
                  image: "/mannequin-wearing-grey-pants-on-dark-grey-backgrou.jpg",
                },
                {
                  name: "Calzado",
                  description: "Pasos con personalidad",
                  image: "/mannequin-legs-wearing-shoes-on-light-grey-backgro.jpg",
                },
                {
                  name: "Accesorios",
                  description: "Detalles que marcan la diferencia",
                  image: "/female-mannequin-with-handbags-and-accessories-on-.jpg",
                },
              ].map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={`/products?category=${category.name}`}>
                    <Card className="group relative aspect-[3/4] overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer bg-zinc-800">
                      <div className="absolute inset-0">
                        <Image
                          src={category.image || "/placeholder.svg"}
                          alt={category.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500" />
                      </div>

                      <div className="absolute inset-0 flex flex-col justify-end p-6">
                        <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                          <h3 className="text-3xl font-light text-white mb-2">{category.name}</h3>
                          <p className="text-sm text-zinc-300 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            {category.description}
                          </p>
                          <div className="flex items-center text-forest-400 text-sm font-medium">
                            <span>Explorar colección</span>
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                          </div>
                        </div>
                      </div>

                      <div className="absolute inset-0 border-2 border-forest-500/0 group-hover:border-forest-500/50 rounded-lg transition-all duration-500" />
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {!loading && featuredProducts.length > 0 && (
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-12 md:mb-16"
              >
                <Badge className="bg-forest-500/20 text-forest-300 border-forest-500/30 mb-3 md:mb-4 px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm">
                  Lo más popular
                </Badge>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white mb-3 md:mb-4">
                  Productos destacados
                </h2>
                <p className="text-base sm:text-lg text-zinc-400 max-w-2xl">
                  Nuestras piezas más vendidas, elegidas por su calidad y diseño excepcional
                </p>
              </motion.div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {featuredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Link href={`/products/${product.id}`}>
                      <Card className="group border-zinc-800 shadow-md hover:shadow-2xl hover:border-forest-500/50 transition-all duration-500 overflow-hidden bg-zinc-900 h-full flex flex-col">
                        <div className="relative w-full aspect-[4/5] overflow-hidden bg-zinc-800">
                          <Image
                            src={product.image_url || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          {product.featured && (
                            <div className="absolute top-3 right-3 bg-forest-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                              TOP
                            </div>
                          )}
                        </div>
                        <CardContent className="p-5 flex-grow flex flex-col">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1 min-w-0">
                              <h3 className="text-base font-medium text-white mb-1 line-clamp-1">{product.name}</h3>
                              <p className="text-xs text-zinc-400 uppercase tracking-wider">{product.category}</p>
                            </div>
                          </div>
                          <p className="text-zinc-400 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>
                          <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-800">
                            <span className="text-xl font-semibold text-forest-400">{formatPrice(product.price)}</span>
                            <Button
                              size="sm"
                              className="bg-forest-500 hover:bg-forest-600 text-white rounded-full h-9 px-5 text-sm"
                            >
                              Ver más
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-16 md:py-24 bg-zinc-900 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 md:mb-16"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white mb-3 md:mb-4">
                ¿Por qué elegirnos?
              </h2>
              <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto">
                Beneficios pensados para brindarte la mejor experiencia de compra
              </p>
            </motion.div>

            <div className="relative">
              <motion.div
                className="flex gap-4 sm:gap-6"
                animate={{
                  x: [0, -(isMobile ? 260 + 16 : 320 + 24) * benefits.length],
                }}
                transition={{
                  x: {
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    duration: 21,
                    ease: "linear",
                  },
                }}
              >
                {[...benefits, ...benefits].map((benefit, index) => {
                  const Icon = benefit.icon
                  return (
                    <div key={`benefit-${index}`} className="min-w-[260px] sm:min-w-[320px] flex-shrink-0">
                      <Card className="h-full border-zinc-800 bg-zinc-900/90 backdrop-blur-sm shadow-lg overflow-hidden group hover:shadow-2xl hover:border-forest-500/30 transition-all duration-500">
                        <CardContent className="p-6 sm:p-8 h-full flex flex-col">
                          <div
                            className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${benefit.iconBg} flex items-center justify-center mb-4 sm:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}
                          >
                            <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                          </div>
                          <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">{benefit.title}</h3>
                          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed flex-grow">{benefit.description}</p>
                          <div
                            className={`mt-4 sm:mt-6 h-1 w-full rounded-full bg-gradient-to-r ${benefit.gradient} opacity-50 group-hover:opacity-100 transition-opacity duration-500`}
                          />
                        </CardContent>
                      </Card>
                    </div>
                  )
                })}
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-cream-50 dark:bg-forest-950/20">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-forest-600 via-forest-700 to-forest-800 dark:from-forest-500 dark:via-forest-600 dark:to-forest-700 p-8 sm:p-12 md:p-16 text-center shadow-2xl"
            >
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-white blur-3xl" />
                <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-white blur-3xl" />
              </div>

              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4 sm:mb-6 tracking-tight">
                  Renovate con estilo
                </h2>
                <p className="text-base sm:text-lg text-white/80 mb-8 sm:mb-10 max-w-2xl mx-auto">
                  Descubrí una nueva forma de vestir. Únete a nuestra comunidad y accede a ofertas exclusivas.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-forest-700 hover:bg-cream-50 h-12 sm:h-14 px-8 sm:px-10 text-sm sm:text-base rounded-full font-medium shadow-xl"
                  >
                    <Link href="/products">Comenzar a comprar</Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white/10 h-12 sm:h-14 px-8 sm:px-10 text-sm sm:text-base rounded-full bg-transparent"
                  >
                    <Link href="/auth/signup">Crear cuenta</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}
