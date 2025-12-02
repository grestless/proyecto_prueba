"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Shield, Zap, PackageIcon } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Product } from "@/types"
import { formatPrice } from "@/lib/utils"

interface PremiumExperienceSectionProps {
    featuredProducts: Product[]
}

export function PremiumExperienceSection({ featuredProducts }: PremiumExperienceSectionProps) {
    return (
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
                        {/* Card 1: Envío Rápido */}
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

                        {/* Card 2: Producto Featured */}
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

                        {/* Card 3: Garantía */}
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
    )
}
