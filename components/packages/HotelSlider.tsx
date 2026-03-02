'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

interface HotelSliderProps {
    images: string[];
    hotelName: string;
}

export default function HotelSlider({ images, hotelName }: HotelSliderProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const totalImages = images?.length || 0;

    return (
        <div className="hotel-card-img-wrapper">
            <div className="hotel-img-count">{totalImages > 0 ? `${activeIndex + 1}/${totalImages}` : '0/0'}</div>
            <Swiper
                navigation={true}
                modules={[Navigation]}
                className="hotel-card-swiper"
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            >
                {images?.map((img: string, idx: number) => (
                    <SwiperSlide key={idx}>
                        <img src={img} alt={hotelName} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
