   # Next.js Hajj & Umrah Travel Platform - Technical Documentation

This document provides a comprehensive technical overview of the Hajj & Umrah Travel project. It is designed to be a "handover" or "blueprint" document, allowing any developer to replicate, understand, and extend the platform with all key details.

---

## 🏗️ 1. Project Overview & Technology Stack

The platform is a high-performance, modern travel booking site specialized for Hajj and Umrah pilgrims. It is built using the **Next.js 14 App Router** architecture, ensuring fast server-side rendering, SEO-friendliness, and a modular component system.

### Core Technologies
- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict typing for reliability)
- **Library**: [React 18](https://reactjs.org/)
- **Styling**: [Sass/SCSS](https://sass-lang.com/) (Global styling system)
- **Animations & UI components**: 
  - [SwiperJS](https://swiperjs.com/) (Product and review sliders)
  - [Lucide React](https://lucide.dev/) (Icons)
  - [Sonner](https://sonner.emilkowal.ski/) (Toasts/Notifications)
  - [React Datepicker](https://reactdatepicker.com/) (Booking forms)

---

## 📁 2. Advanced Folder Structure

The project follows a clean, modular structure that prioritizes scalability and separation of concerns.

```text
j:/next-hajj-umrah-travel/
├── app/                        # Next.js App Router (Routing Engine)
│   ├── [slug]/                 # Dynamic route for static pages via templateResolver
│   ├── blog/                   # Blog listing and single post pages
│   ├── contact/                # Contact and inquiry page
│   ├── hajj-packages/          # Main Hajj listing and detail flow
│   ├── umrah-packages/         # Main Umrah listing and detail flow
│   ├── success/                # Post-submission success pages
│   ├── layout.tsx              # Root Layout (Navigation, Footer, Global Providers)
│   ├── loading.tsx             # Global loading states for data fetching
│   └── page.tsx                # Homepage entry point
│
├── components/                 # Atomic and Composite UI Components
│   ├── banners/                # Page-specific banners (Hero sections)
│   ├── cards/                  # Product cards (Hajj, Umrah, Blog, Hotel)
│   ├── layout/                 # Global components (Header, Footer, Navigation)
│   ├── sections/               # Large reusable page sections (FAQ, Reviews)
│   ├── common/                 # Base components (Modals, Skeletons, Inputs)
│   └── forms/                  # State-managed booking and inquiry forms
│
├── templates/                  # Full-Page Templates
│   ├── HomeTemplate.tsx        # Homepage layout with multiple sections
│   ├── UmrahPackageTemplate.tsx# Detail view for Umrah offerings
│   ├── HajjPackageTemplate.tsx # Detail view for Hajj offerings
│   └── BlogTemplate.tsx        # Listing view for articles
│
├── data/                       # Static & Mock Data Management
│   └── mockData.ts             # Central source for fallback data and testing
│
├── styles/                     # Global Design System
│   ├── globals.scss            # Main entry point for all SCSS
│   ├── components/             # Component-specific SCSS files (imported to globals)
│   └── abstracts/              # Variables, Mixins, and Design Tokens
│
├── types/                      # TypeScript Interface Definitions
│   └── index.ts                # Master file for all global platform types
│
└── utils/                      # Business Logic & Helpers
    ├── api.ts                  # Axios/Fetch logic for dynamic data
    └── templateResolver.tsx    # Maps API template names to React Page Templates
```

---

## 🔄 3. Key Architectural Patterns

### A. Template-Based Rendering
The platform uses a dynamic "Template Resolver" pattern. This allows the backend/API to control the layout of a page by returning a `page_template` name.
- **Workflow**: `fetchPageData` → `templateResolver` → `Template Component (React)`.

### B. Hajj & Umrah Path Separation
While they share some base types, Hajj and Umrah packages have separate logic paths, card components, and templates to handle their unique requirements (e.g., Shifting vs. Non-Shifting for Hajj).

### C. Global Styling (No Modules)
The project intentionally uses a **Global SCSS** approach (`styles/*.scss`) instead of CSS Modules. This allows for easier overrides, consistent theme variables, and shared design tokens across the entire site without repetitive imports in JS files.

---

## 🛠️ 4. Feature Addition Blueprint: The Hotels Page

To add a new "Hotels Page" while maintaining the project's integrity, follow this technical blueprint.

### Step 1: Interface Definition
Add `HotelData` to `types/index.ts`:
```typescript
export interface HotelData {
  id: string;
  name: string;
  location: string;
  rating: number;
  images: string[];
  description: string;
  amenities?: string[];
}
```

### Step 2: Component Creation (`components/cards/HotelCard.tsx`)
Create a dedicated card for hotels to maintain the visual hierarchy.
```tsx
'use client';
import { HotelData } from '@/types';
import { getImageUrl } from '@/utils/api';

export default function HotelCard({ hotel }: { hotel: HotelData }) {
  return (
    <div className="hotel-card">
      <div className="hotel-image-wrapper">
        <img src={getImageUrl(hotel.images[0])} alt={hotel.name} />
      </div>
      <div className="hotel-content">
        <h2>{hotel.name}</h2>
        <p>{hotel.description}</p>
        <button className="btn btn--primary">Enquire Now</button>
      </div>
    </div>
  );
}
```

### Step 3: Template Implementation (`templates/HotelsTemplate.tsx`)
Build the full-page layout using the existing design system.
```tsx
import InnerBanner from '@/components/banners/InnerBanner';
import HotelCard from '@/components/cards/HotelCard';

export default function HotelsTemplate({ data }: any) {
  return (
    <>
      <InnerBanner data={data.content.banner} />
      <section className="container">
        <div className="grid">
          {data.content.hotels.map((h: any) => <HotelCard key={h.id} hotel={h} />)}
        </div>
      </section>
    </>
  );
}
```

### Step 4: Routing (`app/hotels/page.tsx`)
Create the route entry point.
```tsx
import HotelsTemplate from '@/templates/HotelsTemplate';
import { mockHotelsPageData } from '@/data/mockData';

export default function HotelsPage() {
  return <HotelsTemplate data={mockHotelsPageData} />;
}
```

---

## 🎨 5. Design System & Styling Guide

- **Primary Color**: Defined in SCSS variables (Gold/Green themed).
- **Typography**: Uses `Playfair Display` for serif elegance in headings and `Montserrat` for readability in body text.
- **Breakpoints**: 
  - Desktop: `1200px+`
  - Tablet: `768px - 1024px`
  - Mobile: `Below 768px`

---

## 🚀 6. Local Development & Deployment

To run this project locally:
1. **Clone repository**.
2. Run `npm install` to setup all dependencies.
3. Setup `.env` file with `NEXT_PUBLIC_API_URL`.
4. Run `npm run dev` for hot-reload development.
5. For production: `npm run build && npm run start`.

---

**Handover Note**: This project is built for high modularity. When adding new features, ensure they reside in the `components/` or `templates/` structure and are correctly mapped in the `utils/templateResolver.tsx` if they are to be powered by the dynamic slug system.
