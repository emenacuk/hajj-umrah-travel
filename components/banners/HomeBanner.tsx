'use client';

import { BannerData } from '@/types';
import InquiryForm from '../forms/InquiryForm';
import '@/styles/components/_home-banner.scss';

interface HomeBannerProps {
  data: BannerData;
}

export default function HomeBanner({ data }: HomeBannerProps) {
  return (
    <section className="home-banner">


      <div className="container">
        <div className="banner-content">
          <div className="banner-text">
            <h1>{data.title || "Trusted Hajj & Umrah Packages"}</h1>
            {/* {data.description && <p>{data.description}</p>} */}
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

