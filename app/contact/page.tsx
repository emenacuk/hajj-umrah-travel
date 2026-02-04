import { fetchPageData } from '@/utils/api';
import ContactTemplate from '@/templates/ContactTemplate';

export default async function ContactPage() {
  const pageData = await fetchPageData('contact');

  if (!pageData) {
    const defaultData = {
      template_name: 'contact',
      title: 'Contact Us',
      content: {},
    };
    return <ContactTemplate data={defaultData} />;
  }

  return <ContactTemplate data={pageData} />;
}


