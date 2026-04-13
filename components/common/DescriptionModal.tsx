'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import '@/styles/components/_enquiry-modal.scss';

interface DescriptionModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    content: string;
}

export default function DescriptionModal({ isOpen, onClose, title, content }: DescriptionModalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!isOpen || !mounted) return null;

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!isOpen || !mounted) return null;

    return createPortal(
        <div className="enquiry-modal-overlay" onClick={onClose}>
            <div className="enquiry-modal-content description-modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-modal-btn" onClick={onClose}>
                    <img src="/crosswhite.svg" alt="" />
                </button>

                <div className="description-modal-body">
                    <div
                        className="description-full-text"
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                </div>
            </div>
        </div>,
        document.body
    );
}
