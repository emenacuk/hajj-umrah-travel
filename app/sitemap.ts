import { MetadataRoute } from 'next';

// Parse XML URLs from sitemap API responses
async function parseXmlSitemap(xmlContent: string): Promise<string[]> {
    const locRegex = /<loc>(.*?)<\/loc>/g;
    const urls: string[] = [];
    let match;

    while ((match = locRegex.exec(xmlContent)) !== null) {
        urls.push(match[1]);
    }

    return urls;
}

// Fetch sitemap from API
async function fetchSitemapFromAPI(apiUrl: string): Promise<string[]> {
    try {
        const response = await fetch(apiUrl, {
            next: { revalidate: 3600 }, // Revalidate every hour
        });

        if (!response.ok) {
            console.error(`Failed to fetch sitemap from ${apiUrl}:`, response.statusText);
            return [];
        }

        const xmlContent = await response.text();
        return parseXmlSitemap(xmlContent);
    } catch (error) {
        console.error(`Error fetching sitemap from ${apiUrl}:`, error);
        return [];
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const backendUrl = 'https://hajj-umrah.holyvibes.co.uk';
    const sitemapApiUrl = `${backendUrl}/api/generate-sitemap`;
    const postSitemapApiUrl = `${backendUrl}/api/generate-post-sitemap`;

    // 1. Fetch URLs from both APIs
    const [sitemapUrls, postSitemapUrls] = await Promise.all([
        fetchSitemapFromAPI(sitemapApiUrl),
        fetchSitemapFromAPI(postSitemapApiUrl),
    ]);

    // 2. Combine all URLs and map to sitemap format
    const allUrls = [...sitemapUrls, ...postSitemapUrls];

    const sitemapEntries: MetadataRoute.Sitemap = allUrls
        .filter((url): url is string => url !== null && url !== undefined && url.length > 0)
        .map((url) => ({
            url: url,
        }));

    // Remove duplicates
    const uniqueUrls = new Map(
        sitemapEntries.map((entry) => [entry.url, entry])
    );

    return Array.from(uniqueUrls.values());
}
