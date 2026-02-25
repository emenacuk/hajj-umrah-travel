import { fetchAllBlogPosts } from '@/utils/api';

/**
 * Route handler for /post-sitemap.xml
 * Generates a dedicated XML sitemap for blog posts.
 */
export async function GET() {
    const baseUrl = 'https://hajjumrapackages.co.uk';
    const blogPosts = await fetchAllBlogPosts();

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${blogPosts
            .map((post: any) => {
                const slug = post.slug || post.page_url || post.id;
                return `
    <url>
      <loc>${baseUrl}/blog/${slug}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.6</priority>
    </url>`;
            })
            .join('')}
</urlset>`;

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600',
        },
    });
}
