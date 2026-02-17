'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ReviewData } from '@/types';
import 'swiper/css';
import 'swiper/css/navigation';
import '@/styles/components/_home-reviews.scss';
import Link from 'next/link';

import { SliderSkeleton } from '@/components/common/Skeleton';
import { useState } from 'react';

interface HomeReviewsProps {
    reviews: ReviewData[];
    cardsPerSlide?: number;
}

const HomeReviews: React.FC<HomeReviewsProps> = ({ reviews, cardsPerSlide = 4 }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const displayReviews = reviews.length > 0 ? reviews : [];

    return (
        <section className="home-reviews-section">
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
                    <div className='rightside justify-content-end'>
                        <div className="swiper-nav-btns ">
                            <button className="swiper-nav-btn prev prev-review">
                                <img src="/nextarrow.svg" alt="" style={{ transform: 'rotate(180deg)' }} />
                            </button>
                            <button className="swiper-nav-btn next next-review">
                                <img src="/nextarrow.svg" alt="" />
                            </button>
                        </div>
                    </div>
                </div>    
            </div>
            <div className="reviews-carousel" style={{ position: 'relative'}}>
                {!isLoaded && <SliderSkeleton count={cardsPerSlide} />}
                <div style={{ display: isLoaded ? 'block' : 'none' }}>
                    <Swiper
                        modules={[Navigation]}
                        onInit={() => setIsLoaded(true)}
                        slidesPerView={1.1}
                        navigation={{
                            prevEl: '.prev-review',
                            nextEl: '.next-review',
                        }}
                        breakpoints={{
                            576: { slidesPerView: 1.2 },
                            768: { slidesPerView: 1.8 },
                            850: { slidesPerView: 2 },
                            992: { slidesPerView: 2.2 },
                            1200: { slidesPerView: 2.5 },
                            1600: { slidesPerView: 3 }
                        }}
                    >
                        {displayReviews.map((review) => (
                            <SwiperSlide key={review.id}>
                                <div className="review-card">
                                    <div className='reviewcardinner'>
                                        <div className="reviewer-avatar">
                                            <img src={review.avatar || '/placeholder-user.png'} alt={review.name} />
                                        </div>
                                        <div className='review-content'>
                                            <p>
                                                {review.comment}
                                            </p>
                                            <div className="reviewer-details">
                                                <div className='reviewerinfo'>
                                                    <h4 className="reviewer-name">{review.name}</h4>
                                                    <p className="reviewer-location">{review.location}</p>
                                                </div>                                       
                                                <div className="reviewer-rating">
                                                    {Array.from({ length: 5 }).map((_, i) => (
                                                        <span key={i} className={i < review.rating ? 'star-filled' : 'star-empty'}>
                                                            <img src="/star.svg" alt="" />
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>                                    
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default HomeReviews;
