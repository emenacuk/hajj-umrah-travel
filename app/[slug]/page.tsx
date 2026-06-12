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
  const cleanSlug = params.slug.replace(/\.html$/i, '');
  try {
    const [pageData, generalSettings] = await Promise.all([
      fetchPageData(cleanSlug),
      getGeneralSettings()
    ]);
    return generatePageMetadata(pageData, generalSettings, cleanSlug);
  } catch (error) {
    return { title: 'Hajj & Umrah Packages' };
  }
}

export default async function DynamicPage({ params }: PageProps) {
  const cleanSlug = params.slug.replace(/\.html$/i, '');
  try {
    const pageData = await fetchPageData(cleanSlug);

    if (!pageData) {
      notFound();
    }

    return (
      <>
        <PageScript html={pageData.script} ownerKey={cleanSlug} />
        {resolveTemplate(pageData.page_template, pageData)}
      </>
    );
  } catch (error) {
    console.error('Error loading page:', error);
    notFound();
  }
}


