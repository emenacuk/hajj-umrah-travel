'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import '@/styles/components/_header.scss';
import { getGeneralSettings, GeneralSettings, getImageUrl, NavigationBarItem, SettingsContents } from '@/utils/api';

interface NavItem {
    name: string;
    href: string;
    submenu?: { name: string; href: string; active?: boolean }[];
}

export default function Header() {

    const pathname = usePathname();
    const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [hijriData, setHijriData] = useState({ year: '', dayMonth: '' });
    const [hasInnerBanner, setHasInnerBanner] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [settings, setSettings] = useState<GeneralSettings | null>(null);

    useEffect(() => {
        const loadSettings = async () => {
            const data = await getGeneralSettings();
            if (data) {
                setSettings(data);
            }
        };
        loadSettings();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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

    const resolveVariable = (text: string | undefined): string => {
        if (!text || !settings) return text || '';
        let resolved = text;
        settings.global_variables.forEach(variable => {
            if (variable.is_active) {
                // Use a global regex to replace all occurrences if it's a code
                const escapedCode = variable.code.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                resolved = resolved.replace(new RegExp(escapedCode, 'g'), variable.code_value);
            }
        });
        return resolved;
    };

    const buildNavTree = (items: NavigationBarItem[]): NavItem[] => {
        if (!items) return [];
        const rootItems = items.filter(item => item.parent_id === "0" || !item.parent_id || item.parent_id === "");
        // Sort root items by sort_order
        rootItems.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));

        return rootItems.map(root => {
            const children = items.filter(item => item.parent_id === root.id.toString());
            // Sort children by sort_order
            children.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));

            const formatHref = (url: string) => {
                if (!url) return '#';
                if (url.startsWith('http')) return url;
                if (url === 'home.html' || url === 'index.html') return '/';
                const formatted = url;
                return formatted.startsWith('/') ? formatted : `/${formatted}`;
            };

            const item: NavItem = {
                name: root.title ? root.title.replace(/&amp;/g, '&') : '',
                href: formatHref(root.page_url),
            };

            if (children.length > 0) {
                item.submenu = children.map(child => ({
                    name: child.title ? child.title.replace(/&amp;/g, '&') : '',
                    href: formatHref(child.page_url)
                }));
            }

            return item;
        });
    };

    // Robust setting lookup
    const logoSetting = settings?.settings?.find(s =>
        (s.ref_name && s.ref_name.toLowerCase().includes("logo")) ||
        s.id === 3 || String(s.id) === "3"
    );
    const contents = logoSetting?.contents as SettingsContents | undefined;
    const mainLogo = contents?.main_logo
        ? getImageUrl(contents.main_logo)
        : "/logo.png";

    const darkLogo = contents?.dark_logo
        ? getImageUrl(contents.dark_logo)
        : mainLogo;
    const displayLogo = isSticky ? mainLogo : (hasInnerBanner ? darkLogo : mainLogo);

    const contactSetting = settings?.settings?.find(s =>
        (s.ref_name && s.ref_name.toLowerCase().includes("phone")) ||
        s.id === 6 || String(s.id) === "6"
    );

    // Resolve variable and provide specific fallback if resolution fails or setting is missing
    const contactContents = contactSetting?.contents as SettingsContents | undefined;
    const rawPhone = contactContents?.header_phone || "";
    const headerPhone = resolveVariable(rawPhone);
    const rawWhatsApp = contactContents?.header_whatsApp || "";
    const resolvedWhatsApp = resolveVariable(rawWhatsApp);
    const headerWhatsApp = resolvedWhatsApp ? (resolvedWhatsApp.includes('wa.me/')
        ? resolvedWhatsApp.split('wa.me/').pop() || resolvedWhatsApp
        : resolvedWhatsApp) : "";

    const sidebarNav: NavItem[] = settings ? buildNavTree(settings.navigation_bar) : [];

    const socialIcons = settings?.footer_setting.social_media_icons;

    const getSocialLink = (platform: string) => {
        if (!socialIcons) return "#";
        const keys = Object.keys(socialIcons);
        const index = keys.find(key =>
            key.startsWith('social_media_icons_input_') &&
            socialIcons[key]?.toLowerCase() === platform.toLowerCase()
        )?.split('_').pop();
        return index ? (socialIcons[`social_media_icons_link_input_${index}`] as string) || "#" : "#";
    };

    return (
        <>
            <header className={`site-header ${hasInnerBanner ? 'white' : ''} ${isSticky ? 'sticky' : ''}`}>
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
                                <img src={displayLogo} alt="logo" />
                            </span>
                        </Link>
                    </div>

                    {/* Navigation Pills */}
                    <nav className="nav-pills">
                        {sidebarNav.slice(0, 3).map((item, idx) => (
                            <Link
                                key={idx}
                                href={item.href}
                                className={`nav-pill ${isActive(item.href) ? 'active' : ''}`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Contact Pills */}
                    <div className="contact-pills">
                        {headerWhatsApp && (
                            <a href={`https://wa.me/${headerWhatsApp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="contact-pill outline">
                                {headerWhatsApp.startsWith('+') ? headerWhatsApp : `+${headerWhatsApp}`}
                                <span className="icon-whatsapp">
                                    <img src="/whatsappicon.png" alt="whatsapp" />
                                </span>
                            </a>
                        )}
                        {headerPhone && (
                            <a href={`tel:${headerPhone.replace(/\s+/g, '')}`} className="contact-pill outline">
                                {headerPhone}
                                <span className="icon-headset">
                                    <img src="/callicon.png" alt="call" />
                                </span>
                            </a>
                        )}
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
                                <img src={mainLogo} alt="logo" />
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
                            <a href={getSocialLink('facebook')} className="social-icon facebook" target="_blank" rel="noopener noreferrer">
                                <img src="/fb.svg" alt="facebook" />
                            </a>
                            <a href={getSocialLink('Instagram')} className="social-icon instagram" target="_blank" rel="noopener noreferrer">
                                <img src="/insta.svg" alt="instagram" />
                            </a>
                            <a href={getSocialLink('whatsapp')} className="social-icon whatsapp" target="_blank" rel="noopener noreferrer">
                                <img src="/whatsapp.svg" alt="whatsapp" />
                            </a>
                            <a href={getSocialLink('youtube')} className="social-icon youtube" target="_blank" rel="noopener noreferrer">
                                <img src="/youtube.svg" alt="youtube" />
                            </a>
                        </div>
                        <div className="contact-pills">
                            {headerWhatsApp && (
                                <a href={`https://wa.me/${headerWhatsApp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="contact-pill outline">
                                    {headerWhatsApp.startsWith('+') ? headerWhatsApp : `+${headerWhatsApp}`}
                                    <span className="icon-whatsapp">
                                        <img src="/whatsappicon.png" alt="whatsapp" />
                                    </span>
                                </a>
                            )}
                            {headerPhone && (
                                <a href={`tel:${headerPhone.replace(/\s+/g, '')}`} className="contact-pill outline">
                                    {headerPhone}
                                    <span className="icon-headset">
                                        <img src="/callicon.png" alt="call" />
                                    </span>
                                </a>
                            )}
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
