'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { PageData, HajjPackageData, HotelData, ReviewData } from '@/types';
import InnerBanner from '@/components/banners/InnerBanner';
import HajjPackageCard from '@/components/cards/HajjPackageCard';
import Reviews from '@/components/common/Reviews';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '@/styles/components/_package-detail.scss';

interface HajjPackageTemplateProps {
  data: PageData;
}

export default function HajjPackageTemplate({ data }: HajjPackageTemplateProps) {
  const bannerData = data.content?.banner || {};
  const packageData = data.content?.package || {};
  const hotels = data.content?.hotels || [];
  const reviews = data.content?.reviews || [];
  const relatedPackages = data.content?.relatedPackages || [];
  const inclusions = data.content?.inclusions || [];

  return (
    <>
      {/* Banner */}
      {bannerData && <InnerBanner data={bannerData} />}

      {/* Package Details */}
      <section className="section">
        <div className="container">
          <div className="package-detail-layout">
            <div className="package-detail-left">
              <div className="package-rating">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < (packageData.rating || 5) ? 'star-filled' : 'star'}>
                    ★
                  </span>
                ))}
              </div>
              <h1>{packageData.title || data.title}</h1>

              {/* Hotel Information */}
              {packageData.makkahHotel && (
                <div className="hotel-info">
                  <div className="hotel-item">
                    <strong>Makkah Hotel Nights:</strong>
                    <span>{packageData.makkahHotel}</span>
                    <span className="nights">{packageData.makkahNights || '05'} Nights</span>
                  </div>
                </div>
              )}

              {packageData.madinahHotel && (
                <div className="hotel-info">
                  <div className="hotel-item">
                    <strong>Madinah Hotel Nights:</strong>
                    <span>{packageData.madinahHotel}</span>
                    <span className="nights">{packageData.madinahNights || '05'} Nights</span>
                  </div>
                </div>
              )}

              {/* Package Options */}
              {packageData.options && (
                <div className="package-options">
                  {packageData.options.map((option: any, index: number) => (
                    <div key={index} className="package-option">
                      <h4>{option.name}</h4>
                      <div className="package-price">
                        starting from <span className="price-amount">£ {option.price}</span> per person
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <button className="btn btn--secondary">Enquire Now</button>
            </div>

            <div className="package-detail-right">
              {/* Image Gallery */}
              {packageData.images && packageData.images.length > 0 && (
                <div className="package-gallery">
                  <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={10}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                  >
                    {packageData.images.map((image: string, index: number) => (
                      <SwiperSlide key={index}>
                        <img src={image} alt={`${packageData.title} - Image ${index + 1}`} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              )}
            </div>
          </div>

          {/* Package Details Section */}
          <div className="package-details-section">
            <h2>PACKAGE DETAILS</h2>
            {data.content?.packageDescription && (
              <p>{data.content.packageDescription}</p>
            )}

            {/* Service Icons */}
            <div className="service-icons">
              {inclusions.map((inclusion: string, index: number) => (
                <div key={index} className="service-icon">
                  <span>{inclusion}</span>
                </div>
              ))}
            </div>

            <div className="package-actions">
              <button className="btn btn--primary">Book This Package</button>
              <button className="btn btn--outline">Customize Package</button>
            </div>

            {/* Inclusions List */}
            {inclusions.length > 0 && (
              <div className="inclusions-list">
                <h3>Inclusions</h3>
                <ul>
                  {inclusions.map((inclusion: string, index: number) => (
                    <li key={index}>{inclusion}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Hotel Details */}
          {hotels.length > 0 && (
            <div className="hotels-section">
              <h2>HOTEL DETAILS:</h2>
              <div className="hotels-grid">
                {hotels.map((hotel: HotelData) => (
                  <div key={hotel.id} className="hotel-card">
                    {hotel.images && hotel.images.length > 0 && (
                      <Swiper
                        modules={[Navigation]}
                        spaceBetween={0}
                        slidesPerView={1}
                        navigation
                      >
                        {hotel.images.map((image: string, index: number) => (
                          <SwiperSlide key={index}>
                            <img src={image} alt={hotel.name} />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    )}
                    <div className="hotel-card-content">
                      <div className="hotel-rating">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className={i < hotel.rating ? 'star-filled' : 'star'}>
                            ★
                          </span>
                        ))}
                      </div>
                      <h3>{hotel.name}</h3>
                      <p className="hotel-location">Hotel in {hotel.location}</p>
                      {hotel.description && <p>{hotel.description}</p>}
                      <a href="#" className="see-more">See More →</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Information */}
          <div className="contact-info-section">
            <div className="contact-cards">
              <div className="contact-card contact-card--phone">
                <div className="contact-icon">📞</div>
                <h3>Call Now!</h3>
                <p>{data.content?.contact?.phone || '0208-000-000'}</p>
              </div>
              <div className="contact-card contact-card--email">
                <div className="contact-icon">✉️</div>
                <h3>Email Us!</h3>
                <p>{data.content?.contact?.email || 'info@example.co.uk'}</p>
              </div>
              <div className="contact-card contact-card--whatsapp">
                <div className="contact-icon">💬</div>
                <h3>WhatsApp!</h3>
                <p>{data.content?.contact?.whatsapp || '0208-000-000'}</p>
              </div>
            </div>
          </div>

          {/* Reviews */}
          {reviews.length > 0 && (
            <div className="reviews-section">
              <h2>What Our Clients Says</h2>
              <Reviews reviews={reviews} />
            </div>
          )}

          {/* Related Packages */}
          {relatedPackages.length > 0 && (
            <div className="related-packages-section">
              <div className="section-header">
                <h2>More Relevant Packages</h2>
                <button className="btn btn--primary">View All Packages</button>
              </div>
              <div className="packages-grid">
                <Swiper
                  modules={[Navigation, Pagination]}
                  spaceBetween={20}
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                  breakpoints={{
                    640: {
                      slidesPerView: 2,
                    },
                  }}
                >
                  {relatedPackages.map((pkg: HajjPackageData) => (
                    <SwiperSlide key={pkg.id}>
                      <HajjPackageCard package={pkg} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

