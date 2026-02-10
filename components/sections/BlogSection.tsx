'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Link from 'next/link';
import { BlogPost } from '@/types';
import BlogCard from '@/components/cards/BlogCard';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface BlogSectionProps {
    posts: BlogPost[];
}

export default function BlogSection({ posts }: BlogSectionProps) {
    // Assuming the first post is the featured one for the top section layout
    const featuredPost = posts[0];
    const sliderPosts = posts.slice(1);

    return (
        <section className="section blog-section">
            <div className="container">
                <div className="featured-blog-wrapper">
                    <div className="featured-content">
                        <h2 className="section-title">Hajj & Umrah Updates</h2>
                        <p className="section-subtitle">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        </p>
                        <div className="featured-footer">
                            <Link href="/blogs" className="btn btn--primary">
                                View All Updates
                            </Link>
                            <span className="featured-date">December 16, 2025</span>
                        </div>
                    </div>
                    <div className="featured-image-wrapper">
                        <img src="/blogimage.png" alt="Featured Update" />
                    </div>
                </div>

                {/* Blog Slider */}
                <div className="blog-slider-wrapper">
                    <Swiper
                        modules={[Navigation, Pagination]}
                        slidesPerView={1}
                        pagination={{
                            el: '.blog-pagination-custom',
                            clickable: true
                        }}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        className="blog-swiper"
                    >
                        {posts.map((post) => (
                            <SwiperSlide key={post.id}>
                                <BlogCard post={post} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="swiper-pagination-custom blog-pagination-custom"></div>
                </div>
            </div>
        </section>
    );
}
