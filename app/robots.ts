import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://celutronix.vercel.app' // Replace with your actual domain

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/', '/profile/', '/checkout/'],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
