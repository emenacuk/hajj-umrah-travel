'use client';

import { useState, useRef, useEffect } from 'react';
import { PageData } from '@/types';
import '@/styles/components/_contactus.scss';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import '@/styles/components/_forms.scss';

interface ContactTemplateProps {
  data?: PageData;
}

export default function ContactTemplate({ data }: ContactTemplateProps) {
  const [packageType, setPackageType] = useState<'umrah' | 'hajj'>('umrah');
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
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePassengerChange = (type: 'adults' | 'children' | 'infants', operation: 'inc' | 'dec') => {
    setFormData(prev => {
      const currentValue = prev.contactDetail.passengers[type];
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

  const handleDateChange = (date: Date | null) => {
    setFormData(prev => ({ ...prev, departureDate: date }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // Add submission logic here
  };

  return (
    <section className="contact-package-section">
        <div className="container">
        <div className="customize-grid">
          <div className="form-column">
            <div className='sectionheadings'>
              <div className='sectionheadingstext'>
                <h1 className="section-title">December Umrah Deals 2025</h1>
                <p className="section-subtitle">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip
                </p>
              </div>
            </div>

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
          </div>

          <div className="contact-image-column">
            <div className="contact-person-image-wrapper">
              <img src="/contactimage.png" alt="Person in Ihram" className="contact-person-image" />
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
