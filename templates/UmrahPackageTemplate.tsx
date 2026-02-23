'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { SliderSkeleton } from '@/components/common/Skeleton';
import { PageData } from '@/types';
import InnerBanner from '@/components/banners/InnerBanner';
import UmrahPackageCard from '@/components/cards/UmrahPackageCard';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';
import '@/styles/components/_package-detail.scss';
import { ScrollDetail } from '@/components/sections/ScrollDetail';
import FAQ from '@/components/common/FAQ';

interface UmrahPackageTemplateProps {
  data: PageData;
}

export default function UmrahPackageTemplate({ data }: UmrahPackageTemplateProps) {
  const [slidersLoaded, setSlidersLoaded] = useState({
    section1: false,
    section2: false,
    section3: false,
    section4: false
  });

  const content = data.content || {};
  const bannerData = content.banner || {};
  const faqs = content.faqs || [];
  const faqsHeading = content.faqs_heading || 'Frequently Asked Questions';
  const faqsSubheading = content.faqs_subheading || '';

  // Use dynamic packages from API instead of mock data
  const section1Packages = content.section1Packages || [];
  const section2Packages = content.section2Packages || [];
  const section3Packages = content.section3Packages || [];
  const section4Packages = content.section4Packages || [];

  // Get widget info for headings/subheadings
  const widget1 = content.section_1_widget?.[0] || {};
  const widget2 = content.section_2_widget?.[0] || {};
  const widget3 = content.section_3_widget?.[0] || {};
  const widget4 = content.section_4_widget?.[0] || {};

  return (
    <>
      {/* Banner */}
      {bannerData && <InnerBanner data={bannerData} />}

      {/* Section 1 Slider */}
      {section1Packages.length > 0 && (
        <section className="section exploration-section">
          <div className="container">
            <div className='sectionheadings'>
              <div className='sectionheadingstext'>
                <h2 className="section-title">{widget1.heading || 'Umrah Packages'}</h2>
                <p className="section-subtitle">
                  {widget1.subheading || widget1.description || ''}
                </p>
              </div>
              <div className='rightside'>
                <div className="swiper-nav-btns">
                  <button id='prev-s1' className="swiper-nav-btn prev prev-exploration">
                    <img src="/nextarrow.svg" alt="" style={{ transform: 'rotate(180deg)' }} />
                  </button>
                  <button id='next-s1' className="swiper-nav-btn next next-exploration">
                    <img src="/nextarrow.svg" alt="" />
                  </button>
                </div>
                {widget1.button_text && (
                  <Link href={widget1.button_link || '#'} className="btn btn--primary">
                    {widget1.button_text}
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="packages-swiper-wrapper" style={{ position: 'relative' }}>
            {!slidersLoaded.section1 && <SliderSkeleton count={2} />}
            <Swiper
              key="s1-swiper"
              modules={[Navigation, Pagination]}
              onInit={() => setSlidersLoaded(prev => ({ ...prev, section1: true }))}
              style={{ opacity: slidersLoaded.section1 ? 1 : 0 }}
              slidesPerView={1}
              spaceBetween={24}
              navigation={{
                prevEl: '#prev-s1',
                nextEl: '#next-s1',
              }}
              className="packages-swiper"
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 1.2 },
                992: { slidesPerView: 1.4 },
                1025: { slidesPerView: 1.6 },
                1200: { slidesPerView: 2.2 },
                1700: { slidesPerView: 2.8 },
              }}
            >
              {section1Packages.map((pkg: any) => (
                <SwiperSlide key={pkg.id}>
                  <UmrahPackageCard package={pkg} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}

      {/* Section 2 Slider */}
      {section2Packages.length > 0 && (
        <section className="section exploration-section ">
          <div className="container">
            <div className='sectionheadings'>
              <div className='sectionheadingstext'>
                <h2 className="section-title">{widget2.heading || 'Umrah Deals'}</h2>
                <p className="section-subtitle">
                  {widget2.subheading || widget2.description || ''}
                </p>
              </div>
              <div className='rightside'>
                <div className="swiper-nav-btns">
                  <button id='prev-s2' className="swiper-nav-btn prev prev-exploration">
                    <img src="/nextarrow.svg" alt="" style={{ transform: 'rotate(180deg)' }} />
                  </button>
                  <button id='next-s2' className="swiper-nav-btn next next-exploration">
                    <img src="/nextarrow.svg" alt="" />
                  </button>
                </div>
                {widget2.button_text && (
                  <Link href={widget2.button_link || '#'} className="btn btn--primary">
                    {widget2.button_text}
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="packages-swiper-wrapper" style={{ position: 'relative' }}>
            {!slidersLoaded.section2 && <SliderSkeleton count={2} />}
            <Swiper
              key="s2-swiper"
              modules={[Navigation, Pagination]}
              onInit={() => setSlidersLoaded(prev => ({ ...prev, section2: true }))}
              style={{ opacity: slidersLoaded.section2 ? 1 : 0 }}
              slidesPerView={1}
              spaceBetween={24}
              navigation={{
                prevEl: '#prev-s2',
                nextEl: '#next-s2',
              }}
              className="packages-swiper"
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 1.2 },
                992: { slidesPerView: 1.4 },
                1025: { slidesPerView: 1.6 },
                1200: { slidesPerView: 2.2 },
                1700: { slidesPerView: 2.8 },
              }}
            >
              {section2Packages.map((pkg: any) => (
                <SwiperSlide key={pkg.id}>
                  <UmrahPackageCard package={pkg} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}

      {/* Section 3 Slider */}
      {section3Packages.length > 0 && (
        <section className="section exploration-section ">
          <div className="container">
            <div className='sectionheadings'>
              <div className='sectionheadingstext'>
                <h2 className="section-title">{widget3.heading || 'Hajj Packages'}</h2>
                <p className="section-subtitle">
                  {widget3.subheading || widget3.description || ''}
                </p>
              </div>
              <div className='rightside'>
                <div className="swiper-nav-btns">
                  <button id='prev-s3' className="swiper-nav-btn prev prev-exploration">
                    <img src="/nextarrow.svg" alt="" style={{ transform: 'rotate(180deg)' }} />
                  </button>
                  <button id='next-s3' className="swiper-nav-btn next next-exploration">
                    <img src="/nextarrow.svg" alt="" />
                  </button>
                </div>
                {widget3.button_text && (
                  <Link href={widget3.button_link || '#'} className="btn btn--primary">
                    {widget3.button_text}
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="packages-swiper-wrapper" style={{ position: 'relative' }}>
            {!slidersLoaded.section3 && <SliderSkeleton count={2} />}
            <Swiper
              key="s3-swiper"
              modules={[Navigation, Pagination]}
              onInit={() => setSlidersLoaded(prev => ({ ...prev, section3: true }))}
              style={{ opacity: slidersLoaded.section3 ? 1 : 0 }}
              slidesPerView={1}
              spaceBetween={24}
              navigation={{
                prevEl: '#prev-s3',
                nextEl: '#next-s3',
              }}
              className="packages-swiper"
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 1.2 },
                992: { slidesPerView: 1.4 },
                1025: { slidesPerView: 1.6 },
                1200: { slidesPerView: 2.2 },
                1700: { slidesPerView: 2.8 },
              }}
            >
              {section3Packages.map((pkg: any) => (
                <SwiperSlide key={pkg.id}>
                  <UmrahPackageCard package={pkg} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}



      {/* Section 4 Slider */}
      {section4Packages.length > 0 && (
        <section className="section exploration-section ">
          <div className="container">
            <div className='sectionheadings'>
              <div className='sectionheadingstext'>
                <h2 className="section-title">{widget4.heading || 'Explore Packages'}</h2>
                <p className="section-subtitle">
                  {widget4.subheading || widget4.description || ''}
                </p>
              </div>
              <div className='rightside'>
                <div className="swiper-nav-btns">
                  <button id='prev-s4' className="swiper-nav-btn prev prev-exploration">
                    <img src="/nextarrow.svg" alt="" style={{ transform: 'rotate(180deg)' }} />
                  </button>
                  <button id='next-s4' className="swiper-nav-btn next next-exploration">
                    <img src="/nextarrow.svg" alt="" />
                  </button>
                </div>
                {widget4.button_text && (
                  <Link href={widget4.button_link || '#'} className="btn btn--primary">
                    {widget4.button_text}
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="packages-swiper-wrapper" style={{ position: 'relative' }}>
            {!slidersLoaded.section4 && <SliderSkeleton count={2} />}
            <Swiper
              key="s4-swiper"
              modules={[Navigation, Pagination]}
              onInit={() => setSlidersLoaded(prev => ({ ...prev, section4: true }))}
              style={{ opacity: slidersLoaded.section4 ? 1 : 0 }}
              slidesPerView={1}
              spaceBetween={24}
              navigation={{
                prevEl: '#prev-s4',
                nextEl: '#next-s4',
              }}
              className="packages-swiper"
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 1.2 },
                992: { slidesPerView: 1.4 },
                1025: { slidesPerView: 1.6 },
                1200: { slidesPerView: 2.2 },
                1700: { slidesPerView: 2.8 },
              }}
            >
              {section4Packages.map((pkg: any) => (
                <SwiperSlide key={pkg.id}>
                  <UmrahPackageCard package={pkg} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}

      <ScrollDetail
        title={data.title}
        image={content.scroll_image_url}
        content={content.scroll_description || content.main_content}
      />

      {faqs.length > 0 && (
        <section className="section faq-section">
          <div className="container">
            <div className='sectionheadings'>
              <div className='sectionheadingstext'>
                <h2 className="section-title">{faqsHeading}</h2>
                <p className="section-subtitle">
                  {faqsSubheading}
                </p>
              </div>
            </div>

            <FAQ items={faqs} />
          </div>
        </section>
      )}
    </>
  );
}
