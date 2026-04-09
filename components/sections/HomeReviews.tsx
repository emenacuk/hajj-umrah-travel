'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ReviewData } from '@/types';
import 'swiper/css';
import 'swiper/css/navigation';
import '@/styles/components/_home-reviews.scss';
import Link from 'next/link';

import { SliderSkeleton } from '@/components/common/Skeleton';
import DescriptionModal from '@/components/common/DescriptionModal';

const ReviewTextNode: React.FC<{ content: string; isLoaded: boolean }> = ({ content, isLoaded }) => {
    const textRef = useRef<HTMLDivElement>(null);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const checkOverflow = () => {
            if (textRef.current && isLoaded) {
                setIsOverflowing(textRef.current.scrollHeight > textRef.current.clientHeight + 2);
            }
        };
        
        // Timeout to allow DOM paint after 'display: block'
        const timeout = setTimeout(checkOverflow, 50);
        
        window.addEventListener('resize', checkOverflow);
        return () => {
            window.removeEventListener('resize', checkOverflow);
            clearTimeout(timeout);
        };
    }, [content, isLoaded]);

    return (
        <div className="review-text-container">
            <div 
                ref={textRef}
                className="review-text"
                style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                }}
                dangerouslySetInnerHTML={{ __html: content }} 
            />
            {isOverflowing && (
                <button 
                    className="read-more-btn" 
                    onClick={() => setIsModalOpen(true)}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'inherit',
                        padding: '0',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '600',
                        marginTop: '0px',
                        marginBottom: '10px',
                        textDecoration: 'none'
                    }}
                >
                    Read more
                </button>
            )}
            <DescriptionModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Review"
                content={content}
            />
        </div>
    );
};

interface HomeReviewsProps {
    reviews: ReviewData[];
    cardsPerSlide?: number;
    heading?: string;
    subheading?: string;
}

const HomeReviews: React.FC<HomeReviewsProps> = ({ reviews, cardsPerSlide = 3, heading, subheading }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const displayReviews = reviews.length > 0 ? reviews : [];

    return (
        <section className="home-reviews-section">
            <div className="container">
                <div className='sectionheadings'>
                    <div className='sectionheadingstext'>
                        <h2 className="section-title">{heading}</h2>
                        {subheading && (
                            <p className="section-subtitle" dangerouslySetInnerHTML={{ __html: subheading }} />
                        )}
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
            <div className="reviews-carousel" style={{ position: 'relative' }}>
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
                            1580: { slidesPerView: 3 }
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
                                            <ReviewTextNode content={review.comment} isLoaded={isLoaded} />
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
