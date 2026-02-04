import Link from 'next/link';
import { UmrahPackageData } from '@/types';
import '@/styles/components/_package-cards.scss';

interface UmrahPackageCardProps {
  package: UmrahPackageData;
}

export default function UmrahPackageCard({ package: pkg }: UmrahPackageCardProps) {
  return (
    
      <div className="package-card">
        <Link href={`/umrah/${pkg.id}`} >
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
          <Link href={`/umrah/${pkg.id}`} ><h2>{pkg.title}</h2></Link>
          
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
            <Link href={`/umrah/${pkg.id}`} className="btn btn--black">
              Get Details
            </Link>
            <Link href={`/umrah/${pkg.id}?enquire=true`} className="btn btn--primary">
              Enquire Now
            </Link>
          </div>
        </div>
      </div>
    
  );
}

