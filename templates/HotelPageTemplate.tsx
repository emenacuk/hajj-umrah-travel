'use client';

import InnerBanner from '@/components/banners/InnerBanner'
import React, { useState, useEffect } from 'react'
import HotelCard from '@/components/cards/HotelCard'
import HotelSearch from '@/components/sections/HotelSearch'
import PackageSlider from '@/components/sliders/PackageSlider'
import Link from 'next/link'
import { getMakkahHotels, getMadinahHotels, mapHotelData } from '@/utils/api'
import { ScrollDetail } from '@/components/sections/ScrollDetail'

/** Resolves the correct /hotels/{slug} URL from an API hotel object or mock data */
function getHotelLink(hotel: any): string {
  const slug = hotel.page_url || hotel.slug || hotel.url || null;
  if (slug) return `/hotels/${slug}`;
  return '#';
}

const HotelCardSkeleton = () => (
  <div className="skeleton-card skeleton" style={{ height: '400px', borderRadius: '12px' }}>
    <div className="skeleton-image" style={{ height: '240px' }} />
    <div className="skeleton-content" style={{ padding: '20px' }}>
      <div className="skeleton-title" style={{ height: '24px', width: '80%', marginBottom: '10px' }} />
      <div className="skeleton-text" style={{ height: '14px', width: '60%' }} />
    </div>
  </div>
);

export default function HotelPageTemplate({ data }: { data: any }) {
  const content = data.content || {};
  const bannerData = content.banner || {
    title: data.title,
    image: data.image_url || data.simple_image_url
  };

  

  const isWithoutBanner = data.page_template?.toLowerCase() === 'hotel without banner' ||
    data.template_name === 'hotel_without_banner';

  const scrollDetail = data._raw?.scroll_description || content.scroll_description;
  const scrollTitle = data._raw?.scroll_title || content.scroll_title;
  const scrollImage = data._raw?.scroll_image_url || content.scroll_image_url;
  const scrollImageAlt = data._raw?.scroll_image_alt || content.scroll_image_alt;
  const scrollImageTitle = data._raw?.scroll_image_title || content.scroll_image_title;

  const hotelWidget = data._raw?.hotel_widget?.[0] || content.hotel_widget?.[0];

  // Real API hotel data from initial load
  const initialMakkah: any[] = (content.makkahHotels || content.hotels_makkah || []).map(mapHotelData);
  const initialMadinah: any[] = (content.madinahHotels || content.hotels_madinah || []).map(mapHotelData);

  const [makkahHotels, setMakkahHotels] = useState<any[]>(initialMakkah);
  const [madinahHotels, setMadinahHotels] = useState<any[]>(initialMadinah);

  const [makkahPage, setMakkahPage] = useState(1);
  const [madinahPage, setMadinahPage] = useState(1);

  const [makkahLoading, setMakkahLoading] = useState(false);
  const [madinahLoading, setMadinahLoading] = useState(false);

  const [makkahHasMore, setMakkahHasMore] = useState(true);
  const [madinahHasMore, setMadinahHasMore] = useState(true);

  const [makkahSearch, setMakkahSearch] = useState('');
  const [madinahSearch, setMadinahSearch] = useState('');

  const hasLoadedInitial = React.useRef(false);



  const loadMoreMakkah = React.useCallback(async (isInitial = false, searchOverride?: string) => {
    const activeSearch = searchOverride !== undefined ? searchOverride : makkahSearch;
    if (makkahLoading || (!makkahHasMore && !isInitial && searchOverride === undefined)) return;
    setMakkahLoading(true);
    try {
      const nextPage = isInitial ? 1 : makkahPage + 1;
      const result = await getMakkahHotels(nextPage, activeSearch);
      if (result && result.data) {
        const mapped = result.data.map(mapHotelData);
        setMakkahHotels(prev => isInitial ? mapped : [...prev, ...mapped]);
        setMakkahPage(nextPage);
        setMakkahHasMore(result.pagination?.current_page < result.pagination?.last_page);
      } else {
        if (isInitial) setMakkahHotels([]);
        setMakkahHasMore(false);
      }
    } finally {
      setMakkahLoading(false);
    }
  }, [makkahLoading, makkahHasMore, makkahPage, makkahSearch]);

  const loadMoreMadinah = React.useCallback(async (isInitial = false, searchOverride?: string) => {
    const activeSearch = searchOverride !== undefined ? searchOverride : madinahSearch;
    if (madinahLoading || (!madinahHasMore && !isInitial && searchOverride === undefined)) return;
    setMadinahLoading(true);
    try {
      const nextPage = isInitial ? 1 : madinahPage + 1;
      const result = await getMadinahHotels(nextPage, activeSearch);
      if (result && result.data) {
        const mapped = result.data.map(mapHotelData);
        setMadinahHotels(prev => isInitial ? mapped : [...prev, ...mapped]);
        setMadinahPage(nextPage);
        setMadinahHasMore(result.pagination?.current_page < result.pagination?.last_page);
      } else {
        if (isInitial) setMadinahHotels([]);
        setMadinahHasMore(false);
      }
    } finally {
      setMadinahLoading(false);
    }
  }, [madinahLoading, madinahHasMore, madinahPage, madinahSearch]);

  const handleMakkahSearch = React.useCallback((query: string) => {
    setMakkahSearch(prev => {
      // If query is same and we already have results, don't refetch
      if (prev === query && makkahHotels.length > 0) return prev;
      setMakkahHotels([]);
      loadMoreMakkah(true, query);
      return query;
    });
  }, [loadMoreMakkah, makkahHotels.length]);

  const handleMadinahSearch = React.useCallback((query: string) => {
    setMadinahSearch(prev => {
      if (prev === query && madinahHotels.length > 0) return prev;
      setMadinahHotels([]);
      loadMoreMadinah(true, query);
      return query;
    });
  }, [loadMoreMadinah, madinahHotels.length]);

  const relatedPackages = content.related_packages || content.relatedPackages || [];
  const relatedWidget = content.related_widget?.[0] || content.section_2_widget || {};
  const section1Widget = content.section_1_widget?.[0] || {};
  const section2Widget = content.section_2_widget?.[0] || {};

  // If initial load was empty, try fetching first page on mount
  useEffect(() => {
    if (hasLoadedInitial.current) return;

    const fetchMakkah = initialMakkah.length === 0 && (!hotelWidget || hotelWidget.city_type?.toLowerCase() === 'makkah');
    const fetchMadinah = initialMadinah.length === 0 && (!hotelWidget || hotelWidget.city_type?.toLowerCase() === 'madinah');

    if (fetchMakkah || fetchMadinah) {
      hasLoadedInitial.current = true;
      if (fetchMakkah) loadMoreMakkah(true);
      if (fetchMadinah) loadMoreMadinah(true);
    }
  }, [hotelWidget, loadMoreMakkah, loadMoreMadinah, initialMakkah.length, initialMadinah.length]);

  return (
    <>
      {!isWithoutBanner && <InnerBanner data={bannerData} />}

      <section className="section exploration-section" style={{ paddingTop: isWithoutBanner ? '150px' : '0' }}>
        <div className="container">
          

          {/* Section 1: Makkah (or Hero if hotelWidget is Makkah) */}
          {(!hotelWidget || hotelWidget.city_type?.toLowerCase() === 'makkah') && (
            <>
              <div className="sectionheadings" style={{ alignItems: 'flex-end', marginBottom: '40px' }}>
                <div className="sectionheadingstext">
                  <h2 className="section-title">
                    {hotelWidget?.heading || section1Widget.heading || 'Accommodation In Makkah'}
                  </h2>
                  <p className="section-subtitle">
                    {hotelWidget?.subheading || section1Widget.description ||
                      `Find the best hotels in Makkah close to the Holy Haram.`}
                  </p>
                </div>
                <HotelSearch onSearch={handleMakkahSearch} />
              </div>

              <div className="hotels-grid">
                {makkahHotels.map((hotel: any) => (
                  <HotelCard
                    key={hotel.id}
                    {...hotel}
                    link={getHotelLink(hotel)}
                  />
                ))}
                {makkahLoading && Array.from({ length: 4 }).map((_, i) => (
                  <HotelCardSkeleton key={`m-skel-${i}`} />
                ))}
                {!makkahLoading && makkahHotels.length === 0 && (
                  <div className="no-results" style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px' }}>
                    <p>No hotels found in this city.</p>
                  </div>
                )}
              </div>

              {makkahHasMore && (
                <div className="load-more-container" style={{ marginTop: '40px' }}>
                  <button
                    className="btn-load-more"
                    onClick={() => loadMoreMakkah()}
                    disabled={makkahLoading}
                  >
                    {makkahLoading ? 'Loading...' : 'Load More Makkah Hotel'}
                  </button>
                </div>
              )}
            </>
          )}

          {/* Section 2: Madinah (or Hero if hotelWidget is Madinah) */}
          {(!hotelWidget || hotelWidget.city_type?.toLowerCase() === 'madinah') && (
            <>
              <div
                className="sectionheadings"
                style={{
                  marginTop: hotelWidget ? '0' : '60px',
                  marginBottom: '40px',
                  alignItems: 'flex-end'
                }}
              >
                <div className="sectionheadingstext">
                  <h2 className="section-title">
                    {hotelWidget?.heading || section2Widget.heading || 'Accommodation In Madinah'}
                  </h2>
                  <p className="section-subtitle">
                    {hotelWidget?.subheading || section2Widget.description ||
                      `Explore our selection of premium hotels in Madinah near the Prophet's Mosque.`}
                  </p>
                </div>
                <HotelSearch onSearch={handleMadinahSearch} />
              </div>

              <div className="hotels-grid">
                {madinahHotels.map((hotel: any) => (
                  <HotelCard
                    key={hotel.id}
                    {...hotel}
                    link={getHotelLink(hotel)}
                  />
                ))}
                {madinahLoading && Array.from({ length: 4 }).map((_, i) => (
                  <HotelCardSkeleton key={`d-skel-${i}`} />
                ))}
                {!madinahLoading && madinahHotels.length === 0 && (
                  <div className="no-results" style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px' }}>
                    <p>No hotels found in this city.</p>
                  </div>
                )}
              </div>

              {madinahHasMore && (
                <div className="load-more-container" style={{ marginTop: '40px' }}>
                  <button
                    className="btn-load-more"
                    onClick={() => loadMoreMadinah()}
                    disabled={madinahLoading}
                  >
                    {madinahLoading ? 'Loading...' : 'Load More Madinah Hotel'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {isWithoutBanner && scrollDetail && (
        <ScrollDetail
          title={scrollTitle}
          content={scrollDetail}
          image={scrollImage}
          imageAlt={scrollImageAlt}
          imageTitle={scrollImageTitle}
        />
      )}

      {relatedPackages.length > 0 && (
        <section className="section related-packages-detail">
          <div className="container">
            <div className='sectionheadings'>
              <div className='sectionheadingstext'>
                <h2 className='section-title'>{relatedWidget?.heading || 'More Relevant Packages'}</h2>
                <p className='section-subtitle'>
                  {relatedWidget?.subheading || ''}
                </p>
              </div>
              <div className='rightside'>
                <div className='swiper-nav-btns'>
                  <button className="swiper-nav-btn prev prev-related">
                    <img src="/nextarrow.svg" alt="" style={{ transform: 'rotate(180deg)' }} />
                  </button>
                  <button className="swiper-nav-btn next next-related">
                    <img src="/nextarrow.svg" alt="" />
                  </button>
                </div>
                <Link href="/umrah-packages" className="btn btn--primary">View All Packages</Link>
              </div>
            </div>
          </div>
          <div className="related-pkgs-grid" style={{ position: 'relative' }}>
            <PackageSlider
              items={relatedPackages}
              cardType="umrah"
              navigationPrevEl=".prev-related"
              navigationNextEl=".next-related"
              paginationEl=".related-pagination-custom"
              skeletonCount={2}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 1.2 },
                992: { slidesPerView: 1.4 },
                1025: { slidesPerView: 1.6 },
                1200: { slidesPerView: 2.2 },
                1700: { slidesPerView: 2.8 },
              }}
              slidesPerView={1}
              spaceBetween={30}
            />
            <div className="swiper-pagination-custom related-pagination-custom"></div>
          </div>
        </section>
      )}
    </>
  );
}