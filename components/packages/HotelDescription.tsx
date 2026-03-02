'use client';

import React, { useState, useEffect, useRef } from 'react';
import DescriptionModal from '@/components/common/DescriptionModal';

interface HotelDescriptionProps {
    hotelName: string;
    description: string;
}

export default function HotelDescription({ hotelName, description }: HotelDescriptionProps) {
    const [showSeeMore, setShowSeeMore] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const descriptionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkOverflow = () => {
            if (descriptionRef.current) {
                const isOverflowing = descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight;
                setShowSeeMore(isOverflowing);
            }
        };

        const timer = setTimeout(checkOverflow, 100);
        window.addEventListener('resize', checkOverflow);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', checkOverflow);
        };
    }, [description]);

    return (
        <>
            <div
                ref={descriptionRef}
                className="hotel-card-desc"
                dangerouslySetInnerHTML={{
                    __html: description,
                }}
            />
            {showSeeMore && (
                <button
                    className="see-more-link btn-unstyled"
                    onClick={() => setIsModalOpen(true)}
                >
                    See More <span><img src="/rightarrow.svg" alt="" /></span>
                </button>
            )}

            <DescriptionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={hotelName}
                content={description}
            />
        </>
    );
}
