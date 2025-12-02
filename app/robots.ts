import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://v0-proyecto-prueba-six.vercel.app' // Replace with your actual domain

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/', '/profile/', '/checkout/'],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
