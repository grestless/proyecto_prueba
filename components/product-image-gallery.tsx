"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProductImageGalleryProps {
  images: (string | null)[]
  productName: string
}

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  // Filter out null images
  const validImages = images.filter((img): img is string => img !== null && img !== undefined)

  const handlePrevious = () => {
    setSelectedImage((prev) => (prev === 0 ? validImages.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setSelectedImage((prev) => (prev === validImages.length - 1 ? 0 : prev + 1))
  }

  if (validImages.length === 0) {
    return (
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-zinc-900">
        <Image src="/generic-product-display.png" alt={productName} fill className="object-cover" priority />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-[3/4] max-w-[500px] mx-auto rounded-2xl overflow-hidden bg-zinc-900 group">
        <Image
          src={validImages[selectedImage] || "/placeholder.svg"}
          alt={`${productName} - imagen ${selectedImage + 1}`}
          fill
          className="object-cover"
          priority
        />

        {/* Navigation Arrows - only show if more than 1 image */}
        {validImages.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-900/80 hover:bg-zinc-800 text-white"
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-900/80 hover:bg-zinc-800 text-white"
              onClick={handleNext}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}

        {/* Image Counter */}
        {validImages.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-zinc-900/80 text-white px-3 py-1 rounded-full text-sm">
            {selectedImage + 1} / {validImages.length}
          </div>
        )}
      </div>

      {/* Thumbnail Gallery - only show if more than 1 image */}
      {validImages.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 max-w-[500px] mx-auto">
          {validImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-square rounded-lg overflow-hidden bg-zinc-900 border-2 transition-all ${
                selectedImage === index ? "border-forest-400 scale-95" : "border-zinc-800 hover:border-zinc-700"
              }`}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${productName} - miniatura ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
