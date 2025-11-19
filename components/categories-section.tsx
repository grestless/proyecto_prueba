"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

export function CategoriesSection() {
  const categories = [
    {
      name: "Remeras",
      description: "Estilo casual y cómodo",
      image: "/mannequin-wearing-black-t-shirt-on-olive-green-bac.jpg",
      link: "/products?category=Remeras",
    },
    {
      name: "Pantalones",
      description: "Elegancia y versatilidad",
      image: "/mannequin-wearing-grey-pants-on-dark-grey-backgrou.jpg",
      link: "/products?category=Pantalones",
    },
    {
      name: "Calzado",
      description: "Comodidad en cada paso",
      image: "/mannequin-legs-wearing-shoes-on-light-grey-backgro.jpg",
      link: "/products?category=Calzado",
    },
    {
      name: "Accesorios",
      description: "Detalles que marcan",
      image: "/female-mannequin-with-handbags-and-accessories-on-.jpg",
      link: "/products?category=Accesorios",
    },
  ]

  return (
    <section className="py-20 bg-white dark:bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-olive-100 text-olive-700 hover:bg-olive-200 mb-4">Explora</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Nuestras Categorías</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Encuentra el estilo perfecto para ti en nuestra colección curada
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.name} href={category.link}>
              <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer h-[500px]">
                {/* Imagen de fondo */}
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Overlay gradiente para mejorar legibilidad */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Contenido superpuesto */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                  <h3 className="text-3xl font-bold mb-2">{category.name}</h3>
                  <p className="text-white/90 mb-4 text-lg">{category.description}</p>
                  <div className="inline-flex items-center font-medium group-hover:gap-2 transition-all">
                    <span>Explorar</span>
                    <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
