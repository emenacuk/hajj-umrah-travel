import { fetchUmrahPackage } from '@/utils/api';
import UmrahPackageTemplate from '@/templates/UmrahPackageTemplate';
import { notFound } from 'next/navigation';

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
    },
  };

  return <UmrahPackageTemplate data={pageData} />;
}


