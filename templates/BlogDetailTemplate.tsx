import { PageData, BlogPost } from '@/types';
import BlogBanner from '@/components/banners/BlogBanner';
import BlogCard from '@/components/cards/BlogCard';
import '@/styles/components/_blog-detail.scss';

interface BlogDetailTemplateProps {
  data: PageData;
}

export default function BlogDetailTemplate({ data }: BlogDetailTemplateProps) {
  const bannerData = data.content?.banner || {
    title: data.title || '',
    description: '',
  };

  const title = data.title || '';
  const bannerDescription = data?.banner_description || '';

  const postContent = data.content?.body || '';
  const latestPosts = data.content?.latestPosts || [];

  return (
    <>
      {bannerData && <BlogBanner data={bannerData} form={false} />}

      <section className="section blog-detail-section">
        <div className="container">
          <div className="blog-detail-grid">
            {/* Main Content Column */}
            <div className="blog-content-column">
              {postContent ? (
                <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: postContent }} />
              ) : (
                <p>Content not found.</p>
              )}
            </div>

            {/* Sidebar Column */}
            <div className="blog-sidebar-column">
              {latestPosts.length > 0 && (
                <div className="sidebar-widget latest-posts-widget">
                  <h3 className="widget-title">Latest Posts</h3>
                  <div className="sidebar-posts-list">
                    {latestPosts.map((post: BlogPost) => (
                      <BlogCard key={post.id} post={post} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
