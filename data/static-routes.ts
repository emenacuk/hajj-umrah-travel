
export const staticRoutes = [
  '/',
  '/contact',
  '/blog',
  '/blog/best-time-umrah-2025',
  '/blog/complete-guide-hajj-2026',
  '/blog/ramadan-umrah-packages-2025',

  '/3-star-umrah-packages',
  '/4-star-umrah-packages',
  '/5-star-umrah-packages',
  '/december-umrah-packages',
  '/best-umrah-packages-2025-2026',
  '/ramzan-umrah-packages',
  '/london-umrah-packages',
  '/manchester-umrah-packages',
  '/november-umrah-packages',
  '/hajj-package-2026',
  '/customize-hajj-umrah',
  '/success',
];

export const dynamicParams = {
  blog: [
    { slug: 'best-time-umrah-2025' },
    { slug: 'complete-guide-hajj-2026' },
    { slug: 'ramadan-umrah-packages-2025' },
  ],
  umrah: [
    { id: 'umrah-1', template: 'single_umrah' },
    { id: 'umrah-2', template: 'single_umrah' },
    { id: 'umrah-3', template: 'single_umrah' },
    { id: 'umrah-4', template: 'umrah_package' },
    { id: 'umrah-5', template: 'umrah_package' },
    { id: 'umrah-6', template: 'umrah_package' },
    { id: 'umrah-7', template: 'umrah_package' },
  ],
  hajj: [
    { id: 'hajj-1', template: 'single_hajj' },
    { id: 'hajj-2', template: 'single_hajj' },
    { id: 'hajj-3', template: 'single_hajj' },
  ],
  general: [
    { slug: 'about-us' },
    { slug: 'terms-and-conditions' },
    { slug: 'privacy-policy' },
    { slug: '3-star-umrah-packages', template: 'umrah_package' },
    { slug: '4-star-umrah-packages', template: 'umrah_package' },
    { slug: '5-star-umrah-packages', template: 'umrah_package' },
    { slug: 'december-umrah-packages', template: 'umrah_package' },
    { slug: 'best-umrah-packages-2025-2026', template: 'umrah_package' },
    { slug: 'ramzan-umrah-packages', template: 'umrah_package' },
    { slug: 'london-umrah-packages', template: 'umrah_package' },
    { slug: 'manchester-umrah-packages', template: 'umrah_package' },
    { slug: 'november-umrah-packages', template: 'umrah_package' },
    { slug: 'hajj-package-2026', template: 'hajj_package' },
    { slug: 'customize-hajj-umrah', template: 'customize_package' },
    { slug: 'contact-us', template: 'contact' },
    { slug: 'hajj-umrah-visa', template: 'visa' }

  ],
};
