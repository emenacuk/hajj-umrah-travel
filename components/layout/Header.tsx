'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import '@/styles/components/_header.scss';

export default function Header() {

    const pathname = usePathname();
    const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [hijriData, setHijriData] = useState({ year: '', dayMonth: '' });
    const [hasInnerBanner, setHasInnerBanner] = useState(false);

    useEffect(() => {
        const checkBanner = () => {
            const banner = document.querySelector('.inner-banner');
            const exists = !!banner;
            setHasInnerBanner(exists);
        };

        // Initial checks
        checkBanner();
        // Check again after a short delay to account for React rendering
        const rafId = requestAnimationFrame(checkBanner);
        const timeoutId = setTimeout(checkBanner, 100);

        // Observer for any subsequent DOM changes
        const observer = new MutationObserver(() => {
            checkBanner();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        return () => {
            observer.disconnect();
            cancelAnimationFrame(rafId);
            clearTimeout(timeoutId);
        };
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

    const toggleSubmenu = (menu: string) => {
        setActiveSubmenu(activeSubmenu === menu ? null : menu);
    };

    const sidebarNav = [
        { name: 'Home', href: '/' },
        { name: 'Umrah Packages', href: '/umrah' },
        {
            name: 'Umrah By Cities',
            href: '#',
            submenu: [
                { name: 'Umrah 2025', href: '/umrah/2025' },
                { name: 'February Umrah', href: '/umrah/february' },
                { name: 'Ramadan Umrah', href: '/umrah/ramadan', active: true },
                { name: 'March Umrah', href: '/umrah/march' },
                { name: 'Easter Umrah', href: '/umrah/easter' },
                { name: 'April Umrah', href: '/umrah/april' },
                { name: 'London Umrah', href: '/umrah/london' },
                { name: 'Manchester Umrah', href: '/umrah/manchester' },
                { name: 'December Umrah', href: '/umrah/december' },
                { name: 'Birmingham Umrah', href: '/umrah/birmingham' },
            ]
        },
        {
            name: 'Umrah By Seasons',
            href: '#',
            submenu: [
                { name: 'Winter Umrah', href: '/umrah/winter' },
                { name: 'Summer Umrah', href: '/umrah/summer' },
            ]
        },
        {
            name: 'Hajj Packages',
            href: '/hajj',
            submenu: [
                { name: 'Hajj 2025', href: '/hajj/2025' },
                { name: 'Premium Hajj', href: '/hajj/premium' },
            ]
        },
        { name: 'Reviews', href: '/reviews' },
        { name: 'Contact Us', href: '/contact' },
        { name: 'Visa', href: '/visa' },
    ];

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
                            <span className={`logo-text`}>
                                <img src="/logo.png" alt="logo" />
                            </span>
                        </Link>
                    </div>

                    {/* Navigation Pills */}
                    <nav className="nav-pills">
                        <Link href="/best-umrah-packages-2025-2026" className={`nav-pill ${isActive('/umrah') ? 'active' : ''}`}>
                            Umrah
                        </Link>
                        <Link href="/hajj-package-2026" className={`nav-pill ${isActive('/hajj') ? 'active' : ''}`}>
                            Hajj Package
                        </Link>
                        <Link href="/customize-hajj-umrah" className={`nav-pill ${isActive('/customize') ? 'active' : ''}`}>
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
            <div className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`} onClick={() => { setIsSidebarOpen(false); setActiveSubmenu(null); }}></div>
            <div className={`sidebar-menu ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <div className="hijri-date">{hijriData.year} Hijri, <span>{hijriData.dayMonth}</span></div>
                    <div className="sidebar-controls">
                        <button className="close-btn" onClick={() => { setIsSidebarOpen(false); setActiveSubmenu(null); }}>
                            <img src="/crosswhite.svg" alt="closeicon" />
                        </button>
                        <span className="sidebar-logo">
                            <Link href="/">
                                <img src="/logo.png" alt="logo" />
                            </Link>
                        </span>
                    </div>
                </div>

                <div className="sidebar-content">
                    <ul className="sidebar-nav">
                        {sidebarNav.map((item, index) => (
                            <li key={index} className={item.submenu ? 'has-submenu' : ''}>
                                <div className="menu-item-wrapper">
                                    <Link
                                        href={item.href}
                                        className={activeSubmenu === item.name ? 'active' : ''}
                                        onClick={() => {
                                            setIsSidebarOpen(false);
                                            setActiveSubmenu(null);
                                        }}
                                    >
                                        {item.name}
                                    </Link>
                                    {item.submenu && (
                                        <span
                                            className={`arrow ${activeSubmenu === item.name ? 'open' : ''}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleSubmenu(item.name);
                                            }}
                                        >
                                            <img
                                                src={activeSubmenu === item.name ? '/yellowarrowsidebar.svg' : '/menudropdwonarrow.svg'}
                                                alt="menudropdwonarrow"
                                            />
                                        </span>
                                    )}
                                </div>
                                {item.submenu && activeSubmenu === item.name && (
                                    <ul className="submenu-list">
                                        {item.submenu.map((sub, subIndex) => (
                                            <li key={subIndex}>
                                                <Link
                                                    href={sub.href}
                                                    className={sub.active ? 'active' : ''}
                                                    onClick={() => setIsSidebarOpen(false)}
                                                >
                                                    {sub.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="sidebar-footer">
                    <div className='social-wrapper'>
                        <div className="social-icons">
                            <a href="#" className="social-icon youtube">
                                <img src="/youtube.svg" alt="" />
                            </a>
                            <a href="#" className="social-icon whatsapp">
                                <img src="/whatsapp.svg" alt="" />
                            </a>
                            <a href="#" className="social-icon facebook">
                                <img src="/fb.svg" alt="" />
                            </a>
                            <a href="#" className="social-icon instagram">
                                <img src="/insta.svg" alt="" />
                            </a>
                        </div>
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
                    <div className="sidebar-badges">
                        <div className='badge-item'>
                            <img src="/atol.svg" alt="ATOL" />
                        </div>
                        <div className='badge-item'>
                            <img src="/iata.svg" alt="IATA" />
                        </div>
                        <div className='badge-item'>
                            <img src="/khidmat.svg" alt="Ministry" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
