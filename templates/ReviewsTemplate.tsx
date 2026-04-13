import React from 'react'
import { PageData, ReviewData } from '@/types';
import "@/styles/components/_reviewspage.scss"
import ReviewCard from '@/components/common/ReviewCard';

interface ReviewsTemplateProps {
    data: PageData;
}

export default function ReviewsTemplate({ data }: ReviewsTemplateProps) {
    const content = data.content || {};

    // Heading/description from ourclientsays_widget (API field)
    const widget = data._raw?.ourclientsays_widget?.[0] || content.ourclientsays_widget?.[0] || {};
    const heading = widget.heading || 'What Our Customers Say';
    const description = widget.description || '';

    // Real reviews — fetched in fetchPageData via fetchReviewsByIds and stored in content.reviews
    const reviews: ReviewData[] = content.reviews || [];

    return (
        <div className='reviews-page'>
            <div className='container'>
                <div className='sectionheadings'>
                    <div className='sectionheadingstext'>
                        <h1 className="section-title">{heading}</h1>
                        {description && (
                            <p className="section-subtitle">{description}</p>
                        )}
                    </div>
                </div>
                <div className='reviews-grid'>
                    {reviews.length > 0 ? (
                        reviews.map((review: ReviewData) => (
                            <ReviewCard key={review.id} review={review} />
                        ))
                    ) : (
                        <p style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', opacity: 0.6 }}>
                            No reviews available yet.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}