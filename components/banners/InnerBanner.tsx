import { BannerData } from '@/types';
import '@/styles/components/_inner-banner.scss';

interface InnerBannerProps {
  data: BannerData;
}

export default function InnerBanner({ data }: InnerBannerProps) {
  return (
    <section className="inner-banner">
      <div className="banner-background">
        {data.image && (
          <img src={data.image} alt={data.title} />
        )}
        <div className="overlay"></div>
      </div>

      <div className="container">
        <div className="banner-content">
          <h1>{data.title}</h1>
          {data.subtitle && <p>{data.subtitle}</p>}
          {data.description && <p>{data.description}</p>}
        </div>
      </div>
    </section>
  );
}

