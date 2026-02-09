'use client';

import { BannerData } from '@/types';
import InquiryForm from '../forms/InquiryForm';
import '@/styles/components/_inner-banner.scss';

interface InnerBannerProps {
  data: BannerData;
}

const data: BannerData = {
  title: "Trusted Hajj & Umrah Packages",
  form: {
    fields: [
      {
        name: "name",
        label: "Name",
        type: "text",
        required: true
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        required: true
      },
      {
        name: "phone",
        label: "Phone",
        type: "tel",
        required: true
      },
      {
        name: "message",
        label: "Message",
        type: "textarea",
        required: true
      }
    ]
  }
}

export default function InnerBanner({ data: bannerData }: InnerBannerProps) {
  const formData = bannerData.form || data.form;
  const backgroundImage = "/innerbg.jpg";

  return (
    <section className="inner-banner">
      <div className="banner-background">
        <img src={backgroundImage} alt={bannerData.title || "Banner"} />
        <div className="overlay"></div>
      </div>

      <div className="container">
        <div className="banner-content">
          <div className="banner-text">
            <h1>{bannerData.title || "Trusted Hajj & Umrah Packages"}</h1>
            <p>
              {bannerData.description || "Experience the spiritual journey of a lifetime with our trusted Hajj & Umrah packages. We provide comprehensive services including flights, hotels, and guidance to ensure your pilgrimage is comfortable and spiritually fulfilling."}
            </p>

            {formData ? (
              <div className="inquiry-form-wrapper">
                <InquiryForm data={formData} />
              </div>
            ) : (
              <div className="placeholder-form">Form Data Missing</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

