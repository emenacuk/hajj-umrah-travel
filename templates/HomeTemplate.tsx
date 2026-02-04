'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { PageData, UmrahPackageData, HajjPackageData, ReviewData } from '@/types';
import HomeBanner from '@/components/banners/HomeBanner';
import UmrahPackageCard from '@/components/cards/UmrahPackageCard';
import HajjPackageCard from '@/components/cards/HajjPackageCard';
import FAQ from '@/components/common/FAQ';
import Reviews from '@/components/common/Reviews';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '@/styles/components/_home-template.scss';
import Link from 'next/link';

interface HomeTemplateProps {
  data: PageData;
}

export default function HomeTemplate({ data }: HomeTemplateProps) {
  const bannerData = data.content?.banner || {};
  const umrahPackages = data.content?.umrahPackages || [];
  const hajjPackages = data.content?.hajjPackages || [];
  const faqs = data.content?.faqs || [];
  const reviews = data.content?.reviews || [];
  const features = data.content?.features || [];

  return (
    <>
      {/* Home Banner */}
      {bannerData && <HomeBanner data={bannerData} />}

      {/* Best Umrah Packages Section */}
      {umrahPackages.length > 0 && (
        <section className="section bestpackages">
          <div className='sideimage'>
            <img src="/umrah-packages.png" alt="" />
          </div>
          <div className="leftcontent">
            <div className='sectionheadings'>
              <div className='sectionheadingstext'>
                <h2 className="section-title">Best Umrah Packages 2025-2026</h2>
                <p className="section-subtitle">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip
                </p>

              </div>
              <div className='rightside'>
                <div className="swiper-nav-btns">
                  <button className="swiper-nav-btn prev prev-umrah">
                    <img src="/nextarrow.svg" alt="" style={{ transform: 'rotate(180deg)' }} />
                  </button>
                  <button className="swiper-nav-btn next next-umrah">
                    <img src="/nextarrow.svg" alt="" />
                  </button>
                </div>
                <Link href="/umrah-packages" className="btn btn--primary">View All Packages</Link>
              </div>
            </div>

            <div className="packages-swiper-wrapper bestpackagesswiper">
              <Swiper
                modules={[Navigation, Pagination]}
                slidesPerView={1}
                navigation={{
                  prevEl: '.prev-umrah',
                  nextEl: '.next-umrah',
                }}
                pagination={{
                  el: '.umraslider-pagination-custom',
                  clickable: true
                }}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 2 },
                  1280: { slidesPerView: 2 },
                }}
                className="packages-swiper"
              >
                {umrahPackages.map((pkg: UmrahPackageData) => (
                  <SwiperSlide key={pkg.id}>
                    <UmrahPackageCard package={pkg} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="swiper-pagination-custom umraslider-pagination-custom"></div>
          </div>
        </section>
      )}
      {umrahPackages.length > 0 && (
        <section className="section december-deals dealssection">
          <div className="container">
            <div className='sectionheadings'>
              <div className='sectionheadingstext'>
                <h2 className="section-title">December Umrah Deals 2025</h2>
                <p className="section-subtitle">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip
                </p>
              </div>
              <div className='rightside'>
                <div className="swiper-nav-btns">
                  <button className="swiper-nav-btn prev prev-december">
                    <img src="/nextarrow.svg" alt="" style={{ transform: 'rotate(180deg)' }} />
                  </button>
                  <button className="swiper-nav-btn next next-december">
                    <img src="/nextarrow.svg" alt="" />
                  </button>
                </div>
                <Link href="/umrah-packages" className="btn btn--primary">View All Packages</Link>
              </div>
            </div>
          </div>
          <div className="packages-swiper-wrapper deals-swiper">
            <Swiper
              modules={[Navigation, Pagination]}
              slidesPerView={1.2}
              navigation={{
                prevEl: '.prev-december',
                nextEl: '.next-december',
              }}
              pagination={{
                el: '.december-pagination',
                clickable: true
              }}
              loop={true} // Enable looping
              autoplay={{
                delay: 2500,
                disableOnInteraction: false
              }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 2.8 },
              }}
              className="packages-swiper"
            >
              {umrahPackages.map((pkg: UmrahPackageData) => (
                <SwiperSlide key={`deal-${pkg.id}`}>
                  <UmrahPackageCard package={pkg} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="swiper-pagination-custom december-pagination"></div>

        </section>
      )}

      {/* Why Choose Us Section */}
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
      {/* Best Hajj Packages Section */}
      {hajjPackages.length > 0 && (
        <section className="section hajjsection">
          <div className="container">
            <div className='sectionheadings'>
              <div className='sectionheadingstext'>
                <h2 className="section-title">Best Hajj Packages 2026</h2>
                <p className="section-subtitle">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip
                </p>
              </div>
              <div className='rightside'>
                <div className="swiper-nav-btns">
                  <button className="swiper-nav-btn prev prev-haj">
                    <img src="/nextarrow.svg" alt="" style={{ transform: 'rotate(180deg)' }} />
                  </button>
                  <button className="swiper-nav-btn next next-haj">
                    <img src="/nextarrow.svg" alt="" />
                  </button>
                </div>
                <Link href="/umrah-packages" className="btn btn--primary">View All Packages</Link>
              </div>
            </div>
          </div>
          <div className="packages-swiper-wrapper">
            <div className='sliderhere'>
              <Swiper
                modules={[Navigation, Pagination]}
                  slidesPerView={1}
                navigation={{
                  prevEl: '.prev-haj',
                  nextEl: '.next-haj',
                }}
                pagination={{
                  el: '.haj-pagination',
                  clickable: true
                }}
                breakpoints={{
                  640: { slidesPerView: 2 },
                    1024: { slidesPerView: 2.8 },
                }}
                  slidesOffsetBefore={-100}
              >
                {hajjPackages.map((pkg: HajjPackageData) => (
                  <SwiperSlide key={pkg.id}>
                    <HajjPackageCard package={pkg} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className='imagearea'>
              <img src="/Hajj-pillgrim.png" alt="" />
            </div>
          </div>
          <div className="swiper-pagination-custom haj-pagination"></div>
        </section>
      )}
      {/* Start Your Spiritual Journey / Testimonials */}
      <section className="section spiritual-journey-section">
        <div className="container">
          <h2 className="text-center mb-lg">Start Your Spiritual Journey With Us</h2>
          <div className="journey-wrapper">
            <div className="journey-image">
              <img src="/Hajj-pillgrim.png" alt="Spiritual Journey" />
            </div>

            <div className="reviews-slider-wrapper">
              <h3 className="text-center mb-md">What Our Clients Say</h3>
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
              >
                {reviews.length > 0 ? reviews.map((review: ReviewData) => (
                  <SwiperSlide key={review.id}>
                    <div className="review-card-minimal">
                      <p>"{review.comment}"</p>
                      <h4>- {review.name}</h4>
                    </div>
                  </SwiperSlide>
                )) : (
                  <SwiperSlide>
                    <div className="review-card-minimal">
                      <p>"An amazing experience. highly recommended!"</p>
                      <h4>- Mohammed A.</h4>
                    </div>
                  </SwiperSlide>
                )}
              </Swiper>
            </div>
          </div>
        </div>
      </section>
      {/* Partners Section - Placeholder or using image */}
      <section className="section partners-section text-center">
        <div className="container">
          <div className="partners-logos">
            {/* If we have a partners image in public or a sprite */}
            <img src="/umrah-packages.png" alt="Partners" style={{ margin: '0 auto', opacity: 0.7 }} />
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      {faqs.length > 0 && (
        <section className="section bg-gray">
          <div className="container">
            <h2 className="text-center">Frequently Asked Questions</h2>
            <FAQ items={faqs} />
          </div>
        </section>
      )}
    </>
  );
}

