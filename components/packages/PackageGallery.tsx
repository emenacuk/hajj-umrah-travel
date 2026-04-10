'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, FreeMode } from 'swiper/modules';
import { Skeleton } from '@/components/common/Skeleton';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

interface PackageGalleryProps {
    images: string[];
}

export default function PackageGallery({ images }: PackageGalleryProps) {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const [isGalleryLoaded, setIsGalleryLoaded] = useState(false);

    if (!images || images.length === 0) return null;

    return (
        <div className="detail-gallery-wrapper" style={{ position: 'relative' }}>
            {!isGalleryLoaded && (
                <Skeleton className="skeleton-gallery" width="100%" height="532px" borderRadius="18px" />
            )}
            <Swiper
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="main-gallery-swiper"
                onAfterInit={() => setIsGalleryLoaded(true)}
                style={{ opacity: isGalleryLoaded ? 1 : 0, transition: 'opacity 0.3s ease' }}
            >
                {images.map((img: string, index: number) => (
                    <SwiperSlide key={index}>
                        <img src={img} alt={`Gallery ${index}`} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="thumbs-gallery-container" style={{ opacity: isGalleryLoaded ? 1 : 0, transition: 'opacity 0.3s ease' }}>
                {!isGalleryLoaded && (
                    <div style={{ display: 'flex', gap: '15px', overflow: 'hidden' }}>
                        {Array.from({ length: 7 }).map((_, i) => (
                            <div key={i} style={{ flexShrink: 0, width: '15%' }}>
                                <Skeleton width="100%" height="100px" borderRadius="10px" />
                            </div>
                        ))}
                    </div>
                )}
                <Swiper
                    onSwiper={setThumbsSwiper}
                    slidesPerView={3.5}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    breakpoints={{
                        768: { slidesPerView: 4 },
                        992: { slidesPerView: 6 }
                    }}
                    className="thumbs-gallery-swiper"
                >
                    {images.map((img: string, index: number) => (
                        <SwiperSlide key={index}>
                            <div className="thumb-img-box">
                                <img src={img} alt={`Thumb ${index}`} />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}
