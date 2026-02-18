'use client';
import Link from 'next/link';
import '@/styles/components/_thank-you.scss';

export default function ThankYou() {

  return (
    <div className="thank-you-page">
      <div className="image-wrapper">
        <div className="container">
          <div className="thank-you-content">
            <div className="thank-top-messages">
              <div className="thank-top">
                <p>We have Received your enquiry</p>
                <p>one of our agent will get back to you with in <span>24 hours</span></p>
              </div>
            </div>

            <h1 className="thank-you-title" data-text="THANK YOU!">              
                THANK <br />YOU!
            </h1>
            <div className="thank-you-buttons">
              <Link href="/" className="btn btn-home">
                Go To Home Page
                <img src="/arrow.svg" alt="" className="arrow" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

