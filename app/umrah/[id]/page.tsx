import { fetchUmrahPackage } from '@/utils/api';
import UmrahPackageTemplate from '@/templates/UmrahPackageTemplate';
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

  const pageData = {
    template_name: 'umrah_package',
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

  return <UmrahPackageTemplate data={pageData} />;
}


