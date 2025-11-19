"use client"

import { useEffect, useRef, type ReactNode } from "react"

interface ScrollRevealProps {
  children: ReactNode
  animation?: "fade" | "slide-up" | "slide-left" | "slide-right" | "scale" | "rotate"
  delay?: number
  className?: string
}

export function ScrollReveal({ children, animation = "fade", delay = 0, className = "" }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              element.classList.add("scroll-reveal-visible")
            }, delay)
            observer.unobserve(element)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [delay])

  const animationClass = {
    fade: "scroll-reveal-fade",
    "slide-up": "scroll-reveal-slide-up",
    "slide-left": "scroll-reveal-slide-left",
    "slide-right": "scroll-reveal-slide-right",
    scale: "scroll-reveal-scale",
    rotate: "scroll-reveal-rotate",
  }[animation]

  return (
    <div ref={ref} className={`scroll-reveal ${animationClass} ${className}`}>
      {children}
    </div>
  )
}
