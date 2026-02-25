'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useState, useEffect } from 'react';
import { SliderSkeleton } from '@/components/common/Skeleton';
import { PageData, UmrahPackageData, HajjPackageData, ReviewData } from '@/types';
import HomeBanner from '@/components/banners/HomeBanner';
import UmrahPackageCard from '@/components/cards/UmrahPackageCard';
import HajjPackageCard from '@/components/cards/HajjPackageCard';
import UmrahExplorationCard from '@/components/cards/UmrahExplorationCard';
import FAQ from '@/components/common/FAQ';
import Reviews from '@/components/common/Reviews';
import CustomizeBanner from '@/components/banners/CustomizeBanner';
import HomeReviews from '@/components/sections/HomeReviews';
import UmrahHajjServices from '@/components/sections/UmrahHajjServices';
import { ScrollDetail } from '@/components/sections/ScrollDetail';
import BlogSection from '@/components/sections/BlogSection';
import { getImageUrl } from '@/utils/api';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '@/styles/components/_home-template.scss';
import Link from 'next/link';

interface HomeTemplateProps {
  data: PageData;
}
let airlinearray = ['air1.webp', 'air2.webp', 'air3.webp', 'air4.webp', 'air5.webp', 'air6.webp', 'air7.webp', 'air8.webp', 'air9.webp', 'air10.webp', 'air11.webp'];
export default function HomeTemplate({ data }: HomeTemplateProps) {
  const [slidersLoaded, setSlidersLoaded] = useState({
    bestUmrah: false,
    decemberDeals: false,
    bestHajj: false,
    exploration: false
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Extract data from API response
  const bannerData = data.content?.banner || {};
  const faqs = data.content?.faqs || [];
  const reviews = data.content?.reviews || [];
  const section1Widget = data.content?.section_1_widget?.[0];
  const section2Widget = data.content?.section_2_widget?.[0];
  const section3Widget = data.content?.section_3_widget?.[0];
  const section4Widget = data.content?.section_4_widget?.[0];
  const reviewsWidget = data.content?.ourclientsays_widget?.[0];

  // Get packages from fetched data
  const section1Packages = data.content?.section1Packages || [];
  const section2Packages = data.content?.section2Packages || [];
  const section3Packages = data.content?.section3Packages || [];
  const section4Packages = data.content?.section4Packages || [];

  // Get images from API and normalize paths
  const section1Image = getImageUrl(data.content?.section1_image_url);
  const section3Image = getImageUrl(data.content?.section3_image_url);
  const scrollImage = getImageUrl(data.content?.scroll_image_url);

  // Services data
  const rawServicesItems = data.content?.services_items;
  let parsedItems = [];
  try {
    parsedItems = typeof rawServicesItems === 'string' ? JSON.parse(rawServicesItems) : (Array.isArray(rawServicesItems) ? rawServicesItems : []);
  } catch (e) {
    console.error('Error parsing services_items:', e);
  }

  const servicesData = data.content?.services_heading ? {
    title: data.content.services_heading,
    description: data.content.services_subheading || '',
    mainImage: getImageUrl(data.content.services_image_url),
    items: parsedItems.map((item: any, index: number) => ({
      id: item.id || `service-${index}`,
      title: item.heading || item.title || '',
      description: item.subheading || item.description || '',
      icon: item.svg || item.icon || ''
    }))
  } : null;

  return (
    <>
      {/* Home Banner */}
      {bannerData && <HomeBanner data={bannerData} loading={!isMounted} />}

      {/* Section 1: Best Umrah Packages */}
      {section1Widget && (
        <section className={`section bestpackages`}>
          {section1Image && (
            <div className='sideimage'>
              <img src={getImageUrl(section1Image)} alt="" />
            </div>
          )}
          <div className={section1Image ? "leftcontent" : "container"}>
            <div className='sectionheadings'>
              <div className='sectionheadingstext'>
                <h2 className="section-title" dangerouslySetInnerHTML={{ __html: section1Widget.heading || '' }} />
                <p className="section-subtitle" dangerouslySetInnerHTML={{ __html: section1Widget.subheading || '' }} />
              </div>
              <div className='rightside'>
                {section1Widget.slider_enable === '1' && (
                  <div className="swiper-nav-btns">
                    <button className="swiper-nav-btn prev prev-bestUmrah">
                      <img src="/nextarrow.svg" alt="" style={{ transform: 'rotate(180deg)' }} />
                    </button>
                    <button className="swiper-nav-btn next next-bestUmrah">
                      <img src="/nextarrow.svg" alt="" />
                    </button>
                  </div>
                )}
                {section1Widget.button_link && (
                  <Link href={`/${section1Widget.button_link}`} className="btn btn--primary">
                    {section1Widget.button_text || 'View All Packages'}
                  </Link>
                )}
              </div>
            </div>

            {section1Widget.slider_enable === '1' ? (
              <>
                <div className="packages-swiper-wrapper bestUmrah-swiper" style={{ position: 'relative' }}>
                  {!slidersLoaded.bestUmrah && <SliderSkeleton count={2} />}
                  <Swiper
                    modules={[Navigation, Pagination]}
                    onInit={() => setSlidersLoaded(prev => ({ ...prev, bestUmrah: true }))}
                    style={{ display: slidersLoaded.bestUmrah ? 'block' : 'none' }}
                    slidesPerView={1.2}
                    navigation={{
                      prevEl: '.prev-bestUmrah',
                      nextEl: '.next-bestUmrah',
                    }}
                    pagination={{
                      el: '.bestUmrah-pagination',
                      clickable: true
                    }}
                    breakpoints={{
                      640: { slidesPerView: 1 },
                      768: { slidesPerView: 1.2 },
                      992: { slidesPerView: 1.4 },
                      1025: { slidesPerView: 1.6 },
                      1200: { slidesPerView: 1.3 },
                      1600: { slidesPerView: 2 },
                    }}
                    className="packages-swiper"
                  >
                    {section1Packages.map((pkg: any, index: number) => (
                      <SwiperSlide key={`bestUmrah-${pkg.id || index}`}>
                        <UmrahPackageCard package={pkg} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                <div className="swiper-pagination-custom bestUmrah-pagination"></div>
              </>
            ) : (
              <div className="packages-grid-two-col">
                {section1Packages.map((pkg: any, index: number) => (
                  <UmrahPackageCard key={`bestUmrah-${pkg.id || index}`} package={pkg} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Section 2: December Umrah Deals */}
      {section2Widget && (
        <section className="section december-deals dealssection">
          <div className="container">
            <div className='sectionheadings'>
              <div className='sectionheadingstext'>
                <h2 className="section-title" dangerouslySetInnerHTML={{ __html: section2Widget.heading || '' }} />
                <p className="section-subtitle" dangerouslySetInnerHTML={{ __html: section2Widget.subheading || '' }} />
              </div>
              <div className='rightside'>
                {section2Widget.slider_enable === '1' && (
                  <div className="swiper-nav-btns">
                    <button className="swiper-nav-btn prev prev-decemberDeals">
                      <img src="/nextarrow.svg" alt="" style={{ transform: 'rotate(180deg)' }} />
                    </button>
                    <button className="swiper-nav-btn next next-decemberDeals">
                      <img src="/nextarrow.svg" alt="" />
                    </button>
                  </div>
                )}
                {section2Widget.button_link && (
                  <Link href={`/${section2Widget.button_link}`} className="btn btn--primary">
                    {section2Widget.button_text || 'View All Packages'}
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="packages-swiper-container-full">
            {section2Widget.slider_enable === '1' ? (
              <>
                <div className="packages-swiper-wrapper decemberDeals-swiper" style={{ position: 'relative' }}>
                  {!slidersLoaded.decemberDeals && <SliderSkeleton count={2} />}
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    onInit={() => setSlidersLoaded(prev => ({ ...prev, decemberDeals: true }))}
                    style={{ display: slidersLoaded.decemberDeals ? 'block' : 'none' }}
                    slidesPerView={1.2}
                    navigation={{
                      prevEl: '.prev-decemberDeals',
                      nextEl: '.next-decemberDeals',
                    }}
                    pagination={{
                      el: '.decemberDeals-pagination',
                      clickable: true
                    }}
                    loop={true}
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false
                    }}
                    breakpoints={{
                      640: { slidesPerView: 1 },
                      768: { slidesPerView: 1.2 },
                      992: { slidesPerView: 1.4 },
                      1025: { slidesPerView: 1.6 },
                      1200: { slidesPerView: 2.2 },
                      1700: { slidesPerView: 2.8 },
                    }}
                    className="packages-swiper"
                  >
                    {section2Packages.map((pkg: any, index: number) => (
                      <SwiperSlide key={`decemberDeals-${pkg.id || index}`}>
                        <UmrahPackageCard package={pkg} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                <div className="container">
                  <div className="swiper-pagination-custom decemberDeals-pagination"></div>
                </div>
              </>
            ) : (
              <div className="container">
                <div className="packages-grid-two-col">
                  {section2Packages.map((pkg: any, index: number) => (
                    <UmrahPackageCard key={`decemberDeals-${pkg.id || index}`} package={pkg} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Why Choose Us Section - Static for now */}
      <section className="section why-us-section">
        <div className="container container-sm">
          <div className="features-grid">
            <div className='leftside features-card-wrapper'>
              <div className="feature-card">
                <span className="feature-icon">
                  <img src="/01.png" alt="" />
                </span>
                <div className='content'>
                  <h3>Free Cancellations</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor </p>
                </div>
              </div>
              <div className="feature-card">
                <span className="feature-icon">
                  <img src="/02.png" alt="" />
                </span>
                <div className='content'>
                  <h3>Cheap To Luxury Umrah Deals</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor </p>
                </div>
              </div>
            </div>
            <div className='centeredchooose'>
              <img src="/chooseus.png" alt="" />
            </div>
            <div className='rightside features-card-wrapper'>
              <div className="feature-card">
                <div className='content'>
                  <h3>Guidance At Every Step</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor </p>
                </div>
                <span className="feature-icon">
                  <img src="/03.png" alt="" />
                </span>
              </div>
              <div className="feature-card">
                <div className='content'>
                  <h3>10,000 + Satisfied Customers</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor </p>
                </div>
                <span className="feature-icon">
                  <img src="/04.png" alt="" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Best Hajj Packages */}
      {section3Widget && (
        <section className="section hajjsection">
          <div className="container">
            <div className='sectionheadings'>
              <div className='sectionheadingstext'>
                <h2 className="section-title" dangerouslySetInnerHTML={{ __html: section3Widget.heading || '' }} />
                <p className="section-subtitle" dangerouslySetInnerHTML={{ __html: section3Widget.subheading || '' }} />
              </div>
              <div className='rightside'>
                {section3Widget.slider_enable === '1' && (
                  <div className="swiper-nav-btns">
                    <button className="swiper-nav-btn prev prev-bestHajj">
                      <img src="/nextarrow.svg" alt="" style={{ transform: 'rotate(180deg)' }} />
                    </button>
                    <button className="swiper-nav-btn next next-bestHajj">
                      <img src="/nextarrow.svg" alt="" />
                    </button>
                  </div>
                )}
                {section3Widget.button_link && (
                  <Link href={`/${section3Widget.button_link}`} className="btn btn--primary">
                    {section3Widget.button_text || 'View All Packages'}
                  </Link>
                )}
              </div>
            </div>
          </div>
          {section3Widget.slider_enable === '1' ? (
            <>
              <div className="packages-swiper-wrapper bestHajj-swiper" style={{ position: 'relative' }}>
                <div className='sliderhere'>
                  {!slidersLoaded.bestHajj && <SliderSkeleton count={3} />}
                  <Swiper
                    modules={[Navigation, Pagination]}
                    onInit={() => setSlidersLoaded(prev => ({ ...prev, bestHajj: true }))}
                    style={{ display: slidersLoaded.bestHajj ? 'block' : 'none' }}
                    slidesPerView={1}
                    navigation={{
                      prevEl: '.prev-bestHajj',
                      nextEl: '.next-bestHajj',
                    }}
                    pagination={{
                      el: '.bestHajj-pagination',
                      clickable: true
                    }}
                    breakpoints={{
                      640: { slidesPerView: 2 },
                      992: { slidesPerView: 2.2 },
                      1025: { slidesPerView: 2.5 },
                      1200: { slidesPerView: 2 },
                      1500: { slidesPerView: 3 },
                    }}
                    className="packages-swiper"
                  >
                    {section3Packages.map((pkg: any, index: number) => (
                      <SwiperSlide key={`bestHajj-${pkg.id || index}`}>
                        <HajjPackageCard package={pkg} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div className="swiper-pagination-custom bestHajj-pagination"></div>
                </div>
                <div className='imagearea'>
                  <img src={section3Image} alt="" />
                </div>
              </div>
            </>
          ) : (
            null
          )}


        </section>
      )}
      {/* Explore Our Umrah Packages Section */}
      {section4Packages.length > 0 && section4Widget && (
        <section className="section exploration-section">
          <div className="container">
            <div className='sectionheadings'>
              <div className='sectionheadingstext'>
                <h2 className="section-title" dangerouslySetInnerHTML={{ __html: section4Widget.heading || '' }} />
                <p className="section-subtitle" dangerouslySetInnerHTML={{ __html: section4Widget.description || section4Widget.subheading || '' }} />
              </div>
              <div className='rightside'>
                {section4Widget.slider_enable === '1' && (
                  <div className="swiper-nav-btns">
                    <button className="swiper-nav-btn prev prev-exploration">
                      <img src="/nextarrow.svg" alt="" style={{ transform: 'rotate(180deg)' }} />
                    </button>
                    <button className="swiper-nav-btn next next-exploration">
                      <img src="/nextarrow.svg" alt="" />
                    </button>
                  </div>
                )}
                {section4Widget.button_link && (
                  <Link href={`/${section4Widget.button_link}`} className="btn btn--primary">
                    {section4Widget.button_text || 'View All Packages'}
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="packages-swiper-wrapper exploration-swiper" style={{ position: 'relative' }}>
            {!slidersLoaded.exploration && <SliderSkeleton count={3} />}
            <div className="exploration-swiper-inner" style={{ display: slidersLoaded.exploration ? 'block' : 'none' }}>
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                onInit={() => setSlidersLoaded(prev => ({ ...prev, exploration: true }))}
                slidesPerView={1}
                centeredSlides={true}
                spaceBetween={24}
                loop={section4Packages.length > 1}
                navigation={{
                  prevEl: '.prev-exploration',
                  nextEl: '.next-exploration',
                }}
                pagination={{
                  el: '.exploration-pagination',
                  clickable: true
                }}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false
                }}
                breakpoints={{
                  640: { slidesPerView: 'auto' }
                }}
                className="packages-swiper exploration-packages-swiper"
              >
                {section4Packages.map((pkg: UmrahPackageData) => (
                  <SwiperSlide key={`explore-${pkg.id}`}>
                    <UmrahExplorationCard package={pkg} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="swiper-pagination-custom exploration-pagination"></div>
          </div>
        </section>
      )}
      {/* Customize Banner */}
      <CustomizeBanner data={data.customization_data} />

      {/* Reviews Section */}
      {reviews && reviews.length > 0 && reviewsWidget && (
        <HomeReviews
          reviews={reviews}
          cardsPerSlide={2}
          heading={reviewsWidget.heading}
          subheading={reviewsWidget.sub_heading}
        />
      )}

      {/* Umrah & Hajj Services Section */}
      {servicesData && (
        <UmrahHajjServices data={servicesData} />
      )}
      {/* Partners Section - Placeholder or using image */}
      <section className="section partners-section">
        <div className="container">
          <div className='sectionheadings'>
            <div className='sectionheadingstext'>
              <h2 className="section-title">{data.content?.airline_heading}</h2>
              <p className="section-subtitle">
                {data.content?.airline_subheading}
              </p>
            </div>
            <div className='rightside justify-content-end' >
              <div className="swiper-nav-btns">
                <button className="swiper-nav-btn prev partner-prev">
                  <img src="/nextarrow.svg" alt="" style={{ transform: 'rotate(180deg)' }} />
                </button>
                <button className="swiper-nav-btn next partner-next">
                  <img src="/nextarrow.svg" alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="partners-logos">
          <Swiper
            modules={[Navigation]}
            slidesPerView={2.2}
            spaceBetween={24}
            navigation={{
              prevEl: '.partner-prev',
              nextEl: '.partner-next',
            }}
            breakpoints={{
              640: { slidesPerView: 4 },
              1024: { slidesPerView: 8 },
            }}
            className="packages-swiper partner-swiper"
          >
            {/* Remove dummy fallback logos */}
            {airlinearray.map((pkg: string) => (
              <SwiperSlide key={`partner-${pkg}`}>
                <img src={pkg} alt="Partners" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Scroll Detail Section */}
      {data.content?.scroll_description && (
        <ScrollDetail
          title="Umrah & Hajj Services Scroll Detail"
          image={scrollImage}
          content={data.content.scroll_description}
        />
      )}

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <section className="section faq-section">
          <div className="container">
            <div className='sectionheadings'>
              <div className='sectionheadingstext'>
                <h2 className="section-title">{data.content?.faqs_heading || 'Frequently Asked Questions'}</h2>
                <p className="section-subtitle" dangerouslySetInnerHTML={{ __html: data.content?.faqs_subheading || '' }} />
              </div>
            </div>
            <FAQ items={faqs} />
          </div>
        </section>
      )}
    </>
  );
}
