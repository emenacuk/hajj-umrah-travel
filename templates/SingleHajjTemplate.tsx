'use client';

import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs, FreeMode } from 'swiper/modules';
import { Skeleton, SliderSkeleton } from '@/components/common/Skeleton';
import type { Swiper as SwiperType } from 'swiper';
import { PageData } from '@/types';
import HajjPackageCard from '@/components/cards/HajjPackageCard';
import FAQ from '@/components/common/FAQ';
import Link from 'next/link';
import HomeReviews from '@/components/sections/HomeReviews';
import PackageContactInfo from '@/components/sections/PackageContactInfo';

import { useSearchParams } from 'next/navigation';

import EnquiryModal from '@/components/common/EnquiryModal';
import BookingModal from '@/components/common/BookingModal';
import CustomizeModal from '@/components/common/CustomizeModal';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

import '@/styles/components/_package-detail.scss';

interface HajjPackageTemplateProps {
    data: PageData;
}

export default function SingleHajjTemplate({ data }: HajjPackageTemplateProps) {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const [selectedTier, setSelectedTier] = useState<'Standard' | 'Premium'>('Standard');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useState(false);
    const [isGalleryLoaded, setIsGalleryLoaded] = useState(false);
    const [isRelatedLoaded, setIsRelatedLoaded] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const searchParams = useSearchParams();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (searchParams.get('enquire') === 'true') {
            setIsModalOpen(true);
        }
    }, [searchParams]);

    const packageData = data.content?.package || {};
    const hotels = data.content?.hotels || [];
    const reviews = data.content?.reviews || [];
    const relatedPackages = data.content?.relatedPackages || [];
    const inclusions = data.content?.inclusions || [];
    const faqs = data.content?.faqs || [];
    const contact = data.content?.contact || {};

    const images = packageData.images || [packageData.image];

    return (
        <div className="package-detail-page">
            <section className="section package-hero-section">
                <div className="container">
                    <div className="package-detail-header">
                        <div className="pkg-header-left">
                            <div className="star-rating">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <span key={i} className={i < (packageData.stars || 4) ? 'star-filled' : 'star'}>
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
                                        <span className="nights-count">{String(packageData.makkahNights || 10).padStart(2, '0')} <small>Nights</small></span>
                                    </div>
                                </div>
                                <div className="hotel-summary-item">

                                    <div className="hotel-info-box">
                                        <div>
                                            <span className="hotel-label">Madinah Hotel Nights</span>
                                            <span className="hotel-name">{packageData.madinahHotel || 'Hotel In Madinah'}</span>
                                        </div>
                                        <span className="nights-count">{String(packageData.madinahNights || 4).padStart(2, '0')} <small>Nights</small></span>
                                    </div>
                                </div>
                            </div>

                            <div className="package-price-options">
                                <div
                                    className={`price-option-row ${selectedTier === 'Standard' ? 'active' : ''}`}
                                    onClick={() => setSelectedTier('Standard')}
                                >
                                    <div className="option-name">
                                        <div className="radio-circle">
                                            {selectedTier === 'Standard' && <div className="inner-dot"></div>}
                                        </div>
                                        Standard Package
                                    </div>
                                    <div className="option-price">
                                        <small>starting <br />from</small>
                                        <span className="currency">£</span>
                                        <span className="amount">{packageData.price || '2965'}</span>
                                        <small className="per-person">per<br />person</small>
                                    </div>
                                </div>
                                <div
                                    className={`price-option-row ${selectedTier === 'Premium' ? 'active' : ''}`}
                                    onClick={() => setSelectedTier('Premium')}
                                >
                                    <div className="option-name">
                                        <div className="radio-circle">
                                            {selectedTier === 'Premium' && <div className="inner-dot"></div>}
                                        </div>
                                        Premium Package
                                    </div>
                                    <div className="option-price">
                                        <small>starting <br />from</small>
                                        <span className="currency">£</span>
                                        <span className="amount">3965</span>
                                        <small className="per-person">per<br />person</small>
                                    </div>
                                </div>
                            </div>

                            <div className="header-actions">
                                <button
                                    className="btn btn-enquire"
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    Enquire Now
                                </button>
                            </div>
                        </div>

                        <div className="pkg-header-right">
                            <div className="detail-gallery-wrapper" style={{ position: 'relative' }}>
                                {!isGalleryLoaded && (
                                    <Skeleton className="skeleton-gallery" width="100%" height="532px" borderRadius="18px" />
                                )}
                                <Swiper
                                    spaceBetween={10}
                                    navigation={true}
                                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="main-gallery-swiper"
                                    onAfterInit={() => setIsGalleryLoaded(true)}
                                    style={{ opacity: isGalleryLoaded ? 1 : 0, transition: 'opacity 0.3s ease' }}
                                >
                                    {images.map((img: string, index: number) => (
                                        <SwiperSlide key={index}>
                                            <img src={img} alt={`Gallery ${index}`} />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                <div className="thumbs-gallery-container" style={{ opacity: isGalleryLoaded ? 1 : 0, transition: 'opacity 0.3s ease' }}>
                                    {!isGalleryLoaded && (
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <Skeleton width="25%" height="100px" borderRadius="10px" />
                                            <Skeleton width="25%" height="100px" borderRadius="10px" />
                                            <Skeleton width="25%" height="100px" borderRadius="10px" />
                                            <Skeleton width="25%" height="100px" borderRadius="10px" />
                                        </div>
                                    )}
                                    <Swiper
                                        onSwiper={setThumbsSwiper}
                                        slidesPerView={4}
                                        freeMode={true}
                                        watchSlidesProgress={true}
                                        modules={[FreeMode, Navigation, Thumbs]}
                                        className="thumbs-gallery-swiper"
                                    >
                                        {images.map((img: string, index: number) => (
                                            <SwiperSlide key={index}>
                                                <div className="thumb-img-box">
                                                    <img src={img} alt={`Thumb ${index}`} />
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section package-description-section">
                <div className="container">
                    <h2 className="section-subtitle-small">HAJJ PACKAGE DETAILS</h2>
                    <p className="pkg-description-text">
                        {packageData.packageDescription || 'Experience the journey of a lifetime with our comprehensive Hajj packages, designed to make your pilgrimage smooth and memorable.'}
                    </p>

                    <div className="package-icon-row">
                        <div className="pkg-icon-item">
                            <div className="icon-circle"><img src="/aiplanewhite.svg" alt="Flight" /></div>
                            <span>Flight</span>
                        </div>
                        <div className="pkg-icon-item">
                            <div className="icon-circle"><img src="/hotelwhite.svg" alt="Hotel" /></div>
                            <span>Hotel</span>
                        </div>
                        <div className="pkg-icon-item">
                            <div className="icon-circle"><img src="/visawhite.svg" alt="Visa" /></div>
                            <span>Visa</span>
                        </div>
                        <div className="pkg-icon-item">
                            <div className="icon-circle"><img src="/transportwhite.svg" alt="Transport" /></div>
                            <span>Transport</span>
                        </div>
                        <div className="pkg-icon-item">
                            <div className="icon-circle"><img src="/board.svg" alt="Half Board" /></div>
                            <span>Half Board</span>
                        </div>
                        <div className="pkg-icon-item">
                            <div className="icon-circle"><img src="/qurbani.svg" alt="Qurbani" /></div>
                            <span>Qurbani</span>
                        </div>

                        <div className="pkg-action-btns">
                            <button className="btn btn--primary" onClick={() => setIsBookingModalOpen(true)}>Book This Package <span><img src="/btnarrow.svg" alt="" /></span></button>
                            <button className="btn btn--dark" onClick={() => setIsCustomizeModalOpen(true)}>Customize Package <span><img src="/btnarrow.svg" alt="" /></span></button>
                        </div>
                    </div>

                    <div className="inclusions-grid">
                        <ul className="inclusions-list">
                            {inclusions.map((item: string, index: number) => (
                                <li key={index} className="inclusion-item">{item}</li>
                            ))}
                            {inclusions.length === 0 && (
                                <>
                                    <li className="inclusion-item">Hajj Visa</li>
                                    <li className="inclusion-item">Return Flights</li>
                                    <li className="inclusion-item">Accommodation in Makkah and Madinah</li>
                                    <li className="inclusion-item">Ground Transportation</li>
                                    <li className="inclusion-item">Hajj Guide Services</li>
                                    <li className="inclusion-item">Ziyarat Tours</li>
                                    <li className="inclusion-item">All Government Fees</li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </section>

            <section className="section hotel-details-section">
                <div className="container">
                    <h2 className="section-subtitle-small">HOTEL DETAILS:</h2>
                    <p className="pkg-description-text">
                        Stay in premium hotels located close to the Holy Mosques in Makkah and Madinah, ensuring ease of access for your daily prayers.
                    </p>


                </div>
                <div className="container-fluid">
                    <div className="hotels-detail-grid">
                        {hotels.map((hotel: any, index: number) => {
                            // Using a simple local state for the current slide index
                            const [activeIndex, setActiveIndex] = useState(0);
                            const totalImages = hotel.images?.length || 0;

                            return (
                                <div key={hotel.id} className="hotel-card">
                                    <div className="hotel-img-count">{totalImages > 0 ? `${activeIndex + 1}/${totalImages}` : '0/0'}</div>
                                    <div className='hotel-detail-card'>
                                        <div className="hotel-card-img-wrapper">
                                            <Swiper
                                                navigation={true}
                                                modules={[Navigation]}
                                                className="hotel-card-swiper"
                                                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                                            >
                                                {hotel.images?.map((img: string, idx: number) => (
                                                    <SwiperSlide key={idx}>
                                                        <img src={img} alt={hotel.name} />
                                                    </SwiperSlide>
                                                ))}
                                            </Swiper>
                                        </div>
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
                                            <p className="hotel-card-desc">
                                                {hotel.description || 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'}
                                            </p>
                                            <Link href="#" className="see-more-link">See More <span><img src="/rightarrow.svg" alt="" /></span></Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <PackageContactInfo contact={contact} />
            <HomeReviews reviews={reviews} />

            <section className="section related-packages-detail">
                <div className="container">
                    <div className='sectionheadings'>
                        <div className='sectionheadingstext'>
                            <h2 className='section-title'>More Relevant Hajj Packages</h2>
                            <p className='section-subtitle'>
                                Discover more Hajj pilgrimage options that suit your needs and preferences.
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
                            <Link href="/hajj-packages" className="btn btn--primary">View All Hajj Packages</Link>
                        </div>
                    </div>
                    <div className="related-pkgs-grid" style={{ position: 'relative', minHeight: '400px' }}>
                        {!isRelatedLoaded && <SliderSkeleton count={2} />}
                        <Swiper
                            modules={[Navigation, Pagination]}
                            onInit={() => setIsRelatedLoaded(true)}
                            style={{ display: isRelatedLoaded ? 'block' : 'none' }}
                            spaceBetween={30}
                            slidesPerView={1}
                            navigation={{
                                prevEl: '.prev-related',
                                nextEl: '.next-related',
                            }}
                            pagination={{
                                el: '.related-pagination-custom',
                                clickable: true
                            }}
                            breakpoints={{
                                768: { slidesPerView: 2 },
                                1200: { slidesPerView: 3 }
                            }}
                            className="related-packages-swiper"
                        >
                            {relatedPackages.map((pkg: any) => (
                                <SwiperSlide key={pkg.id}>
                                    <HajjPackageCard package={pkg} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className="swiper-pagination-custom related-pagination-custom"></div>
                    </div>
                </div>
            </section>
            <EnquiryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                selectedPackage={selectedTier === 'Standard' ? 'Economy' : 'Premium'}
                packageTitle={packageData.title}
            />

            <BookingModal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                packageTitle={packageData.title}
                selectedPackage={selectedTier}
            />

            <CustomizeModal
                isOpen={isCustomizeModalOpen}
                onClose={() => setIsCustomizeModalOpen(false)}
                type="hajj"
            />

        </div>
    );
}
