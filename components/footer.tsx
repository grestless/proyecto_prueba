"use client"

import Link from "next/link"
import { Package, ChevronDown } from "lucide-react"
import { useState } from "react"

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-zinc-800/50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-center justify-between text-left group hover:text-forest-400 transition-colors"
      >
        <span className="text-sm sm:text-base text-zinc-300 font-medium pr-4">{question}</span>
        <ChevronDown
          className={`h-4 w-4 sm:h-5 sm:w-5 text-forest-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
            }`}
        />
      </button>
      <div
        id={`faq-answer-${question.replace(/\s+/g, '-').toLowerCase()}`}
        className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 pb-4" : "max-h-0"}`}
      >
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">{answer}</p>
      </div>
    </div>
  )
}

export function Footer() {
  const faqs = [
    {
      question: "¿Cuánto tarda el envío?",
      answer:
        "Los envíos a CABA y GBA demoran entre 24-48 horas. Para el interior del país, el tiempo estimado es de 3-7 días hábiles dependiendo de la zona. Todos los envíos incluyen código de seguimiento.",
    },
    {
      question: "¿Puedo devolver o cambiar un producto?",
      answer:
        "Sí, tenés 30 días desde la recepción del pedido para realizar cambios o devoluciones sin costo adicional. El producto debe estar sin uso, con etiquetas y en su empaque original. Los reembolsos se procesan en 5-10 días hábiles.",
    },
    {
      question: "¿Cómo sé qué talle elegir?",
      answer:
        "Cada producto incluye una guía de talles detallada con medidas en centímetros basada en los talles argentinos (conversiones a US y EU incluidas). Encontrarás tablas específicas para remeras, pantalones y buzos con medidas de pecho, cintura, cadera y largo. También incluimos instrucciones de cómo medir correctamente. Si estás entre dos talles, recomendamos elegir el mayor.",
    },
    {
      question: "¿Qué métodos de pago aceptan?",
      answer:
        "Aceptamos todas las tarjetas de crédito y débito (Visa, Mastercard, American Express), transferencias bancarias, Mercado Pago y pagos en efectivo mediante Rapipago o Pago Fácil. Ofrecemos hasta 12 cuotas sin interés.",
    },
    {
      question: "¿Los productos tienen garantía?",
      answer:
        "Todos nuestros productos cuentan con garantía de calidad. Si encontrás algún defecto de fabricación dentro de los primeros 90 días, realizamos el cambio sin cargo. La garantía no cubre daños por uso inadecuado.",
    },
    {
      question: "¿Hacen envíos internacionales?",
      answer:
        "Actualmente solo realizamos envíos dentro de Argentina. Estamos trabajando para expandir nuestros servicios a otros países de Latinoamérica próximamente.",
    },
  ]

  return (
    <footer className="border-t border-zinc-800/50 bg-zinc-950">
      <div className="border-b border-zinc-800/50 bg-zinc-900/30">
        <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 max-w-4xl">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-forest-300 mb-2 sm:mb-3">
              Preguntas Frecuentes
            </h2>
            <p className="text-sm sm:text-base text-zinc-400">
              Encontrá respuestas rápidas a las consultas más comunes
            </p>
          </div>

          <div className="space-y-1">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-forest-600">
                <Package className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-forest-300">Urban Style</span>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Tu tienda de confianza para ropa urbana minimalista y atemporal.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-forest-300 mb-4">Tienda</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-sm text-zinc-400 hover:text-forest-400 transition-colors">
                  Todos los Productos
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Remeras"
                  className="text-sm text-zinc-400 hover:text-forest-400 transition-colors"
                >
                  Remeras
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Pantalones"
                  className="text-sm text-zinc-400 hover:text-forest-400 transition-colors"
                >
                  Pantalones
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Buzos"
                  className="text-sm text-zinc-400 hover:text-forest-400 transition-colors"
                >
                  Buzos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-forest-300 mb-4">Cuenta</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/profile" className="text-sm text-zinc-400 hover:text-forest-400 transition-colors">
                  Mi Perfil
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-sm text-zinc-400 hover:text-forest-400 transition-colors">
                  Carrito de Compras
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="text-sm text-zinc-400 hover:text-forest-400 transition-colors">
                  Iniciar Sesión
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-forest-300 mb-4">Soporte</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-zinc-400 hover:text-forest-400 transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-zinc-400 hover:text-forest-400 transition-colors">
                  Información de Envío
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-zinc-400 hover:text-forest-400 transition-colors">
                  Devoluciones
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-zinc-800/50 text-center text-sm text-zinc-500">
          <p>&copy; {new Date().getFullYear()} Urban Style. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
