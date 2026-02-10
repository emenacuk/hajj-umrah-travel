import { fetchHajjPackage } from '@/utils/api';
import { resolveTemplate } from '@/utils/templateResolver';
import { notFound } from 'next/navigation';
import { dynamicParams } from '@/data/static-routes';

export function generateStaticParams() {
  return dynamicParams.hajj;
}

interface HajjPackagePageProps {
  params: {
    id: string;
  };
}

export default async function HajjPackagePage({ params }: HajjPackagePageProps) {
  const packageData = await fetchHajjPackage(params.id);

  if (!packageData) {
    notFound();
  }

  const routeConfig = dynamicParams.hajj.find(route => route.id === params.id);
  const templateName = routeConfig?.template || 'hajj_package';

  const pageData = {
    template_name: templateName,
    title: packageData.title,
    content: {
      package: packageData,
      banner: packageData.banner,
      hotels: packageData.hotels,
      reviews: packageData.reviews,
      relatedPackages: packageData.relatedPackages,
      inclusions: packageData.inclusions,
      contact: packageData.contact,
      faqs: packageData.faqs,
    },
  };

  return resolveTemplate(pageData.template_name, pageData);
}


