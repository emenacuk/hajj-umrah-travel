# API Integration Guide

This document explains how the API integration has been set up and how to use it.

## Overview

The application has been fully migrated from mock/static data to use the real API endpoints. All data is now fetched dynamically from the API at `https://hajj-umrah.holyvibes.co.uk/api/`.

## API Configuration

### Base URL
- **API Base URL**: `https://hajj-umrah.holyvibes.co.uk/api`
- **Media Base URL**: `https://hajj-umrah.holyvibes.co.uk`

### Environment Variables

Create a `.env.local` file in the root directory with:

```env
NEXT_PUBLIC_API_URL=https://hajj-umrah.holyvibes.co.uk/api
NEXT_PUBLIC_MEDIA_URL=https://hajj-umrah.holyvibes.co.uk
```

If these are not set, the code will use the default values above.

## API Endpoints Used

### 1. Get Page Data
- **Endpoint**: `/get-page`
- **Method**: `POST`
- **Request Body**: `{ "slug": "home" }`
- **Response**: Page data with widgets, FAQs, banners, etc.

### 2. Fetch Umrah Packages by IDs
- **Endpoint**: `/umrah/packages-by-ids` (or `/umrah/packages` as fallback)
- **Method**: `POST`
- **Request Body**: `{ "ids": ["20", "26", "29"] }`
- **Response**: Array of Umrah packages

### 3. Fetch Hajj Packages by IDs
- **Endpoint**: `/hajj/packages-by-ids` (or `/hajj/packages` as fallback)
- **Method**: `POST`
- **Request Body**: `{ "ids": ["1", "2", "3"] }`
- **Response**: Array of Hajj packages

### 4. Fetch Single Umrah Package
- **Endpoint**: `/umrah/packages/{id}`
- **Method**: `GET`
- **Response**: Single Umrah package details

### 5. Fetch Single Hajj Package
- **Endpoint**: `/hajj/packages/{id}`
- **Method**: `GET`
- **Response**: Single Hajj package details

### 6. Fetch Reviews by IDs
- **Endpoint**: `/reviews`
- **Method**: `POST`
- **Request Body**: `{ "ids": ["1", "2", "3"] }`
- **Response**: Array of reviews

### 7. Submit Inquiry
- **Endpoint**: `/inquiry`
- **Method**: `POST`
- **Request Body**: Form data
- **Response**: Success status

## How It Works

### Home Page Flow

1. **Page Load**: `app/page.tsx` calls `fetchPageData('home')`
2. **API Call**: Makes POST request to `/get-page` with slug "home"
3. **Response Processing**: Transforms API response to component format
4. **Package Fetching**: Extracts package IDs from widgets and fetches packages in parallel:
   - Section 1 Widget → Fetch Umrah packages
   - Section 2 Widget → Fetch Umrah packages  
   - Section 3 Widget → Fetch Hajj packages
   - Reviews Widget → Fetch reviews
5. **Template Rendering**: Passes all data to `HomeTemplate` component

### Dynamic Routes Flow

1. **Route Access**: User navigates to `/umrah-packages` or any dynamic route
2. **Page Load**: `app/[slug]/page.tsx` calls `fetchPageData(slug)`
3. **API Call**: Makes POST request to `/get-page` with the slug
4. **Template Resolution**: Maps `page_template` from API to appropriate template component
5. **Rendering**: Template renders with API data

### Package Detail Pages Flow

1. **Route Access**: User navigates to `/umrah/{id}` or `/hajj/{id}`
2. **Page Load**: Calls `fetchUmrahPackage(id)` or `fetchHajjPackage(id)`
3. **API Call**: Makes GET request to package endpoint
4. **Template Rendering**: Renders package detail template with API data

## API Response Structure

### Page API Response
```json
{
  "status": 1,
  "message": "Page content fetched successfully",
  "result": {
    "id": 4,
    "title": "Home",
    "page_template": "Home Template",
    "banner_heading": "<h1>Trusted Islamic Travel Agency</h1>",
    "banner_subheading": null,
    "section_1_widget": [{
      "heading": "Our Best Umrah Deals 2026-2027",
      "subheading": "Begin your holy pilgrimage...",
      "umrah_package_ids": "20,26,29,32",
      "button_text": "View All Packages",
      "button_link": "umrah-packages",
      "slider_enable": "1"
    }],
    "section_2_widget": [...],
    "section_3_widget": [...],
    "ourclientsays_widget": [{
      "heading": "What Our Clients Say",
      "sub_heading": "Hear from our clients...",
      "reviews_ids": "1,2,3,4,5"
    }],
    "faqs": [...],
    "faqs_heading": "Frequently Asked Questions",
    "faqs_subheading": "..."
  }
}
```

## Key Features

### 1. No Mock Data Fallbacks
- All mock data has been removed
- The application will fail gracefully if API is unavailable
- Error handling is in place at all levels

### 2. Dynamic Package Fetching
- Packages are fetched based on IDs from widget configuration
- Supports fetching multiple packages in parallel
- Falls back to fetching all packages if specific IDs fail

### 3. Dynamic Routes
- All routes are now dynamic based on API data
- Template selection is based on `page_template` from API
- Supports any slug structure from the API

### 4. Widget-Based Sections
- Home page sections are driven by widget data from API
- Each widget can specify:
  - Heading and subheading
  - Package IDs to display
  - Button text and link
  - Slider enable/disable

## Component Updates

### HomeTemplate
- Uses `section_1_widget`, `section_2_widget`, `section_3_widget` from API
- Dynamically renders package sections based on widget configuration
- Supports slider and grid layouts based on `slider_enable` flag

### HomeReviews
- Accepts `heading` and `subheading` props from API
- Fetches reviews based on IDs from `ourclientsays_widget`

### API Utility Functions
- `fetchPageData(slug)` - Fetch page data by slug
- `fetchUmrahPackagesByIds(ids)` - Fetch Umrah packages by IDs
- `fetchHajjPackagesByIds(ids)` - Fetch Hajj packages by IDs
- `fetchUmrahPackage(id)` - Fetch single Umrah package
- `fetchHajjPackage(id)` - Fetch single Hajj package
- `fetchReviewsByIds(ids)` - Fetch reviews by IDs
- `parseIdsString(idsString)` - Parse comma-separated IDs string

## Error Handling

- All API calls have try-catch blocks
- Errors are logged to console
- Pages show appropriate error states
- 404 pages are shown for missing data

## Testing

1. **Set Environment Variables**: Create `.env.local` with API URLs
2. **Start Development Server**: `npm run dev`
3. **Test Home Page**: Navigate to `/` - should load data from API
4. **Test Dynamic Routes**: Navigate to any slug - should fetch from API
5. **Test Package Pages**: Navigate to `/umrah/{id}` or `/hajj/{id}`

## Notes

- The API base URL is hardcoded as default but can be overridden via environment variables
- All API calls use `cache: 'no-store'` for SSR
- Package IDs are parsed from comma-separated strings
- Media URLs are constructed using `MEDIA_BASE_URL` constant
- The application assumes API responses follow the documented structure

## Troubleshooting

### Packages Not Loading
- Check API endpoint URLs in `.env.local`
- Verify package IDs exist in the API
- Check browser console for API errors
- Verify API response structure matches expected format

### Page Not Found
- Verify slug matches API expectations
- Check API response status is 1
- Verify `page_template` is correctly mapped

### Images Not Loading
- Check `MEDIA_BASE_URL` is set correctly
- Verify image URLs in API response
- Check image paths are relative or absolute URLs
