"use client"


import { Product } from "@/types"
import { HeroSection } from "@/components/home/hero-section"
import { PremiumExperienceSection } from "@/components/home/premium-experience-section"
import { CategoriesSection } from "@/components/home/categories-section"
import { FeaturedProductsSection } from "@/components/home/featured-products-section"
import { BenefitsCarouselSection } from "@/components/home/benefits-carousel-section"
import { CtaSection } from "@/components/home/cta-section"

interface HomeContentProps {
    initialFeaturedProducts: Product[]
}

export function HomeContent({ initialFeaturedProducts }: HomeContentProps) {
    return (
        <div className="min-h-screen bg-zinc-950 transition-colors duration-300">
            <HeroSection />
            <PremiumExperienceSection featuredProducts={initialFeaturedProducts} />
            <CategoriesSection />
            <FeaturedProductsSection featuredProducts={initialFeaturedProducts} loading={false} />
            <BenefitsCarouselSection />
            <CtaSection />
        </div>
    )
}
