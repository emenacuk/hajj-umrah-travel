'use client';

import React, { useState, useEffect } from 'react';
import '@/styles/components/_package-detail.scss';
import Link from 'next/link';
import { getGeneralSettings, GeneralSettings, SettingsContents } from '@/utils/api';

interface PackageContactInfoProps {
    contact?: {
        phone?: string;
        email?: string;
        whatsapp?: string;
    };
}

export default function PackageContactInfo({ contact: propContact }: PackageContactInfoProps) {
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

    const resolveVariable = (text: string | undefined): string => {
        if (!text || !settings) return text || '';
        let resolved = text;
        settings.global_variables.forEach(variable => {
            if (variable.is_active) {
                const escapedCode = variable.code.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                resolved = resolved.replace(new RegExp(escapedCode, 'g'), variable.code_value);
            }
        });
        return resolved;
    };

    const contactSetting = settings?.settings?.find(s =>
        (s.ref_name && (s.ref_name.toLowerCase().includes("contact") || s.ref_name.toLowerCase().includes("phone"))) ||
        s.id === 6 || String(s.id) === "6"
    );

    const footerSetting = settings?.settings?.find(s =>
        (s.ref_name && s.ref_name.toLowerCase().includes("footer")) ||
        s.id === 14 || String(s.id) === "14"
    );

    const contactContents = contactSetting?.contents as SettingsContents | undefined;
    const headerDigits = resolveVariable(contactContents?.header_phone) || propContact?.phone || "020 8016 5786";
    const headerPhone = headerDigits;

    const rawWhatsApp = contactContents?.header_whatsApp || propContact?.whatsapp || "+447301759073";
    const resolvedWhatsApp = resolveVariable(rawWhatsApp);
    const headerWhatsApp = resolvedWhatsApp.includes('wa.me/')
        ? resolvedWhatsApp.split('wa.me/').pop() || resolvedWhatsApp
        : resolvedWhatsApp;

    const displayWhatsApp = headerWhatsApp.startsWith('+') ? headerWhatsApp : `+${headerWhatsApp}`;
    const footerEmail = (footerSetting?.contents as any)?.footer_email || propContact?.email || "info@makkahtravel.co.uk";

    return (
        <section className="section package-contact-info-section">
            <div className="container">
                <div className="contact-info-grid">
                    <Link href={`tel:${headerPhone.replace(/\s+/g, '')}`}>
                        <div className="contact-info-pill">
                            <div className="contact-icon">
                                <img src="/telephone.svg" alt="Call Now" />
                            </div>
                            <div className="contact-text">
                                <span className="contact-label">Call Now!</span>
                                <span className="contact-value">{headerPhone}</span>
                            </div>
                        </div>
                    </Link>
                    <Link href={`mailto:${footerEmail}`}>
                        <div className="contact-info-pill">
                            <div className="contact-icon">
                                <img src="/message.svg" alt="Email Us" />
                            </div>
                            <div className="contact-text">
                                <span className="contact-label">Email Us!</span>
                                <span className="contact-value">{footerEmail}</span>
                            </div>
                        </div>
                    </Link>
                    <a
                        href={`https://wa.me/${headerWhatsApp.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contactitemlink whatsapp"
                    >
                        <div className="contact-info-pill">
                            <div className="contact-icon">
                                <img src="/whatsappicon.svg" alt="WhatsApp" />
                            </div>
                            <div className="contact-text">
                                <span className="contact-label">WhatsApp!</span>
                                <span className="contact-value">{displayWhatsApp}</span>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
}
