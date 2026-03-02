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
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Skeleton width="25%" height="100px" borderRadius="10px" />
                        <Skeleton width="25%" height="100px" borderRadius="10px" />
                        <Skeleton width="25%" height="100px" borderRadius="10px" />
                        <Skeleton width="25%" height="100px" borderRadius="10px" />
                    </div>
                )}
                <Swiper
                    onSwiper={setThumbsSwiper}
                    slidesPerView={3}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    breakpoints={{
                        992: { slidesPerView: 4 }
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
