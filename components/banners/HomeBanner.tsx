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
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1200);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!mounted) {
    return <BannerSkeleton />;
  }

  // Render HTML content from API (backend editor sends HTML tags)
  const heading = data.title ? (
    <div
      className="banner-heading"
      dangerouslySetInnerHTML={{ __html: data.title }}
    />
  ) : null;

  return (
    <section className="home-banner">
      <div className="container">
        <div className="banner-content">
          {isMobile && heading}
          <div className="banner-text">
            {!isMobile && heading}
            {/* Form works with static fields - API data optional until "get setting" API is ready */}
            <div className="inquiry-form-wrapper">
              <InquiryForm data={data.form} />
            </div>
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
            {/* Static video from public folder - not from API */}
            <video
              src="/banner-video.mp4"
              autoPlay
              muted
              loop
              playsInline
              poster="/homebanner.png"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '24px' }}
            />

          </div>
        </div>
      </div>
    </section>
  );
}

