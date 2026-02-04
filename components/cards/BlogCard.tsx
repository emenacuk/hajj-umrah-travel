import Link from 'next/link';
import { BlogPost } from '@/types';
import '@/styles/components/_blog.scss';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="blog-card">
      <div className="blog-image-wrapper">
        <img src={post.image} alt={post.title} />
      </div>
      <div className="blog-content">
        <h3>{post.title}</h3>
        <p className="blog-excerpt">{post.excerpt}</p>
        <div className="blog-meta">
          {post.date && <span>{new Date(post.date).toLocaleDateString()}</span>}
          {post.author && <span>{post.author}</span>}
        </div>
      </div>
    </Link>
  );
}

