export type EventCategory = 'casamento' | '15anos' | 'social' | 'corporativo' | 'decoracao' | 'buffet';

export interface EventTypeItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  fullDescription: string;
  category: EventCategory;
  image: string;
  gallery: string[];
  highlights: string[];
  guestCapacity: string;
}

export interface SpaceFeature {
  id: string;
  title: string;
  description: string;
  image: string;
  tag: string;
  gallery?: string[];
}

export interface GalleryImage {
  id: string;
  title: string;
  category: 'casamentos' | '15anos' | 'decoracao' | 'buffet' | 'celebracoes';
  categoryLabel: string;
  image: string;
  aspectRatio: 'landscape' | 'portrait' | 'square';
  caption: string;
}

export interface BuffetItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tag?: string;
  gallery?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  eventType: string;
  date: string;
  quote: string;
  avatar: string;
  rating: number;
}

export interface InstagramPost {
  id: string;
  image: string;
  likes: number;
  caption: string;
  date: string;
}

export interface QuoteRequest {
  name: string;
  phone: string;
  eventType: string;
  guestCount: string;
  expectedDate: string;
  services: string[];
  notes: string;
}
