'use client';

import { BannerData } from '@/types';
import InquiryForm from '../forms/InquiryForm';
import '@/styles/components/_home-banner.scss';
import { useState, useEffect } from 'react';

import { BannerSkeleton } from '@/components/common/Skeleton';

interface HomeBannerProps {
  data: BannerData;
  loading?: boolean;
}

export default function HomeBanner({ data, loading }: HomeBannerProps) {
  if (loading) return <BannerSkeleton />;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1200);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const heading = <h1>{data.title}</h1>;

  return (
    <section className="home-banner">
      <div className="container">
        <div className="banner-content">
          {isMobile && heading}
          <div className="banner-text">
            {!isMobile && heading}
            {data.form ? (
              <div className="inquiry-form-wrapper">
                <InquiryForm data={data.form} />
              </div>
            ) : (
              <div className="placeholder-form">Form Data Missing</div>
            )}
            <div className="brandsiconslist">
              <div className="brandicon">
                <img src="/b1.png" alt="" />
              </div>
              <div className="brandicon">
                <img src="/b2.png" alt="" />
              </div>
              <div className="brandicon">
                <img src="/b3.png" alt="" />
              </div>
            </div>
          </div>
          <div className="banner-image">
            {data.video ? (
              <video
                src={data.video}
                autoPlay
                muted
                loop
                playsInline
                poster={data.image}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '24px' }}
              />
            ) : (
              <img src={data.image || "/homebanner.png"} alt={data.title} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

