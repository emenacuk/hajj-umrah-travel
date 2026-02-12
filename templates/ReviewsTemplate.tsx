import React from 'react'
import { PageData, ReviewData } from '@/types';
import "@/styles/components/_reviewspage.scss"
import { mockHomePageData } from '@/data/mockData';
import ReviewCard from '@/components/common/ReviewCard';
interface ReviewsTemplateProps {
    data: PageData;
}

const reviews = mockHomePageData.content.reviews;

export default function ReviewsTemplate({ data }: ReviewsTemplateProps) {
    return (
        <div className='reviews-page'>
            <div className='container'>
                <div className='sectionheadingstext'>
                    <h2 className="section-title">What Our Customers Say</h2>
                    <p className="section-subtitle">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip
                    </p>
                </div>
                <div className='reviews-grid'>
                    {reviews.map((review: ReviewData) => (
                        <ReviewCard key={review.id} review={review} />
                    ))}
                </div>
            </div>
        </div>
    )
}