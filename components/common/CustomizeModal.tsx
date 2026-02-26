'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import '@/styles/components/_customize-modal.scss';
import { useRouter } from 'next/navigation';
import router from 'next/router';
import { toast } from 'sonner';
import { sendEmail } from '@/utils/api';

interface CustomizeModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'umrah' | 'hajj';
    pageURL?: string;
    selectedPackage?: string;
    packageTitle?: string;
}

interface CustomizeModalState {
    name: string;
    email: string;
    phone: string;
    captcha: string;
    contactDetail: {
        departureAirport: string;
        departureDate: Date | null;
        nightsInMAK: number;
        nightsInMAD: number;
        accommodation: string;
        roomType: string;
        mealType: string;
        distance: string;
        passengers: {
            adults: number;
            children: number;
            infants: number;
        };
        message: string;
        hajjType?: string;
        type?: string;
        pageURL?: string;
        selectedPackage?: string;
        packageTitle?: string;
    };
}

export default function CustomizeModal({ isOpen, onClose, type, pageURL, selectedPackage, packageTitle }: CustomizeModalProps) {
    const router = useRouter();
    const [formData, setFormData] = useState<CustomizeModalState>({
        name: '',
        email: '',
        phone: '',
        captcha: '',
        contactDetail: {
            departureAirport: '',
            departureDate: null,
            nightsInMAK: 2,
            nightsInMAD: 2,
            accommodation: '',
            roomType: '',
            mealType: '',
            distance: '',
            passengers: { adults: 2, children: 0, infants: 0 },
            message: '',
            hajjType: '',
            type: type,
            pageURL: pageURL,
            selectedPackage: selectedPackage,
            packageTitle: packageTitle
        }
    });

    const datePickerRef = useRef<DatePicker>(null);
    const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);
    const passengerRef = useRef<HTMLDivElement>(null);
    const [captchaState, setCaptchaState] = useState({ n1: 0, n2: 0, result: 0 });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const generateCaptcha = () => {
        const n1 = Math.floor(Math.random() * 10);
        const n2 = Math.floor(Math.random() * 10);
        setCaptchaState({ n1, n2, result: n1 + n2 });
    };

    useEffect(() => {
        if (isOpen) {
            generateCaptcha();
        }
        const handleClickOutside = (event: MouseEvent) => {
            if (passengerRef.current && !passengerRef.current.contains(event.target as Node)) {
                setShowPassengerDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (['name', 'email', 'phone', 'captcha'].includes(name)) {
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

    const handleDateChange = (date: Date | null) => {
        setFormData(prev => ({
            ...prev,
            contactDetail: {
                ...prev.contactDetail,
                departureDate: date
            }
        }));
    };

    const handleSelectChange = (name: string, value: string | number) => {
        setFormData(prev => ({
            ...prev,
            contactDetail: {
                ...prev.contactDetail,
                [name]: value
            }
        }));
    };

    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     router.push('/thank-you');

    //     // Exclude captcha from payload
    //     const { captcha, ...payload } = formData;
    //     console.log('Form Submitted:', payload);

    //     // Add submission logic here
    //     onClose();
    // };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (parseInt(formData.captcha) !== captchaState.result) {
            toast.warning('Incorrect captcha answer. Please try again.');
            generateCaptcha();
            setFormData(prev => ({ ...prev, captcha: '' }));
            return;
        }

        setIsSubmitting(true);

        try {
            const submissionData = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                contact_detail: {
                    departure_airport: formData.contactDetail.departureAirport,
                    departure_date: formData.contactDetail.departureDate ? formData.contactDetail.departureDate.toISOString().split('T')[0] : '',
                    nights_in_mak: formData.contactDetail.nightsInMAK,
                    nights_in_mad: formData.contactDetail.nightsInMAD,
                    accommodation: formData.contactDetail.accommodation,
                    room_type: formData.contactDetail.roomType,
                    meal_type: formData.contactDetail.mealType,
                    distance: formData.contactDetail.distance,
                    message: formData.contactDetail.message,
                    hajj_type: formData.contactDetail.hajjType,
                    type: formData.contactDetail.type,
                    page_url: formData.contactDetail.pageURL,
                    selected_package: formData.contactDetail.selectedPackage,
                    package_title: formData.contactDetail.packageTitle,
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
                    captcha: '',
                    contactDetail: {
                        departureAirport: '',
                        departureDate: null,
                        nightsInMAK: 2,
                        nightsInMAD: 2,
                        accommodation: '',
                        roomType: '',
                        mealType: '',
                        distance: '',
                        passengers: { adults: 2, children: 0, infants: 0 },
                        message: '',
                        hajjType: '',
                        type: type,
                        pageURL: pageURL,
                        selectedPackage: selectedPackage,
                        packageTitle: packageTitle
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

    if (!isOpen || !mounted) return null;

    return createPortal(
        <div className="customize-modal-overlay" onClick={onClose}>
            <div className="customize-modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-modal-btn" onClick={onClose}>
                    <img src="/crosswhite.svg" alt="Close" />
                </button>

                <div className="customize-form-wrapper">
                    <form className="customize-form" onSubmit={handleSubmit}>
                        {type === 'umrah' ? (
                            <>
                                <div className="form-row two-cols">
                                    <div className="input-field">
                                        <CustomSelect
                                            name="departureAirport"
                                            value={formData.contactDetail.departureAirport}
                                            onChange={handleSelectChange}
                                            placeholder="Departure Airport"
                                            required
                                            icon="/airplaneicon.svg"
                                            options={[
                                                { value: "LHR", label: "London Heathrow" },
                                                { value: "LGW", label: "London Gatwick" },
                                                { value: "MAN", label: "Manchester" }
                                            ]}
                                        />
                                    </div>
                                    <div className="input-field icon-right">
                                        <div className="form-group icon-group custom-datepicker-wrapper">
                                            <DatePicker
                                                selected={formData.contactDetail.departureDate}
                                                onChange={handleDateChange}
                                                placeholderText="Departure Date"
                                                dateFormat="dd/MM/yyyy"
                                                className="custom-date-input"
                                                required
                                                ref={datePickerRef}
                                                minDate={new Date()}
                                                popperPlacement="bottom-start"
                                                onInputClick={() => {
                                                    if (datePickerRef.current) datePickerRef.current.setOpen(true);
                                                }}
                                            />
                                            <span className="field-icon">
                                                <img src="/calendar.png" alt="calendar" />
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-row three-cols">
                                    <NightSelect
                                        name="nightsInMAK"
                                        label="Nights In MAK"
                                        value={formData.contactDetail.nightsInMAK}
                                        onChange={(name: string, val: number) => setFormData(prev => ({
                                            ...prev,
                                            contactDetail: {
                                                ...prev.contactDetail,
                                                [name]: val
                                            }
                                        }))}
                                    />
                                    <NightSelect
                                        name="nightsInMAD"
                                        label="Nights In MAD"
                                        value={formData.contactDetail.nightsInMAD}
                                        onChange={(name: string, val: number) => setFormData(prev => ({
                                            ...prev,
                                            contactDetail: {
                                                ...prev.contactDetail,
                                                [name]: val
                                            }
                                        }))}
                                    />
                                    <div className="input-field">
                                        <CustomSelect
                                            name="accommodation"
                                            value={formData.contactDetail.accommodation}
                                            onChange={handleSelectChange}
                                            placeholder="Accomodation"
                                            position="right"
                                            options={[
                                                { value: "3star", label: "3 Star" },
                                                { value: "4star", label: "4 Star" },
                                                { value: "5star", label: "5 Star" },
                                                { value: "any", label: "Any" }
                                            ]}
                                        />
                                    </div>
                                </div>

                                <div className="form-row three-cols">
                                    <div className="input-field">
                                        <CustomSelect
                                            name="roomType"
                                            value={formData.contactDetail.roomType}
                                            onChange={handleSelectChange}
                                            placeholder="Room Type"
                                            position="right"
                                            options={[
                                                { value: "single", label: "Single" },
                                                { value: "double", label: "Double" },
                                                { value: "triple", label: "Triple" },
                                                { value: "quad", label: "Quad" }
                                            ]}
                                        />
                                    </div>
                                    <div className="input-field">
                                        <CustomSelect
                                            name="mealType"
                                            value={formData.contactDetail.mealType}
                                            onChange={handleSelectChange}
                                            placeholder="Meal Type"
                                            position="right"
                                            options={[
                                                { value: "room_only", label: "Room Only" },
                                                { value: "bed_breakfast", label: "Bed & Breakfast" },
                                                { value: "half_board", label: "Half Board" },
                                                { value: "full_board", label: "Full Board" }
                                            ]}
                                        />
                                    </div>
                                    <div className="input-field">
                                        <CustomSelect
                                            name="distance"
                                            value={formData.contactDetail.distance}
                                            onChange={handleSelectChange}
                                            placeholder="Distance"
                                            position="full"
                                            options={[
                                                { value: "walking", label: "Walking Distance" },
                                                { value: "shuttle", label: "Shuttle Service" }
                                            ]}
                                        />
                                    </div>
                                </div>

                                <div className="form-row three-cols">
                                    <div className="input-field icon-right" ref={passengerRef}>
                                        <div
                                            className="custom-select-trigger"
                                            onClick={() => setShowPassengerDropdown(!showPassengerDropdown)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <input
                                                type="text"
                                                name="passengers"
                                                value={`${formData.contactDetail.passengers.adults} ADT - ${formData.contactDetail.passengers.children} CHD - ${formData.contactDetail.passengers.infants} INF`}
                                                readOnly
                                                placeholder="Passengers"
                                                className={`passenger-input ${showPassengerDropdown ? 'active' : ''}`}
                                                style={{ pointerEvents: 'none' }}
                                            />
                                            <div className="passenger-badge">
                                                {(formData.contactDetail.passengers.adults + formData.contactDetail.passengers.children + formData.contactDetail.passengers.infants).toString().padStart(2, '0')}
                                            </div>
                                        </div>

                                        {showPassengerDropdown && (
                                            <div className="passenger-dropdown-menu">
                                                <div className="dropdown-item">
                                                    <span>Adult(s)</span>
                                                    <div className="counter-controls">
                                                        <button type="button" onClick={(e) => { e.preventDefault(); handlePassengerChange('adults', 'dec'); }} className="control-btn minus">-</button>
                                                        <span className="count-value">{formData.contactDetail.passengers.adults.toString().padStart(2, '0')}</span>
                                                        <button type="button" onClick={(e) => { e.preventDefault(); handlePassengerChange('adults', 'inc'); }} className="control-btn plus">+</button>
                                                    </div>
                                                </div>
                                                <div className="dropdown-item">
                                                    <span>Child(s)</span>
                                                    <div className="counter-controls">
                                                        <button type="button" onClick={(e) => { e.preventDefault(); handlePassengerChange('children', 'dec'); }} className="control-btn minus">-</button>
                                                        <span className="count-value">{formData.contactDetail.passengers.children.toString().padStart(2, '0')}</span>
                                                        <button type="button" onClick={(e) => { e.preventDefault(); handlePassengerChange('children', 'inc'); }} className="control-btn plus">+</button>
                                                    </div>
                                                </div>
                                                <div className="dropdown-item">
                                                    <span>Infant(s)</span>
                                                    <div className="counter-controls">
                                                        <button type="button" onClick={(e) => { e.preventDefault(); handlePassengerChange('infants', 'dec'); }} className="control-btn minus">-</button>
                                                        <span className="count-value">{formData.contactDetail.passengers.infants.toString().padStart(2, '0')}</span>
                                                        <button type="button" onClick={(e) => { e.preventDefault(); handlePassengerChange('infants', 'inc'); }} className="control-btn plus">+</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="input-field">
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Name*"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="input-field">
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email Address"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="form-row two-cols">
                                    <div className="input-field">
                                        <CustomSelect
                                            name="departureAirport"
                                                value={formData.contactDetail.departureAirport}
                                            onChange={handleSelectChange}
                                            placeholder="Departure Airport"
                                            required
                                            icon="/airplaneicon.svg"
                                            options={[
                                                { value: "LHR", label: "London Heathrow" },
                                                { value: "LGW", label: "London Gatwick" },
                                                { value: "MAN", label: "Manchester" }
                                            ]}
                                        />
                                    </div>
                                    <div className="input-field icon-right">
                                        <div className="form-group icon-group custom-datepicker-wrapper">
                                            <DatePicker
                                                    selected={formData.contactDetail.departureDate}
                                                onChange={handleDateChange}
                                                placeholderText="Departure Date"
                                                dateFormat="dd/MM/yyyy"
                                                className="custom-date-input"
                                                required
                                                ref={datePickerRef}
                                                minDate={new Date()}
                                                popperPlacement="bottom-start"
                                                onInputClick={() => {
                                                    if (datePickerRef.current) datePickerRef.current.setOpen(true);
                                                }}
                                            />
                                            <span className="field-icon">
                                                <img src="/calendar.png" alt="calendar" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row three-cols">
                                    <div className="input-field">
                                        <CustomSelect
                                            name="accommodation"
                                                value={formData.contactDetail.accommodation}
                                            onChange={handleSelectChange}
                                            placeholder="Accomodation"
                                            position="right"
                                            options={[
                                                { value: "5star", label: "5 star" },
                                                { value: "4star", label: "4 star" },
                                                { value: "3star", label: "3 star" },
                                                { value: "any", label: "any" }
                                            ]}
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
                                                    value={`${formData.contactDetail.passengers.adults} ADT - ${formData.contactDetail.passengers.children} CHD - ${formData.contactDetail.passengers.infants} INF`}
                                                readOnly
                                                placeholder="Passengers"
                                                className={`passenger-input ${showPassengerDropdown ? 'active' : ''}`}
                                                style={{ pointerEvents: 'none' }}
                                            />
                                            <div className="passenger-badge">
                                                    {(formData.contactDetail.passengers.adults + formData.contactDetail.passengers.children + formData.contactDetail.passengers.infants).toString().padStart(2, '0')}
                                            </div>
                                        </div>

                                        {showPassengerDropdown && (
                                            <div className="passenger-dropdown-menu">
                                                <div className="dropdown-item">
                                                    <span>Adult(s)</span>
                                                    <div className="counter-controls">
                                                        <button type="button" onClick={(e) => { e.preventDefault(); handlePassengerChange('adults', 'dec'); }} className="control-btn minus">-</button>
                                                            <span className="count-value">{formData.contactDetail.passengers.adults.toString().padStart(2, '0')}</span>
                                                        <button type="button" onClick={(e) => { e.preventDefault(); handlePassengerChange('adults', 'inc'); }} className="control-btn plus">+</button>
                                                    </div>
                                                </div>
                                                <div className="dropdown-item">
                                                    <span>Child(s)</span>
                                                    <div className="counter-controls">
                                                        <button type="button" onClick={(e) => { e.preventDefault(); handlePassengerChange('children', 'dec'); }} className="control-btn minus">-</button>
                                                            <span className="count-value">{formData.contactDetail.passengers.children.toString().padStart(2, '0')}</span>
                                                        <button type="button" onClick={(e) => { e.preventDefault(); handlePassengerChange('children', 'inc'); }} className="control-btn plus">+</button>
                                                    </div>
                                                </div>
                                                <div className="dropdown-item">
                                                    <span>Infant(s)</span>
                                                    <div className="counter-controls">
                                                        <button type="button" onClick={(e) => { e.preventDefault(); handlePassengerChange('infants', 'dec'); }} className="control-btn minus">-</button>
                                                            <span className="count-value">{formData.contactDetail.passengers.infants.toString().padStart(2, '0')}</span>
                                                        <button type="button" onClick={(e) => { e.preventDefault(); handlePassengerChange('infants', 'inc'); }} className="control-btn plus">+</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="input-field">
                                        <CustomSelect
                                            name="hajjType"
                                                value={formData.contactDetail.hajjType || ''}
                                            onChange={handleSelectChange}
                                            placeholder="Hajj Type"
                                            position="right"
                                            options={[
                                                { value: "shifting", label: "Shifting" },
                                                { value: "non-shifting", label: "Non-Shifting" },
                                                { value: "any", label: "Any" }
                                            ]}
                                        />
                                    </div>
                                </div>

                                <div className="form-row two-cols">
                                    <div className="input-field">
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Name*"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="input-field">
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email Address"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        <div className="form-row two-cols">
                            <div className="input-field">
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone Number*"
                                    value={formData.phone}
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
                                    value={formData.contactDetail.message}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <button type="submit" className="submit-circle-btn" disabled={isSubmitting}>
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
        </div >,
        document.body
    );
}

interface CustomSelectProps {
    name: string;
    options: { value: string; label: string }[];
    value: string;
    onChange: (name: string, value: string) => void;
    placeholder: string;
    required?: boolean;
    position?: 'left' | 'right' | 'full';
    icon?: string;
}

const CustomSelect = ({ name, options, value, onChange, placeholder, required, position = 'left', icon }: CustomSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (val: string) => {
        onChange(name, val);
        setIsOpen(false);
    };

    const selectedLabel = options.find(opt => opt.value === value)?.label || placeholder;
    const isPlaceholder = !value;

    return (
        <div className={`custom-select-container ${isOpen ? 'open' : ''} ${position}`} ref={wrapperRef}>
            <div className="select-trigger" onClick={() => setIsOpen(!isOpen)}>
                <span className={`selected-text ${isPlaceholder ? 'placeholder' : ''}`}>
                    {selectedLabel}
                </span>
                {icon ? (
                    <img src={icon} alt="icon" className="field-icon-img" />
                ) : (
                    <div className="select-badge">
                        <span className={`chevron ${isOpen ? 'up' : ''}`}></span>
                    </div>
                )}
            </div>
            {isOpen && (
                <div className={`options-list ${position === 'right' ? 'align-right' : position === 'full' ? 'align-full' : ''}`}>
                    {options.map(opt => (
                        <div
                            key={opt.value}
                            className={`option-item ${opt.value === value ? 'selected' : ''}`}
                            onClick={(e) => { e.stopPropagation(); handleSelect(opt.value); }}
                        >
                            {opt.label}
                        </div>
                    ))}
                </div>
            )}
            <input type="hidden" name={name} value={value} required={required} />
        </div>
    );
};

interface NightSelectProps {
    name: string;
    label: string;
    value: number;
    onChange: (name: string, value: number) => void;
}

const NightSelect = ({ name, label, value, onChange }: NightSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const nights = Array.from({ length: 15 }, (_, i) => i + 1);

    return (
        <div className="night-select-container" ref={wrapperRef}>
            <span className="label">{label}</span>
            <div className="night-badge" onClick={() => setIsOpen(!isOpen)}>
                {value.toString().padStart(2, '0')}
                <div className="select-badge">
                    <span className={`chevron ${isOpen ? 'up' : ''}`}></span>
                </div>
            </div>
            {isOpen && (
                <div className="night-dropdown">
                    {nights.map(n => (
                        <div
                            key={n}
                            className={`night-option ${n === value ? 'selected' : ''}`}
                            onClick={() => {
                                onChange(name, n);
                                setIsOpen(false);
                            }}
                        >
                            {n.toString().padStart(2, '0')}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
