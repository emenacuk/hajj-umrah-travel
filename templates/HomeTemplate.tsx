import { PageData, UmrahPackageData, HajjPackageData, ReviewData } from '@/types';
import HomeBanner from '@/components/banners/HomeBanner';
import UmrahPackageCard from '@/components/cards/UmrahPackageCard';
import HajjPackageCard from '@/components/cards/HajjPackageCard';
import UmrahExplorationCard from '@/components/cards/UmrahExplorationCard';
import FAQ from '@/components/common/FAQ';
import CustomizeBanner from '@/components/banners/CustomizeBanner';
import HomeReviews from '@/components/sections/HomeReviews';
import UmrahHajjServices from '@/components/sections/UmrahHajjServices';
import { ScrollDetail } from '@/components/sections/ScrollDetail';
import BlogSection from '@/components/sections/BlogSection';
import { getImageUrl } from '@/utils/api';
import { isEmptyHtml } from '@/utils/htmlUtils';
import PackageSlider from '@/components/sliders/PackageSlider';
import PartnerSlider from '@/components/sliders/PartnerSlider';
import '@/styles/components/_home-template.scss';
import Link from 'next/link';
import WhyChoose from '@/components/common/WhyChoose';
interface HomeTemplateProps {
  data: PageData;
}
let airlinearray = ['air1.webp', 'air2.webp', 'air3.webp', 'air4.webp', 'air5.webp', 'air6.webp', 'air7.webp', 'air8.webp', 'air9.webp', 'air10.webp', 'air11.webp'];

export default function HomeTemplate({ data }: HomeTemplateProps) {

  // Extract data from API response
  const bannerData = data.content?.banner || {};
  const faqs = data.content?.faqs || [];
  const reviews = data.content?.reviews || [];
  const section1Widget = data.content?.section_1_widget?.[0];
  const section2Widget = data.content?.section_2_widget?.[0];
  const section3Widget = data.content?.section_3_widget?.[0];
  const section4Widget = data.content?.section_4_widget?.[0];
  const reviewsWidget = data.content?.ourclientsays_widget?.[0];
  const blogWidget = data.content?.blog_section_data;

  // Get packages from fetched data
  const section1Packages = data.content?.section1Packages || [];
  const section2Packages = data.content?.section2Packages || [];
  const section3Packages = data.content?.section3Packages || [];
  const section4Packages = data.content?.section4Packages || [];

  // Get images from API and normalize paths
  const section1Image = getImageUrl(data.content?.section1_image_url);
  const section3Image = getImageUrl(data.content?.section3_image_url);
  const scrollImage = getImageUrl(data.content?.scroll_image_url);

  // Services data
  const rawServicesItems = data.content?.services_items;
  let parsedItems = [];
  try {
    parsedItems = typeof rawServicesItems === 'string' ? JSON.parse(rawServicesItems) : (Array.isArray(rawServicesItems) ? rawServicesItems : []);
  } catch (e) {
    console.error('Error parsing services_items:', e);
  }

  const servicesData = data.content?.services_heading ? {
    title: data.content.services_heading,
    description: data.content.services_subheading || '',
    mainImage: getImageUrl(data.content.services_image_url),
    items: parsedItems.map((item: any, index: number) => ({
      id: item.id || `service-${index}`,
      title: item.heading || item.title || '',
      description: item.subheading || item.description || '',
      icon: item.svg || item.icon || ''
    }))
  } : null;

  return (
    <>
      {/* Home Banner */}
      {bannerData && <HomeBanner data={bannerData} />}

      {/* Section 1: Best Umrah Packages */}
      {section1Widget && (
        <section className={`section bestpackages`}>
          {section1Image && (
            <div className='sideimage'>
              <img src={getImageUrl(section1Image)} alt="" />
            </div>
          )}
          <div className={section1Image ? "leftcontent" : "container"}>
            <div className='sectionheadings'>
              <div className='sectionheadingstext'>
                <h2 className="section-title" dangerouslySetInnerHTML={{ __html: section1Widget.heading || '' }} />
                {section1Widget.subheading && !isEmptyHtml(section1Widget.subheading) && (
                  <p className="section-subtitle" dangerouslySetInnerHTML={{ __html: section1Widget.subheading }} />
                )}
              </div>
              <div className='rightside'>
                {section1Widget.slider_enable === '1' && (
                  <div className="swiper-nav-btns">
                    <button className="swiper-nav-btn prev prev-bestUmrah">
                      <img src="/nextarrow.svg" alt="" style={{ transform: 'rotate(180deg)' }} />
                    </button>
                    <button className="swiper-nav-btn next next-bestUmrah">
                      <img src="/nextarrow.svg" alt="" />
                    </button>
                  </div>
                )}
                {section1Widget.button_link && (
                  <Link href={`/${section1Widget.button_link}`} className="btn btn--primary">
                    {section1Widget.button_text || 'View All Packages'}
                  </Link>
                )}
              </div>
            </div>

            {section1Widget.slider_enable === '1' ? (
              <PackageSlider
                items={section1Packages}
                cardType="umrah"
                navigationPrevEl=".prev-bestUmrah"
                navigationNextEl=".next-bestUmrah"
                paginationEl=".bestUmrah-pagination"
                skeletonCount={2}
                breakpoints={{
                  640: { slidesPerView: 1.6, spaceBetween: 15 },
                  768: { slidesPerView: 1.2, spaceBetween: 15 },
                  992: { slidesPerView: 1.4, spaceBetween: 15 },
                  1025: { slidesPerView: 1.6, spaceBetween: 24 },
                  1200: { slidesPerView: 1.3, spaceBetween: 24 },
                  1580: { slidesPerView: 1.8, spaceBetween: 24 },
                  1700: { slidesPerView: 2, spaceBetween: 24 },
                }}
                slidesPerView={1.2}
                spaceBetween={15}
              />
            ) : (
              <div className="packages-grid-two-col">
                {section1Packages.map((pkg: any, index: number) => (
                  <UmrahPackageCard key={`bestUmrah-${pkg.id || index}`} package={pkg} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Section 2: December Umrah Deals */}
      {section2Widget && (
        <section className="section december-deals dealssection">
          <div className="container">
            <div className='sectionheadings'>
              <div className='sectionheadingstext'>
                <h2 className="section-title" dangerouslySetInnerHTML={{ __html: section2Widget.heading || '' }} />
                {section2Widget.subheading && !isEmptyHtml(section2Widget.subheading) && (
                  <p className="section-subtitle" dangerouslySetInnerHTML={{ __html: section2Widget.subheading }} />
                )}
              </div>
              <div className='rightside'>
                {section2Widget.slider_enable === '1' && (
                  <div className="swiper-nav-btns">
                    <button className="swiper-nav-btn prev prev-decemberDeals">
                      <img src="/nextarrow.svg" alt="" style={{ transform: 'rotate(180deg)' }} />
                    </button>
                    <button className="swiper-nav-btn next next-decemberDeals">
                      <img src="/nextarrow.svg" alt="" />
                    </button>
                  </div>
                )}
                {section2Widget.button_link && (
                  <Link href={`/${section2Widget.button_link}`} className="btn btn--primary">
                    {section2Widget.button_text || 'View All Packages'}
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="packages-swiper-container-full paddleft">
            {section2Widget.slider_enable === '1' ? (
              <PackageSlider
                items={section2Packages}
                cardType="umrah"
                navigationPrevEl=".prev-decemberDeals"
                navigationNextEl=".next-decemberDeals"
                paginationEl=".decemberDeals-pagination"
                skeletonCount={2}
                loop={true}
                // autoplay={{
                //   delay: 2500,
                //   disableOnInteraction: false
                // }}
                breakpoints={{
                  640: { slidesPerView: 1.6, spaceBetween: 15 },
                  768: { slidesPerView: 1.2, spaceBetween: 15 },
                  992: { slidesPerView: 1.4, spaceBetween: 15 },
                  1025: { slidesPerView: 1.6, spaceBetween: 24 },
                  1200: { slidesPerView: 2.2, spaceBetween: 24 },
                  1700: { slidesPerView: 2.8, spaceBetween: 24 },
                }}
                slidesPerView={1.2}
                spaceBetween={15}
              />
            ) : (
              <div className="container">
                <div className="packages-grid-two-col">
                  {section2Packages.map((pkg: any, index: number) => (
                    <UmrahPackageCard key={`decemberDeals-${pkg.id || index}`} package={pkg} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Why Choose Us Section - Static for now */}
      {/* <section className="section why-us-section">
        <div className="container container-sm">
          <div className="features-grid">
            <div className='leftside features-card-wrapper'>
              <div className="feature-card">
                <span className="feature-icon">
                  <img src="/01.png" alt="" />
                </span>
                <div className='content'>
                  <h3>Free Cancellations</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor </p>
                </div>
              </div>
              <div className="feature-card">
                <span className="feature-icon">
                  <img src="/02.png" alt="" />
                </span>
                <div className='content'>
                  <h3>Cheap To Luxury Umrah Deals</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor </p>
                </div>
              </div>
            </div>
            <div className='centeredchooose'>
              <img src="/chooseus.png" alt="" />
            </div>
            <div className='rightside features-card-wrapper'>
              <div className="feature-card">
                <div className='content'>
                  <h3>Guidance At Every Step</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor </p>
                </div>
                <span className="feature-icon">
                  <img src="/03.png" alt="" />
                </span>
              </div>
              <div className="feature-card">
                <div className='content'>
                  <h3>10,000 + Satisfied Customers</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor </p>
                </div>
                <span className="feature-icon">
                  <img src="/04.png" alt="" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <WhyChoose />

      {/* Section 3: Best Hajj Packages */}
      {section3Widget && (
        <section className="section hajjsection">
          <div className="container">
            <div className='sectionheadings'>
              <div className='sectionheadingstext'>
                <h2 className="section-title" dangerouslySetInnerHTML={{ __html: section3Widget.heading || '' }} />
                {section3Widget.subheading && !isEmptyHtml(section3Widget.subheading) && (
                  <p className="section-subtitle" dangerouslySetInnerHTML={{ __html: section3Widget.subheading }} />
                )}
              </div>
              <div className='rightside'>
                {section3Widget.slider_enable === '1' && (
                  <div className="swiper-nav-btns">
                    <button className="swiper-nav-btn prev prev-bestHajj">
                      <img src="/nextarrow.svg" alt="" style={{ transform: 'rotate(180deg)' }} />
                    </button>
                    <button className="swiper-nav-btn next next-bestHajj">
                      <img src="/nextarrow.svg" alt="" />
                    </button>
                  </div>
                )}
                {section3Widget.button_link && (
                  <Link href={`/${section3Widget.button_link}`} className="btn btn--primary">
                    {section3Widget.button_text || 'View All Packages'}
                  </Link>
                )}
              </div>
            </div>
          </div>
          {section3Widget.slider_enable === '1' ? (
            <div className="packages-swiper-wrapper bestHajj-swiper paddleft" style={{ position: 'relative' }}>
              <div className='sliderhere'>
                <PackageSlider
                  items={section3Packages}
                  cardType="hajj"
                  navigationPrevEl=".prev-bestHajj"
                  navigationNextEl=".next-bestHajj"
                  paginationEl=".bestHajj-pagination"
                  skeletonCount={3}
                  breakpoints={{
                    640: { slidesPerView: 2.2, spaceBetween: 15 },
                    992: { slidesPerView: 2.2, spaceBetween: 15 },
                    1025: { slidesPerView: 2.5, spaceBetween: 24 },
                    1200: { slidesPerView: 2, spaceBetween: 24 },
                    1500: { slidesPerView: 3, spaceBetween: 24 },
                  }}
                  slidesPerView={1.2}
                  spaceBetween={15}
                />
              </div>
              <div className='imagearea'>
                <img src={section3Image} alt="" />
              </div>
            </div>
          ) : null}


        </section>
      )}
      {/* Explore Our Umrah Packages Section */}
      {section4Packages.length > 0 && section4Widget && (
        <section className="section exploration-section">
          <div className="container">
            <div className='sectionheadings'>
              <div className='sectionheadingstext'>
                <h2 className="section-title" dangerouslySetInnerHTML={{ __html: section4Widget.heading || '' }} />
                {(section4Widget.description || section4Widget.subheading) && !isEmptyHtml(section4Widget.description || section4Widget.subheading) && (
                  <p className="section-subtitle" dangerouslySetInnerHTML={{ __html: section4Widget.description || section4Widget.subheading || '' }} />
                )}
              </div>
              <div className='rightside'>
                {section4Widget.slider_enable === '1' && (
                  <div className="swiper-nav-btns">
                    <button className="swiper-nav-btn prev prev-exploration">
                      <img src="/nextarrow.svg" alt="" style={{ transform: 'rotate(180deg)' }} />
                    </button>
                    <button className="swiper-nav-btn next next-exploration">
                      <img src="/nextarrow.svg" alt="" />
                    </button>
                  </div>
                )}
                {section4Widget.button_link && (
                  <Link href={`/${section4Widget.button_link}`} className="btn btn--primary">
                    {section4Widget.button_text || 'View All Packages'}
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="packages-swiper-wrapper exploration-swiper" style={{ position: 'relative' }}>
            <div className="exploration-swiper-inner">
              <PackageSlider
                items={section4Packages}
                cardType="exploration"
                navigationPrevEl=".prev-exploration"
                navigationNextEl=".next-exploration"
                paginationEl=".exploration-pagination"
                skeletonCount={3}
                loop={true}
                autoplay={{
                  delay: 1500,
                  disableOnInteraction: false
                }}
                breakpoints={{
                  640: { slidesPerView: 1.8, spaceBetween: 15 },
                  768: { slidesPerView: 2.2, spaceBetween: 15 },
                  992: { slidesPerView: 2.8, spaceBetween: 15 },
                  1025: { slidesPerView: 3.2, spaceBetween: 24 },
                  1200: { slidesPerView: 3.8, spaceBetween: 24 },
                  1350: { slidesPerView: 4.2, spaceBetween: 24 },
                  1700: { slidesPerView: 4.8, spaceBetween: 24 },
                }}
                slidesPerView={1.2}
                spaceBetween={15}
              />
            </div>
          </div>
        </section>
      )}
      {/* Customize Banner */}
      <CustomizeBanner data={data.customization_data} />

      {/* Reviews Section */}
      {reviews && reviews.length > 0 && reviewsWidget && (
        <HomeReviews
          reviews={reviews}
          cardsPerSlide={2}
          heading={reviewsWidget.heading}
          subheading={reviewsWidget.sub_heading}
        />
      )}

      {/* Umrah & Hajj Services Section */}
      {servicesData && (
        <UmrahHajjServices data={servicesData} />
      )}
      {/* Partners Section - Placeholder or using image */}
      <section className="section partners-section">
        <div className="container">
          <div className='sectionheadings'>
            <div className='sectionheadingstext'>
              <h2 className="section-title">{data.content?.airline_heading}</h2>
              <p className="section-subtitle">
                {data.content?.airline_subheading}
              </p>
            </div>
            <div className='rightside justify-content-end' >
              <div className="swiper-nav-btns">
                <button className="swiper-nav-btn prev partner-prev">
                  <img src="/nextarrow.svg" alt="" style={{ transform: 'rotate(180deg)' }} />
                </button>
                <button className="swiper-nav-btn next partner-next">
                  <img src="/nextarrow.svg" alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <PartnerSlider logos={airlinearray} />
      </section>

      {/* Scroll Detail Section */}
      {data.content?.scroll_description && !isEmptyHtml(data.content.scroll_description) && (
        <ScrollDetail
          title="Umrah & Hajj Services Scroll Detail"
          image={scrollImage}
          content={data.content.scroll_description}
        />
      )}

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <section className="section faq-section">
          <div className="container">
            <div className='sectionheadings'>
              <div className='sectionheadingstext'>
                <h2 className="section-title">{data.content?.faqs_heading || 'Frequently Asked Questions'}</h2>
                {data.content?.faqs_subheading && !isEmptyHtml(data.content.faqs_subheading) && (
                  <p className="section-subtitle" dangerouslySetInnerHTML={{ __html: data.content.faqs_subheading }} />
                )}
              </div>
            </div>
            <FAQ items={faqs} />
          </div>
        </section>
      )}
      {blogWidget && blogWidget.blogs?.length > 0 && (
        <BlogSection
          title={blogWidget.heading || ''}
          description={blogWidget.description || ''}
          image={getImageUrl(blogWidget.image_url)}
          blogs={blogWidget.blogs}
          button_link={blogWidget.button_link}
          button_text={blogWidget.button_text}
        />
      )}
    </>
  );
}
