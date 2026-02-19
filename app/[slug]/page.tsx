import { fetchPageData } from '@/utils/api';
import { resolveTemplate } from '@/utils/templateResolver';
import { notFound } from 'next/navigation';
import { dynamicParams } from '@/data/static-routes';

export function generateStaticParams() {
  return dynamicParams.general;
}

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function DynamicPage({ params }: PageProps) {
  try {
    const pageData = await fetchPageData(params.slug);

    if (!pageData) {
      notFound();
    }

    const routeConfig = dynamicParams.general?.find(route => route.slug === params.slug);
    if (routeConfig?.template) {
      pageData.template_name = routeConfig.template;
    }

    return resolveTemplate(pageData.template_name, pageData);
  } catch (error) {
    console.error('Error loading page:', error);
    notFound();
  }
}


