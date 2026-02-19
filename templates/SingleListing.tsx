'use client';

import { PageData } from '@/types';
import InnerBanner from '@/components/banners/InnerBanner';
import UmrahPackageCard from '@/components/cards/UmrahPackageCard';
import { mockHomePageData } from '@/data/mockData';
import '@/styles/components/_package-detail.scss';
import { ScrollDetail } from '@/components/sections/ScrollDetail';
import FAQ from '@/components/common/FAQ';

interface UmrahPackageTemplateProps {
  data: PageData;
}

export default function SingleListing({ data }: UmrahPackageTemplateProps) {
  const bannerData = data.content?.banner || {};
  const faqs = data.content?.faqs || [];

  // Determine the star rating from the page title (e.g., "3 Star Umrah Packages")
  const starRating = data.title?.includes('3') ? 3 : data.title?.includes('4') ? 4 : 5;

  // Get packages from mock data and filter by the specific star rating OR MORE
  const allUmrahPackages = mockHomePageData.content?.umrahPackages || [];
  const filteredPackages = allUmrahPackages.filter((pkg: any) => pkg.stars >= starRating);

  return (
    <>
      {/* Banner */}
      {bannerData && <InnerBanner data={bannerData} />}

      {/* Package List Grid */}
      <section className="section">
        <div className="container">
          <div className='sectionheadings'>
            <div className='sectionheadingstext'>
              <h2 className="section-title">{data.title}</h2>
              <p className="section-subtitle">
                Explore our exclusive collection of {starRating} star Umrah packages and more.
                Designed to provide comfort and spiritual peace during your holy journey.
              </p>
            </div>
          </div>

          <div className="packages-grid-two-col" >
            {filteredPackages.map((pkg: any) => (
              <UmrahPackageCard key={pkg.id} package={pkg} />
            ))}
          </div>

          <ScrollDetail
            title="Umrah & Hajj Services Scroll Detail"
            image="/scrollimg.png"
            content={`
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
        `}
          />
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
      </section>
    </>
  );
}
