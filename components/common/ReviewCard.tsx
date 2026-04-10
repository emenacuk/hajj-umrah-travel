import React from 'react'
import { ReviewData } from '@/types';
import '@/styles/components/_reviewcard.scss';
interface ReviewCardProps {
    review: ReviewData;
}

export default function ReviewCard({ review }: ReviewCardProps) {
    return (
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
                            <span className="reviewer-name">{review.name}</span>
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
    )
}
