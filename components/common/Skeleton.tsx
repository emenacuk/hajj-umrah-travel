import React from 'react';
import '@/styles/components/_skeleton.scss';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  circle?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className, width, height, borderRadius, circle }) => {
  const style: React.CSSProperties = {
    width,
    height,
    borderRadius: circle ? '50%' : borderRadius,
  };

  return <div className={`skeleton ${className || ''}`} style={style} />;
};

export const CardSkeleton = () => (
  <div className="skeleton-card">
    <Skeleton className="skeleton-image" />
    <div className="skeleton-content">
      <Skeleton className="skeleton-title" />
      <Skeleton className="skeleton-text" />
      <Skeleton className="skeleton-price" />
      <div className="skeleton-btns">
        <Skeleton className="skeleton-btn" />
        <Skeleton className="skeleton-btn" />
      </div>
    </div>
  </div>
);

export const SliderSkeleton = ({ count = 3 }: { count?: number }) => (
    <div className="skeleton-section">
        <div className="skeleton-header">
            <Skeleton className="skeleton-title" />
            <Skeleton className="skeleton-subtitle" />
        </div>
        <div style={{ display: 'flex', gap: '20px', overflow: 'hidden' }}>
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} style={{ flex: '0 0 350px' }}>
                    <CardSkeleton />
                </div>
            ))}
        </div>
    </div>
);

export const BannerSkeleton = () => (
  <div className="skeleton-banner skeleton">
    <div className="skeleton-banner-content">
      <Skeleton className="skeleton-h1" />
      <Skeleton className="skeleton-p" />
      <Skeleton width={150} height={50} borderRadius={200} />
    </div>
  </div>
);
