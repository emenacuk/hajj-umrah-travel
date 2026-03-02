'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { SliderSkeleton } from '@/components/common/Skeleton';
import { PageData, HajjPackageData } from '@/types';
import InnerBanner from '@/components/banners/InnerBanner';
import HajjPackageCard from '@/components/cards/HajjPackageCard';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';
import '@/styles/components/_package-detail.scss';
import { ScrollDetail } from '@/components/sections/ScrollDetail';
import FAQ from '@/components/common/FAQ';
import { isEmptyHtml } from '@/utils/htmlUtils';

interface HajjPackageTemplateProps {
  data: PageData;
}

export default function HajjPackageTemplate({ data }: HajjPackageTemplateProps) {
  const [slidersLoaded, setSlidersLoaded] = useState({
    shifting: false,
    nonShifting: false
  });
  const bannerData = data.content?.banner || {};
  const faqs = data.content?.faqs || [];
  const faqsHeading = data.content?.faqs_heading || "Frequently Asked Questions";
  const faqsSubheading = data.content?.faqs_subheading || "Find answers to common questions about our Hajj packages and the pilgrimage experience.";

  // Get packages from dynamic API data
  const shiftingPackages = data.content?.section1Packages || [];
  const nonShiftingPackages = data.content?.section2Packages || [];

  // Get widget info for headings
  const shiftingWidget = data.content?.section_1_widget?.[0] || {};
  const nonShiftingWidget = data.content?.section_2_widget?.[0] || {};

  return (
    <>
      {/* Banner */}
      {bannerData && <InnerBanner data={bannerData} />}

      {/* Package Details */}
      <section className="section">
        <div className="container">

          {/* All Hajj Shifting Packages Slider */}
          {shiftingPackages.length > 0 && (
            <section className="section exploration-section" style={{ paddingTop: 0 }}>
              <div className="container">
                <div className='sectionheadings'>
                  <div className='sectionheadingstext'>
                    <h2 className="section-title">{shiftingWidget.heading || "All Hajj Shifting Packages"}</h2>
                    {(shiftingWidget.description || shiftingWidget.subheading) && !isEmptyHtml(shiftingWidget.description || shiftingWidget.subheading) && (
                      <p className="section-subtitle">
                        {shiftingWidget.description || shiftingWidget.subheading}
                      </p>
                    )}
                  </div>
                  <div className='rightside'>
                    <div className="swiper-nav-btns">
                      <button id='prev-shifting' className="swiper-nav-btn prev prev-exploration">
                        <img src="/nextarrow.svg" alt="" style={{ transform: 'rotate(180deg)' }} />
                      </button>
                      <button id='next-shifting' className="swiper-nav-btn next next-exploration">
                        <img src="/nextarrow.svg" alt="" />
                      </button>
                    </div>
                    {shiftingWidget.button_text && (
                      <Link href={shiftingWidget.button_link || "/hajj-packages"} className="btn btn--primary">
                        {shiftingWidget.button_text}
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              <div className="packages-swiper-wrapper" style={{ position: 'relative', minHeight: '400px' }}>
                {!slidersLoaded.shifting && <SliderSkeleton count={3} />}
                <Swiper
                  key="shifting-hajj-swiper"
                  modules={[Navigation, Pagination]}
                  onInit={() => setSlidersLoaded(prev => ({ ...prev, shifting: true }))}
                  style={{ opacity: slidersLoaded.shifting ? 1 : 0 }}
                  slidesPerView={1}
                  spaceBetween={24}
                  navigation={{
                    prevEl: '#prev-shifting',
                    nextEl: '#next-shifting',
                  }}
                  className="packages-swiper"
                  breakpoints={{
                    640: { slidesPerView: 1 },
                    1024: { slidesPerView: 2 },
                    1280: { slidesPerView: 3 },
                  }}
                >
                  {shiftingPackages.map((pkg: any) => (
                    <SwiperSlide key={pkg.id}>
                      <HajjPackageCard package={pkg} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </section>
          )}

          {/* All Hajj Non-Shifting Packages Slider */}
          {nonShiftingPackages.length > 0 && (
            <section className="section exploration-section umrah-slider-section">
              <div className="container">
                <div className='sectionheadings'>
                  <div className='sectionheadingstext'>
                    <h2 className="section-title">{nonShiftingWidget.heading || "All Hajj Non-Shifting Packages"}</h2>
                    {(nonShiftingWidget.description || nonShiftingWidget.subheading) && !isEmptyHtml(nonShiftingWidget.description || nonShiftingWidget.subheading) && (
                      <p className="section-subtitle">
                        {nonShiftingWidget.description || nonShiftingWidget.subheading}
                      </p>
                    )}
                  </div>
                  <div className='rightside'>
                    <div className="swiper-nav-btns">
                      <button id='prev-nonshifting' className="swiper-nav-btn prev prev-exploration">
                        <img src="/nextarrow.svg" alt="" style={{ transform: 'rotate(180deg)' }} />
                      </button>
                      <button id='next-nonshifting' className="swiper-nav-btn next next-exploration">
                        <img src="/nextarrow.svg" alt="" />
                      </button>
                    </div>
                    {nonShiftingWidget.button_text && (
                      <Link href={nonShiftingWidget.button_link || "/hajj-packages"} className="btn btn--primary">
                        {nonShiftingWidget.button_text}
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              <div className="packages-swiper-wrapper" style={{ position: 'relative', minHeight: '400px' }}>
                {!slidersLoaded.nonShifting && <SliderSkeleton count={3} />}
                <Swiper
                  key="non-shifting-hajj-swiper"
                  modules={[Navigation, Pagination]}
                  onInit={() => setSlidersLoaded(prev => ({ ...prev, nonShifting: true }))}
                  style={{ opacity: slidersLoaded.nonShifting ? 1 : 0 }}
                  slidesPerView={1}
                  spaceBetween={24}
                  navigation={{
                    prevEl: '#prev-nonshifting',
                    nextEl: '#next-nonshifting',
                  }}
                  className="packages-swiper"
                  breakpoints={{
                    640: { slidesPerView: 1 },
                    1024: { slidesPerView: 2 },
                    1280: { slidesPerView: 3 },
                  }}
                >
                  {nonShiftingPackages.map((pkg: any) => (
                    <SwiperSlide key={pkg.id}>
                      <HajjPackageCard package={pkg} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </section>
          )}

          {data.content?.scroll_description && !isEmptyHtml(data.content.scroll_description) && (
            <ScrollDetail
              title={data.title || "Hajj Services Detail"}
              image={data.content.scroll_image_url || "/scrollimg.png"}
              content={data.content.scroll_description}
            />
          )}
        </div>
        {faqs.length > 0 && (
          <section className="section faq-section">
            <div className="container">
              <div className='sectionheadings'>
                <div className='sectionheadingstext'>
                  <h2 className="section-title">{faqsHeading}</h2>
                  {faqsSubheading && !isEmptyHtml(faqsSubheading) && (
                    <p className="section-subtitle">
                      {faqsSubheading}
                    </p>
                  )}
                </div>
              </div>
              <FAQ items={faqs} />
            </div>

          </section>
        )}
      </section>
    </>
  );
}

