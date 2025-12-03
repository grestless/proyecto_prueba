import { createClient } from "@/lib/supabase/server"
import { HomeContent } from "@/components/home/home-content"
import { JsonLd } from "@/components/json-ld"

export default async function HomePage() {
  const supabase = await createClient()
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .limit(6)
    .order("created_at", { ascending: false })

  const featuredProducts = products || []

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Urban Style",
    url: "https://celutronix.vercel.app",
    logo: "https://celutronix.vercel.app/celutronix-logo-new.png",
    sameAs: [
      "https://facebook.com/urbanstyle",
      "https://instagram.com/urbanstyle",
      "https://twitter.com/urbanstyle"
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+54-11-1234-5678",
      contactType: "Customer Service"
    }
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <HomeContent initialFeaturedProducts={featuredProducts} />
    </>
  )
}
