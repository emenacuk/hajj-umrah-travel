import Link from 'next/link';
import '@/styles/components/_special-pages.scss';

export default function SuccessPage() {
  return (
    <div className="success-page">
      <div className="container">
        <div className="success-content">
          <div className="success-icon">✓</div>
          <h1>Thank You!</h1>
          <h2>Your inquiry has been submitted successfully</h2>
          <p>We will get back to you as soon as possible.</p>
          <div className="success-actions">
            <Link href="/" className="btn btn--primary">
              Return to Home
            </Link>
            <Link href="/contact" className="btn btn--outline">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

