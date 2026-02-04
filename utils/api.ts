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
    
    switch (slug) {
      case 'home':
        return mockHomePageData;
      case 'contact':
        return mockContactPageData;
      case 'blog':
        return mockBlogPageData;
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

