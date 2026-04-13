import { fetchPageData } from '@/utils/api';
import BlogTemplate from '@/templates/BlogTemplate';
import PageScript from '@/components/common/PageScript';

export default async function BlogPage() {
  const pageData = await fetchPageData('blog');

  if (!pageData) {
    const defaultData = {
      page_template: 'blog',
      title: 'Blog',
      content: {
        posts: [],
      },
    };
    return <BlogTemplate data={defaultData} />;
  }

  return (
    <>
      <PageScript html={pageData.script} ownerKey="blog" />
      <BlogTemplate data={pageData} />
    </>
  );
}


