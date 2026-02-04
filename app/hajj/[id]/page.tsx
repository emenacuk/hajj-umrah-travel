import { fetchHajjPackage } from '@/utils/api';
import HajjPackageTemplate from '@/templates/HajjPackageTemplate';
import { notFound } from 'next/navigation';

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

  const pageData = {
    template_name: 'hajj_package',
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

  return <HajjPackageTemplate data={pageData} />;
}


