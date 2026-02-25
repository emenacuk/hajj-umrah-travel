'use client';

import { BannerData } from '@/types';
import InquiryForm from '../forms/InquiryForm';
import '@/styles/components/_inner-banner.scss';

import { getImageUrl } from '@/utils/api';

import { BannerSkeleton } from '@/components/common/Skeleton';

interface InnerBannerProps {
  data: BannerData;
  form?: boolean;
  loading?: boolean;
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

export default function InnerBanner({ data: bannerData, form = true, loading }: InnerBannerProps) {
  if (loading) return <BannerSkeleton />;
  const formData = bannerData.form || data.form;
  const backgroundImage = getImageUrl(bannerData.image, "/innerbg.jpg");

  return (
    <section className="inner-banner">
      <div className="banner-background">
        <img src={backgroundImage} alt={bannerData.title} />
        <div className="overlay"></div>
      </div>

      <div className="container">
        <div className="banner-content">
          <div className="banner-text">
            <div
              className="banner-heading"
              dangerouslySetInnerHTML={{ __html: bannerData.title }}
            />
            <div
              className="banner-description"
              dangerouslySetInnerHTML={{ __html: bannerData.description || "" }}
            />

            {form === true && (
              formData ? (
                <div className="inquiry-form-wrapper">
                  <InquiryForm data={formData} />
                </div>
              ) : (
                <div className="placeholder-form">Form Data Missing</div>
              )
            )}

          </div>
        </div>
      </div>
    </section>
  );
}

