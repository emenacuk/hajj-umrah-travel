import { fetchUmrahPackageBySlug, generatePageMetadata, getGeneralSettings } from '@/utils/api';
import { resolveTemplate } from '@/utils/templateResolver';
import PageScript from '@/components/common/PageScript';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const revalidate = 3600; // Revalidate every hour

interface UmrahPackagePageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: UmrahPackagePageProps): Promise<Metadata> {
  const cleanSlug = params.slug.replace(/\.html$/i, '');
  try {
    const [packageData, generalSettings] = await Promise.all([
      fetchUmrahPackageBySlug(cleanSlug),
      getGeneralSettings()
    ]);
    return generatePageMetadata(packageData, generalSettings, `umrah-packages/${cleanSlug}`);
  } catch (error) {
    return { title: 'Umrah Package' };
  }
}

export default async function UmrahPackagePage({ params }: UmrahPackagePageProps) {
  const cleanSlug = params.slug.replace(/\.html$/i, '');
  try {
    const packageData = await fetchUmrahPackageBySlug(cleanSlug);

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
        section_1_widget: packageData._raw?.section_1_widget,
        section_2_widget: packageData._raw?.section_2_widget?.[0],
        contact: packageData.contact || {},
        faqs: packageData.faqs || [],
      },
    };

    return (
      <>
        <PageScript html={pageData.script} ownerKey={cleanSlug} />
        {resolveTemplate(pageData.page_template, pageData)}
      </>
    );
  } catch (error) {
    console.error('Error loading Umrah package:', error);
    notFound();
  }
}
