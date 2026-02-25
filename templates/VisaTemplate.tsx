'use client';

import { PageData } from '@/types';
import InnerBanner from '@/components/banners/InnerBanner';
import '@/styles/components/_visa.scss';
import FAQ from '@/components/common/FAQ';
import { MEDIA_BASE_URL } from '@/utils/api';

interface VisaPageTemplateProps {
    data: PageData;
}

export default function VisaPageTemplate({ data }: VisaPageTemplateProps) {
    const bannerData = data.content?.banner || {};
    const faqs = data.content?.faqs || [];

    const introContent = data.simple_description || '';
    const mainContent = data.content?.main_content || '';
    const introImage = data.simple_image_url ? `${MEDIA_BASE_URL}/media/${data.simple_image_url}` : "/visa.jpg";

    return (
        <>
            {/* Banner */}
            {bannerData && <InnerBanner data={bannerData} />}
            <section className="section visa-info-section">
                <div className="container">
                    <div className="visa-content-grid">
                        <div className="visa-text-column">
                            <div
                                dangerouslySetInnerHTML={{ __html: introContent }}
                            />
                        </div>
                        <div className="visa-image-column">
                            <div className='visaImageContainer'>
                                <img
                                    src={introImage}
                                    alt={data.simple_image_alt || "Hajj and Umrah Visa Services"}
                                    title={data.simple_image_title || "Hajj and Umrah Visa"}
                                    className='visaImage'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {mainContent && (
                <div className='visa-scroll-section'>
                    <div className='container'>
                        <div className='visa-scroll-grid'>
                            <div
                                dangerouslySetInnerHTML={{ __html: mainContent }}
                            />
                        </div>
                    </div>
                </div>
            )}
            {faqs.length > 0 && (
                <section className="section faq-section">
                    <div className="container">
                        <div className='sectionheadings'>
                            <div className='sectionheadingstext'>
                                <h2 className="section-title">{data.content?.faqs_heading || "Frequently Asked Questions"}</h2>
                                {data.content?.faqs_subheading && (
                                    <p className="section-subtitle">
                                        {data.content.faqs_subheading}
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

