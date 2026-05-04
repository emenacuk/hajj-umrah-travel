import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://frontend-hajjumrah.holyvibes.co.uk';

    return {
        rules: [
            {
                userAgent: '*',
                allow: ['/'],
            },
            {
                userAgent: 'AdsBot-Google',
                allow: ['/'],
            },
            {
                userAgent: 'Googlebot',
                allow: ['/'],
            },
        ],
        sitemap: [
            `${baseUrl}/sitemap.xml`,
            `${baseUrl}/post-sitemap.xml`,
        ],
    };
}
