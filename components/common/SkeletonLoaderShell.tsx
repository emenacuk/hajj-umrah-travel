'use client';

import React, { useEffect, useState } from 'react';
import { BannerSkeleton, SliderSkeleton } from './Skeleton';

interface SkeletonLoaderShellProps {
  children: React.ReactNode;
}

export default function SkeletonLoaderShell({ children }: SkeletonLoaderShellProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Once the app hydrates on the client, hide the skeleton
    // and reveal the actual page content.
    setIsReady(true);
  }, []);

  return (
    <div className="skeleton-loader-shell">
      {!isReady && (
        <div className="loading-skeleton-page">
          <BannerSkeleton />
          <div
            className="container"
            style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}
          >
            <SliderSkeleton count={3} />
            <SliderSkeleton count={3} />
            <div className="skeleton-section">
              <div
                style={{ height: '400px', width: '100%', borderRadius: '20px' }}
                className="skeleton"
              />
            </div>
          </div>
        </div>
      )}
      <div style={isReady ? undefined : { display: 'none' }}>
        {children}
      </div>
    </div>
  );
}

