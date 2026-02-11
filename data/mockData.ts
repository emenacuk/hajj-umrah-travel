import { PageData, UmrahPackageData, HajjPackageData, ReviewData, FAQItem, BlogPost, HotelData } from '@/types';

// Mock Home Page Data
export const mockHomePageData: PageData = {
  template_name: 'home',
  title: 'Trusted Umrah Packages From The UK',
  content: {
    banner: {
      title: 'Trusted Umrah Packages From The UK',
      description: 'Experience the spiritual journey of a lifetime with our trusted Umrah packages. Book your pilgrimage with confidence.',
      video: '/banner-video.mp4',
      image: '/homebanner.png',
      form: {
        fields: [
          {
            name: 'departureFrom', label: 'Departure From', type: 'select', required: true, options: [
              { value: 'london', label: 'London' },
              { value: 'manchester', label: 'Manchester' },
              { value: 'birmingham', label: 'Birmingham' }
            ]
          },
          {
            name: 'departureTo', label: 'Departure To', type: 'select', required: true, options: [
              { value: 'makkah', label: 'Makkah' },
              { value: 'madinah', label: 'Madinah' }
            ]
          },
          { name: 'departureDate', label: 'Departure Date', type: 'date', required: true },
          { name: 'returnDate', label: 'Return Date', type: 'date', required: true },
          { name: 'adults', label: 'No. of Adults', type: 'number', required: true },
          { name: 'children', label: 'No. of Children', type: 'number', required: false },
        ]
      }
    },
    umrahPackages: [
      {
        id: 'umrah-1',
        type: 'umrah',
        title: '5 Nights 5 Star Cheap Umrah Package',
        price: 965,
        rating: 5,
        image: 'https://images.unsplash.com/photo-1575881875475-31023242e3f9?w=800',
        makkahHotel: 'Al Kawah Towers Hotel Makkah',
        madinahHotel: 'Millennium Al Ageeg Madinah',
        nights: 5,
        stars: 5
      },
      {
        id: 'umrah-2',
        type: 'umrah',
        title: '7 Nights 4 Star Cheap Umrah Package',
        price: 965,
        rating: 4,
        image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800',
        makkahHotel: 'Al Kiswah Hotel Makkah',
        madinahHotel: 'Millennium Al Aqeeq Madinah',
        nights: 7,
        stars: 4
      },
      {
        id: 'umrah-11',
        type: 'umrah',
        title: '10 Nights 4 Star Executive Umrah Package',
        price: 1150,
        rating: 4,
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
        makkahHotel: 'Dar Al Eiman Royal',
        madinahHotel: 'Pulman Zamzam Madinah',
        nights: 10,
        stars: 4
      },
      {
        id: 'umrah-12',
        type: 'umrah',
        title: '12 Nights 4 Star Premium Umrah Package',
        price: 1250,
        rating: 4,
        image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800',
        makkahHotel: 'Makkah Towers',
        madinahHotel: 'Anwar Al Madinah',
        nights: 12,
        stars: 4
      },
      {
        id: 'umrah-3',
        type: 'umrah',
        title: '10 Nights 5 Star Luxury Umrah Package',
        price: 1295,
        rating: 5,
        image: 'https://images.unsplash.com/photo-1575881875475-31023242e3f9?w=800',
        makkahHotel: 'Emaar Andalusia Hotel',
        madinahHotel: 'Taiba Front Madinah',
        nights: 10,
        stars: 5
      },
      {
        id: 'umrah-4',
        type: 'umrah',
        title: '10 Nights 5 Star Luxury Umrah Package',
        price: 1295,
        rating: 5,
        image: 'https://images.unsplash.com/photo-1575881875475-31023242e3f9?w=800',
        makkahHotel: 'Emaar Andalusia Hotel',
        madinahHotel: 'Taiba Front Madinah',
        nights: 10,
        stars: 5
      },
      {
        id: 'umrah-5',
        type: 'umrah',
        title: '10 Nights 5 Star Luxury Umrah Package',
        price: 1295,
        rating: 5,
        image: 'https://images.unsplash.com/photo-1575881875475-31023242e3f9?w=800',
        makkahHotel: 'Emaar Andalusia Hotel',
        madinahHotel: 'Taiba Front Madinah',
        nights: 10,
        stars: 5
      },
      {
        id: 'umrah-6',
        type: 'umrah',
        title: '10 Nights 5 Star Luxury Umrah Package',
        price: 1295,
        rating: 5,
        image: 'https://images.unsplash.com/photo-1575881875475-31023242e3f9?w=800',
        makkahHotel: 'Emaar Andalusia Hotel',
        madinahHotel: 'Taiba Front Madinah',
        nights: 10,
        stars: 5
      },
      {
        id: 'umrah-7',
        type: 'umrah',
        title: '10 Nights 5 Star Luxury Umrah Package',
        price: 1295,
        rating: 5,
        image: 'https://images.unsplash.com/photo-1575881875475-31023242e3f9?w=800',
        makkahHotel: 'Emaar Andalusia Hotel',
        madinahHotel: 'Taiba Front Madinah',
        nights: 10,
        stars: 5
      },
      {
        id: 'umrah-8',
        type: 'umrah',
        title: '7 Nights 3 Star Budget Umrah Package',
        price: 650,
        rating: 3,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        makkahHotel: 'Economy Hotel Makkah',
        madinahHotel: 'Economy Hotel Madinah',
        nights: 7,
        stars: 3
      },
      {
        id: 'umrah-9',
        type: 'umrah',
        title: '10 Nights 3 Star Basic Umrah Package',
        price: 750,
        rating: 3,
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
        makkahHotel: 'Standard Hotel Makkah',
        madinahHotel: 'Standard Hotel Madinah',
        nights: 10,
        stars: 3
      },
      {
        id: 'umrah-10',
        type: 'umrah',
        title: '14 Nights 3 Star Saver Umrah Package',
        price: 850,
        rating: 3,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        makkahHotel: 'Saver Hotel Makkah',
        madinahHotel: 'Saver Hotel Madinah',
        nights: 14,
        stars: 3
      }
    ],
    hajjPackages: [
      {
        id: 'hajj-1',
        type: 'hajj',
        title: '14 Nights 5 Stars Non Shifting Hajj Package',
        price: 2965,
        rating: 5,
        image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?w=800',
        makkahHotel: 'Al Kiswah Towers Makkah',
        madinahHotel: 'Millennium Al Aqeeq Hotel',
        nights: 14,
        stars: 5,
        shifting: false
      },
      {
        id: 'hajj-1a',
        type: 'hajj',
        title: '14 Nights 5 Stars Non Shifting Hajj Package',
        price: 2965,
        rating: 5,
        image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?w=800',
        makkahHotel: 'Al Kiswah Towers Makkah',
        madinahHotel: 'Millennium Al Aqeeq Hotel',
        nights: 14,
        stars: 5,
        shifting: false
      },
      {
        id: 'hajj-1b',
        type: 'hajj',
        title: '14 Nights 5 Stars Non Shifting Hajj Package',
        price: 2965,
        rating: 5,
        image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?w=800',
        makkahHotel: 'Al Kiswah Towers Makkah',
        madinahHotel: 'Millennium Al Aqeeq Hotel',
        nights: 14,
        stars: 5,
        shifting: false
      },
      {
        id: 'hajj-1c',
        type: 'hajj',
        title: '14 Nights 5 Stars Non Shifting Hajj Package',
        price: 2965,
        rating: 5,
        image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?w=800',
        makkahHotel: 'Al Kiswah Towers Makkah',
        madinahHotel: 'Millennium Al Aqeeq Hotel',
        nights: 14,
        stars: 5,
        shifting: false
      },
      {
        id: 'hajj-1d',
        type: 'hajj',
        title: '14 Nights 5 Stars Non Shifting Hajj Package',
        price: 2965,
        rating: 5,
        image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?w=800',
        makkahHotel: 'Al Kiswah Towers Makkah',
        madinahHotel: 'Millennium Al Aqeeq Hotel',
        nights: 14,
        stars: 5,
        shifting: false
      },
      {
        id: 'hajj-2',
        type: 'hajj',
        title: '14 Nights 5 Stars Shifting Hajj Package',
        price: 3265,
        rating: 5,
        image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800',
        makkahHotel: 'Al Kiswah Towers Makkah',
        madinahHotel: 'Millennium Al Aqeeq Hotel',
        nights: 14,
        stars: 5,
        shifting: true
      },
      {
        id: 'hajj-2a',
        type: 'hajj',
        title: '14 Nights 5 Stars Shifting Hajj Package',
        price: 3265,
        rating: 5,
        image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800',
        makkahHotel: 'Al Kiswah Towers Makkah',
        madinahHotel: 'Millennium Al Aqeeq Hotel',
        nights: 14,
        stars: 5,
        shifting: true
      },
      {
        id: 'hajj-2b',
        type: 'hajj',
        title: '14 Nights 5 Stars Shifting Hajj Package',
        price: 3265,
        rating: 5,
        image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800',
        makkahHotel: 'Al Kiswah Towers Makkah',
        madinahHotel: 'Millennium Al Aqeeq Hotel',
        nights: 14,
        stars: 5,
        shifting: true
      },
      {
        id: 'hajj-3',
        type: 'hajj',
        title: '18 Nights 5 Stars Premium Hajj Package',
        price: 3965,
        rating: 5,
        image: 'https://images.unsplash.com/photo-1575881875475-31023242e3f9?w=800',
        makkahHotel: 'Emaar Andalusia Hotel',
        madinahHotel: 'Taiba Front Madinah',
        nights: 18,
        stars: 5,
        shifting: false
      },
      {
        id: 'hajj-4',
        type: 'hajj',
        title: '21 Nights Shifting Economy Hajj Package',
        price: 2450,
        rating: 3,
        image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800',
        makkahHotel: 'Economy Shifting Hotel',
        madinahHotel: 'Economy Madinah Hotel',
        nights: 21,
        stars: 3,
        shifting: true
      },
      {
        id: 'hajj-5',
        type: 'hajj',
        title: '15 Nights Non-Shifting Standard Hajj Package',
        price: 2750,
        rating: 4,
        image: 'https://images.unsplash.com/photo-1565552136439-3898162e082c?w=800',
        makkahHotel: 'Standard Makkah Hotel',
        madinahHotel: 'Standard Madinah Hotel',
        nights: 15,
        stars: 4,
        shifting: false
      },
      {
        id: 'hajj-6',
        type: 'hajj',
        title: '25 Nights Deluxe Shifting Hajj Package',
        price: 3150,
        rating: 4,
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
        makkahHotel: 'Deluxe Shifting Makkah',
        madinahHotel: 'Deluxe Madinah Hotel',
        nights: 25,
        stars: 4,
        shifting: true
      }
    ],
    features: [
      {
        title: 'Free Cancellations',
        description: 'Flexible booking with free cancellation options',
        icon: '📄'
      },
      {
        title: 'Guidance Every Step',
        description: 'Expert guidance throughout your journey',
        icon: '👨‍🏫'
      },
      {
        title: 'Cheap & Luxury Packages',
        description: 'Affordable and luxury options available',
        icon: '🏨'
      },
      {
        title: 'Verified & Trusted',
        description: 'Verified and trusted travel agency',
        icon: '✅'
      }
    ],
    faqs: [
      {
        question: 'How can you find the best umrah package?',
        answer: 'To find the best Umrah package, consider factors such as your budget, preferred travel dates, hotel ratings, proximity to holy sites, and included services. Compare packages from reputable travel agencies and read reviews from previous pilgrims.'
      },
      {
        question: 'How can you find the best hajj package?',
        answer: 'Finding the best Hajj package requires careful research. Look for packages that include all necessary services, have good hotel locations, provide experienced guides, and offer proper visa assistance. Check for ATOL protection and read customer testimonials.'
      },
      {
        question: 'What is the difference between Shifting and Non-Shifting Hajj packages?',
        answer: 'In a Non-Shifting package, you stay in one hotel in Makkah close to the Haram for the entire duration. In a Shifting package, you stay in an apartment-style accommodation far from the Haram during peak Hajj days to reduce costs, and then move to a hotel closer to the Haram after Hajj.'
      },
      {
        question: 'What documents are required for Hajj?',
        answer: 'For Hajj, you need a valid passport (at least 6 months validity), Hajj visa, Meningitis ACWY vaccination certificate, passport-sized photos, and proof of relationship for Mahram (if applicable).'
      },
      {
        question: 'Is Qurbani included in the Hajj packages?',
        answer: 'Qurbani (sacrifice) is usually not included in the base price of Hajj packages unless specified. It can be arranged for an additional fee of approximately £150-£200.'
      },
      {
        question: 'What is ATOL protection?',
        answer: 'ATOL (Air Travel Organisers\' Licensing) is a UK financial protection scheme. If an ATOL-protected travel company ceases trading, the scheme ensures you don\'t lose your money or get stranded abroad. All our Hajj and Umrah packages are ATOL protected.'
      }
    ],
    reviews: [
      {
        id: 'review-1',
        name: 'Ahmed Ali',
        location: 'London',
        rating: 5,
        comment: 'Excellent service and well-organized trip. The hotels were clean and close to the holy sites. Highly recommended!',
        avatar: 'https://i.pravatar.cc/150?img=1'
      },
      {
        id: 'review-2',
        name: 'Fatima Khan',
        location: 'Manchester',
        rating: 5,
        comment: 'Amazing experience! The package was exactly as described. The staff was very helpful throughout the journey.',
        avatar: 'https://i.pravatar.cc/150?img=2'
      },
      {
        id: 'review-3',
        name: 'Mohammed Hassan',
        location: 'Birmingham',
        rating: 5,
        comment: 'Great value for money. Everything was well arranged and the accommodation was comfortable. Will book again!',
        avatar: 'https://i.pravatar.cc/150?img=3'
      },
      {
        id: 'review-4',
        name: 'Aisha Malik',
        location: 'Leeds',
        rating: 5,
        comment: 'Professional service from start to finish. The guides were knowledgeable and the hotels exceeded expectations.',
        avatar: 'https://i.pravatar.cc/150?img=4'
      },
      {
        id: 'review-5',
        name: 'Aisha Malik',
        location: 'Leeds',
        rating: 5,
        comment: 'Professional service from start to finish. The guides were knowledgeable and the hotels exceeded expectations.',
        avatar: 'https://i.pravatar.cc/150?img=4'
      },
    ],
    umrahDescription: 'Discover our carefully curated Umrah packages designed to provide you with a comfortable and spiritually fulfilling journey.',
    hajjDescription: 'Experience the journey of a lifetime with our comprehensive Hajj packages, designed to make your pilgrimage smooth and memorable.'
  }
};

// Mock Umrah Package Detail
export const mockUmrahPackage: UmrahPackageData & any = {
  id: 'umrah-1',
  type: 'umrah',
  title: '4 Star 1st Ashra 14 Nights Ramadan Umrah Package',
  price: 965,
  rating: 4,
  image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?w=1200',
  images: [
    'https://images.unsplash.com/photo-1604871000636-074fa5117945?w=1200',
    'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1200',
    'https://images.unsplash.com/photo-1575881875475-31023242e3f9?w=1200',
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200',
     'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1200'
  ],
  makkahHotel: 'Emaar Andalusia Hotel',
  makkahNights: 5,
  madinahHotel: 'Taiba Front Madinah',
  madinahNights: 5,
  nights: 14,
  stars: 4,
  banner: {
    title: '4 Star 1st Ashra 14 Nights Ramadan Umrah Package',
    image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?w=1200'
  },
  options: [
    { name: 'Economy Package', price: 965 },
    { name: 'Premium Package', price: 2952 }
  ],
  hotels: [
    {
      id: 'hotel-1',
      name: 'Emaar Andalusia Hotel',
      location: 'Makkah',
      rating: 5,
      images: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800'
      ],
      description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem  '
    },
    {
      id: 'hotel-2',
      name: 'Taiba Front Madinah',
      location: 'Madinah',
      rating: 5,
      images: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800'
      ],
      description: 'Premium hotel with excellent location near the Prophet\'s Mosque. Offers spacious rooms and exceptional service.'
    }
  ],
  inclusions: [
    'Umrah Visa',
    'All Packages Are Based On Quad Sharing',
    'Return Flights',
    'Ground Transfers Can Be Included On Request',
    '3 Nights in Makkah 3 Star Hotel',
    'Direct Flights Can Be Arranged On Special Request',
    '2 Nights in Madinah 3 Star Hotel',
    'Half Board Meals',
    'Ziyarat Tours'
  ],
  packageDescription: 'This comprehensive Umrah package includes everything you need for a comfortable and spiritually fulfilling journey. Experience the best of both Makkah and Madinah with our carefully selected accommodations.',
  reviews: [
    {
      id: 'review-1',
      name: 'Ahmed Ali',
      location: 'London',
      rating: 5,
      comment: 'Excellent service and well-organized trip. The hotels were clean and close to the holy sites.',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    {
      id: 'review-2',
      name: 'Fatima Khan',
      location: 'Manchester',
      rating: 5,
      comment: 'Amazing experience! The package was exactly as described.',
      avatar: 'https://i.pravatar.cc/150?img=2'
    },
    {
      id: 'review-3',
      name: 'Mohammed Hassan',
      location: 'Birmingham',
      rating: 5,
      comment: 'Great value for money. Everything was well arranged and the accommodation was comfortable. Will book again!',
      avatar: 'https://i.pravatar.cc/150?img=3'
    },
    {
      id: 'review-4',
      name: 'Aisha Malik',
      location: 'Leeds',
      rating: 5,
      comment: 'Professional service from start to finish. The guides were knowledgeable and the hotels exceeded expectations.',
      avatar: 'https://i.pravatar.cc/150?img=4'
    },
    {
      id: 'review-5',
      name: 'Aisha Malik',
      location: 'Leeds',
      rating: 5,
      comment: 'Professional service from start to finish. The guides were knowledgeable and the hotels exceeded expectations.',
      avatar: 'https://i.pravatar.cc/150?img=4'
    },
  ],
  relatedPackages: [
    {
      id: 'umrah-2',
      type: 'umrah',
      title: '7 Nights 4 Star Cheap Umrah Package',
      price: 965,
      rating: 4,
      image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800',
      makkahHotel: 'Al Kiswah Towers Hotel Makkah',
      madinahHotel: 'Millennium Al Aqeeq Madinah'
    },
    {
      id: 'umrah-3',
      type: 'umrah',
      title: '10 Nights 5 Star Luxury Umrah Package',
      price: 1295,
      rating: 5,
      image: 'https://images.unsplash.com/photo-1575881875475-31023242e3f9?w=800',
      makkahHotel: 'Emaar Andalusia Hotel',
      madinahHotel: 'Taiba Front Madinah'
    },
    {
      id: 'umrah-2',
      type: 'umrah',
      title: '7 Nights 4 Star Cheap Umrah Package',
      price: 965,
      rating: 4,
      image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800',
      makkahHotel: 'Al Kiswah Towers Hotel Makkah',
      madinahHotel: 'Millennium Al Aqeeq Madinah'
    },
    {
      id: 'umrah-3',
      type: 'umrah',
      title: '10 Nights 5 Star Luxury Umrah Package',
      price: 1295,
      rating: 5,
      image: 'https://images.unsplash.com/photo-1575881875475-31023242e3f9?w=800',
      makkahHotel: 'Emaar Andalusia Hotel',
      madinahHotel: 'Taiba Front Madinah'
    }
  ],
  contact: {
    phone: '0208-000-000',
    whatsapp: '0208-000-000',
    email: 'info@example.co.uk'
  },
  faqs: [
    {
      question: 'What is included in this 4 Star Umrah Package?',
      answer: 'This package includes Umrah Visa, 14 nights accommodation (5 nights in Makkah, 5 nights in Madinah), return flights, and ground transfers. It also covers Ziyarat tours in both holy cities.'
    },
    {
      question: 'How close are the hotels to the Haram?',
      answer: 'The Emaar Andalusia Hotel in Makkah is approximately 10 minutes walk, and Taiba Front in Madinah is located very close to the Prophet\'s Mosque entrance.'
    },
    {
      question: 'Are meals provided in this package?',
      answer: 'The package standardly includes Half Board (breakfast and dinner). Full board can be arranged upon special request for an additional fee.'
    },
    {
      question: 'Is travel insurance included?',
      answer: 'Basic medical insurance required for the visa is included. We strongly recommend purchasing comprehensive travel insurance for additional coverage.'
    }
  ]
};

// Mock Hajj Package Detail
export const mockHajjPackage: HajjPackageData & any = {
  id: 'hajj-1',
  type: 'hajj',
  title: '14 Nights 5 Stars Non Shifting Hajj Package',
  price: 2965,
  rating: 5,
  images: [
    'https://images.unsplash.com/photo-1604871000636-074fa5117945?w=1200',
    'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1200',
    'https://images.unsplash.com/photo-1575881875475-31023242e3f9?w=1200'
  ],
  makkahHotel: 'Al Kiswah Towers Makkah',
  makkahNights: 10,
  madinahHotel: 'Millennium Al Aqeeq Hotel',
  madinahNights: 4,
  nights: 14,
  stars: 5,
  shifting: false,
  banner: {
    title: '14 Nights 5 Stars Non Shifting Hajj Package',
    image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?w=1200'
  },
  options: [
    { name: 'Standard Package', price: 2965 },
    { name: 'Premium Package', price: 3965 }
  ],
  hotels: [
    {
      id: 'hotel-3',
      name: 'Al Kiswah Towers Makkah',
      location: 'Makkah',
      rating: 5,
      images: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800'
      ],
      description: 'Premium hotel with excellent facilities and close proximity to the Grand Mosque.'
    },
    {
      id: 'hotel-4',
      name: 'Millennium Al Aqeeq Hotel',
      location: 'Madinah',
      rating: 5,
      images: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800'
      ],
      description: 'Luxury accommodation near the Prophet\'s Mosque with world-class amenities.'
    }
  ],
  inclusions: [
    'Hajj Visa',
    'Return Flights',
    'Accommodation in Makkah and Madinah',
    'Ground Transportation',
    'Meals (Half Board)',
    'Hajj Guide Services',
    'Ziyarat Tours',
    'All Government Fees'
  ],
  packageDescription: 'Complete Hajj package with all necessary services for a successful pilgrimage. Includes accommodation, transportation, and expert guidance.',
  reviews: [
    {
      id: 'review-3',
      name: 'Mohammed Hassan',
      location: 'Birmingham',
      rating: 5,
      comment: 'Great value for money. Everything was well arranged and the accommodation was comfortable.',
      avatar: 'https://i.pravatar.cc/150?img=3'
    },
    {
      id: 'review-4',
      name: 'Aisha Malik',
      location: 'Leeds',
      rating: 5,
      comment: 'Professional service from start to finish. The guides were knowledgeable.',
      avatar: 'https://i.pravatar.cc/150?img=4'
    }
  ],
  relatedPackages: [
    {
      id: 'hajj-2',
      type: 'hajj',
      title: '14 Nights 5 Stars Shifting Hajj Package',
      price: 3265,
      rating: 5,
      image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800',
      makkahHotel: 'Al Kiswah Towers Makkah',
      madinahHotel: 'Millennium Al Aqeeq Hotel'
    },
    {
      id: 'hajj-3',
      type: 'hajj',
      title: '18 Nights 5 Stars Premium Hajj Package',
      price: 3965,
      rating: 5,
      image: 'https://images.unsplash.com/photo-1575881875475-31023242e3f9?w=800',
      makkahHotel: 'Emaar Andalusia Hotel',
      madinahHotel: 'Taiba Front Madinah'
    }
  ],
  contact: {
    phone: '0208-000-000',
    whatsapp: '0208-000-000',
    email: 'info@example.co.uk'
  },
  faqs: [
    {
      question: 'Is this Hajj package Shifting or Non-Shifting?',
      answer: 'This specific package is Non-Shifting, meaning you will stay in the same hotel in Makkah throughout your stay, closer to the Haram.'
    },
    {
      question: 'What kind of guidance is provided during Hajj?',
      answer: 'We provide experienced religious guides (Imams) and group leaders who will accompany you throughout the Manasik of Hajj, providing lectures and step-by-step instructions.'
    },
    {
      question: 'Are Qurbani (sacrifice) costs included?',
      answer: 'Standardly, Qurbani is not included in the base price but can be arranged for an additional fee of £150 per person.'
    },
    {
      question: 'What is the format of the flights?',
      answer: 'We typically use scheduled airlines like Saudi Arabian Airlines or British Airways. Indirect flights may be used for budget options, but this specific premium package uses direct flights.'
    }
  ]
};

// Mock Contact Page Data
export const mockContactPageData: PageData = {
  template_name: 'contact',
  title: 'Contact Us',
  content: {
    banner: {
      title: 'Contact Us',
      description: 'Get in touch with us for any inquiries about our Hajj and Umrah packages.',
      image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1200'
    },
    form: {
      fields: [
        { name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Your Name' },
        { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'your.email@example.com' },
        { name: 'phone', label: 'Phone', type: 'tel', required: true, placeholder: 'Your Phone Number' },
        { name: 'message', label: 'Message', type: 'textarea', required: true, placeholder: 'Your Message' }
      ]
    },
    contact: {
      phone: '0208-145-7860',
      whatsapp: '0208-145-7860',
      email: 'info@bismillahtravel.co.uk',
      address: '123 Travel Street, London, UK, SW1A 1AA'
    }
  }
};

// Mock Blog Page Data
export const mockBlogPageData: PageData = {
  template_name: 'blog',
  title: 'Blog',
  content: {
    banner: {
      title: 'Hajj & Umrah Updates',
      description: 'Stay updated with the latest news, tips, and information about Hajj and Umrah.',
      image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1200'
    },
    posts: [
      {
        id: 'blog-1',
        title: 'Best Time to Perform Umrah in 2025',
        excerpt: 'Discover the best times to perform Umrah in 2025, including peak seasons, weather conditions, and tips for a comfortable journey.',
        image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?w=800',
        date: '2025-01-15',
        author: 'Admin',
        featured: true,
        slug: 'best-time-umrah-2025'
      },
      {
        id: 'blog-2',
        title: 'Complete Guide to Hajj 2026',
        excerpt: 'Everything you need to know about performing Hajj in 2026, including requirements, procedures, and essential tips.',
        image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800',
        date: '2025-01-10',
        author: 'Admin',
        featured: true,
        slug: 'complete-guide-hajj-2026'
      },
      {
        id: 'blog-3',
        title: 'Ramadan Umrah Packages 2025',
        excerpt: 'Special Ramadan Umrah packages for 2025. Experience the spiritual benefits of performing Umrah during the holy month.',
        image: 'https://images.unsplash.com/photo-1575881875475-31023242e3f9?w=800',
        date: '2025-01-05',
        author: 'Admin',
        featured: true,
        slug: 'ramadan-umrah-packages-2025'
      },
      {
        id: 'blog-1',
        title: 'Best Time to Perform Umrah in 2025',
        excerpt: 'Discover the best times to perform Umrah in 2025, including peak seasons, weather conditions, and tips for a comfortable journey.',
        image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?w=800',
        date: '2025-01-15',
        author: 'Admin',
        featured: false,
        slug: 'best-time-umrah-2025'
      },
      {
        id: 'blog-1',
        title: 'Best Time to Perform Umrah in 2025',
        excerpt: 'Discover the best times to perform Umrah in 2025, including peak seasons, weather conditions, and tips for a comfortable journey.',
        image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?w=800',
        date: '2025-01-15',
        author: 'Admin',
        featured: true,
        slug: 'best-time-umrah-2025'
      },
      {
        id: 'blog-1',
        title: 'Best Time to Perform Umrah in 2025',
        excerpt: 'Discover the best times to perform Umrah in 2025, including peak seasons, weather conditions, and tips for a comfortable journey.',
        image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?w=800',
        date: '2025-01-15',
        author: 'Admin',
        featured: false,
        slug: 'best-time-umrah-2025'
      },
      {
        id: 'blog-1',
        title: 'Best Time to Perform Umrah in 2025',
        excerpt: 'Discover the best times to perform Umrah in 2025, including peak seasons, weather conditions, and tips for a comfortable journey.',
        image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?w=800',
        date: '2025-01-15',
        author: 'Admin',
        featured: false,
        slug: 'best-time-umrah-2025'
      },
      {
        id: 'blog-1',
        title: 'Best Time to Perform Umrah in 2025',
        excerpt: 'Discover the best times to perform Umrah in 2025, including peak seasons, weather conditions, and tips for a comfortable journey.',
        image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?w=800',
        date: '2025-01-15',
        author: 'Admin',
        featured: false,
        slug: 'best-time-umrah-2025'
      },
      {
        id: 'blog-1',
        title: 'Best Time to Perform Umrah in 2025',
        excerpt: 'Discover the best times to perform Umrah in 2025, including peak seasons, weather conditions, and tips for a comfortable journey.',
        image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?w=800',
        date: '2025-01-15',
        author: 'Admin',
        featured: false,
        slug: 'best-time-umrah-2025'
      },
      {
        id: 'blog-1',
        title: 'Best Time to Perform Umrah in 2025',
        excerpt: 'Discover the best times to perform Umrah in 2025, including peak seasons, weather conditions, and tips for a comfortable journey.',
        image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?w=800',
        date: '2025-01-15',
        author: 'Admin',
        featured: false,
        slug: 'best-time-umrah-2025'
      },
      {
        id: 'blog-1',
        title: 'Best Time to Perform Umrah in 2025',
        excerpt: 'Discover the best times to perform Umrah in 2025, including peak seasons, weather conditions, and tips for a comfortable journey.',
        image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?w=800',
        date: '2025-01-15',
        author: 'Admin',
        featured: false,
        slug: 'best-time-umrah-2025'
      },
      {
        id: 'blog-1',
        title: 'Best Time to Perform Umrah in 2025',
        excerpt: 'Discover the best times to perform Umrah in 2025, including peak seasons, weather conditions, and tips for a comfortable journey.',
        image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?w=800',
        date: '2025-01-15',
        author: 'Admin',
        featured: false,
        slug: 'best-time-umrah-2025'
      },
      {
        id: 'blog-1',
        title: 'Best Time to Perform Umrah in 2025',
        excerpt: 'Discover the best times to perform Umrah in 2025, including peak seasons, weather conditions, and tips for a comfortable journey.',
        image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?w=800',
        date: '2025-01-15',
        author: 'Admin',
        featured: false,
        slug: 'best-time-umrah-2025'
      },
      {
        id: 'blog-1',
        title: 'Best Time to Perform Umrah in 2025',
        excerpt: 'Discover the best times to perform Umrah in 2025, including peak seasons, weather conditions, and tips for a comfortable journey.',
        image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?w=800',
        date: '2025-01-15',
        author: 'Admin',
        featured: false,
        slug: 'best-time-umrah-2025'
      },
      {
        id: 'blog-1',
        title: 'Best Time to Perform Umrah in 2025',
        excerpt: 'Discover the best times to perform Umrah in 2025, including peak seasons, weather conditions, and tips for a comfortable journey.',
        image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?w=800',
        date: '2025-01-15',
        author: 'Admin',
        featured: false,
        slug: 'best-time-umrah-2025'
      }
    ]
  }
}

// Helper function to get mock Umrah package by ID
export function getMockUmrahPackage(id: string): any {
  if (id === 'umrah-1') return mockUmrahPackage;
  // Return a modified version for other IDs
  return { ...mockUmrahPackage, id, title: `Umrah Package ${id}` };
}

// Helper function to get mock Hajj package by ID
export function getMockHajjPackage(id: string): any {
  if (id === 'hajj-1') return mockHajjPackage;
  // Return a modified version for other IDs
  return { ...mockHajjPackage, id, title: `Hajj Package ${id}` };
}


