import { fetchPageData } from '@/utils/api';
import BlogTemplate from '@/templates/BlogTemplate';

export default async function BlogPage() {
  const pageData = await fetchPageData('blog');

  if (!pageData) {
    const defaultData = {
      template_name: 'blog',
      title: 'Blog',
      content: {
        posts: [],
      },
    };
    return <BlogTemplate data={defaultData} />;
  }

  return <BlogTemplate data={pageData} />;
}


