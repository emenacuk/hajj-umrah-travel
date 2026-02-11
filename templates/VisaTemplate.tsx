'use client';

import { PageData } from '@/types';
import InnerBanner from '@/components/banners/InnerBanner';
import '@/styles/components/_visa.scss';
import FAQ from '@/components/common/FAQ';

interface VisaPageTemplateProps {
    data: PageData;
}

export default function VisaPageTemplate({ data }: VisaPageTemplateProps) {
    const dummyFaqs = [
        {
            question: "Do I need a visa for Umrah?",
            answer: "Yes, all pilgrims require a visa to perform Umrah. We can assist you with the entire visa application process."
        },
        {
            question: "How long does the visa process take?",
            answer: "The processing time can vary, but typically it takes between 3 to 7 working days once all documents are submitted."
        },
        {
            question: "What documents are required?",
            answer: "Generally, you need a valid passport with at least 6 months validity, a passport-sized photo, and proof of vaccination. Specific requirements may vary."
        },
        {
            question: "Can I perform Umrah on a tourist visa?",
            answer: "Yes, currently holders of tourist visas from eligible countries can perform Umrah. However, regulations can change, so it's best to check with us."
        }
    ];

    const bannerData = data.content?.banner || {};
    const faqs = (data.content?.faqs && data.content.faqs.length > 0) ? data.content.faqs : dummyFaqs;

    const content = [
        `<h2>Welcome to Bismillah Travel – Your Trusted Umrah Travel Agency in the UK</h2>
          <p>Bismillah Travel is here to help you visit religious places and make Umrah trips that connect with your soul. We're experts at creating meaningful journeys, so your Umrah experience will be not just a trip but a transformative experience. So, start a memorable and moving journey with us, your companion, for the best Umrah travel. We're more than just a travel agency; our mission is to explore spirituality with you, making the experience unforgettable. So, prepare yourself for an unparalleled experience with our Umrah packages.</p>      `
    ]
    const content2 = [
        `<h2>Welcome to Bismillah Travel – Your Trusted Umrah Travel Agency in the UK</h2>
          <p>Bismillah Travel is here to help you visit religious places and make Umrah trips that connect with your soul. We're experts at creating meaningful journeys, so your Umrah experience will be not just a trip but a transformative experience. So, start a memorable and moving journey with us, your companion, for the best Umrah travel. We're more than just a travel agency; our mission is to explore spirituality with you, making the experience unforgettable. So, prepare yourself for an unparalleled experience with our Umrah packages.</p>
          <h3>Umrah Packages</h3>
          <ul>
            <li>Premium Accommodations</li>
            <li>Direct Flight Options</li>
            <li>Experienced Professional Guides</li>
            <li>24/7 Spiritual Assistance</li>
          </ul>
          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
        <h2>Welcome to Bismillah Travel – Your Trusted Umrah Travel Agency in the UK</h2>
          <p>Bismillah Travel is here to help you visit religious places and make Umrah trips that connect with your soul. We're experts at creating meaningful journeys, so your Umrah experience will be not just a trip but a transformative experience. So, start a memorable and moving journey with us, your companion, for the best Umrah travel. We're more than just a travel agency; our mission is to explore spirituality with you, making the experience unforgettable. So, prepare yourself for an unparalleled experience with our Umrah packages.</p>
          <h3>Umrah Packages</h3>
          <ul>
            <li>Premium Accommodations</li>
            <li>Direct Flight Options</li>
            <li>Experienced Professional Guides</li>
            <li>24/7 Spiritual Assistance</li>
          </ul>
          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
        
        <h2>Welcome to Bismillah Travel – Your Trusted Umrah Travel Agency in the UK</h2>
          <p>Bismillah Travel is here to help you visit religious places and make Umrah trips that connect with your soul. We're experts at creating meaningful journeys, so your Umrah experience will be not just a trip but a transformative experience. So, start a memorable and moving journey with us, your companion, for the best Umrah travel. We're more than just a travel agency; our mission is to explore spirituality with you, making the experience unforgettable. So, prepare yourself for an unparalleled experience with our Umrah packages.</p>
          <h3>Umrah Packages</h3>
          <ul>
            <li>Premium Accommodations</li>
            <li>Direct Flight Options</li>
            <li>Experienced Professional Guides</li>
            <li>24/7 Spiritual Assistance</li>
          </ul>
          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
        `
    ]

    // Get packages from mock data for sliders (Removed)

    return (
        <>
            {/* Banner */}
            {bannerData && <InnerBanner data={bannerData} />}
            <section className="section visa-info-section">
                <div className="container">
                    <div className="visa-content-grid">
                        <div className="visa-text-column">
                            <div
                                dangerouslySetInnerHTML={{ __html: content[0] }}
                            />
                        </div>
                        <div className="visa-image-column">
                            <div className='visaImageContainer'>
                                <img src="/visa.jpg" alt="Hajj and Umrah Visa Services" className='visaImage' />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <div className='visa-scroll-section'>
                <div className='container'>
                    <div className='visa-scroll-grid'>
                        <div
                            dangerouslySetInnerHTML={{ __html: content2[0] }}
                        />
                    </div>
                </div>
            </div>
            {faqs.length > 0 && (
                <section className="section faq-section">
                    <div className="container">
                        <div className='sectionheadings'>
                            <div className='sectionheadingstext'>
                                <h2 className="section-title">Frequently Asked Questions</h2>
                                <p className="section-subtitle">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip
                                </p>
                            </div>
                        </div>

                        <FAQ items={faqs} />
                    </div>
                </section>
            )}
        </>
    );
}

