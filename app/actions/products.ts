"use server"

import { createClient } from "@/lib/supabase/server"
import { Product } from "@/types"

export async function getRelatedProducts(currentProductId: string, category: string, limit: number = 3): Promise<Product[]> {
    const supabase = await createClient()

    // 1. Try to get products from the same category
    const { data: sameCategoryProducts, error: sameCategoryError } = await supabase
        .from("products")
        .select("*")
        .eq("category", category)
        .neq("id", currentProductId)
        .limit(limit)

    if (sameCategoryError) {
        console.error("Error al obtener los productos relacionados:", sameCategoryError)
        return []
    }

    let products = sameCategoryProducts || []

    // 2. If we don't have enough, fill with other products
    if (products.length < limit) {
        const remaining = limit - products.length
        const { data: otherProducts, error: otherProductsError } = await supabase
            .from("products")
            .select("*")
            .neq("category", category) // Optional: avoid duplicates if we already fetched some
            .neq("id", currentProductId)
            .limit(remaining)

        if (otherProductsError) {
            console.error("Error al obtener los productos relacionados (fallback):", otherProductsError)
        } else if (otherProducts) {
            products = [...products, ...otherProducts]
        }
    }

    return products
}
