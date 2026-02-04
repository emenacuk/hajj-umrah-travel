import { PageData, BlogPost } from '@/types';
import InnerBanner from '@/components/banners/InnerBanner';
import BlogCard from '@/components/cards/BlogCard';
import '@/styles/components/_blog.scss';

interface BlogTemplateProps {
  data: PageData;
}

export default function BlogTemplate({ data }: BlogTemplateProps) {
  const bannerData = data.content?.banner || {
    title: data.title || 'Blog',
    description: data.content?.description,
  };

  const posts = data.content?.posts || [];

  return (
    <>
      {bannerData && <InnerBanner data={bannerData} />}
      <section className="section">
        <div className="container">
          {posts.length > 0 ? (
            <div className="blog-grid">
              {posts.map((post: BlogPost) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p>No blog posts available.</p>
          )}
        </div>
      </section>
    </>
  );
}

