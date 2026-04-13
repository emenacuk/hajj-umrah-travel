/**
 * Mock hotel data for testing HotelDetailTemplate.
 * Shape matches the output of mapHotelData() in api.ts.
 *
 * Usage in page.tsx (fallback):
 *   import { getMockHotel } from '@/data/hotelMockData';
 *   const hotelData = (await fetchHotelBySlug(slug)) ?? getMockHotel(slug);
 */

export interface MockHotel {
  id: string;
  name: string;
  city: string;
  distance: string;
  rating: number;
  images: string[];
  description: string;
  amenities: Array<{ name: string }>;
  location: string;
  page_url: string;
}

export const MOCK_HOTELS: MockHotel[] = [
  {
    id: '1',
    name: 'Address Jabal Omar Makkah',
    city: 'Makkah',
    distance: '500 Meters',
    rating: 5,
    page_url: 'address-jabal-omar-makkah',
    location: 'Jabal Omar, Makkah',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200',
      'https://images.unsplash.com/photo-1582719478250-c89cae4df85b?w=1200',
      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200',
      'https://images.unsplash.com/photo-1551882547-ff43c639f675?w=1200',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200',
    ],
    description:
      'Address Jabal Omar Makkah in Makkah offers a convenient location with stunning mountain views. ' +
      'Masjid Al Haram is a 14-minute walk away, while Zamzam Well lies 1.3 km from the hotel. ' +
      'King Abdulaziz International Airport is 92 km distant. Guests enjoy a fitness centre, restaurant, ' +
      'and free WiFi.',
    amenities: [
      { name: 'Free WiFi' },
      { name: 'Fridge' },
      { name: 'Room Service' },
      { name: 'Central Air Conditioning' },
      { name: 'Wheel Chair' },
      { name: 'Television' },
      { name: 'Door Man' },
    ],
  },
  {
    id: '2',
    name: 'Al Kiswah Tower',
    city: 'Makkah',
    distance: '11 Minutes Walk',
    rating: 5,
    page_url: 'al-kiswah-tower',
    location: 'Ajyad, Makkah',
    images: [
      'https://images.unsplash.com/photo-1543967354-334140df7da5?w=1200',
      'https://images.unsplash.com/photo-1596386461350-326ccb383e9f?w=1200',
      'https://images.unsplash.com/photo-1596386461350-326ccb383e9f?w=1200',
      'https://images.unsplash.com/photo-1596386461350-326ccb383e9f?w=1200',
      'https://images.unsplash.com/photo-1596386461350-326ccb383e9f?w=1200',
      'https://images.unsplash.com/photo-1596386461350-326ccb383e9f?w=1200',
      'https://images.unsplash.com/photo-1596386461350-326ccb383e9f?w=1200',
      'https://images.unsplash.com/photo-1596386461350-326ccb383e9f?w=1200',
    ],
    description:
      'Al Kiswah Tower is a premium property offering luxurious rooms with panoramic views of the Holy Mosque. ' +
      'Located just an 11-minute walk from Masjid Al Haram, this hotel is perfect for Hajj and Umrah pilgrims.',
    amenities: [
      { name: 'Free WiFi' },
      { name: 'Room Service' },
      { name: 'Television' },
      { name: 'Concierge' },
    ],
  },
  {
    id: '3',
    name: 'Pullman Zamzam',
    city: 'Makkah',
    distance: '01 Minute Walk',
    rating: 5,
    page_url: 'pullman-zamzam',
    location: 'Abraj Al-Bayt, Makkah',
    images: [
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200',
    ],
    description:
      'Pullman Zamzam is ideally situated adjacent to Masjid Al Haram with views of the Kaaba. ' +
      'One of the most prestigious hotels in Makkah, offering world-class facilities for pilgrims.',
    amenities: [
      { name: 'Free WiFi' },
      { name: 'Fridge' },
      { name: 'Room Service' },
      { name: 'Central Air Conditioning' },
      { name: 'Television' },
      { name: 'Door Man' },
    ],
  },
  {
    id: '7',
    name: 'Anwar Al Madinah Movenpick',
    city: 'Madinah',
    distance: '5 Minutes Walk',
    rating: 5,
    page_url: 'anwar-al-madinah-movenpick',
    location: 'King Abdulaziz Road, Madinah',
    images: [
      'https://images.unsplash.com/photo-1551882547-ff43c639f675?w=1200',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200',
    ],
    description:
      "Anwar Al Madinah Movenpick sits just a 5-minute walk from the Prophet's Mosque, making it an " +
      'ideal base for pilgrims visiting Madinah. Superior rooms include city or mosque views.',
    amenities: [
      { name: 'Free WiFi' },
      { name: 'Room Service' },
      { name: 'Central Air Conditioning' },
      { name: 'Television' },
      { name: 'Door Man' },
    ],
  },
];

/** Returns a mock hotel by its page_url slug, or the first hotel as default. */
export function getMockHotel(slug: string): MockHotel {
  return MOCK_HOTELS.find((h) => h.page_url === slug) ?? MOCK_HOTELS[0];
}
