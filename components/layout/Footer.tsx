'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { fetchGeneralSettings, GeneralSettings, getImageUrl } from '@/utils/api';

export default function Footer() {
    const [settings, setSettings] = useState<GeneralSettings | null>(null);

    useEffect(() => {
        const loadSettings = async () => {
            const data = await fetchGeneralSettings();
            if (data) {
                setSettings(data);
            }
        };
        loadSettings();
    }, []);

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
        resolved = resolved.replace('{YEAR}', new Date().getFullYear().toString());
        return resolved;
    };

    const parseLinks = (html: string | undefined) => {
        if (!html) return [];
        const links: { text: string; href: string }[] = [];
        const regex = /<a\s+(?:[^>]*?\s+)?href="([^"]*)"[^>]*>(.*?)<\/a>/gi;
        let match;
        while ((match = regex.exec(html || '')) !== null) {
            links.push({
                href: match[1],
                text: match[2].replace(/<\/?[^>]+(>|$)/g, "").replace(/&nbsp;/g, ' ').trim()
            });
        }
        return links;
    };

    const footerLogo = settings?.footer_setting.logo ? getImageUrl(settings.footer_setting.logo) : "/logo.png";
    const footerData = settings?.footer_setting;
    const contents = footerData?.contents;
    const socialIcons = footerData?.social_media_icons;

    const getSocialLink = (platform: string) => {
        if (!socialIcons) return "#";
        const keys = Object.keys(socialIcons);
        const index = keys.find(key =>
            key.startsWith('social_media_icons_input_') &&
            socialIcons[key]?.toLowerCase() === platform.toLowerCase()
        )?.split('_').pop();
        return index ? (socialIcons[`social_media_icons_link_input_${index}`] as string) || "#" : "#";
    };

    if (!settings) {
        return <footer className="site-footer"></footer>;
    }

    const primaryLinks = parseLinks(contents?.link_1_content);
    const secondaryLinks = parseLinks(contents?.link_2_content);

    return (
        <footer className="site-footer">
            <div className='footerin'>
                <div className='footercontentarea'>
                    <div className="container">
                        <div className='footeraftercontainer'>
                            <div className="footer-brand">
                                <Link href="/" className="footer-logo">
                                    <img src={footerLogo} alt="Footer Logo" />
                                </Link>
                            </div>
                            <div className="footer-main-content">
                                <div className="footer-nav-primary">
                                    {primaryLinks.map((link, idx) => (
                                        <Link key={idx} href={link.href}>{link.text}</Link>
                                    ))}
                                </div>

                                <div className="footer-social">
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
                            </div>
                            <div className="footer-divider"></div>
                            <div className="footer-nav-secondary">
                                <div className="secondary-links">
                                    {secondaryLinks.map((link, idx) => (
                                        <Link key={idx} href={link.href}>{link.text}</Link>
                                    ))}
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
                            <p className="copyright-text">{resolveVariable(contents?.footer_copyright_content)}</p>
                            <div className="legal-disclaimer">
                                <div dangerouslySetInnerHTML={{ __html: resolveVariable(contents?.footer_below_copyright_text) }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
