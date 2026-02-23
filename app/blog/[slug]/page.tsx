import { fetchPageData } from '@/utils/api';
import BlogDetailTemplate from '@/templates/BlogDetailTemplate';
import { notFound } from 'next/navigation';
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

  return <BlogDetailTemplate data={pageData} />;
}


