'use client';

import { useState, useEffect } from 'react';
import { PageData, BlogPost } from '@/types';
import InnerBanner from '@/components/banners/InnerBanner';
import BlogCard from '@/components/cards/BlogCard';
import { CardSkeleton } from '@/components/common/Skeleton';
import { fetchMakkahBlogs, mapBlogData } from '@/utils/api';
import '@/styles/components/_blog.scss';

interface BlogTemplateProps {
  data: PageData;
}

export default function BlogTemplate({ data }: BlogTemplateProps) {
  const [featuredBlogs, setFeaturedBlogs] = useState<BlogPost[]>([]);
  const [latestBlogs, setLatestBlogs] = useState<BlogPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isMoreLoading, setIsMoreLoading] = useState(false);

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

  useEffect(() => {
    const loadInitialBlogs = async () => {
      setIsLoading(true);
      try {
        const res = await fetchMakkahBlogs(1);
        if (res && res.success) {
          setFeaturedBlogs((res.featured_blogs || []).map(mapBlogData));
          setLatestBlogs((res.latest_blogs || []).map(mapBlogData));
          setCurrentPage(res.pagination?.current_page || 1);
          setTotalPages(res.pagination?.total_pages || 1);
        }
      } catch (error) {
        console.error('Error loading initial blogs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialBlogs();
  }, []);

  const handleLoadMore = async () => {
    if (currentPage >= totalPages) return;

    setIsMoreLoading(true);
    try {
      const nextPage = currentPage + 1;
      const res = await fetchMakkahBlogs(nextPage);
      if (res && res.success) {
        const newBlogs = (res.latest_blogs || []).map(mapBlogData);
        setLatestBlogs((prev) => [...prev, ...newBlogs]);
        setCurrentPage(res.pagination?.current_page || nextPage);
      }
    } catch (error) {
      console.error('Error loading more blogs:', error);
    } finally {
      setIsMoreLoading(false);
    }
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
            {isLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <CardSkeleton key={`skeleton-featured-${index}`} />
              ))
            ) : featuredBlogs.length > 0 ? (
              featuredBlogs.map((post: BlogPost) => (
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

          <div className="blog-grid fresh-grid">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <CardSkeleton key={`skeleton-latest-${index}`} />
              ))
            ) : latestBlogs.length > 0 ? (
              latestBlogs.map((post: BlogPost) => (
                <BlogCard key={`fresh-${post.id}`} post={post} />
              ))
            ) : (
              <p className="no-blogs">No recent blog posts available.</p>
            )}

            {isMoreLoading && Array.from({ length: 3 }).map((_, index) => (
              <CardSkeleton key={`skeleton-more-${index}`} />
            ))}
          </div>

          {!isLoading && currentPage < totalPages && (
            <div className="load-more-container">
              <button
                className="btn-load-more"
                onClick={handleLoadMore}
                disabled={isMoreLoading}
              >
                {isMoreLoading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

