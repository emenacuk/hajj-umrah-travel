
export const staticRoutes = [
  '/',
  '/contact',
  '/blog',
  '/blog/best-time-umrah-2025',
  '/blog/complete-guide-hajj-2026',
  '/blog/ramadan-umrah-packages-2025',
  '/umrah/umrah-1',
  '/umrah/umrah-2',
  '/umrah/umrah-3',
  '/3-star-umrah-packages',
  '/4-star-umrah-packages',
  '/5-star-umrah-packages',
  '/hajj/hajj-1',
  '/hajj/hajj-2',
  '/hajj/hajj-3',
  '/success',
];

export const dynamicParams = {
  blog: [
    { slug: 'best-time-umrah-2025' },
    { slug: 'complete-guide-hajj-2026' },
    { slug: 'ramadan-umrah-packages-2025' },
  ],
  umrah: [
    { id: 'umrah-1' },
    { id: 'umrah-2' },
    { id: 'umrah-3' },
    { id: 'umrah-4' },
    { id: 'umrah-5' },
    { id: 'umrah-6' },
    { id: 'umrah-7' },
  ],
  hajj: [
    { id: 'hajj-1' },
    { id: 'hajj-2' },
    { id: 'hajj-3' },
  ],
  general: [
    { slug: 'about-us' },
    { slug: 'terms-and-conditions' },
    { slug: 'privacy-policy' },
    { slug: '3-star-umrah-packages' },
    { slug: '4-star-umrah-packages' },
    { slug: '5-star-umrah-packages' },
  ],
};
