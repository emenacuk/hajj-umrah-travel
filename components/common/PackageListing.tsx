'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { UmrahPackageData, HajjPackageData } from '@/types';
import UmrahPackageCard from '@/components/cards/UmrahPackageCard';
import HajjPackageCard from '@/components/cards/HajjPackageCard';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface PackageListingProps {
  packages: (UmrahPackageData | HajjPackageData)[];
  type: 'umrah' | 'hajj';
  title?: string;
  showViewAll?: boolean;
  viewAllUrl?: string;
}

export default function PackageListing({
  packages,
  type,
  title,
  showViewAll = false,
  viewAllUrl,
}: PackageListingProps) {
  return (
    <section className="section">
      <div className="container">
        {title && (
          <div className="section-header">
            <h2 className="text-center">{title}</h2>
            {showViewAll && viewAllUrl && (
              <a href={viewAllUrl} className="btn btn--primary">
                View All Packages
              </a>
            )}
          </div>
        )}

        <div className="packages-grid">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {packages.map((pkg) => (
              <SwiperSlide key={pkg.id}>
                {type === 'umrah' ? (
                  <UmrahPackageCard package={pkg as UmrahPackageData} />
                ) : (
                  <HajjPackageCard package={pkg as HajjPackageData} />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}


