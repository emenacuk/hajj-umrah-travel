import { getBlogDetail, generatePageMetadata, getGeneralSettings } from '@/utils/api';
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
    const [pageData, generalSettings] = await Promise.all([
      getBlogDetail(params.slug),
      getGeneralSettings()
    ]);
    if (!pageData) return { title: 'Blog Post' };
    return generatePageMetadata(pageData, generalSettings, `blog/${params.slug}`);
  } catch (error) {
    return { title: 'Blog Post' };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const pageData = await getBlogDetail(params.slug);

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


