'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import '@/styles/components/_enquiry-modal.scss';

interface EnquiryModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedPackage?: string;
    packageTitle?: string;
}

export default function EnquiryModal({ isOpen, onClose, selectedPackage, packageTitle }: EnquiryModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        passengers: '1',
        subject: packageTitle || '',
        message: '',
        captchaInput: ''
    });

    const [captcha, setCaptcha] = useState({ n1: 0, n2: 0, result: 0 });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isOpen) {
            generateCaptcha();
            setFormData(prev => ({
                ...prev,
                subject: `${packageTitle}${selectedPackage ? ` (${selectedPackage})` : ''}`
            }));
        }
    }, [isOpen, packageTitle, selectedPackage]);

    const generateCaptcha = () => {
        const n1 = Math.floor(Math.random() * 10);
        const n2 = Math.floor(Math.random() * 10);
        setCaptcha({ n1, n2, result: n1 + n2 });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (parseInt(formData.captchaInput) !== captcha.result) {
            toast.warning('Incorrect captcha answer. Please try again.');
            generateCaptcha();
            setFormData(prev => ({ ...prev, captchaInput: '' }));
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            toast.success('Your enquiry has been sent successfully!');
            setIsSubmitting(false);
            onClose();
            // Reset form
            setFormData({
                name: '',
                email: '',
                phone: '',
                passengers: '1',
                subject: '',
                message: '',
                captchaInput: ''
            });
        }, 1500);
    };

    if (!isOpen) return null;

    return (
        <div className="enquiry-modal-overlay" onClick={onClose}>
            <div className="enquiry-modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-modal-btn" onClick={onClose}>×</button>

                <form onSubmit={handleSubmit} className="enquiry-modal-form">
                    <div className="form-row">
                        <div className="form-group">
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name*"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <select
                                name="passengers"
                                value={formData.passengers}
                                onChange={handleChange}
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                                    <option key={n} value={n}>{n} Passenger{n > 1 ? 's' : ''}</option>
                                ))}
                            </select>
                            <div className="field-icon-right select-icon">▼</div>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address*"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number*"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <input
                                type="text"
                                name="subject"
                                placeholder="Subject*"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="captchaInput"
                                placeholder="Answer"
                                value={formData.captchaInput}
                                onChange={handleChange}
                                required
                            />
                            <span className="captcha-badge">{captcha.n1}+{captcha.n2}</span>
                        </div>
                    </div>

                    <div className="form-group message-group">
                        <textarea
                            name="message"
                            placeholder="Type a Message"
                            rows={3}
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                        <button type="submit" className="submit-btn-circular" disabled={isSubmitting}>
                            {isSubmitting ? '...' : (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
