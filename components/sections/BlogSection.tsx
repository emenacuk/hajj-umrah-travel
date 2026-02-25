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
    title: string;
    description: string;
    image?: string;
    blogs: BlogPost[];
    button_link: string;
    button_text: string;
}

export default function BlogSection({ title, description, image, blogs, button_link, button_text }: BlogSectionProps) {
    // Assuming the first post is the featured one for the top section layout
    const safeBlos = blogs || [];
    if (safeBlos.length === 0) return null;
    const featuredPost = safeBlos[0];
    const sliderPosts = safeBlos.slice(1);
    // Section image takes priority; fall back to the first blog's image, then static placeholder
    const featuredImage = image;

    return (
        <section className="section blog-section">
            <div className="container">
                <div className="featured-blog-wrapper">
                    <div className="featured-content">
                        <h2 className="section-title">{title}</h2>
                        <p className="section-subtitle">
                            {description}
                        </p>
                        <div className="featured-footer">
                            <Link href={button_link} className="btn btn--primary">
                                {button_text}
                            </Link>
                            <span className="featured-date">{featuredPost?.date || ''}</span>
                        </div>
                    </div>
                    <div className="featured-image-wrapper">
                        <img src={featuredImage} alt={featuredPost?.title || 'Featured Update'} />
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
                        {safeBlos.map((post) => (
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
