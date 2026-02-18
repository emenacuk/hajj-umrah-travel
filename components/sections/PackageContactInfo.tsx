'use client';

import React from 'react';
import '@/styles/components/_package-detail.scss';
import Link from 'next/link';

interface PackageContactInfoProps {
    contact: {
        phone?: string;
        email?: string;
        whatsapp?: string;
    };
}

export default function PackageContactInfo({ contact }: PackageContactInfoProps) {
    return (
        <section className="section package-contact-info-section">
            <div className="container">
                <div className="contact-info-grid">
                    <Link href={`tel:${contact.phone}`}>
                        <div className="contact-info-pill">
                            <div className="contact-icon">
                                <img src="/telephone.svg" alt="Call Now" />
                            </div>
                            <div className="contact-text">
                                <span className="contact-label">Call Now!</span>
                                <span className="contact-value">{contact.phone}</span>
                            </div>
                        </div>
                    </Link>
                    <Link href={`mailto:${contact.email}`}>
                        <div className="contact-info-pill">
                            <div className="contact-icon">
                                <img src="/message.svg" alt="Email Us" />
                            </div>
                            <div className="contact-text">
                                <span className="contact-label">Email Us!</span>
                                <span className="contact-value">{contact.email}</span>
                            </div>
                        </div>
                    </Link>
                    <Link
                        href={`${contact.whatsapp}`}
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
                                <span className="contact-value">{contact.whatsapp}</span>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
}
