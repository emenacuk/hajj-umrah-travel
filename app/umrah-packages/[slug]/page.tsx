import { fetchUmrahPackageBySlug, generatePageMetadata, getGeneralSettings } from '@/utils/api';
import { resolveTemplate } from '@/utils/templateResolver';
import PageScript from '@/components/common/PageScript';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface UmrahPackagePageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: UmrahPackagePageProps): Promise<Metadata> {
  try {
    const [packageData, generalSettings] = await Promise.all([
      fetchUmrahPackageBySlug(params.slug),
      getGeneralSettings()
    ]);
    return generatePageMetadata(packageData, generalSettings, `umrah-packages/${params.slug}`);
  } catch (error) {
    return { title: 'Umrah Package' };
  }
}

export default async function UmrahPackagePage({ params }: UmrahPackagePageProps) {
  try {
    const packageData = await fetchUmrahPackageBySlug(params.slug);

    if (!packageData) {
      notFound();
    }

    const templateName = 'single_umrah';

    const pageData = {
      page_template: templateName,
      title: packageData.title || packageData.package_title || 'Umrah Package',
      script: packageData.script,
      content: {
        package: packageData,
        banner: packageData.banner || {
          title: packageData.title || packageData.package_title,
          image: packageData.image || packageData.package_image
        },
        hotels: packageData.hotels || [],
        reviews: packageData.reviews || [],
        relatedPackages: packageData.relatedPackages || [],
        ourclientsays_widget: packageData._raw?.ourclientsays_widget?.[0],
        section_2_widget: packageData._raw?.section_2_widget?.[0],
        contact: packageData.contact || {},
        faqs: packageData.faqs || [],
      },
    };

    return (
      <>
        <PageScript html={pageData.script} ownerKey={params.slug} />
        {resolveTemplate(pageData.page_template, pageData)}
      </>
    );
  } catch (error) {
    console.error('Error loading Umrah package:', error);
    notFound();
  }
}
