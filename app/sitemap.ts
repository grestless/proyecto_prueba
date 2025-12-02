import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://urban-style-demo.vercel.app' // Replace with your actual domain

    // Static routes
    const routes = [
        '',
        '/products',
        '/auth/login',
        '/auth/register',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Dynamic routes (Products)
    const supabase = await createClient()
    const { data: products } = await supabase
        .from('products')
        .select('id, updated_at')

    const productRoutes = products?.map((product: { id: string; updated_at: string }) => ({
        url: `${baseUrl}/products/${product.id}`,
        lastModified: new Date(product.updated_at || new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    })) || []

    return [...routes, ...productRoutes]
}
