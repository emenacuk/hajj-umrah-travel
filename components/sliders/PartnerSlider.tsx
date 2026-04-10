'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

interface PartnerSliderProps {
    logos: string[];
}

export default function PartnerSlider({ logos }: PartnerSliderProps) {
    if (!logos || logos.length === 0) return null;

    return (
        <div className="partners-logos" style={{ width: '100%' }}>
            <Swiper
                modules={[Navigation]}
                slidesPerView={2.2}
                spaceBetween={15}
                navigation={{
                    prevEl: '.partner-prev',
                    nextEl: '.partner-next',
                }}
                breakpoints={{
                    640: { slidesPerView: 4, spaceBetween: 24 },
                    1024: { slidesPerView: 8, spaceBetween: 24 },
                }}
                className="packages-swiper partner-swiper"
            >
                {logos.map((logo, index) => (
                    <SwiperSlide key={`partner-${index}`}>
                        <img src={logo} alt="Partners" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
