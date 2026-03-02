import { PageData } from '@/types';
import InnerBanner from '@/components/banners/InnerBanner';
import UmrahPackageCard from '@/components/cards/UmrahPackageCard';
import Link from 'next/link';
import '@/styles/components/_package-detail.scss';
import { ScrollDetail } from '@/components/sections/ScrollDetail';
import FAQ from '@/components/common/FAQ';
import { isEmptyHtml } from '@/utils/htmlUtils';
import PackageSlider from '@/components/sliders/PackageSlider';

interface UmrahPackageTemplateProps {
  data: PageData;
}

export default function UmrahPackageTemplate({ data }: UmrahPackageTemplateProps) {

  const content = data.content || {};
  const bannerData = content.banner || {};
  const faqs = content.faqs || [];
  const faqsHeading = content.faqs_heading || 'Frequently Asked Questions';
  const faqsSubheading = content.faqs_subheading || '';

  // Use dynamic packages from API instead of mock data
  const section1Packages = content.section1Packages || [];
  const section2Packages = content.section2Packages || [];
  const section3Packages = content.section3Packages || [];
  const section4Packages = content.section4Packages || [];

  // Get widget info for headings/subheadings
  const widget1 = content.section_1_widget?.[0] || {};
  const widget2 = content.section_2_widget?.[0] || {};
  const widget3 = content.section_3_widget?.[0] || {};
  const widget4 = content.section_4_widget?.[0] || {};

  return (
    <>
      {/* Banner */}
      {bannerData && <InnerBanner data={bannerData} />}

      {/* Section 1 Slider */}
      {section1Packages.length > 0 && (
        <section className="section exploration-section">
          <div className="container">
            <div className='sectionheadings'>
              <div className='sectionheadingstext'>
                <h2 className="section-title">{widget1.heading || 'Umrah Packages'}</h2>
                {(widget1.subheading || widget1.description) && !isEmptyHtml(widget1.subheading || widget1.description) && (
                  <p className="section-subtitle">
                    {widget1.subheading || widget1.description}
                  </p>
                )}
              </div>
              <div className='rightside'>
                <div className="swiper-nav-btns">
                  <button id='prev-s1' className="swiper-nav-btn prev prev-exploration">
                    <img src="/nextarrow.svg" alt="" style={{ transform: 'rotate(180deg)' }} />
                  </button>
                  <button id='next-s1' className="swiper-nav-btn next next-exploration">
                    <img src="/nextarrow.svg" alt="" />
                  </button>
                </div>
                {widget1.button_text && (
                  <Link href={widget1.button_link || '#'} className="btn btn--primary">
                    {widget1.button_text}
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="packages-swiper-wrapper" style={{ position: 'relative' }}>
            <PackageSlider
              items={section1Packages}
              cardType="umrah"
              navigationPrevEl="#prev-s1"
              navigationNextEl="#next-s1"
              skeletonCount={2}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 1.2 },
                992: { slidesPerView: 1.4 },
                1025: { slidesPerView: 1.6 },
                1200: { slidesPerView: 2.2 },
                1700: { slidesPerView: 2.8 },
              }}
              slidesPerView={1}
              spaceBetween={24}
            />
          </div>
        </section>
      )}

      {/* Section 2 Slider */}
      {section2Packages.length > 0 && (
        <section className="section exploration-section ">
          <div className="container">
            <div className='sectionheadings'>
              <div className='sectionheadingstext'>
                <h2 className="section-title">{widget2.heading || 'Umrah Deals'}</h2>
                {(widget2.subheading || widget2.description) && !isEmptyHtml(widget2.subheading || widget2.description) && (
                  <p className="section-subtitle">
                    {widget2.subheading || widget2.description}
                  </p>
                )}
              </div>
              <div className='rightside'>
                <div className="swiper-nav-btns">
                  <button id='prev-s2' className="swiper-nav-btn prev prev-exploration">
                    <img src="/nextarrow.svg" alt="" style={{ transform: 'rotate(180deg)' }} />
                  </button>
                  <button id='next-s2' className="swiper-nav-btn next next-exploration">
                    <img src="/nextarrow.svg" alt="" />
                  </button>
                </div>
                {widget2.button_text && (
                  <Link href={widget2.button_link || '#'} className="btn btn--primary">
                    {widget2.button_text}
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="packages-swiper-wrapper" style={{ position: 'relative' }}>
            <PackageSlider
              items={section2Packages}
              cardType="umrah"
              navigationPrevEl="#prev-s2"
              navigationNextEl="#next-s2"
              skeletonCount={2}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 1.2 },
                992: { slidesPerView: 1.4 },
                1025: { slidesPerView: 1.6 },
                1200: { slidesPerView: 2.2 },
                1700: { slidesPerView: 2.8 },
              }}
              slidesPerView={1}
              spaceBetween={24}
            />
          </div>
        </section>
      )}

      {/* Section 3 Slider */}
      {section3Packages.length > 0 && (
        <section className="section exploration-section ">
          <div className="container">
            <div className='sectionheadings'>
              <div className='sectionheadingstext'>
                <h2 className="section-title">{widget3.heading || 'Hajj Packages'}</h2>
                {(widget3.subheading || widget3.description) && !isEmptyHtml(widget3.subheading || widget3.description) && (
                  <p className="section-subtitle">
                    {widget3.subheading || widget3.description}
                  </p>
                )}
              </div>
              <div className='rightside'>
                <div className="swiper-nav-btns">
                  <button id='prev-s3' className="swiper-nav-btn prev prev-exploration">
                    <img src="/nextarrow.svg" alt="" style={{ transform: 'rotate(180deg)' }} />
                  </button>
                  <button id='next-s3' className="swiper-nav-btn next next-exploration">
                    <img src="/nextarrow.svg" alt="" />
                  </button>
                </div>
                {widget3.button_text && (
                  <Link href={widget3.button_link || '#'} className="btn btn--primary">
                    {widget3.button_text}
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="packages-swiper-wrapper" style={{ position: 'relative' }}>
            <PackageSlider
              items={section3Packages}
              cardType="umrah"
              navigationPrevEl="#prev-s3"
              navigationNextEl="#next-s3"
              skeletonCount={2}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 1.2 },
                992: { slidesPerView: 1.4 },
                1025: { slidesPerView: 1.6 },
                1200: { slidesPerView: 2.2 },
                1700: { slidesPerView: 2.8 },
              }}
              slidesPerView={1}
              spaceBetween={24}
            />
          </div>
        </section>
      )}



      {/* Section 4 Slider */}
      {section4Packages.length > 0 && (
        <section className="section exploration-section ">
          <div className="container">
            <div className='sectionheadings'>
              <div className='sectionheadingstext'>
                <h2 className="section-title">{widget4.heading || 'Explore Packages'}</h2>
                {(widget4.subheading || widget4.description) && !isEmptyHtml(widget4.subheading || widget4.description) && (
                  <p className="section-subtitle">
                    {widget4.subheading || widget4.description}
                  </p>
                )}
              </div>
              <div className='rightside'>
                <div className="swiper-nav-btns">
                  <button id='prev-s4' className="swiper-nav-btn prev prev-exploration">
                    <img src="/nextarrow.svg" alt="" style={{ transform: 'rotate(180deg)' }} />
                  </button>
                  <button id='next-s4' className="swiper-nav-btn next next-exploration">
                    <img src="/nextarrow.svg" alt="" />
                  </button>
                </div>
                {widget4.button_text && (
                  <Link href={widget4.button_link || '#'} className="btn btn--primary">
                    {widget4.button_text}
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="packages-swiper-wrapper" style={{ position: 'relative' }}>
            <PackageSlider
              items={section4Packages}
              cardType="umrah"
              navigationPrevEl="#prev-s4"
              navigationNextEl="#next-s4"
              skeletonCount={2}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 1.2 },
                992: { slidesPerView: 1.4 },
                1025: { slidesPerView: 1.6 },
                1200: { slidesPerView: 2.2 },
                1700: { slidesPerView: 2.8 },
              }}
              slidesPerView={1}
              spaceBetween={24}
            />
          </div>
        </section>
      )}

      {(content.scroll_description || content.main_content) && !isEmptyHtml(content.scroll_description || content.main_content) && (
        <ScrollDetail
          title={data.title}
          image={content.scroll_image_url}
          content={content.scroll_description || content.main_content}
        />
      )}

      {faqs.length > 0 && (
        <section className="section faq-section">
          <div className="container">
            <div className='sectionheadings'>
              <div className='sectionheadingstext'>
                <h2 className="section-title">{faqsHeading}</h2>
                {faqsSubheading && !isEmptyHtml(faqsSubheading) && (
                  <p className="section-subtitle">
                    {faqsSubheading}
                  </p>
                )}
              </div>
            </div>

            <FAQ items={faqs} />
          </div>
        </section>
      )}
    </>
  );
}
