import { BlogPost } from '@/types';
// Import mock data
import {
  mockHomePageData,
  mockContactPageData,
  mockBlogPageData,
  getMockUmrahPackage,
  getMockHajjPackage,
  mockHomePageData as mockData
} from '@/data/mockData';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';
const USE_MOCK_DATA = !API_BASE_URL || process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';

// Fetch page data from API
export async function fetchPageData(slug: string): Promise<any> {
  // Use mock data if API is not configured
  if (USE_MOCK_DATA) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    if (slug.startsWith('blog/')) {
      const postSlug = slug.replace('blog/', '');
      const post = mockBlogPageData.content.posts?.find((p: BlogPost) => p.slug === postSlug) || mockBlogPageData.content.posts?.[0];

      return {
        template_name: 'blog_detail',
        title: post?.title || 'Blog Post',
        content: {
          banner: {
            title: post?.title || 'Blog Post',
            image: '/innerbg.jpg'
          },
          body: `
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <h2>What are the primary reasons for visiting Makkah and Madinah?</h2>
                    <img src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1200" alt="Makkah" />
                    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <h2>How does travel logistics influence your decision?</h2>
                    <img src="https://images.unsplash.com/photo-1565552136439-3898162e082c?w=1200" alt="Logistics" />
                    <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                    <h2>Are there direct flights, and what are the travel times?</h2>
                    <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200" alt="Flights" />
                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                    <h2>What are the flight options available to Makkah and Madinah?</h2>
                    <img src="https://images.unsplash.com/photo-1575881875475-31023242e3f9?w=1200" alt="Options" />
                    <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
                    <h2>Footwear for Men during Umrah</h2>
                    <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.</p>
                `,
          latestPosts: mockBlogPageData.content.posts?.filter((p: BlogPost) => p.slug !== postSlug).slice(0, 10) || []
        }
      };
    }

    switch (slug) {
      case 'home':
        return mockHomePageData;
      case 'contact':
        return mockContactPageData;
      case 'blog':
        return mockBlogPageData;
      case '3-star-umrah-packages':
      case '4-star-umrah-packages':
      case '5-star-umrah-packages':
        return {
          template_name: 'singleumrahtemplate',
          title: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
          content: {
            banner: {
              title: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
              description: `Experience the finest ${slug.split('-')[0]} star Umrah pilgrimage with our specially curated packages.`,
              image: '/homebanner.png'
            },
            faqs: mockHomePageData.content.faqs || []
          }
        };
      case 'hajj-package-2026':
        return {
          template_name: 'hajj_package',
          title: 'Hajj Packages 2026',
          content: {
            banner: {
              title: 'Hajj Packages 2026',
              description: 'Join us for the journey of a lifetime. Book your Hajj 2026 package today with Bismillah Travel.',
              image: '/homebanner.png'
            },
            faqs: mockHomePageData.content.faqs || []
          }
        };
      case 'customize-hajj-umrah':
        return {
          template_name: 'customize_package',
          title: 'Customize Your Hajj & Umrah Package',
          content: {
            banner: {
              title: 'Customize Your Package',
              description: 'Tailor your spiritual journey to your preferences.',
              image: '/homebanner.png'
            }
          }
        };
      default:
        return {
          template_name: 'without_banner',
          title: slug.charAt(0).toUpperCase() + slug.slice(1),
          content: {
            description: `This is the ${slug} page.`
          }
        };
    }
  }

  // Real API call
  try {
    const response = await fetch(`${API_BASE_URL}/pages/${slug}`, {
      cache: 'no-store', // Ensure SSR
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch page data: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching page data:', error);
    return null;
  }
}

// Fetch Umrah packages
export async function fetchUmrahPackages(): Promise<any[]> {
  // Use mock data if API is not configured
  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockData.content.umrahPackages || [];
  }

  // Real API call
  try {
    const response = await fetch(`${API_BASE_URL}/umrah/packages`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Umrah packages: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching Umrah packages:', error);
    return [];
  }
}

// Fetch Hajj packages
export async function fetchHajjPackages(): Promise<any[]> {
  // Use mock data if API is not configured
  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockData.content.hajjPackages || [];
  }

  // Real API call
  try {
    const response = await fetch(`${API_BASE_URL}/hajj/packages`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Hajj packages: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching Hajj packages:', error);
    return [];
  }
}

// Fetch single package (Umrah)
export async function fetchUmrahPackage(id: string): Promise<any> {
  // Use mock data if API is not configured
  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 100));
    return getMockUmrahPackage(id);
  }

  // Real API call
  try {
    const response = await fetch(`${API_BASE_URL}/umrah/packages/${id}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Umrah package: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching Umrah package:', error);
    return null;
  }
}

// Fetch single package (Hajj)
export async function fetchHajjPackage(id: string): Promise<any> {
  // Use mock data if API is not configured
  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 100));
    return getMockHajjPackage(id);
  }

  // Real API call
  try {
    const response = await fetch(`${API_BASE_URL}/hajj/packages/${id}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Hajj package: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching Hajj package:', error);
    return null;
  }
}

// Submit inquiry form
export async function submitInquiry(data: Record<string, any>): Promise<boolean> {
  // Use mock data if API is not configured
  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('Mock inquiry submission:', data);
    // Simulate successful submission
    return true;
  }

  // Real API call
  try {
    const response = await fetch(`${API_BASE_URL}/inquiry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return response.ok;
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    return false;
  }
}

