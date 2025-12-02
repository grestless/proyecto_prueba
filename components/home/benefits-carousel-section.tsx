"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Users, Truck, CreditCard, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function BenefitsCarouselSection() {
    const [currentSlide, setCurrentSlide] = useState(0)

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

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % benefits.length)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + benefits.length) % benefits.length)
    }

    const CurrentIcon = benefits[currentSlide].icon

    return (
        <section className="py-12 md:py-24 bg-zinc-900 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8 md:mb-16"
                >
                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-light tracking-tight text-white mb-2 md:mb-4">
                        ¿Por qué elegirnos?
                    </h2>
                    <p className="text-sm sm:text-lg text-zinc-400 max-w-2xl mx-auto">
                        Beneficios pensados para brindarte la mejor experiencia de compra
                    </p>
                </motion.div>

                {/* Mobile View: Manual Carousel */}
                <div className="md:hidden relative px-2">
                    <div className="relative overflow-hidden min-h-[140px]">
                        {/* Navigation Buttons */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-zinc-900/50 backdrop-blur-sm text-zinc-400 hover:text-white transition-colors border border-zinc-800"
                            aria-label="Previous benefit"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-zinc-900/50 backdrop-blur-sm text-zinc-400 hover:text-white transition-colors border border-zinc-800"
                            aria-label="Next benefit"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSlide}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.3 }}
                                className="w-full px-10" // Added padding for buttons
                            >
                                <Card className="border-zinc-800 bg-zinc-900/90 backdrop-blur-sm shadow-lg overflow-hidden">
                                    <CardContent className="p-4 flex flex-row items-center gap-4">
                                        <div
                                            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${benefits[currentSlide].iconBg} flex items-center justify-center shadow-lg shrink-0`}
                                        >
                                            <CurrentIcon className="h-6 w-6 text-white" />
                                        </div>
                                        <div className="flex flex-col text-left">
                                            <h3 className="text-base font-semibold text-white mb-1">{benefits[currentSlide].title}</h3>
                                            <p className="text-xs text-zinc-400 leading-relaxed">{benefits[currentSlide].description}</p>
                                        </div>
                                    </CardContent>
                                    <div
                                        className={`h-1 w-full bg-gradient-to-r ${benefits[currentSlide].gradient} opacity-50`}
                                    />
                                </Card>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Dot Indicators */}
                    <div className="flex items-center justify-center gap-2 mt-4">
                        {benefits.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-2 h-2 rounded-full transition-all ${currentSlide === index ? "bg-white w-4" : "bg-zinc-700"
                                    }`}
                                aria-label={`Go to benefit ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Desktop View: Marquee */}
                <div className="hidden md:block relative">
                    <motion.div
                        className="flex gap-6"
                        animate={{
                            x: [0, -304 * benefits.length], // (280px width + 24px gap)
                        }}
                        transition={{
                            x: {
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "loop",
                                duration: 25,
                                ease: "linear",
                            },
                        }}
                    >
                        {[...benefits, ...benefits].map((benefit, index) => {
                            const Icon = benefit.icon
                            return (
                                <div key={`benefit-desktop-${index}`} className="min-w-[280px] flex-shrink-0">
                                    <Card className="h-full border-zinc-800 bg-zinc-900/90 backdrop-blur-sm shadow-lg overflow-hidden group hover:shadow-2xl hover:border-forest-500/30 transition-all duration-500">
                                        <CardContent className="p-6 h-full flex flex-col">
                                            <div
                                                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${benefit.iconBg} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-500`}
                                            >
                                                <Icon className="h-7 w-7 text-white" />
                                            </div>
                                            <h3 className="text-xl font-semibold text-white mb-3">{benefit.title}</h3>
                                            <p className="text-sm text-zinc-400 leading-relaxed flex-grow">{benefit.description}</p>
                                            <div
                                                className={`mt-5 h-1 w-full rounded-full bg-gradient-to-r ${benefit.gradient} opacity-50 group-hover:opacity-100 transition-opacity duration-500`}
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
    )
}
