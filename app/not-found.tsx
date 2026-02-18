'use client';
import Link from 'next/link';
import '@/styles/components/_thank-you.scss';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import BookingModal from '@/components/common/BookingModal';

export default function NotFound() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="thank-you-page">
      <div className="image-wrapper">
        <div className="container">
          <div className="thank-you-content">
            <div className="thank-top-messages">
              <div className="error-messages">
                <div className="error-left">
                  <p>
                    Error: Could not find your Query <br />
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="modal-trigger-btn"
                    >
                      Send Us Your Query
                    </button> & we will get back to you
                  </p>
                </div>
                <div className="error-right">
                  <p>Error: 404 page not found <br />
                  The page you have requested could not found
                  </p>
                </div>
              </div>
            </div>
            <h1 className="thank-you-title error-title" data-text="OOPS !">              
               OOPS !
            </h1>
            <div className="thank-you-buttons">
              <button onClick={() => router.back()} className="btn btn-previous">
                Previous Page
                <img src="/arrow.svg" alt="" className="arrow" />
              </button>
              <Link href="/" className="btn btn-home">
                Go To Home Page
                <img src="/arrow.svg" alt="" className="arrow" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        packageTitle="404 Page Query"
        pageURL={typeof window !== 'undefined' ? window.location.href : ''}
      />
    </div>
  );
}

