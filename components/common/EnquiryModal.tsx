'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { sendEmail } from '@/utils/api';
import '@/styles/components/_enquiry-modal.scss';

interface EnquiryModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedPackage?: string;
    packageTitle?: string;
    pageURL?: string;
}

export default function EnquiryModal({ isOpen, onClose, selectedPackage, packageTitle, pageURL }: EnquiryModalProps) {
    const router = useRouter();
    const [formData, setFormData] = useState<Record<string, any>>({
        name: '',
        email: '',
        phone: '',
        captchaInput: '',
        contactDetail: {
            passengers: { adults: 1, children: 0, infants: 0 },
            subject: '',
            message: '',
            packageTitle: packageTitle,
            selectedPackage: selectedPackage,
            pageURL: pageURL,
        }

    });

    const [captcha, setCaptcha] = useState({ n1: 0, n2: 0, result: 0 });
    const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            generateCaptcha();
            setFormData(prev => ({
                ...prev,
                contactDetail: {
                    ...prev.contactDetail,
                    packageTitle: packageTitle,
                    selectedPackage: selectedPackage,
                    pageURL: pageURL,
                }
            }));
        }

        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowPassengerDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, packageTitle, selectedPackage, pageURL]);

    const generateCaptcha = () => {
        const n1 = Math.floor(Math.random() * 10);
        const n2 = Math.floor(Math.random() * 10);
        setCaptcha({ n1, n2, result: n1 + n2 });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (['name', 'email', 'phone', 'captchaInput'].includes(name)) {
            setFormData(prev => ({ ...prev, [name]: value }));
        } else {
            setFormData(prev => ({
                ...prev,
                contactDetail: {
                    ...prev.contactDetail,
                    [name]: value
                }
            }));
        }
    };

    const handlePassengerChange = (type: 'adults' | 'children' | 'infants', operation: 'inc' | 'dec') => {
        setFormData(prev => {
            const currentValue = prev.contactDetail.passengers[type];
            let newValue = operation === 'inc' ? currentValue + 1 : currentValue - 1;

            if (type === 'adults' && newValue < 1) newValue = 1;
            if (type !== 'adults' && newValue < 0) newValue = 0;

            return {
                ...prev,
                contactDetail: {
                    ...prev.contactDetail,
                    passengers: {
                        ...prev.contactDetail.passengers,
                        [type]: newValue
                    }
                }
            };
        });
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

        try {
            const submissionData = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                contact_detail: {
                    subject: formData.contactDetail.subject,
                    message: formData.contactDetail.message,
                    package_title: formData.contactDetail.packageTitle,
                    selected_package: formData.contactDetail.selectedPackage,
                    page_url: formData.contactDetail.pageURL,
                    passenger_count: `${formData.contactDetail.passengers.adults} ADT - ${formData.contactDetail.passengers.children} CHD - ${formData.contactDetail.passengers.infants} INF`
                }
            };

            const response = await sendEmail(submissionData);
            const isSuccess = response?.status === 1 || response?.success === true;

            if (isSuccess) {
                toast.success('Your enquiry has been sent successfully!');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    captchaInput: '',
                    contactDetail: {
                        passengers: { adults: 1, children: 0, infants: 0 },
                        subject: '',
                        message: '',
                        packageTitle: packageTitle,
                        selectedPackage: selectedPackage,
                        pageURL: pageURL,
                    }
                });
                generateCaptcha();
                onClose();
                setTimeout(() => {
                    router.push('/thank-you');
                }, 500);
            } else {
                toast.error('Submission failed. Please try again.');
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const totalPassengers = formData.contactDetail.passengers.adults + formData.contactDetail.passengers.children + formData.contactDetail.passengers.infants;
    const passengerLabel = `${formData.contactDetail.passengers.adults} ADT - ${formData.contactDetail.passengers.children} CHD - ${formData.contactDetail.passengers.infants} INF`;

    if (!isOpen || !mounted) return null;

    return createPortal(
        <div className="enquiry-modal-overlay" onClick={onClose}>
            <div className="enquiry-modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-modal-btn" onClick={onClose}>
                    <img src="/crosswhite.svg" alt="" />
                </button>

                <form onSubmit={handleSubmit} className="enquiry-modal-form premium-inquiry-form">
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
                        <div className="form-group passenger-group" ref={dropdownRef}>
                            <div
                                className={`passenger-trigger ${showPassengerDropdown ? 'active' : ''}`}
                                onClick={() => setShowPassengerDropdown(!showPassengerDropdown)}
                            >
                                <span>{passengerLabel}</span>
                                <span className="count-badge">{totalPassengers.toString().padStart(2, '0')}</span>
                            </div>

                            {showPassengerDropdown && (
                                <div className="passenger-dropdown">
                                    <div className="dropdown-item">
                                        <span>Adult(s)</span>
                                        <div className="counter">
                                            <button type="button" onClick={() => handlePassengerChange('adults', 'dec')} className="minus">-</button>
                                            <span className="value">{formData.contactDetail.passengers.adults.toString().padStart(2, '0')}</span>
                                            <button type="button" onClick={() => handlePassengerChange('adults', 'inc')} className="plus">+</button>
                                        </div>
                                    </div>
                                    <div className="dropdown-item">
                                        <span>Child(s)</span>
                                        <div className="counter">
                                            <button type="button" onClick={() => handlePassengerChange('children', 'dec')} className="minus">-</button>
                                            <span className="value">{formData.contactDetail.passengers.children.toString().padStart(2, '0')}</span>
                                            <button type="button" onClick={() => handlePassengerChange('children', 'inc')} className="plus">+</button>
                                        </div>
                                    </div>
                                    <div className="dropdown-item">
                                        <span>Infant(s)</span>
                                        <div className="counter">
                                            <button type="button" onClick={() => handlePassengerChange('infants', 'dec')} className="minus">-</button>
                                            <span className="value">{formData.contactDetail.passengers.infants.toString().padStart(2, '0')}</span>
                                            <button type="button" onClick={() => handlePassengerChange('infants', 'inc')} className="plus">+</button>
                                        </div>
                                    </div>
                                </div>
                            )}
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
                                value={formData.contactDetail.subject}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group captcha-group">
                            <input
                                type="text"
                                name="captchaInput"
                                placeholder="Answer"
                                value={formData.captchaInput}
                                onChange={handleChange}
                                required
                            />
                            <span className="captcha-text">{captcha.n1}+{captcha.n2}</span>
                        </div>
                    </div>
                    <div className='form-row message-group'>
                        <div className="form-group ">
                            <textarea
                                name="message"
                                placeholder="Type a Message"
                                rows={3}
                                value={formData.contactDetail.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="submit-icon-btn" disabled={isSubmitting}>
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
        </div>,
        document.body
    );
}
