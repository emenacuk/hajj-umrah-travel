import { BannerSkeleton, SliderSkeleton } from '@/components/common/Skeleton';

export default function Loading() {
  return (
    <div className="loading-skeleton-page">
      <BannerSkeleton />
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <SliderSkeleton count={3} />
        <SliderSkeleton count={3} />
        <div className="skeleton-section">
            <div style={{ height: '400px', width: '100%', borderRadius: '20px' }} className="skeleton" />
        </div>
      </div>
    </div>
  );
}
