import Link from 'next/link';
import { HajjPackageData } from '@/types';
import '@/styles/components/_package-cards.scss';

import { CardSkeleton } from '@/components/common/Skeleton';

interface HajjPackageCardProps {
  package: HajjPackageData;
  loading?: boolean;
}

export default function HajjPackageCard({ package: pkg, loading }: HajjPackageCardProps) {
  if (loading) return <CardSkeleton />;

  return (
    <div className="hajj-card " >
      <Link href={`/hajj/${pkg.id}`}>
        <div className="package-image-wrapper">
          <img src={pkg.image} alt={pkg.title} />
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
        <Link href={`/hajj/${pkg.id}`}>
          <h2>{pkg.title}</h2>
        </Link>
        <div className="package-price">
          <span className="price-label">starting <br /> from</span>
          <span className="price-amount">£ {pkg.price}</span>
          <sub className="price-unit">per <br /> person</sub>
        </div>
        <div className='hotels'>
          {pkg.makkahHotel && (
            <div className="package-hotel">
              <strong>Makkah Hotel:</strong> {pkg.makkahHotel}
            </div>
          )}

          {pkg.madinahHotel && (
            <div className="package-hotel">
              <strong>Madinah Hotel:</strong> {pkg.madinahHotel}
            </div>
          )}
        </div>
        <div className="package-actions">
          <Link href={`/hajj/${pkg.id}`} className="btn btn--black">
            Get Details
          </Link>
          <Link href={`/hajj/${pkg.id}?enquire=true`} className="btn btn--primary">
            Enquire Now
          </Link>
        </div>
      </div>
    </div>
  );
}

