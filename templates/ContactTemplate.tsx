import { PageData } from '@/types';
import '@/styles/components/_contactus.scss';
import { getGeneralSettings } from '@/utils/api';
import ContactForm from '@/components/forms/ContactForm';

interface ContactTemplateProps {
  data?: PageData;
}

export default async function ContactTemplate({ data }: ContactTemplateProps) {
  const generalSettings = await getGeneralSettings();

  const getValue = (key: string) => {
    if (!generalSettings?.global_variables) return key;
    let value = key;
    generalSettings.global_variables.forEach(variable => {
      if (value && typeof value === 'string') {
        value = value.replace(variable.code, variable.code_value);
      }
    });
    return value;
  };

  const footerContents = generalSettings?.footer_setting?.contents;
  const socialIcons = generalSettings?.footer_setting?.social_media_icons;

  return (
    <>
      <section className="contact-package-section">
        <div className="container">
          <div className="customize-grid">
            <div className="form-column">
              <div className='sectionheadings'>
                <div className='sectionheadingstext'>
                  {data?.banner_heading ? (
                    <div
                      className="section-title"
                      dangerouslySetInnerHTML={{ __html: data.banner_heading.replace(/<p>&nbsp;?<\/p>/gi, '') }}
                    />
                  ) : (
                    <h1 className="section-title">Get In Touch</h1>
                  )}
                  {data?.banner_subheading && (
                    <div
                      className="section-subtitle"
                      dangerouslySetInnerHTML={{ __html: data.banner_subheading.replace(/<p>&nbsp;?<\/p>/gi, '') }}
                    />
                  )}
                </div>
              </div>

              <ContactForm data={data} settings={generalSettings} />
            </div>

            <div className="contact-image-column">
              <div className="contact-person-image-wrapper">
                <img src="/contactimage.png" alt="Person in Ihram" className="contact-person-image" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-info-cards-section">
        <div className="container">
          <div className="contact-info-grid">
            {/* Talk to UK Experts Card */}
            <div className="contact-info-card">
              <div className="icon-box">
                <img src="/phone.svg" alt="phone" />
              </div>
              <div className="card-content">
                <div className="label-group">
                  <h3>Talk To UK<br />Travel Experts</h3>
                </div>
                <div className="divider"></div>
                <div className="info-group">
                  <div className="phone-list">
                    {footerContents?.footer_phone && (
                      <a href={`tel:${getValue(footerContents.footer_phone).replace(/\s+/g, '')}`}>
                        {getValue(footerContents.footer_phone)}
                      </a>
                    )}
                    {getValue('[%WHATSAPP%]') !== '[%WHATSAPP%]' && (
                      <a href={`https://wa.me/${getValue('[%WHATSAPP%]').replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer">
                        {getValue('[%WHATSAPP%]')}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Email Address Card */}
            <div className="contact-info-card">
              <div className="icon-box" style={{ position: 'relative' }}>
                <img src="/email.svg" alt="email" />
              </div>
              <div className="card-content">
                <div className="label-group">
                  <h3>Email<br />Address</h3>
                </div>
                <div className="divider"></div>
                <div className="info-group">
                  {footerContents?.footer_email && (
                    <a href={`mailto:${getValue(footerContents.footer_email)}`}>
                      {getValue(footerContents.footer_email)}
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Office Address Card */}
            <div className="contact-info-card">
              <div className="icon-box">
                <img src="/map.svg" alt="location" />
              </div>
              <div className="card-content">
                <div className="label-group">
                  <h3>Office<br />Address</h3>
                </div>
                <div className="divider"></div>
                <div className="info-group">
                  {getValue(footerContents?.footer_address || 'London, United Kingdom')}
                </div>
              </div>
            </div>

            {/* Social Media Card */}
            <div className="contact-info-card">
              <div className="icon-box">
                <img src="/social.svg" alt="social" />
              </div>
              <div className="card-content">
                <div className="label-group">
                  <h3>Our Social<br />Media</h3>
                </div>
                <div className="divider"></div>
                <div className="info-group">
                  <div className="social-icons-contact">
                    {socialIcons?.social_media_icons_link_input_4 && getValue(socialIcons.social_media_icons_link_input_4) !== '#' && (
                      <a href={getValue(socialIcons.social_media_icons_link_input_4)} target="_blank" rel="noopener noreferrer" className="social-btn yt">
                        <img src="/youtube.svg" alt="Youtube" />
                      </a>
                    )}
                    {socialIcons?.social_media_icons_link_input_3 && getValue(socialIcons.social_media_icons_link_input_3) !== '#' && (
                      <a href={getValue(socialIcons.social_media_icons_link_input_3)} target="_blank" rel="noopener noreferrer" className="social-btn wa">
                        <img src="/whatsapp.svg" alt="Whatsapp" />
                      </a>
                    )}
                    {socialIcons?.social_media_icons_link_input_1 && getValue(socialIcons.social_media_icons_link_input_1) !== '#' && (
                      <a href={getValue(socialIcons.social_media_icons_link_input_1)} target="_blank" rel="noopener noreferrer" className="social-btn fb">
                        <img src="/fb.svg" alt="Facebook" />
                      </a>
                    )}
                    {socialIcons?.social_media_icons_link_input_2 && getValue(socialIcons.social_media_icons_link_input_2) !== '#' && (
                      <a href={getValue(socialIcons.social_media_icons_link_input_2)} target="_blank" rel="noopener noreferrer" className="social-btn ig">
                        <img src="/insta.svg" alt="Instagram" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
