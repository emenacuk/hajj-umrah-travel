import { fetchPageData, generatePageMetadata, getGeneralSettings } from '@/utils/api';
import { resolveTemplate } from '@/utils/templateResolver';
import PageScript from '@/components/common/PageScript';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const revalidate = 3600; // Revalidate every hour

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const [pageData, generalSettings] = await Promise.all([
      fetchPageData(params.slug),
      getGeneralSettings()
    ]);
    return generatePageMetadata(pageData, generalSettings, params.slug);
  } catch (error) {
    return { title: 'Hajj & Umrah Packages' };
  }
}

export default async function DynamicPage({ params }: PageProps) {
  try {
    const pageData = await fetchPageData(params.slug);

    if (!pageData) {
      notFound();
    }

    return (
      <>
        <PageScript html={pageData.script} ownerKey={params.slug} />
        {resolveTemplate(pageData.page_template, pageData)}
      </>
    );
  } catch (error) {
    console.error('Error loading page:', error);
    notFound();
  }
}


