import React from 'react'
import { PageData } from '@/types';
import "@/styles/components/_aboutus.scss"
import WhyChoose from '@/components/common/WhyChoose';
import HomeReviews from '@/components/sections/HomeReviews';
interface AboutUSTemplateProps {
  data: PageData;
}

export default function AboutUSTemplate({ data }: AboutUSTemplateProps) {
  const mainContent = data?.content?.main_content || '';
  const reviews = data?.content?.reviews || [];
  const reviewsWidget = data?.content?.ourclientsays_widget?.[0];

  return (
    <div className='about-us'>
      <div className='container'>
        <div className='content-wrapper'>
          <div className='content-left'
            dangerouslySetInnerHTML={{ __html: mainContent.replace(/<p>&nbsp;<\/p>/g, '') }}
          />
        </div>
        <WhyChoose />

       
      </div>
       {reviews.length > 0 && (
          <HomeReviews
            reviews={reviews}
            cardsPerSlide={2}
            heading={reviewsWidget?.heading}
            subheading={reviewsWidget?.sub_heading || reviewsWidget?.description}
          />
        )}
    </div>
  )
}
