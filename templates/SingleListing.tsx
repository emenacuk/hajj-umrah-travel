'use client';

import { PageData } from '@/types';
import InnerBanner from '@/components/banners/InnerBanner';
import UmrahPackageCard from '@/components/cards/UmrahPackageCard';
import '@/styles/components/_package-detail.scss';
import { ScrollDetail } from '@/components/sections/ScrollDetail';
import FAQ from '@/components/common/FAQ';
import { isEmptyHtml } from '@/utils/htmlUtils';

interface UmrahPackageTemplateProps {
  data: PageData;
}

export default function SingleListing({ data }: UmrahPackageTemplateProps) {
  const bannerData = data.content?.banner || {};
  const faqs = data.content?.faqs || [];
  const section1Widget = data.content?.section_1_widget?.[0] || {};
  const packages = data.content?.section1Packages || [];

  return (
    <>
      {/* Banner */}
      {bannerData && <InnerBanner data={bannerData} />}

      {/* Package List Grid */}
      <section className="section">
        <div className="container">
          {(section1Widget.heading || section1Widget.description) && (
            <div className='sectionheadings'>
              <div className='sectionheadingstext'>
                {section1Widget.heading && (
                  <h2
                    className="section-title"
                    dangerouslySetInnerHTML={{ __html: section1Widget.heading }}
                  />
                )}
                {section1Widget.description && !isEmptyHtml(section1Widget.description) && (
                  <div
                    className="section-subtitle"
                    dangerouslySetInnerHTML={{ __html: section1Widget.description }}
                  />
                )}
              </div>
            </div>
          )}

          <div className="packages-grid-two-col" >
            {packages.map((pkg: any) => (
              <UmrahPackageCard key={pkg.id} package={pkg} />
            ))}
          </div>
          {data.content?.scroll_description && !isEmptyHtml(data.content.scroll_description) && (
            <ScrollDetail
              title={data.title}
              image={data.content?.scroll_image_url}
              content={data.content?.scroll_description}
            />
          )}
        </div>
        {faqs.length > 0 && (
          <section className="section faq-section">
            <div className="container">
              <div className='sectionheadings'>
                <div className='sectionheadingstext'>
                  <h2 className="section-title">{data.content?.faqs_heading || "Frequently Asked Questions"}</h2>
                  <p className="section-subtitle">
                    {data.content?.faqs_subheading}
                  </p>
                </div>
              </div>
              <FAQ items={faqs} />
            </div>
          </section>
        )}
      </section>
    </>
  );
}
