// Page Data Types
export interface PageData {
  template_name: string;
  title?: string;
  content?: any;
  meta?: {
    title?: string;
    description?: string;
    keywords?: string;
  };
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
  makkahHotel?: string;
  madinahHotel?: string;
  features?: string[];
  description?: string;
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


