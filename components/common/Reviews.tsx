'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ReviewData } from '@/types';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '@/styles/components/_reviews.scss';

interface ReviewsProps {
  reviews: ReviewData[];
}

export default function Reviews({ reviews }: ReviewsProps) {
  return (
    <div className="reviews">
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
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <div className="review-card">
              <div className="review-quote">"</div>
              <p className="review-comment">{review.comment}</p>
              <div className="review-author">
                {review.avatar && (
                  <img src={review.avatar} alt={review.name} className="review-avatar" />
                )}
                <div className="review-author-info">
                  <div className="review-name">{review.name}</div>
                  <div className="review-location">{review.location}</div>
                </div>
              </div>
              <div className="review-rating">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < review.rating ? 'star-filled' : 'star'}>
                    ★
                  </span>
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

