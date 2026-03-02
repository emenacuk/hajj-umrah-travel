import { PageData } from '@/types';
import InnerBanner from '@/components/banners/InnerBanner';
import BlogCard from '@/components/cards/BlogCard';
import { fetchMakkahBlogs, mapBlogData } from '@/utils/api';
import '@/styles/components/_blog.scss';
import BlogListing from '@/components/blog/BlogListing';

interface BlogTemplateProps {
  data: PageData;
}

export default async function BlogTemplate({ data }: BlogTemplateProps) {
  let initialLatestBlogs = [];
  let initialFeaturedBlogs = [];
  let initialCurrentPage = 1;
  let initialTotalPages = 1;

  try {
    const res = await fetchMakkahBlogs(1);
    if (res && res.success) {
      initialFeaturedBlogs = (res.featured_blogs || []).map(mapBlogData);
      initialLatestBlogs = (res.latest_blogs || []).map(mapBlogData);
      initialCurrentPage = res.pagination?.current_page || 1;
      initialTotalPages = res.pagination?.total_pages || 1;
    }
  } catch (error) {
    console.error('Error loading initial blogs on server:', error);
  }

  const bannerData = data.content?.banner || {
    title: data.title || 'Blog',
    description: data.content?.description,
  };

  const section1 = data.content?.section_1_widget?.[0] || {
    heading: 'Trending Insights',
    description: 'Discover the latest tips and stories for your pilgrimage.'
  };

  const section2 = data.content?.section_2_widget?.[0] || {
    heading: 'Fresh From Our Blog',
    description: 'Keep up to date with our newest guides and insights.'
  };

  return (
    <>
      {bannerData && <InnerBanner data={bannerData} form={false} />}

      {/* Trending Insights */}
      <section className="section trending-section">
        <div className="container">
          <div className='sectionheadings sectionheadings--center'>
            <div className='sectionheadingstext'>
              <h2 className="section-title" dangerouslySetInnerHTML={{ __html: section1.heading }}></h2>
              {section1.description && (
                <p className="section-subtitle" dangerouslySetInnerHTML={{ __html: section1.description }}></p>
              )}
            </div>
          </div>

          <div className="blog-grid trending-grid">
            {initialFeaturedBlogs.length > 0 ? (
              initialFeaturedBlogs.map((post: any) => (
                <BlogCard key={`featured-${post.id}`} post={post} />
              ))
            ) : (
              <p className="no-blogs">No featured blogs available at the moment.</p>
            )}
          </div>
        </div>
      </section>

      {/* Fresh From Our Blog */}
      <section className="section fresh-blog-section">
        <div className="container">
          <div className='sectionheadings sectionheadings--center'>
            <div className='sectionheadingstext'>
              <h2 className="section-title" dangerouslySetInnerHTML={{ __html: section2.heading }}></h2>
              {section2.description && (
                <p className="section-subtitle" dangerouslySetInnerHTML={{ __html: section2.description }}></p>
              )}
            </div>
          </div>

          <BlogListing
            initialLatestBlogs={initialLatestBlogs}
            initialFeaturedBlogs={initialFeaturedBlogs}
            initialCurrentPage={initialCurrentPage}
            initialTotalPages={initialTotalPages}
          />
        </div>
      </section>
    </>
  );
}

