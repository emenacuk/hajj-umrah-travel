'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
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

  const dummyPosts = [
    {
      id: '1',
      title: 'Is It Better To Go To Makkah Or Madinah First',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      image: '/blog1.png',
      date: '16 December, 2025',
      author: 'Admin',
      slug: 'better-to-go-to-makkah-or-madinah-first'
    },
    {
      id: '2',
      title: 'How Can Pilgrims Protect Themselves from Getting Sick?',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      image: '/blog1.png',
      date: '16 December, 2025',
      author: 'Admin',
      slug: 'how-can-pilgrims-protect-themselves-from-getting-sick'
    },
    {
      id: '3',
      title: 'Which Is The Best Time To Perform Umrah',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      image: '/blog1.png',
      date: '16 December, 2025',
      author: 'Admin',
      slug: 'which-is-the-best-time-to-perform-umrah'
    },
    {
      id: '4',
      title: 'Common Mistakes During Hajj',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      image: '/blog1.png',
      date: '16 December, 2025',
      author: 'Admin',
      slug: 'common-mistakes-during-hajj'
    }
  ];

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
                <Link href="/best-umrah-packages-2025-2026" className="btn btn--primary">View All Packages</Link>
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
                <Link href="/december-umrah-packages" className="btn btn--primary">View All Packages</Link>
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
                  1024: { slidesPerView: 3 },
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

      {/* Explore Our Umrah Packages Section */}
      {umrahPackages.length > 0 && (
        <section className="section exploration-section">
          <div className="container">
            <div className='sectionheadings'>
              <div className='sectionheadingstext'>
                <h2 className="section-title">Explore Our Umrah Packages</h2>
                <p className="section-subtitle">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip
                </p>
              </div>
              <div className='rightside'>
                <div className="swiper-nav-btns">
                  <button className="swiper-nav-btn prev prev-exploration">
                    <img src="/nextarrow.svg" alt="" style={{ transform: 'rotate(180deg)' }} />
                  </button>
                  <button className="swiper-nav-btn next next-exploration">
                    <img src="/nextarrow.svg" alt="" />
                  </button>
                </div>
                <Link href="/umrah-packages" className="btn btn--primary">View All Packages</Link>
              </div>
            </div>
          </div>
          <div className="packages-swiper-wrapper exploration-swiper">
            <div className="exploration-swiper-inner">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                slidesPerView="auto"
                centeredSlides={true}
                spaceBetween={24}
                loop={umrahPackages.length > 1}
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
                className="packages-swiper exploration-packages-swiper"
              >
                {umrahPackages.map((pkg: UmrahPackageData) => (
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

      {/* New Banner and Reviews Sections */}
      <CustomizeBanner />
      <HomeReviews reviews={reviews} />

      {/* Umrah & Hajj Services Section */}
      <UmrahHajjServices
        data={{
          title: "Umrah & Hajj Services",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
          mainImage: "/umra-hajj-services.png", // placeholder image for now
          items: [
            {
              id: "1",
              title: "Health And Safety",
              icon: "/healtsafety.png", // assuming these icons exist or will be added
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate"
            },
            {
              id: "2",
              title: "Transport",
              icon: "/2-2.png",
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate"
            },
            {
              id: "3",
              title: "Visa",
              icon: "/2-3.png",
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate"
            },
            {
              id: "4",
              title: "Ziyarats",
              icon: "/2-4.png",
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate"
            }
          ]
        }}
      />



      {/* Partners Section - Placeholder or using image */}
      <section className="section partners-section">
        <div className="container">
          <div className='sectionheadings'>
            <div className='sectionheadingstext'>
              <h2 className="section-title">Trusted Travel Connections</h2>
              <p className="section-subtitle">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip
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
            slidesPerView="auto"
            spaceBetween={24}
            navigation={{
              prevEl: '.partner-prev',
              nextEl: '.partner-next',
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 8 },
            }}
            className="packages-swiper partner-swiper"
          >
            {['Air_China-Logo.wine.png', 'Air_China-Logo.wine.png', 'Air_China-Logo.wine.png', 'Air_China-Logo.wine.png'].map((pkg: string) => (
              <SwiperSlide key={`partner-${pkg}`}>
                <img src={pkg} alt="Partners" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

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
      {/* FAQ Section */}
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

      {/* Blog Section */}
      <BlogSection posts={dummyPosts} />
    </>
  );
}
