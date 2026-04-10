# Hajj & Umrah Packages Website

A Next.js frontend project for Hajj & Umrah travel packages.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- SCSS (Global styles)
- Swiper (for sliders)
- Google Fonts (Playfair Display & Montserrat)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Mock Data vs Real API

### Currently Using Mock Data (Default)

The project is currently configured to use **mock data** for testing. All pages and components will work with dummy data.

### Switching to Real API

When your API is ready, simply:

1. **Set the API URL** in your `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=https://your-api-url.com/api
   ```

2. **That's it!** The code will automatically switch from mock data to real API calls.

### How It Works

- If `NEXT_PUBLIC_API_URL` is **not set** or **empty** → Uses mock data
- If `NEXT_PUBLIC_API_URL` **is set** → Uses real API

You can also force mock data by setting:
```env
NEXT_PUBLIC_USE_MOCK_DATA=true
```

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── [slug]/            # Dynamic pages
│   ├── umrah/             # Umrah pages (separate flow)
│   ├── hajj/              # Hajj pages (separate flow)
│   ├── contact/           # Contact page
│   ├── blog/              # Blog pages
│   ├── not-found.tsx      # 404 page
│   └── success.tsx        # Success/Thank you page
├── components/            # Reusable components
│   ├── banners/          # Banner components
│   ├── cards/            # Card components
│   ├── forms/            # Form components
│   └── common/           # Common components
├── templates/             # Page templates
├── data/                  # Mock data (for testing)
│   └── mockData.ts       # All dummy data
├── styles/               # Global SCSS
├── utils/                # Utilities & API helpers
└── types/                # TypeScript types
```

## Key Features

- Template-based page rendering
- Complete separation of Hajj and Umrah flows
- Server-Side Rendering (SSR)
- Mobile-first responsive design
- Clean, beginner-friendly code structure
- **Easy API integration** - just set the URL!

## Testing with Mock Data

The project includes comprehensive mock data for:
- Home page with packages, features, FAQs, reviews
- Umrah package detail pages
- Hajj package detail pages
- Contact page
- Blog pages

All mock data is in `data/mockData.ts` and can be easily modified for testing.

## API Endpoints Expected

When you switch to real API, ensure your API provides:

- `GET /pages/{slug}` - Page data with template_name
- `GET /umrah/packages` - List of Umrah packages
- `GET /hajj/packages` - List of Hajj packages
- `GET /umrah/packages/{id}` - Single Umrah package
- `GET /hajj/packages/{id}` - Single Hajj package
- `POST /inquiry` - Submit inquiry form

## Environment Variables

Create `.env.local` file:

```env
# API Configuration (optional - uses mock data if not set)
NEXT_PUBLIC_API_URL=https://your-api-url.com/api

# Force mock data (optional)
NEXT_PUBLIC_USE_MOCK_DATA=false.
```
