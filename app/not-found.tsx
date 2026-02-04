import Link from 'next/link';
import '@/styles/components/_special-pages.scss';

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="container">
        <div className="not-found-content">
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>The page you are looking for does not exist.</p>
          <Link href="/" className="btn btn--primary">
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}

