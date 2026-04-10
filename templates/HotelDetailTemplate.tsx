import React from 'react';
import { Metadata } from 'next';
import PackageGallery from '@/components/packages/PackageGallery';
import InnerBanner from '@/components/banners/InnerBanner';
import PackageContactInfo from '@/components/sections/PackageContactInfo';
import PlanScheduleSection from '@/components/sections/PlanScheduleSection';
import PackageSlider from '@/components/sliders/PackageSlider';
import HotelMap from '@/components/hotels/HotelMap';
import { getImageUrl, fetchHotelBySlug, getGeneralSettings, generatePageMetadata } from '@/utils/api';
import '@/styles/components/_hotel-detail.scss';

// ─── Amenity Icon SVGs ───────────────────────────────────────────────────────

function WifiIcon() {
  return (
    <img src="/wifi.png" alt="Wifi" />

  );
}

function FridgeIcon() {
  return (
    <img src="/fridge.png" alt="Fridge" />

  );
}

function RoomServiceIcon() {
  return (
    <img src="/service.png" alt="Room Service" />

  );
}

function AcIcon() {
  return (
    <img src="/ac.png" alt="Ac" />

  );
}

function WheelchairIcon() {
  return (
    <img src="/wheelchair.png" alt="Wheelchair" />

  );
}

function TvIcon() {
  return (
    <img src="/tv.png" alt="Tv" />

  );
}

function DoormanIcon() {
  return (
    <img src="/door-boy.png" alt="Doorman" />
  );
}

function ServiceIcon() {
  return (
    <img src="/service.png" alt="Service" />

  );
}

function getAmenityIcon(name: string) {
  const n = name.toLowerCase();
  if (n.includes('wifi') || n.includes('internet')) return <WifiIcon />;
  if (n.includes('fridge') || n.includes('refrigerator') || n.includes('minibar')) return <FridgeIcon />;
  if (n.includes('room service') || n.includes('service')) return <RoomServiceIcon />;
  if (n.includes('air') || n.includes('ac') || n.includes('conditioning')) return <AcIcon />;
  if (n.includes('wheel') || n.includes('wheelchair') || n.includes('disabled')) return <WheelchairIcon />;
  if (n.includes('tv') || n.includes('television') || n.includes('tele')) return <TvIcon />;
  if (n.includes('door') || n.includes('concierge') || n.includes('porter')) return <DoormanIcon />;
  return <ServiceIcon />;
}

// ─── Template ─────────────────────────────────────────────────────────────────

interface HotelDetailTemplateProps {
  data: any;
}

export default function HotelDetailTemplate({ data }: HotelDetailTemplateProps) {
  const content = data.content || {};

  // ── Detect which data shape we received ──────────────────────────────────
  // Shape A: direct hotel API result (from mapHotelData)  → data.name, data.city, etc.
  // Shape B: CMS page fallback (from fetchPageData)        → data.title, data.content.*
  const isHotelApiShape = !!data.name && !data.title;

  // Banner (only shown for CMS "with banner" templates)
  const bannerData = content.banner || { title: data.title, image: data.simple_image_url || data.image_url };
  const hasBanner = data.page_template?.toLowerCase().includes('with banner');

  // ── Core fields ──────────────────────────────────────────────────────────
  const title = isHotelApiShape ? (data.name || '') : (data.title || '');
  const description = isHotelApiShape ? (data.description || '') : (content.main_content || data.simple_description || '');
  const city = isHotelApiShape ? (data.city || '') : (content.hotel?.city || content.city || '');
  const distance = isHotelApiShape ? (data.distance || '') : (content.hotel?.distance || content.distance || '');
  const rating = isHotelApiShape ? (Number(data.rating) || 5) : (Number(content.hotel?.rating) || 5);

  // ── Gallery images ───────────────────────────────────────────────────────
  let galleryImages: any[] = [];
  if (isHotelApiShape) {
    galleryImages = data.images || [];
  } else {
    galleryImages = content.gallery || content.hotel?.images || content.images || [];
  }

  const images = galleryImages
    .map((img: any) => {
      const path = typeof img === 'string' ? img : img.url || img.image_url || img.image;
      return getImageUrl(path);
    })
    .filter(Boolean);

  if (images.length === 0 && data.simple_image_url) images.push(getImageUrl(data.simple_image_url));
  if (images.length === 0 && data.image_url) images.push(getImageUrl(data.image_url));

  // ── Amenities ────────────────────────────────────────────────────────────
  let amenities: Array<{ name: string }> = [];

  if (isHotelApiShape) {
    // Shape A: data.amenities is already a parsed array from mapHotelData
    const raw = data.amenities || [];
    amenities = Array.isArray(raw)
      ? raw.map((item: any) => typeof item === 'string' ? { name: item } : { name: item.name || item.title || '' })
      : [];
  } else {
    // Shape B: data.content.services_items — JSON string or array
    const rawAmenities = content.services_items;
    if (rawAmenities) {
      try {
        const parsed = typeof rawAmenities === 'string' ? JSON.parse(rawAmenities) : rawAmenities;
        if (Array.isArray(parsed)) {
          amenities = parsed.map((item: any) =>
            typeof item === 'string' ? { name: item } : { name: item.name || item.title || '' }
          );
        }
      } catch {
        if (typeof rawAmenities === 'string') {
          amenities = rawAmenities.split(',').map((s: string) => ({ name: s.trim() }));
        }
      }
    }
  }

  // Filter out empty amenity names
  amenities = amenities.filter(a => a.name.trim());

  const relevantPackages = data.relevantPackages || content.relevantPackages || [];

  const amenitiesHeading = content.services_heading || 'HOTEL AMENITIES';
  const amenitiesSubheading = content.services_subheading || '';

  return (
    <div className="hotel-detail-page">
      {/* Optional InnerBanner */}
      {hasBanner && <InnerBanner data={bannerData} form={false} />}

      {/* ── Header ─────────────────────────────────────── */}
      <section className="section hotel-dh-header-section">
        <div className="container">
          <div className="hotel-dh-header">

            {/* Left: title + description */}
            <div className="hotel-dh-left">
              <div className="hotel-dh-divider top">
                <img src="/styleup.svg" alt="" />
              </div>
              <h1 className="hotel-dh-title">{title}</h1>
              {description && (
                <div
                  className="hotel-dh-description"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              )}
              <div className="hotel-dh-divider bottom">
                <img src="/styledown.svg" alt="" />
              </div>
            </div>

            {/* Right: city / distance / stars */}
            <div className="hotel-dh-right">
              <div className="hotel-dh-meta">
                {city && (
                  <div className="hotel-dh-meta-item">
                    <span className="meta-label">City:</span>
                    <span className="meta-value">{city}</span>
                  </div>
                )}
                {distance && (
                  <div className="hotel-dh-meta-item">
                    <span className="meta-label">Distance:</span>
                    <span className="meta-value">{distance}</span>
                  </div>
                )}
              </div>
              <div className="hotel-dh-stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < rating ? 'star-filled' : 'star'}>
                    <img src="/star.svg" alt="" />
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Gallery ────────────────────────────────────── */}
      {images.length > 0 && (
        <section className="hotel-dh-gallery-section">
          <div className="container">
            <PackageGallery images={images} />
          </div>
        </section>
      )}

      {/* ── Amenities ──────────────────────────────────── */}
      <section className="section hotel-dh-amenities-section">
        <div className="container">
          <h2 className="section-subtitle-small">{amenitiesHeading}</h2>
          {amenitiesSubheading && (
            <p className="pkg-description-text">{amenitiesSubheading}</p>
          )}
          {amenities.length > 0 && (
            <div className="amenity-grid">
              {amenities.map((amenity, index) => (
                <div key={index} className="amenity-item">
                  <div className="amenity-icon-box">
                    {getAmenityIcon(amenity.name)}
                  </div>
                  <span className="amenity-label">{amenity.name.toUpperCase()}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Plan Schedule Section ────────────────────── */}
      <PlanScheduleSection hotelName={title} />

      {/* ── Relevant Packages ────────────────────────── */}
      {relevantPackages.length > 0 && (
        <section className="section related-packages-detail hotel-dh-packages-section">
          <div className="container">
            <div className="sectionheadings">
              <div className="sectionheadingstext">
                <h2 className="section-title">Related Umrah Packages</h2>
                <p className="section-subtitle">Specially curated packages that include {title}</p>
              </div>
              <div className="rightside">
                <div className="swiper-nav-btns">
                  <button className="swiper-nav-btn prev hotel-pkg-prev">
                    <img src="/nextarrow.svg" alt="Prev" style={{ transform: 'rotate(180deg)' }} />
                  </button>
                  <button className="swiper-nav-btn next hotel-pkg-next">
                    <img src="/nextarrow.svg" alt="Next" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="related-pkgs-grid" style={{ position: 'relative' }}>
            <PackageSlider
              items={relevantPackages}
              cardType="umrah"
              navigationPrevEl=".hotel-pkg-prev"
              navigationNextEl=".hotel-pkg-next"
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 1.2 },
                992: { slidesPerView: 1.4 },
                1025: { slidesPerView: 1.6 },
                1200: { slidesPerView: 2.2 },
                1700: { slidesPerView: 2.8 },
              }}
            />
          </div>
        </section>
      )}

      {/* ── Location / Map Section ───────────────────── */}
      {(data.address || data.map) && (
        <section className="section hotel-dh-location-section">
          <div className="container">
            <div className="location-header">
              <h2 className="section-title">Location</h2>
              {data.address && <p className="address-text">{data.address}</p>}
            </div>
            </div>
            {data.map && (
              <HotelMap mapHtml={data.map} />
            )}
        </section>
      )}

      {/* ── Contact Section ────────────────────────────── */}
      <PackageContactInfo contact={content.contact} />
    </div>
  );
}
