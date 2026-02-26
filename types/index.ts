// Page Data Types
export interface PageData {
  id?: number;
  page_template: string;
  title?: string;
  content?: any;
  meta?: {
    title?: string;
    description?: string;
    keywords?: string;
  };
  banner_heading?: string;
  banner_subheading?: string;
  image_url?: string;
  page_url?: string;
  search_engine?: number;
  customization_data?: {
    heading: string;
    subheading: string;
    description: string;
    image_url: string;
    button_text: string;
    button_link: string;
  };
  simple_description?: string;
  simple_image_url?: string;
  simple_image_alt?: string;
  simple_image_title?: string;
  _raw?: any;
}

export interface CustomizationPageData extends PageData {
  banner_heading: string;
  banner_subheading: string;
  image_url: string;
  image_alt?: string;
  image_title?: string;
}

// Banner Types
export interface BannerData {
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  video?: string;
  form?: InquiryFormData;
}

// Package Types
export interface PackageData {
  id: string;
  title: string;
  price: number;
  priceLabel?: string;
  rating?: number;
  image: string;
  nights?: number;
  stars?: number;
  pageUrl: string;
  makkahHotel?: string;
  madinahHotel?: string;
  makkahNights?: number;
  madinahNights?: number;
  features?: string[];
  description?: string;
  packageDescription?: string;
  images?: string[];
  makkahHotelData?: HotelData;
  madinahHotelData?: HotelData;
  inclusions?: string[];
  _raw?: any;
}

// Umrah Package (separate from Hajj)
export interface UmrahPackageData extends PackageData {
  type: 'umrah';
}

// Hajj Package (separate from Umrah)
export interface HajjPackageData extends PackageData {
  type: 'hajj';
  shifting?: boolean;
}

// Inquiry Form Types
export interface InquiryFormData {
  fields?: FormField[];
  submitUrl?: string;
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'date' | 'number' | 'textarea' | 'select';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
}

// FAQ Types
export interface FAQItem {
  question: string;
  answer: string;
}

// Review Types
export interface ReviewData {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  avatar?: string;
}

// Blog Types
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  image: string;
  date: string;
  author?: string;
  slug: string;
}

// Hotel Types
export interface HotelData {
  id: string;
  name: string;
  location: string;
  rating: number;
  images: string[];
  description: string;
  amenities?: string[];
}

// Contact Types
export interface ContactData {
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  form?: InquiryFormData;
}

// Service Types
export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ServicesSectionData {
  title: string;
  description: string;
  mainImage: string;
  items: ServiceItem[];
}
