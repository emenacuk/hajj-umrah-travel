// API Configuration - Hardcoded URLs (no env file needed)
const API_BASE_URL = 'https://hajj-umrah.holyvibes.co.uk/api';
export const MEDIA_BASE_URL = 'https://hajj-umrah.holyvibes.co.uk';

// API Response Types
export interface ApiResponse<T> {
  status: number;
  message: string;
  result: T;
}

export interface PageApiResult {
  id: number;
  title: string;
  parent_id: string;
  page_template: string;
  search_engine: number;
  banner_heading: string;
  banner_subheading: string | null;
  seo_content_enable: number;
  page_url: string | null;
  url_type: string;
  browser_title: string;
  meta_keywords: string | null;
  meta_description: string;
  scroll_description: string;
  widgets_content: string;
  content: string;
  script: string;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  faqs_heading: string;
  faqs_subheading: string;
  sort_order: number;
  status: number;
  section1_image_url: string | null;
  section3_image_url: string | null;
  scroll_image_url: string | null;
  airline_heading: string | null;
  airline_subheading: string | null;
  services_heading: string | null;
  services_subheading: string | null;
  services_image_url: string | null;
  services_items: string | null;
  ourclientsays_widget: Array<{
    heading: string;
    sub_heading: string;
    description?: string;
    reviews_ids: string;
  }>;
  section_1_widget: Array<{
    heading: string;
    subheading: string;
    umrah_type: string;
    umrah_package_ids: string;
    star: string;
    button_text: string;
    button_link: string;
    slider_enable: string;
  }>;
  section_2_widget: Array<{
    heading: string;
    subheading: string;
    umrah_type: string;
    umrah_package_ids: string;
    star: string;
    button_text: string;
    button_link: string;
    slider_enable: string;
  }>;
  section_3_widget: Array<{
    heading: string;
    subheading: string;
    hajj_type: string;
    hajj_package_ids: string;
    button_text: string;
    button_link: string;
    slider_enable: string;
  }>;
  section_4_widget: Array<{
    heading: string;
    subheading?: string;
    description?: string;
    umrah_type: string;
    umrah_package_ids?: string;
    star?: string;
    button_text: string;
    button_link: string;
    slider_enable: string;
  }>;
  simple_description: string | null;
  simple_image_url: string | null;
  simple_image_title: string | null;
  simple_image_alt: string | null;
  customization_data?: {
    heading: string;
    subheading: string;
    description: string;
    image_url: string;
    button_text: string;
    button_link: string;
  };
}

export interface GeneralSettings {
  settings: Array<{
    id: number;
    ref_name: string;
    is_active: boolean;
    contents: {
      main_logo?: string;
      dark_logo?: string;
      favicon?: string;
      footer_logo?: string;
      header_phone?: string;
      header_whatsApp?: string;
    };
  }>;
  navigation_bar: NavigationBarItem[];
  global_variables: GlobalVariable[];
  footer_setting: FooterSetting;
}

export interface NavigationBarItem {
  id: number;
  title: string;
  page_url: string;
  url_type: string;
  parent_id: string;
  sort_order: number | null;
}

export interface GlobalVariable {
  code: string;
  code_value: string;
  is_active: boolean;
}

export interface FooterSetting {
  logo: string;
  social_media_icons: {
    enable_social_media_icons: string;
    [key: string]: string | null;
  };
  contents: {
    link_1_heading: string;
    link_1_content: string;
    link_2_heading: string;
    link_2_content: string;
    footer_contact_heading: string;
    footer_phone: string;
    footer_email: string;
    footer_address: string;
    footer_copyright_content: string;
    footer_below_copyright_text: string;
    [key: string]: string;
  };
}

// Fetch general settings from API
export async function getGeneralSettings(): Promise<GeneralSettings | null> {
  const url = `${API_BASE_URL}/general-setting`;
  console.log('[API] Fetching general settings:', url);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`API Error ${response.status}: ${response.statusText}`);
    }

    const apiResponse: ApiResponse<GeneralSettings> = await response.json();

    if (apiResponse.status !== 1 || !apiResponse.result) {
      throw new Error(apiResponse.message || 'API returned unsuccessful status');
    }

    return apiResponse.result;
  } catch (error) {
    console.error('[API] Error fetching general settings:', error);
    return null;
  }
}

// Fetch page data from API using /get-page endpoint (GET request)
export async function fetchPageData(slug: string): Promise<any> {
  // API expects GET request - for home page, no query param needed (as shown in Postman)
  // For other pages, slug might be needed as query parameter
  const url = slug === 'home'
    ? `${API_BASE_URL}/get-page`
    : `${API_BASE_URL}/get-page?page_url=${encodeURIComponent(slug)}`;

  console.log('[API] Fetching page data:', { url, slug });

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store', // Ensure SSR
      next: { revalidate: 0 }, // Disable caching
    });

    console.log('[API] Response status:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[API] Error Response:', errorText);
      throw new Error(`API Error ${response.status}: ${response.statusText} - ${errorText.substring(0, 200)}`);
    }

    const responseText = await response.text();
    console.log('[API] Response text length:', responseText.length);

    let apiResponse: ApiResponse<PageApiResult>;
    try {
      apiResponse = JSON.parse(responseText);
    } catch (parseError) {
      console.error('[API] JSON Parse Error:', parseError);
      console.error('[API] Response text:', responseText.substring(0, 500));
      throw new Error('Invalid JSON response from API');
    }

    console.log('[API] Parsed response:', {
      status: apiResponse.status,
      message: apiResponse.message,
      hasResult: !!apiResponse.result
    });

    if (apiResponse.status !== 1 || !apiResponse.result) {
      throw new Error(apiResponse.message || 'API returned unsuccessful status');
    }

    // [ANTI-GRAVITY FIX] Handle API returning Home Page as fallback for invalid slugs
    // If we're not requesting 'home' and the API returns '0' or 'Home Template', it's a 404
    if (slug !== 'home' && (apiResponse.result.page_template === '0' || apiResponse.result.page_template === 'Home Template')) {
      console.warn(`[API] Detected fallback to home for invalid slug: ${slug}`);
      throw new Error('Page not found');
    }

    // Transform API response to match component expectations
    const transformedData = transformPageData(apiResponse.result);
    const result = apiResponse.result as any;

    // Fetch section packages separately as requested
    console.log('[API] Fetching section packages individually...');

    // Section 1 Pricing Widget
    try {
      if (result.section_1_widget?.[0]) {
        const widget = result.section_1_widget[0];
        const uIds = widget.umrah_package_ids ? parseIdsString(widget.umrah_package_ids) : [];
        const hIds = widget.hajj_package_ids ? parseIdsString(widget.hajj_package_ids) : [];

        if (uIds.length > 0) {
          transformedData.content.section1Packages = await fetchUmrahPackagesByIds(uIds);
        } else if (hIds.length > 0) {
          transformedData.content.section1Packages = await fetchHajjPackagesByIds(hIds);
        } else if (widget.umrah_type) {
          transformedData.content.section1Packages = await fetchUmrahPackagesByType(widget.umrah_type);
        } else if (widget.hajj_type) {
          transformedData.content.section1Packages = await fetchHajjPackagesByType(widget.hajj_type);
        }
      }
    } catch (e) {
      console.error('[API] Failed to fetch Section 1 packages:', e);
      transformedData.content.section1Packages = [];
    }

    // Section 2 Pricing Widget
    try {
      if (result.section_2_widget?.[0]) {
        const widget = result.section_2_widget[0];
        const uIds = widget.umrah_package_ids ? parseIdsString(widget.umrah_package_ids) : [];
        const hIds = widget.hajj_package_ids ? parseIdsString(widget.hajj_package_ids) : [];

        if (uIds.length > 0) {
          transformedData.content.section2Packages = await fetchUmrahPackagesByIds(uIds);
        } else if (hIds.length > 0) {
          transformedData.content.section2Packages = await fetchHajjPackagesByIds(hIds);
        } else if (widget.umrah_type) {
          transformedData.content.section2Packages = await fetchUmrahPackagesByType(widget.umrah_type);
        } else if (widget.hajj_type) {
          transformedData.content.section2Packages = await fetchHajjPackagesByType(widget.hajj_type);
        }
      }
    } catch (e) {
      console.error('[API] Failed to fetch Section 2 packages:', e);
      transformedData.content.section2Packages = [];
    }

    // Section 3 Pricing Widget
    try {
      if (result.section_3_widget?.[0]) {
        const widget = result.section_3_widget[0];
        const uIds = widget.umrah_package_ids ? parseIdsString(widget.umrah_package_ids) : [];
        const hIds = widget.hajj_package_ids ? parseIdsString(widget.hajj_package_ids) : [];

        if (hIds.length > 0) {
          transformedData.content.section3Packages = await fetchHajjPackagesByIds(hIds);
        } else if (uIds.length > 0) {
          transformedData.content.section3Packages = await fetchUmrahPackagesByIds(uIds);
        } else if (widget.hajj_type) {
          transformedData.content.section3Packages = await fetchHajjPackagesByType(widget.hajj_type);
        } else if (widget.umrah_type) {
          transformedData.content.section3Packages = await fetchUmrahPackagesByType(widget.umrah_type);
        }
      }
    } catch (e) {
      console.error('[API] Failed to fetch Section 3 packages:', e);
      transformedData.content.section3Packages = [];
    }

    // Section 4 Pricing Widget (Exploration)
    try {
      if (result.section_4_widget?.[0]) {
        const widget = result.section_4_widget[0];
        const uIds = widget.umrah_package_ids ? parseIdsString(widget.umrah_package_ids) : [];
        const hIds = widget.hajj_package_ids ? parseIdsString(widget.hajj_package_ids) : [];

        if (uIds.length > 0) {
          transformedData.content.section4Packages = await fetchUmrahPackagesByIds(uIds);
        } else if (hIds.length > 0) {
          transformedData.content.section4Packages = await fetchHajjPackagesByIds(hIds);
        } else if (widget.umrah_type) {
          transformedData.content.section4Packages = await fetchUmrahPackagesByType(widget.umrah_type);
        } else if (widget.hajj_type) {
          transformedData.content.section4Packages = await fetchHajjPackagesByType(widget.hajj_type);
        }
      }
    } catch (e) {
      console.error('[API] Failed to fetch Section 4 packages:', e);
      transformedData.content.section4Packages = [];
    }

    // Reviews Section
    try {
      if (result.ourclientsays_widget?.[0]) {
        const widget = result.ourclientsays_widget[0];
        const ids = widget.reviews_ids ? parseIdsString(widget.reviews_ids) : [];
        if (ids.length > 0) {
          transformedData.content.reviews = await fetchReviewsByIds(ids);
        }
      }
    } catch (e) {
      console.error('[API] Failed to fetch reviews:', e);
      transformedData.content.reviews = [];
    }

    // Blog Section
    try {
      let blogSectionData = result.blog_section_data;
      // Handle stringified JSON which is common in this API for widget data
      if (typeof blogSectionData === 'string') {
        try {
          blogSectionData = JSON.parse(blogSectionData);
        } catch (e) {
          console.error('[API] Error parsing blog_section_data string:', e);
        }
      }

      if (blogSectionData?.blog_ids) {
        const blogIds = parseIdsString(String(blogSectionData.blog_ids));
        if (blogIds.length > 0) {
          const rawBlogs = await getBlogsByIds(blogIds);
          // Attach mapped blogs and other data onto the blog_section_data object in content
          transformedData.content.blog_section_data = {
            ...blogSectionData,
            blogs: rawBlogs.map(mapBlogData),
          };
        }
      } else if (blogSectionData) {
        // If no blog_ids but we have the object, ensure it's still available
        transformedData.content.blog_section_data = blogSectionData;
      }
    } catch (e) {
      console.error('[API] Failed to fetch blog section data:', e);
    }

    console.log('[API] Section packages and reviews fetched:', {
      s1: transformedData.content.section1Packages?.length || 0,
      s2: transformedData.content.section2Packages?.length || 0,
      s3: transformedData.content.section3Packages?.length || 0,
      s4: transformedData.content.section4Packages?.length || 0,
      reviews: transformedData.content.reviews?.length || 0,
    });

    return transformedData;
  } catch (error: any) {
    console.error('[API] Error fetching page data:', {
      message: error?.message,
      name: error?.name,
      slug,
      url,
      error: error
    });
    throw error; // Re-throw to let calling code handle it
  }
}

// Transform API page data to component format
function transformPageData(apiData: PageApiResult): any {
  // Map API template names to our template resolver names
  const templateMapping: Record<string, string> = {
    'Home Template': 'home',
    'Hajj Package Template': 'hajj_package',
    'Umrah Package Template': 'umrah_package',
    'Package Listing Template': 'listing',
    'About Us Template': 'about_us',
    'Contact Us Template': 'contact',
    'Static With Banner Template': 'static_with_banner',
    'Static Without Banner Template': 'without_banner',
    'Blog Template': 'blog',
    'Reviews Template': 'reviews',
    'Customization Template': 'customize_package',
    'Visa Template': 'visa',
  };

  let templateName = templateMapping[apiData.page_template] || 'home';

  // Fallback check
  if (!templateMapping[apiData.page_template] && apiData.page_template) {
    const templateLower = apiData.page_template.toLowerCase();
    if (templateLower.includes('home')) {
      templateName = 'home';
    } else if (templateLower.includes('umrah')) {
      templateName = templateLower.includes('single') ? 'single_umrah' : 'umrah_package';
    } else if (templateLower.includes('hajj')) {
      templateName = templateLower.includes('single') ? 'single_hajj' : 'hajj_package';
    } else if (templateLower.includes('contact')) {
      templateName = 'contact';
    } else if (templateLower.includes('blog')) {
      templateName = 'blog';
    } else {
      templateName = apiData.page_template.toLowerCase().replace(/\s+/g, '_');
    }
  }

  return {
    id: apiData.id,
    page_template: apiData.page_template,
    template_name: templateName, // Keep for internal mapping if needed
    title: apiData.title,
    banner_heading: apiData.banner_heading,
    banner_subheading: apiData.banner_subheading,
    search_engine: apiData.search_engine,
    image_url: (apiData as any).image_url,
    page_url: apiData.page_url,
    simple_description: apiData.simple_description || '',
    simple_image_url: apiData.simple_image_url || '',
    simple_image_title: apiData.simple_image_title || '',
    simple_image_alt: apiData.simple_image_alt || '',
    content: {
      banner: {
        title: apiData.banner_heading,
        subtitle: apiData.banner_subheading,
        description: apiData.banner_subheading,
        image: (apiData as any).image_url,
      },
      faqs: apiData.faqs || [],
      faqs_heading: apiData.faqs_heading,
      faqs_subheading: apiData.faqs_subheading,
      scroll_description: apiData.scroll_description,
      scroll_image_url: apiData.scroll_image_url,
      section1_image_url: apiData.section1_image_url,
      section3_image_url: apiData.section3_image_url,
      // Widget data
      section_1_widget: apiData.section_1_widget || [],
      section_2_widget: apiData.section_2_widget || [],
      section_3_widget: apiData.section_3_widget || [],
      section_4_widget: (apiData as any).section_4_widget || [],
      ourclientsays_widget: apiData.ourclientsays_widget || [],
      blog_section_data: (apiData as any).blog_section_data || null,
      main_content: apiData.content,
      // Services data
      services_heading: apiData.services_heading,
      services_subheading: apiData.services_subheading,
      services_image_url: apiData.services_image_url,
      services_items: apiData.services_items,
      airline_heading: apiData.airline_heading,
      airline_subheading: apiData.airline_subheading,
    },
    customization_data: apiData.customization_data,
    meta: {
      title: apiData.browser_title,
      description: apiData.meta_description,
      keywords: apiData.meta_keywords,
    },
    script: extractPageScript(apiData),
    // Keep raw API data for reference
    _raw: apiData,
  };
}

// Fetch Umrah packages by IDs (POST per API_INTEGRATION_GUIDE or GET as verified by user)
export async function fetchUmrahPackagesByIds(ids: string[]): Promise<any[]> {
  if (!ids || ids.length === 0) {
    return [];
  }

  const idsStr = ids.map(id => id.trim()).join(',');
  const url = `${API_BASE_URL}/umrah-packages?package_ids=${idsStr}`;

  console.log('[API] Fetching Umrah packages by IDs:', url);

  try {
    // Try GET request first as verified by user
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Umrah packages: ${response.statusText}`);
    }

    const apiResponse = await response.json();
    console.log('[API] Umrah packages by IDs response:', { status: apiResponse.status, hasResult: !!apiResponse.result });

    if (apiResponse.status === 1 && apiResponse.result) {
      // Handle nested data array or direct array
      let rawPackages = [];
      if (apiResponse.result.data && Array.isArray(apiResponse.result.data)) {
        rawPackages = apiResponse.result.data;
      } else if (Array.isArray(apiResponse.result)) {
        rawPackages = apiResponse.result;
      }
      return rawPackages.map((pkg: any) => mapPackageData(pkg, 'umrah'));
    }

    // Fallback if structured response not found but it's an array
    if (Array.isArray(apiResponse)) {
      return apiResponse.map((pkg: any) => mapPackageData(pkg, 'umrah'));
    }

    return [];
  } catch (error) {
    console.error('Error fetching Umrah packages by IDs:', error);
    // Legacy fallback to POST if GET fails or as second attempt
    try {
      const postResponse = await fetch(`${API_BASE_URL}/umrah/packages-by-ids`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: ids.map(id => id.trim()) }),
        cache: 'no-store',
      });
      if (postResponse.ok) {
        const postData = await postResponse.json();
        if (postData.status === 1 && postData.result) {
          let rawPackages = [];
          if (postData.result.data && Array.isArray(postData.result.data)) {
            rawPackages = postData.result.data;
          } else if (Array.isArray(postData.result)) {
            rawPackages = postData.result;
          }
          return rawPackages.map((pkg: any) => mapPackageData(pkg, 'umrah'));
        }
      }
    } catch (postError) {
      console.error('POST fallback also failed:', postError);
    }
    return fetchAllUmrahPackages(ids);
  }
}

// Fetch Umrah packages by type
export async function fetchUmrahPackagesByType(type: string): Promise<any[]> {
  if (!type || type.trim() === '') {
    return [];
  }

  try {
    const response = await fetch(`${API_BASE_URL}/umrah-packages?type=${encodeURIComponent(type.trim())}`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Umrah packages by type: ${response.statusText}`);
    }

    const apiResponse = await response.json();
    if (apiResponse.status === 1 && apiResponse.result) {
      let rawPackages = [];
      if (apiResponse.result.data && Array.isArray(apiResponse.result.data)) {
        rawPackages = apiResponse.result.data;
      } else {
        rawPackages = Array.isArray(apiResponse.result) ? apiResponse.result : [];
      }
      return rawPackages.map((pkg: any) => mapPackageData(pkg, 'umrah'));
    }
    return (Array.isArray(apiResponse) ? apiResponse : []).map((pkg: any) => mapPackageData(pkg, 'umrah'));
  } catch (error) {
    console.error('Error fetching Umrah packages by type:', error);
    return [];
  }
}

// Fetch all Umrah packages and filter by IDs
async function fetchAllUmrahPackages(filterIds?: string[]): Promise<any[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/umrah-packages`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Umrah packages: ${response.statusText}`);
    }

    const apiResponse = await response.json();
    let packages = [];

    if (apiResponse.status === 1 && apiResponse.result) {
      if (apiResponse.result.data && Array.isArray(apiResponse.result.data)) {
        packages = apiResponse.result.data;
      } else {
        packages = Array.isArray(apiResponse.result) ? apiResponse.result : [];
      }
    } else if (Array.isArray(apiResponse)) {
      packages = apiResponse;
    }

    // Transform all packages
    const mappedPackages = packages.map((pkg: any) => mapPackageData(pkg, 'umrah'));

    // Filter by IDs if provided
    if (filterIds && filterIds.length > 0) {
      return mappedPackages.filter((pkg: any) =>
        filterIds.includes(String(pkg.id)) || filterIds.includes(String(pkg.package_id))
      );
    }

    return mappedPackages;
  } catch (error) {
    console.error('Error fetching all Umrah packages:', error);
    return [];
  }
}

// Fetch Hajj packages by type
export async function fetchHajjPackagesByType(type: string): Promise<any[]> {
  if (!type || type.trim() === '') {
    return [];
  }

  try {
    const response = await fetch(`${API_BASE_URL}/hajj-packages?type=${encodeURIComponent(type.trim())}`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Hajj packages by type: ${response.statusText}`);
    }

    const apiResponse = await response.json();
    if (apiResponse.status === 1 && apiResponse.result) {
      let rawPackages = [];
      if (apiResponse.result.data && Array.isArray(apiResponse.result.data)) {
        rawPackages = apiResponse.result.data;
      } else {
        rawPackages = Array.isArray(apiResponse.result) ? apiResponse.result : [];
      }
      return rawPackages.map((pkg: any) => mapPackageData(pkg, 'hajj'));
    }
    return (Array.isArray(apiResponse) ? apiResponse : []).map((pkg: any) => mapPackageData(pkg, 'hajj'));
  } catch (error) {
    console.error('Error fetching Hajj packages by type:', error);
    return [];
  }
}

// Fetch Hajj packages by IDs
export async function fetchHajjPackagesByIds(ids: string[]): Promise<any[]> {
  if (!ids || ids.length === 0) {
    return [];
  }

  const idsStr = ids.map(id => id.trim()).join(',');
  const url = `${API_BASE_URL}/hajj-packages?package_ids=${idsStr}`;

  console.log('[API] Fetching Hajj packages by IDs:', url);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Hajj packages: ${response.statusText}`);
    }

    const apiResponse = await response.json();
    console.log('[API] Hajj packages by IDs response:', { status: apiResponse.status, hasResult: !!apiResponse.result });

    if (apiResponse.status === 1 && apiResponse.result) {
      let rawPackages = [];
      if (apiResponse.result.data && Array.isArray(apiResponse.result.data)) {
        rawPackages = apiResponse.result.data;
      } else if (Array.isArray(apiResponse.result)) {
        rawPackages = apiResponse.result;
      }
      return rawPackages.map((pkg: any) => mapPackageData(pkg, 'hajj'));
    }

    // Fallback if structured response not found but it's an array
    if (Array.isArray(apiResponse)) {
      return apiResponse.map((pkg: any) => mapPackageData(pkg, 'hajj'));
    }

    return [];
  } catch (error) {
    console.error('Error fetching Hajj packages by IDs:', error);
    // Legacy fallback to POST
    try {
      const postResponse = await fetch(`${API_BASE_URL}/hajj/packages-by-ids`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: ids.map(id => id.trim()) }),
        cache: 'no-store',
      });
      if (postResponse.ok) {
        const postData = await postResponse.json();
        if (postData.status === 1 && postData.result) {
          let rawPackages = [];
          if (postData.result.data && Array.isArray(postData.result.data)) {
            rawPackages = postData.result.data;
          } else if (Array.isArray(postData.result)) {
            rawPackages = postData.result;
          }
          return rawPackages.map((pkg: any) => mapPackageData(pkg, 'hajj'));
        }
      }
    } catch (postError) {
      console.error('Hajj POST fallback failed:', postError);
    }
    return fetchAllHajjPackages(ids);
  }
}

// Fetch all Hajj packages and filter by IDs
async function fetchAllHajjPackages(filterIds?: string[]): Promise<any[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/hajj-packages`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Hajj packages: ${response.statusText}`);
    }

    const apiResponse = await response.json();
    let packages = [];

    if (apiResponse.status === 1 && apiResponse.result) {
      if (apiResponse.result.data && Array.isArray(apiResponse.result.data)) {
        packages = apiResponse.result.data;
      } else {
        packages = Array.isArray(apiResponse.result) ? apiResponse.result : [];
      }
    } else if (Array.isArray(apiResponse)) {
      packages = apiResponse;
    }

    // Transform all packages
    const mappedPackages = packages.map((pkg: any) => mapPackageData(pkg, 'hajj'));

    // Filter by IDs if provided
    if (filterIds && filterIds.length > 0) {
      return mappedPackages.filter((pkg: any) =>
        filterIds.includes(String(pkg.id)) || filterIds.includes(String(pkg.package_id))
      );
    }

    return mappedPackages;
  } catch (error) {
    console.error('Error fetching all Hajj packages:', error);
    return [];
  }
}

// Fetch all Umrah packages
export async function fetchUmrahPackages(): Promise<any[]> {
  return fetchAllUmrahPackages();
}

// Fetch all Hajj packages
export async function fetchHajjPackages(): Promise<any[]> {
  return fetchAllHajjPackages();
}

// Fetch single Umrah package by ID
export async function fetchUmrahPackage(id: string): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/umrah/packages/${id}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Umrah package: ${response.statusText}`);
    }

    const apiResponse = await response.json();

    if (apiResponse.status === 1 && apiResponse.result) {
      return mapPackageData(apiResponse.result, 'umrah');
    }

    return apiResponse;
  } catch (error) {
    console.error('Error fetching Umrah package:', error);
    throw error;
  }
}

// Fetch single Umrah package by Slug
export async function fetchUmrahPackageBySlug(slug: string): Promise<any> {
  try {
    // Stage 1: Try ?slug= or ?package_ids= if it looks like an ID
    const isNumeric = /^\d+$/.test(slug);
    const param = isNumeric ? 'package_ids' : 'slug';
    const queryUrl = `${API_BASE_URL}/umrah-packages?${param}=${slug}`;
    console.log(`[API] Stage 1 fetching Umrah package by ${param}:`, queryUrl);
    const queryResponse = await fetch(queryUrl, { cache: 'no-store' });
    if (queryResponse.ok) {
      const apiResponse = await queryResponse.json();
      if (apiResponse.status === 1 && apiResponse.result) {
        let pkgData = apiResponse.result.data || apiResponse.result;
        if (Array.isArray(pkgData)) pkgData = pkgData[0];
        if (pkgData) return enrichPackageWithWidgets(mapPackageData(pkgData, 'umrah'));
      }
    }

    // Stage 2: Try singular path /umrah-packages/${slug}
    const directUrl = `${API_BASE_URL}/umrah-packages/${slug}`;
    console.log('[API] Stage 2 fetching Umrah package by slug path:', directUrl);
    const directResponse = await fetch(directUrl, { cache: 'no-store' });
    if (directResponse.ok) {
      const apiResponse = await directResponse.json();
      if (apiResponse.status === 1 && apiResponse.result) {
        let pkgData = apiResponse.result.data || apiResponse.result;
        if (Array.isArray(pkgData)) pkgData = pkgData[0];
        if (pkgData) return enrichPackageWithWidgets(mapPackageData(pkgData, 'umrah'));
      }
    }

    // Stage 3: Fetch all and filter (most robust fallback)
    console.log('[API] Stage 3: Searching in all Umrah packages for slug:', slug);
    const allPackages = await fetchAllUmrahPackages();
    const pkg = allPackages.find(p => p.pageUrl === slug || p._raw?.page_url === slug || p._raw?.slug === slug);
    if (pkg) return enrichPackageWithWidgets(pkg);

    return null;
  } catch (error) {
    console.error('Error fetching Umrah package by slug:', error);
    return null;
  }
}

// Fetch single Hajj package by ID
export async function fetchHajjPackage(id: string): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/hajj/packages/${id}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Hajj package: ${response.statusText}`);
    }

    const apiResponse = await response.json();

    if (apiResponse.status === 1 && apiResponse.result) {
      return enrichPackageWithWidgets(mapPackageData(apiResponse.result, 'hajj'));
    }

    return apiResponse;
  } catch (error) {
    console.error('Error fetching Hajj package:', error);
    throw error;
  }
}

// Fetch single Hajj package by Slug
export async function fetchHajjPackageBySlug(slug: string): Promise<any> {
  try {
    // Stage 1: Try ?slug= or ?package_ids=
    const isNumeric = /^\d+$/.test(slug);
    const param = isNumeric ? 'package_ids' : 'slug';
    const queryUrl = `${API_BASE_URL}/hajj-packages?${param}=${slug}`;
    console.log(`[API] Stage 1 fetching Hajj package by ${param}:`, queryUrl);
    const queryResponse = await fetch(queryUrl, { cache: 'no-store' });
    if (queryResponse.ok) {
      const apiResponse = await queryResponse.json();
      if (apiResponse.status === 1 && apiResponse.result) {
        let pkgData = apiResponse.result.data || apiResponse.result;
        if (Array.isArray(pkgData)) pkgData = pkgData[0];
        if (pkgData) return enrichPackageWithWidgets(mapPackageData(pkgData, 'hajj'));
      }
    }

    // Stage 2: Try singular path /hajj-packages/${slug}
    const directUrl = `${API_BASE_URL}/hajj-packages/${slug}`;
    console.log('[API] Stage 2 fetching Hajj package by slug path:', directUrl);
    const directResponse = await fetch(directUrl, { cache: 'no-store' });
    if (directResponse.ok) {
      const apiResponse = await directResponse.json();
      if (apiResponse.status === 1 && apiResponse.result) {
        let pkgData = apiResponse.result.data || apiResponse.result;
        if (Array.isArray(pkgData)) pkgData = pkgData[0];
        if (pkgData) return enrichPackageWithWidgets(mapPackageData(pkgData, 'hajj'));
      }
    }

    // Stage 3: Fetch all and filter
    console.log('[API] Stage 3: Searching in all Hajj packages for slug:', slug);
    const allPackages = await fetchAllHajjPackages();
    const pkg = allPackages.find(p => p.pageUrl === slug || p._raw?.page_url === slug || p._raw?.slug === slug);
    if (pkg) return enrichPackageWithWidgets(pkg);

    return null;
  } catch (error) {
    console.error('Error fetching Hajj package by slug:', error);
    return null;
  }
}

/**
 * Enriches package data with widget content (reviews, related packages)
 */
async function enrichPackageWithWidgets(packageData: any): Promise<any> {
  if (!packageData) return null;
  const raw = packageData._raw || {};

  // Fetch reviews if available
  if (raw.ourclientsays_widget?.[0]) {
    const widget = raw.ourclientsays_widget[0];
    const ids = parseIdsString(widget.reviews_ids);
    if (ids.length > 0) {
      packageData.reviews = await fetchReviewsByIds(ids);
    }
  }

  // Fetch related packages if available
  if (raw.section_2_widget?.[0]) {
    const widget = raw.section_2_widget[0];
    const uIds = parseIdsString(widget.umrah_package_ids);
    const hIds = parseIdsString(widget.hajj_package_ids);

    if (uIds.length > 0) {
      packageData.relatedPackages = await fetchUmrahPackagesByIds(uIds);
    } else if (hIds.length > 0) {
      packageData.relatedPackages = await fetchHajjPackagesByIds(hIds);
    } else if (widget.umrah_type) {
      packageData.relatedPackages = await fetchUmrahPackagesByType(widget.umrah_type);
    } else if (widget.hajj_type) {
      packageData.relatedPackages = await fetchHajjPackagesByType(widget.hajj_type);
    }
  }

  return packageData;
}

// Fetch reviews by IDs
export async function fetchReviewsByIds(ids: string[]): Promise<any[]> {
  if (!ids || ids.length === 0) {
    return [];
  }

  const idsStr = ids.map(id => id.trim()).join(',');
  const url = `${API_BASE_URL}/reviews?review_ids=${idsStr}`;

  console.log('[API] Fetching reviews by IDs:', url);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch reviews: ${response.statusText}`);
    }

    const apiResponse = await response.json();
    console.log('[API] Reviews fetched:', { status: apiResponse.status, count: apiResponse.result?.reviews?.length });

    if (apiResponse.status === 1 && apiResponse.result?.reviews) {
      return apiResponse.result.reviews.map(mapReviewData);
    }

    if (apiResponse.status === 1 && apiResponse.result) {
      const results = Array.isArray(apiResponse.result) ? apiResponse.result : [];
      return results.map(mapReviewData);
    }

    return [];
  } catch (error) {
    console.error('Error fetching reviews by IDs:', error);
    return [];
  }
}

// Helper function to parse comma-separated IDs string
export function parseIdsString(idsString: string): string[] {
  if (!idsString || typeof idsString !== 'string') {
    return [];
  }
  return idsString
    .split(',')
    .map(id => id.trim())
    .filter(id => id.length > 0);
}

// Map raw API review data to standardized format
export function mapReviewData(review: any): any {
  return {
    id: review.id?.toString() || '',
    name: review.publisher || '',
    location: review.address || '',
    rating: parseInt(review.rating?.toString() || '5'),
    comment: review.review || '',
    avatar: getImageUrl(review.image_url),
  };
}

// Map raw API hotel data to standardized format
function mapHotelData(hotel: any): any {
  if (!hotel) return null;
  return {
    id: hotel.id,
    name: hotel.name,
    location: hotel.hotel_address || hotel.location || (hotel.city_id === 1 ? 'Makkah' : 'Madinah'),
    rating: parseInt(hotel.hotel_star || hotel.rating || "5"),
    images: Array.isArray(hotel.images) ? hotel.images.map((img: any) => img.url || img) : [],
    description: hotel.description || '',
    amenities: typeof hotel.amenity === 'string' ? JSON.parse(hotel.amenity || '[]') : hotel.amenity || []
  };
}

// Map raw API package data to standardized camelCase format
function mapPackageData(pkg: any, type: 'umrah' | 'hajj'): any {
  if (!pkg) return null;

  // Extract gallery images
  let galleryImages = [];
  if (Array.isArray(pkg.images)) {
    galleryImages = pkg.images.map((img: any) => img.url || img.image_url || img);
  } else if (pkg.image_url || pkg.package_image_url || pkg.image) {
    galleryImages = [pkg.image_url || pkg.package_image_url || pkg.image];
  }

  // Derive inclusions
  const inclusions = [];
  if (pkg.flight === 1) inclusions.push('Return Flights');
  if (pkg.accomodation === 1) inclusions.push('Premium Accommodations');
  if (pkg.visa === 1) inclusions.push('Umrah Visa');
  if (pkg.breakfast === 1) inclusions.push('Breakfast Included');
  if (pkg.transfer === 1) inclusions.push('Ground Transfers');

  const makkahHotelData = pkg.makkah_hotel ? mapHotelData(pkg.makkah_hotel) : null;
  const madinahHotelData = pkg.madinah_hotel ? mapHotelData(pkg.madinah_hotel) : null;

  const hotels = [];
  if (makkahHotelData) hotels.push({ ...makkahHotelData, location: 'Makkah' });
  if (madinahHotelData) hotels.push({ ...madinahHotelData, location: 'Madinah' });

  return {
    id: pkg.id || pkg.package_id,
    title: pkg.title || pkg.package_title,
    price: parseFloat(String(pkg.price || pkg.package_price || "0")),
    image: pkg.image_url || pkg.package_image_url || pkg.image || pkg.thumbnail_image_url,
    rating: parseInt(pkg.package_star || pkg.rating || pkg.stars || "0"),
    stars: parseInt(pkg.package_star || pkg.rating || pkg.stars || "0"),
    nights: parseInt(pkg.package_night || pkg.nights || "0"),
    pageUrl: pkg.page_url || pkg.slug,
    makkahHotel: pkg.makkah_hotel?.name || pkg.makkah_hotel_name || pkg.makkah_hotel,
    madinahHotel: pkg.madinah_hotel?.name || pkg.madinah_hotel_name || pkg.madinah_hotel,
    makkahNights: parseInt(pkg.makkah_night || "5"),
    madinahNights: parseInt(pkg.madinah_night || "4"),
    packageDescription: pkg.description || pkg.package_description || pkg.banner_description,
    package_detail: pkg.package_detail || pkg.description || pkg.package_description,
    images: galleryImages,
    hotels: hotels,
    makkahHotelData: makkahHotelData,
    madinahHotelData: madinahHotelData,
    inclusions: inclusions,
    type: type,
    flight: pkg.flight,
    accomodation: pkg.accomodation,
    visa: pkg.visa,
    breakfast: pkg.breakfast,
    transfer: pkg.transfer,
    qurbani: pkg.qurbani,
    meta: {
      title: pkg.browser_title,
      description: pkg.meta_description,
      keywords: pkg.meta_keywords,
    },
    script: extractPageScript(pkg),
    _raw: pkg // keep raw data
  };
}

export function getImageUrl(imagePath: string | null | undefined, fallback?: string): string {
  // Return fallback if no path provided
  if (!imagePath || typeof imagePath !== 'string' || imagePath.trim() === '') {
    return fallback || '';
  }

  const trimmedPath = imagePath.trim();

  // If already an absolute URL, return as-is
  if (trimmedPath.startsWith('http://') || trimmedPath.startsWith('https://')) {
    return trimmedPath;
  }

  // Handle paths that already start with 'media/' or '/media/'
  if (trimmedPath.startsWith('media/') || trimmedPath.startsWith('/media/')) {
    // Ensure it starts with /media/ for consistency if needed, but here we just prepend MEDIA_BASE_URL
    const normalizedPath = trimmedPath.startsWith('/') ? trimmedPath : `/${trimmedPath}`;
    return `${MEDIA_BASE_URL}${normalizedPath}`;
  }

  // For other paths that should be used directly with MEDIA_BASE_URL
  if (
    trimmedPath.startsWith('/storage/') ||
    trimmedPath.startsWith('/userfiles/') ||
    trimmedPath.startsWith('assets/') ||
    trimmedPath.startsWith('/assets/')
  ) {
    const separator = trimmedPath.startsWith('/') ? '' : '/';
    return `${MEDIA_BASE_URL}${separator}${trimmedPath}`;
  }

  // Default fallback: prepend /media/
  if (trimmedPath.startsWith('/')) {
    return `${MEDIA_BASE_URL}/media${trimmedPath}`;
  }

  // Default case: prepend /media/
  return `${MEDIA_BASE_URL}/media/${trimmedPath}`;
}


/**
 * Robustly extracts script content from API data based on various possible field names.
 */
export function extractPageScript(data: any): string | null {
  if (!data) return null;
  // Be permissive with field names since API responses vary between environments.
  const script =
    data.pageScript ||
    data.page_script ||
    data.page_script_html ||
    data.page_scripts ||
    data.header_script ||
    data.head_script ||
    data.script ||
    data.scripts ||
    null;

  // Return null if empty string or falsy, otherwise return the script
  return script && typeof script === 'string' && script.trim() !== '' ? script : null;
}


/**
 * Fetches all blog posts for sitemap and listing.
 */
export async function fetchAllBlogPosts(): Promise<any[]> {
  try {
    const pageData = await fetchPageData('blog');
    return pageData?.content?.posts || [];
  } catch (error) {
    console.error('Error fetching all blog posts:', error);
    return [];
  }
}

/**
 * Fetches all navigable pages from the general settings.
 */
export async function fetchAllNavPages(): Promise<any[]> {
  try {
    const settings = await getGeneralSettings();
    return settings?.navigation_bar || [];
  } catch (error) {
    console.error('Error fetching navigation pages:', error);
    return [];
  }
}

/**
 * Generates Next.js Metadata object from transformed page data.
 * Now includes global settings (favicon, robots) and canonical tags.
 */
export function generatePageMetadata(pageData: any, generalSettings?: any, slug: string = '') {
  if (!pageData) return {};

  const { meta, title } = pageData;

  // Extract global settings if provided - generalSettings usually has a 'settings' array
  const logoSetting = generalSettings?.settings?.find(
    (s: any) => s.ref_name === 'Website Logo'
  );
  const indexSetting = generalSettings?.settings?.find(
    (s: any) => s.ref_name === 'Google Can Index?'
  );

  const favicon = logoSetting?.contents?.favicon;
  const canIndex = indexSetting?.contents?.enable_google_can_index === "1";

  // Base domain for canonical tags
  const baseUrl = 'https://hajjumrapackages.co.uk';
  const canonicalUrl = slug === 'home' || slug === '' ? baseUrl : `${baseUrl}/${slug}`;

  return {
    title: meta?.title || title || 'Hajj & Umrah Packages',
    description: meta?.description || '',
    keywords: meta?.keywords || '',
    icons: {
      icon: favicon ? getImageUrl(favicon) : undefined,
    },
    robots: {
      index: canIndex,
      follow: canIndex,
    },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: meta?.title || title,
      description: meta?.description || '',
      url: canonicalUrl,
      type: 'website',
    }
  };
}


export async function getBlogs(): Promise<any[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/get-makkah-blog`);
    const apiResponse = await response.json();
    if (apiResponse.status === 1 && apiResponse.result) {
      return apiResponse.result;
    }
    return [];
  } catch (error) {
    console.error('Error fetching blog data:', error);
    return [];
  }
}
/**
 * Fetches a single blog post details by slug.
 */
export async function getBlogDetail(slug: string): Promise<any> {
  const url = `${API_BASE_URL}/get-makkah-blog?page_url=${slug}`;
  console.log('[API] Fetching blog detail:', url);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`API Error ${response.status}: ${response.statusText}`);
    }

    const apiResponse = await response.json();
    if (apiResponse.success && apiResponse.blog) {
      const blog = apiResponse.blog;

      // Check if banner_description is truly empty (e.g., "<p>&nbsp;</p>" or just whitespace)
      const isBannerHeadingEmpty = !blog.banner_heading && (!blog.banner_description || blog.banner_description.replace(/<[^>]*>/g, '').trim() === '');
      const bannerTitle = isBannerHeadingEmpty ? blog.title : (blog.banner_heading || blog.banner_description);

      return {
        id: blog.id,
        page_template: 'blog_detail',
        title: blog.title,
        banner_description: blog.banner_description, // For direct access if needed
        short_description: blog.short_description,   // For direct access if needed
        content: {
          banner: {
            title: bannerTitle,
            description: blog.short_description || "",
            image: blog.banner_image_url || blog.image_url,
          },
          body: blog.description,
          latestPosts: (apiResponse.latest_blogs || []).map(mapBlogData),
        },
        meta: {
          title: blog.browser_title,
          description: blog.meta_description,
          keywords: blog.meta_keywords,
        },
        script: blog.script || null,
        _raw: blog
      };
    }
    return null;
  } catch (error) {
    console.error('[API] Error fetching blog detail:', error);
    return null;
  }
}
export async function getBlogsByIds(ids: string[]): Promise<any[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/get-makkah-blog?blog_ids=${ids.join(',')}`);
    const apiResponse = await response.json();
    // API returns { success: true, featured_blogs: [...], latest_blogs: [...] }
    if (apiResponse.success) {
      const blogs = [...(apiResponse.featured_blogs || []), ...(apiResponse.latest_blogs || [])];
      return blogs;
    }
    return [];
  } catch (error) {
    console.error('Error fetching blog data:', error);
    return [];
  }
}

/**
 * Fetches blogs with pagination support.
 */
export async function fetchMakkahBlogs(page: number = 1): Promise<any> {
  const url = `${API_BASE_URL}/get-makkah-blog?page=${page}`;
  console.log('[API] Fetching blogs:', url);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`API Error ${response.status}: ${response.statusText}`);
    }

    const apiResponse = await response.json();
    return apiResponse;
  } catch (error) {
    console.error('[API] Error fetching blogs:', error);
    return null;
  }
}


export async function sendEmail(data: any): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const apiResponse = await response.json();
    return apiResponse;
  } catch (error) {
    console.error('Error sending email:', error);
    return { status: 0, message: 'Error sending email' };
  }
}

// Map raw API blog data to BlogPost interface shape
export function mapBlogData(blog: any): any {
  return {
    id: String(blog.id || ''),
    title: blog.title || '',
    excerpt: blog.short_description || '',
    content: blog.description || '',
    image: getImageUrl(blog.banner_image_url || blog.image_url),
    date: blog.publish_date || blog.created_at || '',
    author: blog.author || '',
    slug: blog.page_url || '',
    bannerHeading: blog.banner_heading,
    bannerDescription: blog.banner_description,
  };
}