import { MetadataRoute } from 'next';
import { fetchUmrahPackages, fetchHajjPackages, fetchAllNavPages } from '@/utils/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://hajjumrapackages.co.uk';

    // 1. Fetch data for dynamic routes
    const [umrahPackages, hajjPackages, navPages] = await Promise.all([
        fetchUmrahPackages(),
        fetchHajjPackages(),
        fetchAllNavPages(),
    ]);

    // 2. Map static pages from navigation (filtering out external links)
    const staticRoutes: MetadataRoute.Sitemap = navPages
        .filter((page: any) => page.url_type === 'page' || page.page_url.startsWith('/'))
        .map((page: any) => ({
            url: `${baseUrl}${page.page_url.startsWith('/') ? page.page_url : `/${page.page_url}`}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        }));

    // Add the homepage explicitly if not in nav
    if (!staticRoutes.some(route => route.url === baseUrl)) {
        staticRoutes.unshift({
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        });
    }

    // 3. Map Umrah Packages
    const umrahRoutes = umrahPackages.map((pkg: any) => ({
        url: `${baseUrl}/umrah-packages/${pkg.pageUrl}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    // 4. Map Hajj Packages
    const hajjRoutes = hajjPackages.map((pkg: any) => ({
        url: `${baseUrl}/hajj-packages/${pkg.pageUrl}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    return [
        ...staticRoutes,
        ...umrahRoutes,
        ...hajjRoutes,
    ];
}
