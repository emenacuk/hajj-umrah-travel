import { fetchPageData } from '@/utils/api';
import ContactTemplate from '@/templates/ContactTemplate';
import { PageData } from '@/types';
import PageScript from '@/components/common/PageScript';

export default async function ContactPage() {
  const pageData = await fetchPageData('contact');

  if (!pageData) {
    const defaultData: PageData = {
      page_template: 'Contact Us Template',
      title: 'Contact Us',
      content: {},
    };
    return <ContactTemplate data={defaultData} />;
  }

  return (
    <>
      <PageScript html={pageData.script} ownerKey="contact" />
      <ContactTemplate data={pageData} />
    </>
  );
}


