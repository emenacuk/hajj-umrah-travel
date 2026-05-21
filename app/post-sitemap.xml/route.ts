/**
 * Route handler for /post-sitemap.xml
 * Fetches blog post sitemap from the backend API endpoint.
 */
export async function GET() {
  const apiUrl =
    "https://lime-stingray-174731.hostingersite.com/api/generate-post-sitemap";

  try {
    const response = await fetch(apiUrl, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      console.error(
        `Failed to fetch post sitemap from API: ${response.statusText}`,
      );
      // Return empty sitemap on error
      const emptySitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;
      return new Response(emptySitemap, {
        headers: {
          "Content-Type": "application/xml",
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=1800",
        },
      });
    }

    const xmlContent = await response.text();

    return new Response(xmlContent, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
      },
    });
  } catch (error) {
    console.error("Error fetching post sitemap from API:", error);
    // Return empty sitemap on error
    const emptySitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;
    return new Response(emptySitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=1800",
      },
    });
  }
}
