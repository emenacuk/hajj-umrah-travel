'use client';

import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className='footerin'>
                <div className='footercontentarea'>               
                    <div className="container">
                        <div className='footeraftercontainer'>
                        <div className="footer-brand">
                                <Link href="/" className="footer-logo">Logo Here</Link>
                        </div>
                        <div className="footer-main-content">
                            <div className="footer-nav-primary">
                                <Link href="/umrah-packages">Umrah Packages</Link>
                                <Link href="/hajj-packages">Hajj Packages</Link>
                                <Link href="/customize">Customize Your Packages</Link>
                                <Link href="/visa">Visas</Link>
                                <Link href="/contact">Send Us Enquiry</Link>
                            </div>

                            <div className="footer-social">
                                <a href="#" className="social-icon youtube">
                                    <img src="/youtube.svg" alt="YouTube" />
                                </a>
                                <a href="#" className="social-icon whatsapp">
                                    <img src="/whatsapp.svg" alt="WhatsApp" />
                                </a>
                                <a href="#" className="social-icon facebook">
                                    <img src="/fb.svg" alt="Facebook" />
                                </a>
                                <a href="#" className="social-icon instagram">
                                    <img src="/insta.svg" alt="Instagram" />
                                </a>
                            </div>
                        </div>
                        <div className="footer-divider"></div>
                        <div className="footer-nav-secondary">
                            <div className="secondary-links">
                                <Link href="/">Home</Link>
                                <Link href="/about">About Us</Link>
                                <Link href="/contact">Contact Us</Link>
                                <Link href="/reviews">Reviews</Link>
                                <Link href="/privacy-policy">Privacy Policy</Link>
                                <Link href="/terms">Terms & Conditions</Link>
                                <Link href="/cookies">Cookies Policy</Link>
                                <Link href="/blogs">Blogs</Link>
                            </div>
                        </div>
                        
                        <div className="footer-payment-methods">
                            <img src="/dis.svg" alt="Discover" className="payment-icon" />
                            <img src="/msc.svg" alt="Mastercard" className="payment-icon" />
                            <img src="/vis.svg" alt="Visa" className="payment-icon" />
                            <img src="/ame.svg" alt="Amex" className="payment-icon" />
                        </div>
                        </div>

                        
                    </div>
                 </div>
                <div className='container'>
                    <div className="footer-bottom">
                        <div className="copyright-area">
                            <p className="copyright-text">All rights reserved Flight Booking @ 2010 - 2025</p>
                            <div className="legal-disclaimer">
                                <p>This website is operated by Travixum Ltd. (Company Number 11559073 and ATOL 12192) T/A registered In England and Wales. Many of the flights and flight-inclusive Umrah Packages on this website are financially protected by the ATOL scheme. But ATOL protection does not apply to all Umrah packages listed on this website. Please ask us to confirm what protection may apply to your booking. If you do receive an ATOL Certificate then the booking will not be ATOL protected. If you do receive an ATOL Certificate but all the parts of your Umrah package are not listed on it, those parts will not be ATOL protected. If you have booked a flight only where the ticket is not issued immediately, your flight will be protected under our ATOL. Please see our booking conditions for information, or for more information about financial protection and the ATOL Certificate go to <a href="https://www.atol.org/about-atol/atol-certificates/">https://www.atol.org/about-atol/atol-certificates/</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
