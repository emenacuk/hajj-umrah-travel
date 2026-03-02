'use client';

import React, { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import '@/styles/components/_forms.scss';
import { GeneralSettings } from '@/utils/api';
import { PageData } from '@/types';

interface ContactFormProps {
    data?: PageData;
    settings: GeneralSettings | null;
}

export default function ContactForm({ data, settings }: ContactFormProps) {
    const [formData, setFormData] = useState<{
        departureAirport: string;
        departureDate: Date | null;
        nightsInMAK: number;
        nightsInMAD: number;
        accommodation: string;
        roomType: string;
        mealType: string;
        distance: string;
        passengers: { adults: number; children: number; infants: number };
        name: string;
        email: string;
        phone: string;
        captcha: string;
        message: string;
        subject: string;
        hajjType?: string;
    }>({
        departureAirport: '',
        departureDate: null,
        nightsInMAK: 2,
        nightsInMAD: 2,
        accommodation: '',
        roomType: '',
        mealType: '',
        distance: '',
        passengers: { adults: 2, children: 0, infants: 0 },
        name: '',
        email: '',
        phone: '',
        captcha: '',
        message: '',
        subject: '',
        hajjType: ''
    });

    const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);
    const passengerRef = useRef<HTMLDivElement>(null);
    const [captchaState, setCaptchaState] = useState({ n1: 0, n2: 0, result: 0 });

    const generateCaptcha = () => {
        const n1 = Math.floor(Math.random() * 10);
        const n2 = Math.floor(Math.random() * 10);
        setCaptchaState({ n1, n2, result: n1 + n2 });
    };

    useEffect(() => {
        generateCaptcha();
        const handleClickOutside = (event: MouseEvent) => {
            if (passengerRef.current && !passengerRef.current.contains(event.target as Node)) {
                setShowPassengerDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePassengerChange = (type: 'adults' | 'children' | 'infants', operation: 'inc' | 'dec') => {
        setFormData(prev => {
            const currentValue = prev.passengers[type];
            let newValue = operation === 'inc' ? currentValue + 1 : currentValue - 1;

            if (type === 'adults' && newValue < 1) newValue = 1;
            if (type !== 'adults' && newValue < 0) newValue = 0;

            return {
                ...prev,
                passengers: {
                    ...prev.passengers,
                    [type]: newValue
                }
            };
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Submitted:', formData);
        // Add submission logic here
    };

    return (
        <div className="customize-form-wrapper">
            <form className="customize-form" onSubmit={handleSubmit}>
                <div className="form-row two-cols">
                    <div className="input-field">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name*"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="input-field icon-right" ref={passengerRef}>
                        <div
                            className="custom-select-trigger"
                            onClick={() => setShowPassengerDropdown(!showPassengerDropdown)}
                            style={{ cursor: 'pointer' }}
                        >
                            <input
                                type="text"
                                name="passengers"
                                value={`${formData.passengers.adults} ADT - ${formData.passengers.children} CHD - ${formData.passengers.infants} INF`}
                                readOnly
                                placeholder="Passengers"
                                className={`passenger-input ${showPassengerDropdown ? 'active' : ''}`}
                                style={{ pointerEvents: 'none' }}
                            />
                            <div className="passenger-badge">
                                {(formData.passengers.adults + formData.passengers.children + formData.passengers.infants).toString().padStart(2, '0')}
                            </div>
                        </div>

                        {showPassengerDropdown && (
                            <div className="passenger-dropdown-menu">
                                <div className="dropdown-item">
                                    <span>Adult(s)</span>
                                    <div className="counter-controls">
                                        <button type="button" onClick={(e) => { e.preventDefault(); handlePassengerChange('adults', 'dec'); }} className="control-btn minus">-</button>
                                        <span className="count-value">{formData.passengers.adults.toString().padStart(2, '0')}</span>
                                        <button type="button" onClick={(e) => { e.preventDefault(); handlePassengerChange('adults', 'inc'); }} className="control-btn plus">+</button>
                                    </div>
                                </div>
                                <div className="dropdown-item">
                                    <span>Child(s)</span>
                                    <div className="counter-controls">
                                        <button type="button" onClick={(e) => { e.preventDefault(); handlePassengerChange('children', 'dec'); }} className="control-btn minus">-</button>
                                        <span className="count-value">{formData.passengers.children.toString().padStart(2, '0')}</span>
                                        <button type="button" onClick={(e) => { e.preventDefault(); handlePassengerChange('children', 'inc'); }} className="control-btn plus">+</button>
                                    </div>
                                </div>
                                <div className="dropdown-item">
                                    <span>Infant(s)</span>
                                    <div className="counter-controls">
                                        <button type="button" onClick={(e) => { e.preventDefault(); handlePassengerChange('infants', 'dec'); }} className="control-btn minus">-</button>
                                        <span className="count-value">{formData.passengers.infants.toString().padStart(2, '0')}</span>
                                        <button type="button" onClick={(e) => { e.preventDefault(); handlePassengerChange('infants', 'inc'); }} className="control-btn plus">+</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="form-row two-cols">
                    <div className="input-field">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-field">
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number*"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-row two-cols">
                    <div className="input-field">
                        <input
                            type="text"
                            name="subject"
                            placeholder="Subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-field badge-right has-text-left">
                        <input
                            type="text"
                            name="captcha"
                            placeholder="Answer"
                            value={formData.captcha}
                            onChange={(e) => {
                                const val = e.target.value.replace(/[^0-9]/g, '');
                                setFormData(prev => ({ ...prev, captcha: val }));
                            }}
                            required
                        />
                        <span className="captcha-badge">{captchaState.n1}+{captchaState.n2}</span>
                    </div>
                </div>

                <div className="form-row-submit">
                    <div className="message-field">
                        <input
                            type="text"
                            name="message"
                            placeholder="Type a message"
                            value={formData.message}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button type="submit" className="submit-circle-btn">
                        <img src="/nextarrow.svg" alt="submit" />
                    </button>
                </div>
            </form>
        </div>
    );
}
