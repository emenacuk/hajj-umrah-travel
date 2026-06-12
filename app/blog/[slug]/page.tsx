import { getBlogDetail, generatePageMetadata, getGeneralSettings } from '@/utils/api';
import BlogDetailTemplate from '@/templates/BlogDetailTemplate';
import PageScript from '@/components/common/PageScript';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const cleanSlug = params.slug.replace(/\.html$/i, '');
  try {
    const [pageData, generalSettings] = await Promise.all([
      getBlogDetail(cleanSlug),
      getGeneralSettings()
    ]);
    if (!pageData) return { title: 'Blog Post' };
    return generatePageMetadata(pageData, generalSettings, `blog/${cleanSlug}`);
  } catch (error) {
    return { title: 'Blog Post' };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const cleanSlug = params.slug.replace(/\.html$/i, '');
  const pageData = await getBlogDetail(cleanSlug);

  if (!pageData) {
    notFound();
  }

  return (
    <>
      <PageScript html={pageData.script} ownerKey={cleanSlug} />
      <BlogDetailTemplate data={pageData} />
    </>
  );
}


