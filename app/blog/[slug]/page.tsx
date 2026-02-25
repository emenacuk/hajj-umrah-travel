import { fetchPageData, generatePageMetadata, getGeneralSettings } from '@/utils/api';
import BlogDetailTemplate from '@/templates/BlogDetailTemplate';
import PageScript from '@/components/common/PageScript';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const fullSlug = `blog/${params.slug}`;
    const [pageData, generalSettings] = await Promise.all([
      fetchPageData(fullSlug),
      getGeneralSettings()
    ]);
    return generatePageMetadata(pageData, generalSettings, fullSlug);
  } catch (error) {
    return { title: 'Blog Post' };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const pageData = await fetchPageData(`blog/${params.slug}`);

  if (!pageData) {
    notFound();
  }

  return (
    <>
      <PageScript html={pageData.script} ownerKey={params.slug} />
      <BlogDetailTemplate data={pageData} />
    </>
  );
}


