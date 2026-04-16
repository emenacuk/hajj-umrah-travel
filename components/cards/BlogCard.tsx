import Link from 'next/link';
import { BlogPost } from '@/types';
import { getImageUrl } from '@/utils/api';
import '@/styles/components/_blog.scss';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <div className="blog-card">      
        <div className="blog-image-wrapper">
          <img src={getImageUrl(post.image)} alt={post.title} />
        </div>        
        <div className="blog-content">       
          <span className="blog-title">{post.title}</span>
          <div className="blog-meta">
            <span className="author">{post.author || 'Admin'}</span>
            {/* <div className="date-wrapper">
              <img src="/blogtime.svg" alt="clock" className="meta-icon" />
              <span className="date">{post.date}</span>
            </div> */}
          </div>
        </div>
      </div>
    </Link>
  );
}

