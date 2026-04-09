'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { UmrahPackageData } from '@/types';
import '@/styles/components/_package-cards.scss';
import { getImageUrl } from '@/utils/api';

import { CardSkeleton } from '@/components/common/Skeleton';
import EnquiryModal from '@/components/common/EnquiryModal';

interface UmrahPackageCardProps {
  package: UmrahPackageData;
  loading?: boolean;
}

export default function UmrahPackageCard({ package: pkg, loading }: UmrahPackageCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  if (loading) return <CardSkeleton />;

  return (

    <div className="package-card">
      <Link href={`/umrah-packages/${pkg.pageUrl}`} >
        <div className="package-image-wrapper">
          <img src={getImageUrl(pkg.image)} alt={pkg.title} />
        </div>
      </Link>

      <div className="package-content">
        {pkg.rating && (
          <div className="package-rating">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={i < pkg.rating! ? 'star-filled' : 'star'}>
                <img src="/star.svg" alt="" />
              </span>
            ))}
          </div>
        )}
        <span className='headingoncard'>{pkg.title}</span>

        <div className="package-price">
          <span className="price-label">starting <br /> from</span>
          <span className="price-amount">£ {pkg.price}</span>
          <sub className="price-unit">per <br /> person</sub>
        </div>
        <div className='hotels'>
          {pkg.makkahHotel && (
            <div className="package-hotel">
              <strong>Makkah Hotel</strong> {pkg.makkahHotel}
            </div>
          )}

          {pkg.madinahHotel && (
            <div className="package-hotel">
              <strong>Madinah Hotel</strong> {pkg.madinahHotel}
            </div>
          )}
        </div>

        <div className="package-actions">
          <Link href={`/umrah-packages/${pkg.pageUrl}`} className="btn btn--black">
            Get Details
          </Link>
          <div
            className="btn btn--primary"
            style={{ cursor: 'pointer' }}
            onClick={() => setIsModalOpen(true)}
          >
            Enquire Now
          </div>
        </div>
      </div>
      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        packageTitle={pkg.title}
        pageURL={`/umrah-packages/${pkg.pageUrl}`}
      />
    </div>

  );
}

