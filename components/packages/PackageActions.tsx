'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import EnquiryModal from '@/components/common/EnquiryModal';
import BookingModal from '@/components/common/BookingModal';
import CustomizeModal from '@/components/common/CustomizeModal';

interface PackageActionsProps {
    packageData: any;
    type: 'hajj' | 'umrah';
    economyLabel?: string;
    premiumLabel?: string;
    economyPrice?: string | number;
    premiumPrice?: string | number;
    showPrices?: boolean;
    showButtons?: boolean;
}

export default function PackageActions({
    packageData,
    type,
    economyLabel = "Standard Package",
    premiumLabel = "Premium Package",
    economyPrice,
    premiumPrice,
    showPrices = true,
    showButtons = true
}: PackageActionsProps) {
    const [selectedTier, setSelectedTier] = useState<string>(economyLabel);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useState(false);
    const [pageURL, setPageURL] = useState('');
    const searchParams = useSearchParams();

    useEffect(() => {
        setPageURL(window.location.href);
    }, []);

    useEffect(() => {
        if (searchParams.get('enquire') === 'true') {
            setIsModalOpen(true);
        }
    }, [searchParams]);

    const displayEconomyPrice = economyPrice || packageData.price || (type === 'hajj' ? '2965' : '965');
    const displayPremiumPrice = premiumPrice || (type === 'umrah' ? (parseFloat(String(packageData.price || '0')) + 1000) : '3965');

    return (
        <>
            {showPrices && (
                <>
                    <div className="package-price-options">
                        <div
                            className={`price-option-row ${selectedTier === economyLabel ? 'active' : ''}`}
                            onClick={() => setSelectedTier(economyLabel)}
                        >
                            <div className="option-name">
                                <div className="radio-circle">
                                    {selectedTier === economyLabel && <div className="inner-dot"></div>}
                                </div>
                                {economyLabel}
                            </div>
                            <div className="option-price">
                                <small>starting <br />from</small>
                                <span className="currency">£</span>
                                <span className="amount">{displayEconomyPrice}</span>
                                <small className="per-person">per<br />person</small>
                            </div>
                        </div>
                        <div
                            className={`price-option-row ${selectedTier === premiumLabel ? 'active' : ''}`}
                            onClick={() => setSelectedTier(premiumLabel)}
                        >
                            <div className="option-name">
                                <div className="radio-circle">
                                    {selectedTier === premiumLabel && <div className="inner-dot"></div>}
                                </div>
                                {premiumLabel}
                            </div>
                            <div className="option-price">
                                <small>starting <br />from</small>
                                <span className="currency">£</span>
                                <span className="amount">{displayPremiumPrice}</span>
                                <small className="per-person">per<br />person</small>
                            </div>
                        </div>
                    </div>

                    <div className="header-actions">
                        <button
                            className="btn btn-enquire"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Enquire Now
                        </button>
                    </div>
                </>
            )}

            {showButtons && (
                <div className="pkg-action-btns">
                    <button className="btn btn--primary" onClick={() => setIsBookingModalOpen(true)}>Book This Package <span><img src="/btnarrow.svg" alt="" /></span></button>
                    <button className="btn btn--dark" onClick={() => setIsCustomizeModalOpen(true)}>Customize Package <span><img src="/btnarrow.svg" alt="" /></span></button>
                </div>
            )}

            <EnquiryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                pageURL={pageURL}
                selectedPackage={selectedTier}
                packageTitle={packageData.title}
            />

            <BookingModal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                packageTitle={packageData.title}
                pageURL={pageURL}
                selectedPackage={selectedTier}
            />

            <CustomizeModal
                isOpen={isCustomizeModalOpen}
                onClose={() => setIsCustomizeModalOpen(false)}
                type={type}
                pageURL={pageURL}
                selectedPackage={selectedTier}
                packageTitle={packageData.title}
            />
        </>
    );
}
