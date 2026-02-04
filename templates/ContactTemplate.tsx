import { PageData } from '@/types';
import InnerBanner from '@/components/banners/InnerBanner';
import InquiryForm from '@/components/forms/InquiryForm';
import '@/styles/components/_forms.scss';

interface ContactTemplateProps {
  data: PageData;
}

export default function ContactTemplate({ data }: ContactTemplateProps) {
  const bannerData = data.content?.banner || {
    title: data.title || 'Contact Us',
    description: data.content?.description,
  };

  const formData = data.content?.form || {};
  const contactInfo = data.content?.contact || {};

  return (
    <>
      {bannerData && <InnerBanner data={bannerData} />}
      <section className="section">
        <div className="container">
          <div className="contact-layout">
            <div className="contact-form-section">
              <h2>Send Us a Message</h2>
              {formData && Object.keys(formData).length > 0 ? (
                <InquiryForm data={formData} />
              ) : (
                <p>Contact form will be displayed here.</p>
              )}
            </div>

            <div className="contact-info-section">
              <h2>Contact Information</h2>
              {contactInfo.phone && (
                <div className="contact-item">
                  <strong>Phone:</strong>
                  <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a>
                </div>
              )}
              {contactInfo.whatsapp && (
                <div className="contact-item">
                  <strong>WhatsApp:</strong>
                  <a href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`}>
                    {contactInfo.whatsapp}
                  </a>
                </div>
              )}
              {contactInfo.email && (
                <div className="contact-item">
                  <strong>Email:</strong>
                  <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
                </div>
              )}
              {contactInfo.address && (
                <div className="contact-item">
                  <strong>Address:</strong>
                  <p>{contactInfo.address}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

