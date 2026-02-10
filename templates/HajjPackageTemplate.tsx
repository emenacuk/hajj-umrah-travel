'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { PageData, HajjPackageData } from '@/types';
import InnerBanner from '@/components/banners/InnerBanner';
import HajjPackageCard from '@/components/cards/HajjPackageCard';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';
import { mockHomePageData } from '@/data/mockData';
import '@/styles/components/_package-detail.scss';
import { ScrollDetail } from '@/components/sections/ScrollDetail';
import FAQ from '@/components/common/FAQ';

interface HajjPackageTemplateProps {
  data: PageData;
}

export default function HajjPackageTemplate({ data }: HajjPackageTemplateProps) {
  const bannerData = data.content?.banner || {};
  const faqs = data.content?.faqs || [];

  // Get packages from mock data for sliders
  const allHajjPackages = mockHomePageData.content?.hajjPackages || [];
  const shiftingPackages = allHajjPackages.filter((pkg: any) => pkg.shifting === true);
  const nonShiftingPackages = allHajjPackages.filter((pkg: any) => pkg.shifting === false);

  return (
    <>
      {/* Banner */}
      {bannerData && <InnerBanner data={bannerData} />}

      {/* Package Details */}
      <section className="section">
        <div className="container">

          {/* All Hajj Shifting Packages Slider */}
          {shiftingPackages.length > 0 && (
            <section className="section exploration-section">
              <div className="container">
                <div className='sectionheadings'>
                  <div className='sectionheadingstext'>
                    <h2 className="section-title">All Hajj Shifting Packages</h2>
                    <p className="section-subtitle">
                      Explore our range of shifting Hajj packages, offering a balance of comfort and convenience
                      during the most important days of your pilgrimage.
                    </p>
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
                    <Link href="/hajj-packages" className="btn btn--primary">View All Packages</Link>
                  </div>
                </div>
              </div>

              <div className="packages-swiper-wrapper">
                <Swiper
                  key="shifting-hajj-swiper"
                  modules={[Navigation, Pagination]}
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
                    <h2 className="section-title">All Hajj Non-Shifting Packages</h2>
                    <p className="section-subtitle">
                      Our non-shifting Hajj packages provide you with fixed hotel accommodation in Makkah
                      close to the Haram throughout your entire stay for maximum convenience.
                    </p>
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
                    <Link href="/hajj-packages" className="btn btn--primary">View All Packages</Link>
                  </div>
                </div>
              </div>

              <div className="packages-swiper-wrapper">
                <Swiper
                  key="non-shifting-hajj-swiper"
                  modules={[Navigation, Pagination]}
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
          <ScrollDetail
            title="Hajj Services Detail"
            image="/scrollimg.png"
            content={`
          <h2>Why Choose Bismillah Travel for Your Hajj Journey?</h2>
          <p>Hajj is the journey of a lifetime, and at Bismillah Travel, we understand the spiritual significance of this pilgrimage. Our goal is to provide a seamless and deeply spiritual experience for every pilgrim. We offer comprehensive Hajj packages tailored to meet your specific needs, whether you prefer shifting or non-shifting accommodations.</p>
          <h3>Our Hajj Packages Include:</h3>
          <ul>
            <li>Premium Accommodations near the Haram</li>
            <li>Experienced Religious Guides and Group Leaders</li>
            <li>Full Transportation within Saudi Arabia</li>
            <li>24/7 On-ground Support</li>
            <li>Assistance with Visas and Documentation</li>
          </ul>
          <p>We take care of all the logistics so you can focus entirely on your worship and connection with Allah (SWT). Join the thousands of satisfied pilgrims who have performed Hajj with Bismillah Travel.</p>
        `}
          />
        </div>
        {faqs.length > 0 && (
          <section className="section faq-section">
            <div className="container">
              <div className='sectionheadings'>
                <div className='sectionheadingstext'>
                  <h2 className="section-title">Frequently Asked Questions</h2>
                  <p className="section-subtitle">
                    Find answers to common questions about our Hajj packages and the pilgrimage experience.
                  </p>
                </div>
              </div>
            </div>
            <FAQ items={faqs} />
          </section>
        )}
      </section>
    </>
  );
}

