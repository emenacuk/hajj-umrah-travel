'use client'
import React, { useState, useEffect } from 'react'
import { getGeneralSettings, GeneralSettings, getImageUrl } from '@/utils/api';

export default function WhyChoose() {
  const [settings, setSettings] = useState<GeneralSettings | null>(null);
  useEffect(() => {
    const loadSettings = async () => {
      const data = await getGeneralSettings();
      if (data) {
        setSettings(data);
      }
    };
    loadSettings();
  }, []);
  const homePageWidgets = settings?.settings?.find(s => s.ref_name === "Home Page Widgets");
  const widgets = homePageWidgets?.contents as any;

  if (!widgets || widgets.business_slogans_enable !== "1") {
    return null;
  }

  return (
    <section className="section why-us-section">
      <div className="container container-sm">

        <div className="features-grid">
          <div className='leftside features-card-wrapper'>
            {/* Slogan 1 */}
            <div className="feature-card">
              <span className="feature-icon">
                <img src={getImageUrl(widgets.business_slogan_icon_1)} alt="" />
              </span>
              <div className='content' dangerouslySetInnerHTML={{ __html: widgets.business_slogan_input_1 }} />
            </div>

            {/* Slogan 2 */}
            <div className="feature-card">
              <span className="feature-icon">
                <img src={getImageUrl(widgets.business_slogan_icon_2)} alt="" />
              </span>
              <div className='content' dangerouslySetInnerHTML={{ __html: widgets.business_slogan_input_2 }} />
            </div>
          </div>

          <div className='centeredchooose'>
            <h2>
              <span>Why Choose </span>
              Us?
            </h2>
          </div>

          <div className='rightside features-card-wrapper'>
            {/* Slogan 3 */}
            <div className="feature-card">
              <div className='content' dangerouslySetInnerHTML={{ __html: widgets.business_slogan_input_3 }} />
              <span className="feature-icon">
                <img src={getImageUrl(widgets.business_slogan_icon_3)} alt="" />
              </span>
            </div>

            {/* Slogan 4 */}
            <div className="feature-card">
              <div className='content' dangerouslySetInnerHTML={{ __html: widgets.business_slogan_input_4 }} />
              <span className="feature-icon">
                <img src={getImageUrl(widgets.business_slogan_icon_4)} alt="" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
