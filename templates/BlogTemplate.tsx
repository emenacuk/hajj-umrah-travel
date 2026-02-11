'use client';

import { useState } from 'react';
import { PageData, BlogPost } from '@/types';
import InnerBanner from '@/components/banners/InnerBanner';
import BlogCard from '@/components/cards/BlogCard';
import '@/styles/components/_blog.scss';

interface BlogTemplateProps {
  data: PageData;
}

export default function BlogTemplate({ data }: BlogTemplateProps) {
  const [visiblePosts, setVisiblePosts] = useState(12);
  const [isLoading, setIsLoading] = useState(false);

  const bannerData = data.content?.banner || {
    title: data.title || 'Blog',
    description: data.content?.description,
  };

  const posts = data.content?.posts || [];

  const handleLoadMore = () => {
    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setVisiblePosts((prev) => prev + 12);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <>
      {/* <section className="blog-hero">
        <div className="banner-background">
          <img src="/innerbg.jpg" alt="Blog Banner" />
          <div className="overlay"></div>
        </div>
        <div className="container">
          <div className='sectionheadings sectionheadings--center'>
            <div className='sectionheadingstext'>
              <h1 className="section-title">Stories, Tips, & Guidance For Your Pilgrimage</h1>
              <p className="section-subtitle">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {bannerData && <InnerBanner data={bannerData} form={false} />}

      {/* Trending Insights */}
      {posts.length > 0 && (
        <section className="section trending-section">
          <div className="container">
            <div className='sectionheadings sectionheadings--center'>
              <div className='sectionheadingstext'>
                <h2 className="section-title">Trending Insights</h2>
                <div className="ornament ornament-bottom">
                  <img src="/styleup.svg" alt="Decoration" />
                </div>
                <p className="section-subtitle">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip
                </p>
              </div>
            </div>

            <div className="blog-grid trending-grid">
              {posts.slice(0, 3).map((post: BlogPost) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Fresh From Our Blog */}
      <section className="section fresh-blog-section">
        <div className="container">
          <div className='sectionheadings sectionheadings--center'>
            <div className='sectionheadingstext'>
              <h2 className="section-title">Fresh From Our Blog</h2>
              <div className="ornament ornament-bottom">
                <img src="/styleup.svg" alt="Decoration" />
              </div>
              <p className="section-subtitle">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip
              </p>
            </div>
          </div>

          <div className="blog-grid fresh-grid">
            {posts.slice(0, visiblePosts).map((post: BlogPost) => (
              <BlogCard key={`fresh-${post.id}`} post={post} />
            ))}

            {isLoading && Array.from({ length: 3 }).map((_, index) => (
              <div key={`skeleton-${index}`} className="skeleton-card">
                <div className="skeleton-image"></div>
                <div className="skeleton-content">
                  <div className="skeleton-title"></div>
                  <div className="skeleton-meta"></div>
                </div>
              </div>
            ))}

            {!isLoading && posts.length === 0 && (
              <p>No blog posts available.</p>
            )}
          </div>

          {visiblePosts < posts.length && (
            <div className="load-more-container">
              <button
                className="btn-load-more"
                onClick={handleLoadMore}
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

