"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowRight, Shield, Zap } from "lucide-react"
import { motion } from "framer-motion"

export function HeroSection() {
    return (
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
    )
}
