# API Integration Guide

## Current Setup: Using Mock Data

The project is currently configured to use **mock data** for all API calls. This allows you to test and develop the frontend without needing a backend API.

## Switching to Real API

When your API is ready, follow these simple steps:

### Step 1: Create `.env.local` file

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=https://your-api-url.com/api
```

### Step 2: That's it!

The code will automatically detect the API URL and switch from mock data to real API calls.

## How It Works

The API utility functions (`utils/api.ts`) check if `NEXT_PUBLIC_API_URL` is set:

- **Not set or empty** → Uses mock data from `data/mockData.ts`
- **Set** → Makes real API calls to your backend

## Expected API Endpoints

Your API should provide these endpoints:

### 1. Get Page Data
```
GET /pages/{slug}
```
Returns:
```json
{
  "template_name": "home",
  "title": "Page Title",
  "content": { ... }
}
```

### 2. Get Umrah Packages List
```
GET /umrah/packages
```
Returns array of Umrah packages.

### 3. Get Hajj Packages List
```
GET /hajj/packages
```
Returns array of Hajj packages.

### 4. Get Single Umrah Package
```
GET /umrah/packages/{id}
```
Returns single Umrah package with full details.

### 5. Get Single Hajj Package
```
GET /hajj/packages/{id}
```
Returns single Hajj package with full details.

### 6. Submit Inquiry
```
POST /inquiry
Body: { ...form data... }
```
Returns success/failure status.

## Mock Data Structure

You can reference `data/mockData.ts` to see the expected data structure. Your API should return data in the same format.

## Testing

- **With Mock Data**: Just run `npm run dev` - everything works!
- **With Real API**: Set `NEXT_PUBLIC_API_URL` and run `npm run dev`

## Force Mock Data (Optional)

If you want to force mock data even when API URL is set:

```env
NEXT_PUBLIC_USE_MOCK_DATA=true
```

This is useful for testing or development.


