'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { SliderSkeleton } from '@/components/common/Skeleton';
import UmrahPackageCard from '@/components/cards/UmrahPackageCard';
import HajjPackageCard from '@/components/cards/HajjPackageCard';
import UmrahExplorationCard from '@/components/cards/UmrahExplorationCard';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface PackageSliderProps {
    items: any[];
    cardType: 'umrah' | 'hajj' | 'exploration';
    navigationPrevEl: string;
    navigationNextEl: string;
    paginationEl?: string;
    slidesPerView?: number | 'auto';
    spaceBetween?: number;
    breakpoints?: { [key: number]: any };
    loop?: boolean;
    autoplay?: any;
    className?: string;
    skeletonCount?: number;
}

export default function PackageSlider({
    items,
    cardType,
    navigationPrevEl,
    navigationNextEl,
    paginationEl,
    slidesPerView = 1,
    spaceBetween = 24,
    breakpoints,
    loop = false,
    autoplay,
    className = "packages-swiper",
    skeletonCount = 3
}: PackageSliderProps) {
    const [isLoaded, setIsLoaded] = useState(false);

    if (!items || items.length === 0) return null;

    const renderCard = (item: any) => {
        switch (cardType) {
            case 'umrah':
                return <UmrahPackageCard package={item} />;
            case 'hajj':
                return <HajjPackageCard package={item} />;
            case 'exploration':
                return <UmrahExplorationCard package={item} />;
            default:
                return null;
        }
    };

    return (
        <div className="packages-swiper-wrapper" style={{ position: 'relative' }}>
            {!isLoaded && <SliderSkeleton count={skeletonCount} />}
            <div style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.3s' }}>
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    onInit={() => setIsLoaded(true)}
                    slidesPerView={slidesPerView}
                    spaceBetween={spaceBetween}
                    navigation={{
                        prevEl: navigationPrevEl,
                        nextEl: navigationNextEl,
                    }}
                    pagination={paginationEl ? {
                        el: paginationEl,
                        clickable: true
                    } : false}
                    loop={loop}
                    autoplay={autoplay}
                    breakpoints={breakpoints}
                    className={className}
                >
                    {items.map((item, index) => (
                        <SwiperSlide key={item.id || index}>
                            {renderCard(item)}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            {paginationEl && <div className={`swiper-pagination-custom ${paginationEl.replace('.', '')}`}></div>}
        </div>
    );
}
