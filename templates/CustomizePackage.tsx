'use client';

import { useState, useRef, useEffect } from 'react';
import { PageData } from '@/types';
import '@/styles/components/_customize-package.scss';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import '@/styles/components/_forms.scss';
import { submitInquiry } from '@/utils/api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface CustomizePackageProps {
    data?: PageData;
}

export default function CustomizePackage({ data }: CustomizePackageProps) {
    const router = useRouter();
    const [packageType, setPackageType] = useState<'umrah' | 'hajj'>('umrah');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        contactDetail: {
            departureAirport: '',
            departureDate: null as Date | null,
            nightsInMAK: 2,
            nightsInMAD: 2,
            accommodation: '',
            roomType: '',
            mealType: '',
            distance: '',
            passengers: { adults: 2, children: 0, infants: 0 },
            message: '',
            hajjType: '',
            captcha: ''
        }
    });

    const datePickerRef = useRef<DatePicker>(null);
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

    const handleTypeChange = (type: 'umrah' | 'hajj') => {
        setPackageType(type);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'message' || name === 'captcha') {
            setFormData(prev => ({
                ...prev,
                contactDetail: { ...prev.contactDetail, [name]: value }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
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
        setFormData(prev => ({ ...prev, contactDetail: { ...prev.contactDetail, departureDate: date } }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, contactDetail: { ...prev.contactDetail, [name]: value } }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (parseInt(formData.contactDetail.captcha) !== captchaState.result) {
            toast.warning('Incorrect captcha answer. Please try again.');
            generateCaptcha();
            setFormData(prev => ({ ...prev, contactDetail: { ...prev.contactDetail, captcha: '' } }));
            return;
        }

        setIsSubmitting(true);

        try {
            // Build the contact detail object conditionally based on package type
            const baseContactDetail = {
                departureAirport: formData.contactDetail.departureAirport,
                departureDate: formData.contactDetail.departureDate ? formData.contactDetail.departureDate.toISOString().split('T')[0] : '',
                accommodation: formData.contactDetail.accommodation,
                passengerCount: `${formData.contactDetail.passengers.adults} ADT - ${formData.contactDetail.passengers.children} CHD - ${formData.contactDetail.passengers.infants} INF`,
                message: formData.contactDetail.message,
            };

            let finalContactDetail = {};
            if (packageType === 'umrah') {
                finalContactDetail = {
                    ...baseContactDetail,
                    nightsInMAK: formData.contactDetail.nightsInMAK,
                    nightsInMAD: formData.contactDetail.nightsInMAD,
                    roomType: formData.contactDetail.roomType,
                    mealType: formData.contactDetail.mealType,
                    distance: formData.contactDetail.distance,
                };
            } else {
                finalContactDetail = {
                    ...baseContactDetail,
                    hajjType: formData.contactDetail.hajjType,
                };
            }

            const submissionData = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                packageType: packageType,
                contactDetail: finalContactDetail
            };

            console.log("the submitted data", submissionData);
            const success = await submitInquiry(submissionData);

            if (success) {
                toast.success('Your customization request has been submitted successfully!');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
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
                        captcha: ''
                    }
                });
                generateCaptcha();
                router.push('/success');
            } else {
                toast.error('Submission failed. Please try again.');
            }
        } catch (error) {
            console.error("Submission error:", error);
            toast.error('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="customize-package-section">
            <div className="container">
                <div className="customize-grid">
                    <div className="form-column">
                        <div className='sectionheadings sectionheadings--center'>
                            <div className='sectionheadingstext'>
                                <h2 className="section-title">Customize your {packageType} 2025-2026</h2>
                                <p className="section-subtitle">
                                    Tailor your spiritual journey to your exact needs. Choose your preferred accommodation, flights, and services for a truly personalized experience.
                                </p>
                            </div>
                        </div>

                        <div className="customize-form-wrapper">
                            <form className="customize-form" onSubmit={handleSubmit}>
                                {packageType === 'umrah' ? (
                                    <>
                                        {/* Umrah Specific Fields */}
                                        <div className="form-row two-cols">
                                            <div className="input-field">
                                                <CustomSelect
                                                    name="departureAirport"
                                                    value={formData.contactDetail.departureAirport}
                                                    onChange={handleSelectChange}
                                                    placeholder="Departure Airport"
                                                    required
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
                                                onChange={(name, val) => setFormData(prev => ({ ...prev, contactDetail: { ...prev.contactDetail, [name]: val } }))}
                                            />
                                            <NightSelect
                                                name="nightsInMAD"
                                                label="Nights In MAD"
                                                value={formData.contactDetail.nightsInMAD}
                                                onChange={(name, val) => setFormData(prev => ({ ...prev, contactDetail: { ...prev.contactDetail, [name]: val } }))}
                                            />
                                            <div className="input-field">
                                                <CustomSelect
                                                    name="accommodation"
                                                    value={formData.contactDetail.accommodation}
                                                    onChange={handleSelectChange}
                                                    placeholder="Accommodation"
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
                                    </>
                                ) : (
                                    <>
                                            {/* Hajj Specific Fields */}
                                        <div className="form-row two-cols">
                                            <div className="input-field">
                                                <CustomSelect
                                                    name="departureAirport"
                                                        value={formData.contactDetail.departureAirport}
                                                    onChange={handleSelectChange}
                                                    placeholder="Departure Airport"
                                                    required
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
                                                        placeholder="Accommodation"
                                                    position="right"
                                                    options={[
                                                        { value: "5 star", label: "5 Star" },
                                                        { value: "4 star", label: "4 Star" },
                                                        { value: "3 star", label: "3 Star" },
                                                        { value: "any", label: "Any" }
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
                                            <div className="input-field icon-right">
                                                <CustomSelect
                                                        name="hajjType"
                                                        value={formData.contactDetail.hajjType}
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
                                    </>
                                )}

                                <div className={`form-row ${packageType === 'umrah' ? 'three-cols' : 'two-cols'}`}>
                                    {packageType === 'umrah' && (
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
                                    )}
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
                                    <div className="input-field">
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email Address*"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className={`form-row ${packageType === 'umrah' ? 'two-thirds-one-third' : 'two-cols'}`}>
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
                                    <div className="input-field badge-right has-text-left">
                                        <input
                                            type="text"
                                            name="captcha"
                                            placeholder="Answer"
                                            value={formData.contactDetail.captcha}
                                            onChange={handleInputChange}
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
                                            value={formData.contactDetail.message}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <button type="submit" className="submit-circle-btn" disabled={isSubmitting}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="image-column">
                        <div className="package-toggle">
                            <button
                                type="button"
                                className={`toggle-btn umrah ${packageType === 'umrah' ? 'active' : ''}`}
                                onClick={() => handleTypeChange('umrah')}
                            >
                                Umrah Package
                            </button>
                            <button
                                type="button"
                                className={`toggle-btn hajj ${packageType === 'hajj' ? 'active' : ''}`}
                                onClick={() => handleTypeChange('hajj')}
                            >
                                Hajj Package
                            </button>
                        </div>
                        <div className="person-image-wrapper">
                            <img src="/Hajj-pillgrim.png" alt="Person in Ihram" className="person-image" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
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
}

const CustomSelect = ({ name, options, value, onChange, placeholder, required, position = 'left' }: CustomSelectProps) => {
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
                <div className="select-badge">
                    <span className={`chevron ${isOpen ? 'up' : ''}`}></span>
                </div>
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
                <span className={`chevron ${isOpen ? 'up' : ''}`}></span>
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
