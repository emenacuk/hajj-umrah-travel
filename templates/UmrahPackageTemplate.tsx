'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { SliderSkeleton } from '@/components/common/Skeleton';
import { PageData, UmrahPackageData, HotelData, ReviewData } from '@/types';
import InnerBanner from '@/components/banners/InnerBanner';
import UmrahPackageCard from '@/components/cards/UmrahPackageCard';
import InquiryForm from '@/components/forms/InquiryForm';
import Reviews from '@/components/common/Reviews';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';
import { mockHomePageData } from '@/data/mockData';
import '@/styles/components/_package-detail.scss';
import { ScrollDetail } from '@/components/sections/ScrollDetail';
import FAQ from '@/components/common/FAQ';

interface UmrahPackageTemplateProps {
  data: PageData;
}

export default function UmrahPackageTemplate({ data }: UmrahPackageTemplateProps) {
  const [slidersLoaded, setSlidersLoaded] = useState({
    threeStar: false,
    fourStar: false,
    fiveStar: false
  });
  const bannerData = data.content?.banner || {};
  const faqs = data.content?.faqs || [];

  // Get packages from mock data for sliders
  const allUmrahPackages = mockHomePageData.content?.umrahPackages || [];
  const threeStarPackages = allUmrahPackages.filter((pkg: any) => pkg.stars === 3);
  const fourStarPackages = allUmrahPackages.filter((pkg: any) => pkg.stars === 4);
  const fiveStarPackages = allUmrahPackages.filter((pkg: any) => pkg.stars === 5);

  return (
    <>
      {/* Banner */}
      {bannerData && <InnerBanner data={bannerData} />}
      {/* 3 Star Umrah Packages Slider */}
      {threeStarPackages.length > 0 && (
        <section className="section exploration-section">
          <div className="container">
            <div className='sectionheadings'>
              <div className='sectionheadingstext'>
                <h2 className="section-title">3 Star Umrah Packages</h2>
                <p className="section-subtitle">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip
                </p>
              </div>
              <div className='rightside'>
                <div className="swiper-nav-btns">
                  <button id='prev-3star' className="swiper-nav-btn prev prev-exploration">
                    <img src="/nextarrow.svg" alt="" style={{ transform: 'rotate(180deg)' }} />
                  </button>
                  <button id='next-3star' className="swiper-nav-btn next next-exploration">
                    <img src="/nextarrow.svg" alt="" />
                  </button>
                </div>
                <Link href="/3-star-umrah-packages" className="btn btn--primary">View All Packages</Link>
              </div>
            </div>
          </div>
          <div className="packages-swiper-wrapper" style={{ position: 'relative' }}>
            {!slidersLoaded.threeStar && <SliderSkeleton count={2} />}
            <Swiper
              key="three-star-swiper"
              modules={[Navigation, Pagination]}
              onInit={() => setSlidersLoaded(prev => ({ ...prev, threeStar: true }))}
              style={{ opacity: slidersLoaded.threeStar ? 1 : 0 }}
              slidesPerView={1}
              spaceBetween={24}
              navigation={{
                prevEl: '#prev-3star',
                nextEl: '#next-3star',
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
              {threeStarPackages.map((pkg: any) => (
                <SwiperSlide key={pkg.id}>
                  <UmrahPackageCard package={pkg} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

        </section>
      )}

      {/* 4 Star Umrah Packages Slider */}
      {fourStarPackages.length > 0 && (
        <section className="section exploration-section ">
          <div className="container">
            <div className='sectionheadings'>
              <div className='sectionheadingstext'>
                <h2 className="section-title">4 Star Umrah Packages</h2>
                <p className="section-subtitle">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip
                </p>
              </div>
              <div className='rightside'>
                <div className="swiper-nav-btns">
                  <button id='prev-4star' className="swiper-nav-btn prev prev-exploration">
                    <img src="/nextarrow.svg" alt="" style={{ transform: 'rotate(180deg)' }} />
                  </button>
                  <button id='next-4star' className="swiper-nav-btn next next-exploration">
                    <img src="/nextarrow.svg" alt="" />
                  </button>
                </div>
                <Link href="/4-star-umrah-packages" className="btn btn--primary">View All Packages</Link>
              </div>
            </div>
          </div>
          <div className="packages-swiper-wrapper" style={{ position: 'relative' }}>
            {!slidersLoaded.fourStar && <SliderSkeleton count={2} />}
            <Swiper
              key="four-star-swiper"
              modules={[Navigation, Pagination]}
              onInit={() => setSlidersLoaded(prev => ({ ...prev, fourStar: true }))}
              style={{ opacity: slidersLoaded.fourStar ? 1 : 0 }}
              slidesPerView={1}
              spaceBetween={24}
              navigation={{
                prevEl: '#prev-4star',
                nextEl: '#next-4star',
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
              {fourStarPackages.map((pkg: any) => (
                <SwiperSlide key={pkg.id}>
                  <UmrahPackageCard package={pkg} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

        </section>
      )}
      {fiveStarPackages.length > 0 && (
        <section className="section exploration-section ">
          <div className="container">
            <div className='sectionheadings'>
              <div className='sectionheadingstext'>
                <h2 className="section-title">5 Star Umrah Packages</h2>
                <p className="section-subtitle">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip
                </p>
              </div>
              <div className='rightside'>
                <div className="swiper-nav-btns">
                  <button id='prev-5star' className="swiper-nav-btn prev prev-exploration">
                    <img src="/nextarrow.svg" alt="" style={{ transform: 'rotate(180deg)' }} />
                  </button>
                  <button id='next-5star' className="swiper-nav-btn next next-exploration">
                    <img src="/nextarrow.svg" alt="" />
                  </button>
                </div>
                <Link href="/5-star-umrah-packages" className="btn btn--primary">View All Packages</Link>
              </div>
            </div>
          </div>
          <div className="packages-swiper-wrapper" style={{ position: 'relative' }}>
            {!slidersLoaded.fiveStar && <SliderSkeleton count={2} />}
            <Swiper
              key="five-star-swiper"
              modules={[Navigation, Pagination]}
              onInit={() => setSlidersLoaded(prev => ({ ...prev, fiveStar: true }))}
              style={{ opacity: slidersLoaded.fiveStar ? 1 : 0 }}
              slidesPerView={1}
              spaceBetween={24}
              navigation={{
                prevEl: '#prev-5star',
                nextEl: '#next-5star',
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
              {fiveStarPackages.map((pkg: any) => (
                <SwiperSlide key={pkg.id}>
                  <UmrahPackageCard package={pkg} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}
      <ScrollDetail
        title="Umrah & Hajj Services Scroll Detail"
        image="/scrollimg.png"
        content={`
          <h2>Welcome to Bismillah Travel – Your Trusted Umrah Travel Agency in the UK</h2>
          <p>Bismillah Travel is here to help you visit religious places and make Umrah trips that connect with your soul. We're experts at creating meaningful journeys, so your Umrah experience will be not just a trip but a transformative experience. So, start a memorable and moving journey with us, your companion, for the best Umrah travel. We're more than just a travel agency; our mission is to explore spirituality with you, making the experience unforgettable. So, prepare yourself for an unparalleled experience with our Umrah packages.</p>
          <h3>Umrah Packages</h3>
          <ul>
            <li>Premium Accommodations</li>
            <li>Direct Flight Options</li>
            <li>Experienced Professional Guides</li>
            <li>24/7 Spiritual Assistance</li>
          </ul>
          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
        `}
      />
      {faqs.length > 0 && (
        <section className="section faq-section">
          <div className="container">
            <div className='sectionheadings'>
              <div className='sectionheadingstext'>
                <h2 className="section-title">Frequently Asked Questions</h2>
                <p className="section-subtitle">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip
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

