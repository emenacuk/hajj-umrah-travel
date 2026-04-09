import React from 'react';
import { PageData } from '@/types';
import UmrahPackageCard from '@/components/cards/UmrahPackageCard';
import FAQ from '@/components/common/FAQ';
import HomeReviews from '@/components/sections/HomeReviews';
import PackageContactInfo from '@/components/sections/PackageContactInfo';
import { getImageUrl } from '@/utils/api';
import PackageGallery from '@/components/packages/PackageGallery';
import PackageActions from '@/components/packages/PackageActions';
import HotelSlider from '@/components/packages/HotelSlider';
import HotelDescription from '@/components/packages/HotelDescription';
import PackageSlider from '@/components/sliders/PackageSlider';
import Link from 'next/link';

import '@/styles/components/_package-detail.scss';

interface UmrahPackageTemplateProps {
  data: PageData;
}

export default function SingleUmrahTemplate({ data }: UmrahPackageTemplateProps) {
  const packageData = data.content?.package || {};
  const hotels = packageData.hotels || data.content?.hotels || [];
  const reviews = data.content?.reviews || [];
  const relatedPackages = data.content?.relatedPackages || [];
  const faqs = data.content?.faqs || [];
  const contact = data.content?.contact || {};
  const reviewsWidget = data.content?.ourclientsays_widget;
  const relatedWidget = data.content?.section_2_widget;
  const hotelHeading = data.content?.section_1_widget?.[0];
  const hotelDescription = data.content?.section_1_widget?.[0];

  const images = (packageData.images && packageData.images.length > 0)
    ? packageData.images.map((img: string) => getImageUrl(img))
    : [getImageUrl(packageData.image)];

  return (
    <div className="package-detail-page">
      <section className="section package-hero-section">
        <div className="container">
          <div className="package-detail-header">
            <div className="pkg-header-left">
              <div className="star-rating">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < (packageData.stars || 0) ? 'star-filled' : 'star'}>
                    <img src="/star.svg" alt="Star" />
                  </span>
                ))}
              </div>
              <h1 className="package-title">{packageData.title}</h1>

              <div className="hotel-summaries">
                <div className="hotel-summary-item">
                  <div className="hotel-info-box">
                    <div>
                      <span className="hotel-label">Makkah Hotel Nights</span>
                      <span className="hotel-name">{packageData.makkahHotel || 'Hotel In Makkah'}</span>
                    </div>
                    <span className="nights-count">{String(packageData.makkahNights || 5).padStart(2, '0')} <small>Nights</small></span>
                  </div>
                </div>
                <div className="hotel-summary-item">
                  <div className="hotel-info-box">
                    <div>
                      <span className="hotel-label">Madinah Hotel Nights</span>
                      <span className="hotel-name">{packageData.madinahHotel || 'Hotel In Madinah'}</span>
                    </div>
                    <span className="nights-count">{String(packageData.madinahNights || 5).padStart(2, '0')} <small>Nights</small></span>
                  </div>
                </div>
              </div>

              <PackageActions
                packageData={packageData}
                type="umrah"
                economyLabel="Economy Package"
                premiumLabel="Premium Package"
                showButtons={false}
              />
            </div>

            <div className="pkg-header-right">
              <PackageGallery images={images} />
            </div>
          </div>
        </div>
      </section>

      <section className="section package-description-section">
        <div className="container">
          <h2 className="section-subtitle-small">PACKAGE DETAILS</h2>
          <div className="pkg-description-text"
            dangerouslySetInnerHTML={{ __html: packageData.package_detail }}
          />

          <div className="package-icon-row">
            {packageData.flight === 1 && (
              <div className="pkg-icon-item">
                <div className="icon-circle"><img src="/aiplanewhite.svg" alt="Flight" /></div>
                <span>Flight</span>
              </div>
            )}
            {packageData.accomodation === 1 && (
              <div className="pkg-icon-item">
                <div className="icon-circle"><img src="/hotelwhite.svg" alt="Hotel" /></div>
                <span>Hotel</span>
              </div>
            )}
            {packageData.visa === 1 && (
              <div className="pkg-icon-item">
                <div className="icon-circle"><img src="/visawhite.svg" alt="Visa" /></div>
                <span>Visa</span>
              </div>
            )}
            {packageData.transfer === 1 && (
              <div className="pkg-icon-item">
                <div className="icon-circle"><img src="/transportwhite.svg" alt="Transport" /></div>
                <span>Transport</span>
              </div>
            )}
            {packageData.breakfast === 1 && (
              <div className="pkg-icon-item">
                <div className="icon-circle"><img src="/board.svg" alt="Half Board" /></div>
                <span>Half Board</span>
              </div>
            )}
            <PackageActions packageData={packageData} type="umrah" showPrices={false} />
          </div>
          <div className="inclusions-grid">
            <ul className="inclusions-list">
              {packageData?.inclusions && packageData.inclusions.length > 0 ? (
                packageData.inclusions.map((item: string, index: number) => (
                  <li key={index} className="inclusion-item">{item}</li>
                ))
              ) : (
                <>
                  <li className="inclusion-item">Return Flights</li>
                  <li className="inclusion-item">Premium Accommodations</li>
                  <li className="inclusion-item">Umrah Visa</li>
                  <li className="inclusion-item">Ground Transfers</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </section>

      <section className="section hotel-details-section">
        <div className="container">
          <h2 className="section-subtitle-small">{hotelHeading?.heading || 'ACCOMMODATION INFO'}</h2>
          <p className="pkg-description-text">
            {hotelDescription?.description || hotelDescription?.subheading || ''}
          </p>
        </div>
        <div className="container-fluid">
          <div className="hotels-detail-grid">
            {hotels.map((hotel: any) => (
              <div key={hotel.id} className="hotel-card">
                <div className='hotel-detail-card'>
                  <HotelSlider
                    images={hotel.images?.map((img: string) => getImageUrl(img)) || []}
                    hotelName={hotel.name}
                  />
                  <div className="hotel-card-info">
                    <div className="star-rating">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < (hotel.rating || 5) ? 'star-filled' : 'star'}>
                          <img src="/star.svg" alt="" />
                        </span>
                      ))}
                    </div>
                    <h3 className="hotel-card-name">{hotel.name}</h3>
                    <p className="hotel-card-location">Hotel In {hotel.location}</p>

                    <HotelDescription
                      hotelName={hotel.name}
                      description={hotel.description || ""}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PackageContactInfo contact={contact} />
      {reviews.length > 0 && (
        <HomeReviews
          reviews={reviews}
          heading={reviewsWidget?.heading}
          subheading={reviewsWidget?.sub_heading}
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
                640: { slidesPerView: 1.6 },
                768: { slidesPerView: 1.2 },
                992: { slidesPerView: 1.4 },
                1025: { slidesPerView: 1.6 },
                1200: { slidesPerView: 2.2 },
                1700: { slidesPerView: 2.8 },
              }}
              slidesPerView={1}
              spaceBetween={30}
            />
          </div>
        </section>
      )}
    </div>
  );
}
