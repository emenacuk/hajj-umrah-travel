'use client';

import React, { useState } from 'react';
import { BlogPost } from '@/types';
import BlogCard from '@/components/cards/BlogCard';
import { CardSkeleton } from '@/components/common/Skeleton';
import { fetchMakkahBlogs, mapBlogData } from '@/utils/api';

interface BlogListingProps {
    initialLatestBlogs: BlogPost[];
    initialFeaturedBlogs: BlogPost[];
    initialCurrentPage: number;
    initialTotalPages: number;
}

export default function BlogListing({
    initialLatestBlogs,
    initialFeaturedBlogs,
    initialCurrentPage,
    initialTotalPages
}: BlogListingProps) {
    const [latestBlogs, setLatestBlogs] = useState<BlogPost[]>(initialLatestBlogs);
    const [currentPage, setCurrentPage] = useState(initialCurrentPage);
    const [isMoreLoading, setIsMoreLoading] = useState(false);

    const handleLoadMore = async () => {
        if (currentPage >= initialTotalPages) return;

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
            <div className="blog-grid fresh-grid">
                {latestBlogs.length > 0 ? (
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

            {currentPage < initialTotalPages && (
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
        </>
    );
}
