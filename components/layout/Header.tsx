'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import '@/styles/components/_header.scss';

export default function Header() {

    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [hijriData, setHijriData] = useState({ year: '', dayMonth: '' });
    const [hasInnerBanner, setHasInnerBanner] = useState(false);

    useEffect(() => {
        const checkBanner = () => {
            const banner = document.querySelector('.inner-banner');
            setHasInnerBanner(!!banner);
        };
        const timer = setTimeout(checkBanner, 100);
        return () => clearTimeout(timer);
    }, [pathname]);

    useEffect(() => {
        const today = new Date();
        const dateStr = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;

        const islamicDateApi = `https://api.aladhan.com/v1/gToH/${dateStr}`;
        fetch(islamicDateApi)
            .then(response => response.json())
            .then(res => {
                if (res.data && res.data.hijri) {
                    const hijri = res.data.hijri;
                    setHijriData({
                        year: hijri.year,
                        dayMonth: `${hijri.day} ${hijri.month.en}`
                    });
                }
            })
            .catch(err => console.error("Error fetching Islamic date:", err));
    }, []);

    const isActive = (path: string) => pathname === path;

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <>
            <header className={`site-header ${hasInnerBanner ? 'white' : ''}`}>
                <div className="container header-container">
                    {/* Logo Section */}
                    <div className="logo-section">
                        <div className="hamburger-menu" onClick={toggleSidebar}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <Link href="/" className="logo-link">
                            <span className={`logo-text`}>Logo Here</span>
                        </Link>
                    </div>

                    {/* Navigation Pills */}
                    <nav className="nav-pills">
                        <Link href="/umrah" className={`nav-pill ${isActive('/umrah') ? 'active' : ''}`}>
                            Umrah
                        </Link>
                        <Link href="/hajj" className={`nav-pill ${isActive('/hajj') ? 'active' : ''}`}>
                            Hajj Package
                        </Link>
                        <Link href="/customize" className={`nav-pill ${isActive('/customize') ? 'active' : ''}`}>
                            Customize Package
                        </Link>
                    </nav>

                    {/* Contact Pills */}
                    <div className="contact-pills">
                        <a href="tel:02081457860" className={`contact-pill outline`}>
                            0208 - 145 - 7860
                            <span className="icon-whatsapp">
                                <img src="/whatsappicon.png" alt="whatsappicon" />
                            </span>
                        </a>
                        <a href="tel:02081457860" className={`contact-pill outline`}>
                            0208 - 145 - 7860
                            <span className="icon-headset">
                                <img src="/callicon.png" alt="callicon" />
                            </span>
                        </a>
                    </div>
                </div>
            </header>

            {/* Sidebar Menu */}
            <div className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`} onClick={toggleSidebar}></div>
            <div className={`sidebar-menu ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <div className="hijri-date">{hijriData.year} Hijri, <span>{hijriData.dayMonth}</span></div>
                    <div className="sidebar-controls">
                        <button className="close-btn" onClick={toggleSidebar}>×</button>
                        <span className="sidebar-logo">Logo Here</span>
                    </div>
                </div>

                <div className="sidebar-content">
                    <ul className="sidebar-nav">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/umrah">Umrah Packages</Link></li>
                        <li className="has-submenu">
                            <Link href="#">Umrah By Cities</Link>
                            <span className="arrow">›</span>
                        </li>
                        <li className="has-submenu">
                            <Link href="#">Umrah By Seasons</Link>
                            <span className="arrow">›</span>
                        </li>
                        <li className="has-submenu">
                            <Link href="/hajj">Hajj Packages</Link>
                            <span className="arrow">›</span>
                        </li>
                        <li><Link href="/reviews">Reviews</Link></li>
                        <li><Link href="/contact">Contact Us</Link></li>
                        <li><Link href="/visa">Visa</Link></li>
                    </ul>
                </div>

                <div className="sidebar-footer">
                    <div className="social-icons">
                        <a href="#" className="social-icon youtube">▶</a>
                        <a href="#" className="social-icon whatsapp">WA</a>
                        <a href="#" className="social-icon facebook">f</a>
                        <a href="#" className="social-icon instagram">O</a>
                    </div>

                    <div className="sidebar-contacts">
                        <a href="tel:02081457860" className="contact-pill outline mb-sm">
                            0208 - 145 - 7860
                            <span className="icon-headset"></span>
                        </a>
                        <a href="tel:02081457860" className="contact-pill outline">
                            0208 - 145 - 7860
                            <span className="icon-whatsapp"></span>
                        </a>
                    </div>

                    <div className="sidebar-badges">
                        <img src="/protected-icon.png" alt="ATOL" />
                        <img src="/iata-logo.png" alt="IATA" />
                        <img src="/hajj-ministry.png" alt="Ministry" />
                    </div>
                </div>
            </div>
        </>
    );
}
