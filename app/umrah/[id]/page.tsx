import { fetchUmrahPackage } from '@/utils/api';
import { resolveTemplate } from '@/utils/templateResolver';
import { notFound } from 'next/navigation';
import { dynamicParams } from '@/data/static-routes';

export function generateStaticParams() {
  return dynamicParams.umrah;
}

interface UmrahPackagePageProps {
  params: {
    id: string;
  };
}

export default async function UmrahPackagePage({ params }: UmrahPackagePageProps) {
  const packageData = await fetchUmrahPackage(params.id);

  if (!packageData) {
    notFound();
  }

  const routeConfig = dynamicParams.umrah.find(route => route.id === params.id);
  const templateName = routeConfig?.template || 'single_umrah';

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


