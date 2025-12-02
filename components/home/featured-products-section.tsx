"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"
import { Product } from "@/types"
import { formatPrice } from "@/lib/utils"

interface FeaturedProductsSectionProps {
    featuredProducts: Product[]
    loading: boolean
}

export function FeaturedProductsSection({ featuredProducts, loading }: FeaturedProductsSectionProps) {
    if (loading || featuredProducts.length === 0) return null

    return (
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
    )
}
