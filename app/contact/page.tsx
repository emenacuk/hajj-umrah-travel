import { fetchPageData } from '@/utils/api';
import ContactTemplate from '@/templates/ContactTemplate';
import { PageData } from '@/types';

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

  return <ContactTemplate data={pageData} />;
}


