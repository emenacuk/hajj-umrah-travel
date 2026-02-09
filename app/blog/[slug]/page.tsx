import { fetchPageData } from '@/utils/api';
import StaticWithBannerTemplate from '@/templates/StaticWithBannerTemplate';
import { notFound } from 'next/navigation';
import { dynamicParams } from '@/data/static-routes';

export function generateStaticParams() {
  return dynamicParams.blog;
}

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const pageData = await fetchPageData(`blog/${params.slug}`);

  if (!pageData) {
    notFound();
  }

  return <StaticWithBannerTemplate data={pageData} />;
}


