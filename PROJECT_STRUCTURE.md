# Project Structure

This document explains the project structure for easy navigation and understanding.

## 📁 Directory Structure

```
hajjumrapackages/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with fonts
│   ├── page.tsx                 # Home page
│   ├── [slug]/                  # Dynamic pages
│   │   └── page.tsx             # Template-based page rendering
│   ├── umrah/                   # Umrah flow (separate from Hajj)
│   │   └── [id]/
│   │       └── page.tsx         # Individual Umrah package page
│   ├── hajj/                    # Hajj flow (separate from Umrah)
│   │   └── [id]/
│   │       └── page.tsx         # Individual Hajj package page
│   ├── contact/
│   │   └── page.tsx             # Contact page
│   ├── blog/
│   │   ├── page.tsx             # Blog listing
│   │   └── [slug]/
│   │       └── page.tsx         # Individual blog post
│   ├── not-found.tsx            # 404 page
│   └── success/
│       └── page.tsx             # Success/Thank you page
│
├── components/                   # Reusable components
│   ├── banners/
│   │   ├── HomeBanner.tsx       # Home page banner with form
│   │   └── InnerBanner.tsx      # Inner page banner
│   ├── cards/
│   │   ├── UmrahPackageCard.tsx # Umrah package card (separate)
│   │   ├── HajjPackageCard.tsx  # Hajj package card (separate)
│   │   └── BlogCard.tsx         # Blog post card
│   ├── forms/
│   │   └── InquiryForm.tsx      # Inquiry/contact form
│   └── common/
│       ├── FAQ.tsx              # FAQ accordion
│       ├── Reviews.tsx          # Reviews slider
│       └── PackageListing.tsx   # Package listing with slider
│
├── templates/                    # Page templates
│   ├── HomeTemplate.tsx         # Home page template
│   ├── UmrahPackageTemplate.tsx # Umrah package detail template
│   ├── HajjPackageTemplate.tsx  # Hajj package detail template
│   ├── WithoutBannerTemplate.tsx # Simple page without banner
│   ├── StaticWithBannerTemplate.tsx # Static page with banner
│   ├── ContactTemplate.tsx       # Contact page template
│   └── BlogTemplate.tsx          # Blog listing template
│
├── styles/
│   └── globals.scss             # Global SCSS (NO .module.scss)
│
├── utils/
│   ├── api.ts                   # API utility functions
│   └── templateResolver.tsx     # Template resolver
│
├── types/
│   └── index.ts                 # TypeScript type definitions
│
├── package.json
├── next.config.js
├── tsconfig.json
└── README.md
```

## 🔑 Key Concepts

### 1. Template-Based Rendering
- Pages are rendered based on `template_name` from API
- Template resolver maps template names to components
- All templates receive `PageData` as props

### 2. Complete Separation: Hajj vs Umrah
- **Umrah pages**: `/umrah/[id]` → Uses `UmrahPackageCard` → Uses `fetchUmrahPackage()`
- **Hajj pages**: `/hajj/[id]` → Uses `HajjPackageCard` → Uses `fetchHajjPackage()`
- No shared logic between the two flows
- Separate API endpoints
- Separate components

### 3. Global SCSS Only
- All styles in `styles/globals.scss`
- NO `.module.scss` files
- Use semantic class names
- Easy to find and update

### 4. Fonts
- **Headings**: Playfair Display (h1-h6)
- **Body**: Montserrat (p, spans, buttons, etc.)
- Loaded via Google Fonts in `layout.tsx`

### 5. Mobile-First Approach
- All components responsive
- Swiper sliders adapt to screen size
- Breakpoints: 640px, 768px, 1024px

## 📝 How to Add a New Template

1. Create template file in `templates/` folder
2. Add template case in `utils/templateResolver.tsx`
3. Add styles to `styles/globals.scss` if needed
4. API should return `template_name` matching your case

## 📝 How to Add a New Component

1. Create component in appropriate `components/` subfolder
2. Use global SCSS classes (no modules)
3. Add styles to `styles/globals.scss`
4. Keep components small and focused

## 🔌 API Integration

All API calls are in `utils/api.ts`:
- `fetchPageData(slug)` - Get page data
- `fetchUmrahPackages()` - Get Umrah packages list
- `fetchHajjPackages()` - Get Hajj packages list
- `fetchUmrahPackage(id)` - Get single Umrah package
- `fetchHajjPackage(id)` - Get single Hajj package
- `submitInquiry(data)` - Submit inquiry form

Set `NEXT_PUBLIC_API_URL` in environment variables.

## 🎨 Styling Guidelines

1. Use CSS variables from `:root` in `globals.scss`
2. Use semantic class names (e.g., `.package-card`, not `.card1`)
3. Follow mobile-first approach
4. Use existing utility classes when possible
5. Keep styles organized by component in `globals.scss`

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`


