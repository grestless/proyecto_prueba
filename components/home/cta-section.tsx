"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"

export function CtaSection() {
    return (
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
    )
}
