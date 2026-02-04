import { fetchPageData } from '@/utils/api';
import { resolveTemplate } from '@/utils/templateResolver';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function DynamicPage({ params }: PageProps) {
  const pageData = await fetchPageData(params.slug);

  if (!pageData) {
    notFound();
  }

  return resolveTemplate(pageData.template_name, pageData);
}


