'use client';
import Link from 'next/link';
import '@/styles/components/_special-pages.scss';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import BookingModal from '@/components/common/BookingModal';

export default function NotFound() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="not-found-page">
      <div className="image-wrapper">
        <div className="container">
          <div className='side-lanterns'>
            <div className='lantern-left'></div>
            <div className='lantern-right'></div>
          </div>
          <div className="not-found-content">
            <div className="error-top-messages">
              <div className="error-left">
                <p>Error: Could not find your Query</p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="modal-trigger-btn"
                >
                  Send Us Your Query
                </button> & we will get back to you
              </div>
              <div className="error-right">
                <p>Error: 404 page not found</p>
                <span>The page you have requested could not found</span>
              </div>
            </div>

            <h1 className="not-found-title">
              <span>O</span>
              <span>O</span>
              <span className="char-p">P</span>
              <span>S</span>
              <span>!</span>
            </h1>

            <p className="something-wrong-text">Something Went Wrong</p>
            <div className="not-found-buttons">
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

