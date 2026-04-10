'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { sendEmail } from '@/utils/api';
import { toast } from 'sonner';

interface PlanScheduleSectionProps {
  hotelName?: string;
}

export default function PlanScheduleSection({ hotelName }: PlanScheduleSectionProps) {
  const pathname = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    contactDetail: {
      checkInDate: null as Date | null,
      checkOutDate: null as Date | null,
      roomType: '',
      noOfRooms: 1,
      accommodation: '',
      passengers: { adults: 1, children: 0, infants: 0 },
      message: '',
      captcha: ''
    }
  });

  const [captchaState, setCaptchaState] = useState({ n1: 0, n2: 0, result: 0 });
  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);
  const passengerRef = useRef<HTMLDivElement>(null);
  const checkInRef = useRef<DatePicker>(null);
  const checkOutRef = useRef<DatePicker>(null);

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

  const handleDateChange = (field: 'checkInDate' | 'checkOutDate', date: Date | null) => {
    setFormData(prev => ({ ...prev, contactDetail: { ...prev.contactDetail, [field]: date } }));
  };

  const handleSelectChange = (name: string, value: string | number) => {
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
      const submissionData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        contact_detail: {
          type: 'Plan Your Schedule',
          hotel_name: hotelName || 'General Inquiry',
          check_in: formData.contactDetail.checkInDate?.toISOString().split('T')[0] || '',
          check_out: formData.contactDetail.checkOutDate?.toISOString().split('T')[0] || '',
          room_type: formData.contactDetail.roomType,
          no_of_rooms: formData.contactDetail.noOfRooms,
          accommodation: formData.contactDetail.accommodation,
          passenger_count: `${formData.contactDetail.passengers.adults} ADT - ${formData.contactDetail.passengers.children} CHD - ${formData.contactDetail.passengers.infants} INF`,
          message: formData.contactDetail.message,
          page_url: pathname,
        },
      };

      const success = await sendEmail(submissionData);
      if (success) {
        toast.success('Your schedule inquiry has been sent!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          contactDetail: {
            checkInDate: null,
            checkOutDate: null,
            roomType: '',
            noOfRooms: 1,
            accommodation: '',
            passengers: { adults: 1, children: 0, infants: 0 },
            message: '',
            captcha: ''
          }
        });
        generateCaptcha();
      } else {
        toast.error('Submission failed. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="plan-schedule-section section">
      <div className="container">
        <div className="ps-header">
          <h2 className="section-title">PLAN YOUR SCHEDULE</h2>
          <p className="section-description">
            Plan your spiritual journey with ease. Fill out the form below to receive a customized quote and schedule for your stay.
          </p>
        </div>

        <div className="ps-content">
          <div className="customize-form-wrapper dark-theme">
            <form className="customize-form" onSubmit={handleSubmit}>
              
              {/* Row 1: Basic Info */}
              <div className="form-row three-cols">
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

              {/* Row 2: Dates */}
              <div className="form-row two-cols">
                <div className="input-field icon-right">
                  <div className="form-group icon-group custom-datepicker-wrapper">
                    <DatePicker
                      selected={formData.contactDetail.checkInDate}
                      onChange={(date) => handleDateChange('checkInDate', date)}
                      placeholderText="Check In Date"
                      dateFormat="dd/MM/yyyy"
                      className="custom-date-input"
                      required
                      ref={checkInRef}
                      minDate={new Date()}
                      popperPlacement="bottom-start"
                      onInputClick={() => {
                        if (checkInRef.current) checkInRef.current.setOpen(true);
                      }}
                    />
                    <span className="field-icon">
                      <img src="/calendar.png" alt="calendar" />
                    </span>
                  </div>
                </div>
                <div className="input-field icon-right">
                  <div className="form-group icon-group custom-datepicker-wrapper">
                    <DatePicker
                      selected={formData.contactDetail.checkOutDate}
                      onChange={(date) => handleDateChange('checkOutDate', date)}
                      placeholderText="Check Out Date"
                      dateFormat="dd/MM/yyyy"
                      className="custom-date-input"
                      required
                      ref={checkOutRef}
                      minDate={formData.contactDetail.checkInDate || new Date()}
                      popperPlacement="bottom-start"
                      onInputClick={() => {
                        if (checkOutRef.current) checkOutRef.current.setOpen(true);
                      }}
                    />
                    <span className="field-icon">
                      <img src="/calendar.png" alt="calendar" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Row 3: Selections */}
              <div className="form-row three-cols">
                <div className="input-field">
                  <CustomSelect
                    name="roomType"
                    value={formData.contactDetail.roomType}
                    onChange={handleSelectChange}
                    placeholder="Room Type"
                    options={[
                      { value: "Standard", label: "Standard" },
                      { value: "Deluxe", label: "Deluxe" },
                      { value: "Suite", label: "Suite" }
                    ]}
                  />
                </div>
                <NightSelect
                  name="noOfRooms"
                  label="No. of Rooms"
                  value={formData.contactDetail.noOfRooms}
                  onChange={handleSelectChange}
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
                      { value: "5star", label: "5 Star" }
                    ]}
                  />
                </div>
              </div>

              {/* Row 4: Passengers, Captcha & Submit */}
              <div className="form-row three-cols-last">
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
                <button type="submit" className="submit-icon-btn" disabled={isSubmitting}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  <span className="textbtn">Submit</span>
                </button>
              </div>

            </form>
          </div>

          <div className="ps-image-container">
            <img src="/familypic.png" alt="Family planning journey" className="ps-family-img" />
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

  const selectedLabel = options.find((opt) => opt.value === value)?.label || placeholder;
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
          {options.map((opt) => (
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
          {nights.map((n) => (
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
