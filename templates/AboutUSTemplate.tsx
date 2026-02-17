import React from 'react'
import { PageData } from '@/types';
import "@/styles/components/_aboutus.scss"
import WhyChoose from '@/components/common/WhyChoose';
import HomeReviews from '@/components/sections/HomeReviews';
import { mockHomePageData } from '@/data/mockData';
interface AboutUSTemplateProps {
  data: PageData;
}

const reviews = mockHomePageData.content.reviews;

const content = [
  `<h2>Welcome to Bismillah Travel – Your Trusted Umrah Travel Agency in the UK</h2>
          <p>Bismillah Travel is here to help you visit religious places and make Umrah trips that connect with your soul. We're experts at creating meaningful journeys, so your Umrah experience will be not just a trip but a transformative experience. So, start a memorable and moving journey with us, your companion, for the best Umrah travel. We're more than just a travel agency; our mission is to explore spirituality with you, making the experience unforgettable. So, prepare yourself for an unparalleled experience with our Umrah packages.</p>
          <h3>Umrah Packages</h3>
          <ul>
            <li>Premium Accommodations</li>
            <li>Direct Flight Options</li>
            <li>Experienced Professional Guides</li>
            <li>24/7 Spiritual Assistance</li>
          </ul>
          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
        <h2>Welcome to Bismillah Travel – Your Trusted Umrah Travel Agency in the UK</h2>
          <p>Bismillah Travel is here to help you visit religious places and make Umrah trips that connect with your soul. We're experts at creating meaningful journeys, so your Umrah experience will be not just a trip but a transformative experience. So, start a memorable and moving journey with us, your companion, for the best Umrah travel. We're more than just a travel agency; our mission is to explore spirituality with you, making the experience unforgettable. So, prepare yourself for an unparalleled experience with our Umrah packages.</p>
          <h3>Umrah Packages</h3>
          <ul>
            <li>Premium Accommodations</li>
            <li>Direct Flight Options</li>
            <li>Experienced Professional Guides</li>
            <li>24/7 Spiritual Assistance</li>
          </ul>
          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
        
        <h2>Welcome to Bismillah Travel – Your Trusted Umrah Travel Agency in the UK</h2>
          <p>Bismillah Travel is here to help you visit religious places and make Umrah trips that connect with your soul. We're experts at creating meaningful journeys, so your Umrah experience will be not just a trip but a transformative experience. So, start a memorable and moving journey with us, your companion, for the best Umrah travel. We're more than just a travel agency; our mission is to explore spirituality with you, making the experience unforgettable. So, prepare yourself for an unparalleled experience with our Umrah packages.</p>
          <h3>Umrah Packages</h3>
          <ul>
            <li>Premium Accommodations</li>
            <li>Direct Flight Options</li>
            <li>Experienced Professional Guides</li>
            <li>24/7 Spiritual Assistance</li>
          </ul>
          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
        `
]

export default function AboutUSTemplate({ data }: AboutUSTemplateProps) {
  return (
    <div className='about-us'>
      <div className='container'>
        <div className='content-wrapper'>
          <div className='content-left'
            dangerouslySetInnerHTML={{ __html: content[0] }}
          />
        </div>
      <WhyChoose />
      
      </div>
      <HomeReviews reviews={reviews} cardsPerSlide={2} />
    </div>
  )
}
