"use client"

import { Card } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

export function CategoriesSection() {
    return (
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
    )
}
