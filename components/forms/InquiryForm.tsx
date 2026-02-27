'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { InquiryFormData } from '@/types';
import { sendEmail } from '@/utils/api';
import { toast } from 'sonner';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import '@/styles/components/_forms.scss';
import router from 'next/router';

interface InquiryFormProps {
  data?: InquiryFormData; // Optional - form works with static fields until API is ready
}

export default function InquiryForm({ data }: InquiryFormProps) {
  // Form works independently with static fields
  // When API "get setting" is available, we can use data.fields to configure form dynamically
  // For now, form uses hardcoded static fields as before
  const pathname = usePathname();
  const router = useRouter();
  const [formData, setFormData] = useState<Record<string, any>>({
    passengers: { adults: 1, children: 0, infants: 0 },
    departureDate: null,
    nights: 7,
    name: '',
    phone: '',
    email: '',
    message: '',
    captchaInput: ''
  });

  const [captcha, setCaptcha] = useState({ n1: 0, n2: 0, result: 0 });
  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const datePickerRef = useRef<any>(null);

  useEffect(() => {
    generateCaptcha();

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowPassengerDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const generateCaptcha = () => {
    const n1 = Math.floor(Math.random() * 10);
    const n2 = Math.floor(Math.random() * 10);
    setCaptcha({ n1, n2, result: n1 + n2 });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let filteredValue = value;

    if (name === 'name') {
      filteredValue = value.replace(/[^a-zA-Z.]/g, '');
    } else if (name === 'phone') {
      filteredValue = value.replace(/[^0-9+]/g, '');
    } else if (name === 'nights' || name === 'captchaInput') {
      filteredValue = value.replace(/[^0-9]/g, '');
    } else if (name === 'email') {
      filteredValue = value.replace(/\s/g, '');
    }

    setFormData({
      ...formData,
      [name]: filteredValue,
    });
  };

  const handleDateChange = (date: Date | null) => {
    setFormData({
      ...formData,
      departureDate: date
    });
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
          departure_date: formData.departureDate ? formData.departureDate.toISOString().split('T')[0] : '',
          passenger_count: `${formData.passengers.adults} ADT - ${formData.passengers.children} CHD - ${formData.passengers.infants} INF`,
          nights: formData.nights,
          message: formData.message,
          page_url: pathname,
        },
      };
      const response = await sendEmail(submissionData);
      const isSuccess = response?.status === 1 || response?.success === true;
      if (isSuccess) {
        toast.success('Inquiry submitted successfully!');
        setFormData({
          passengers: { adults: 1, children: 0, infants: 0 },
          departureDate: null,
          nights: 7,
          name: '',
          phone: '',
          email: '',
          message: '',
          captchaInput: ''
        });
        generateCaptcha();
        toast.success('Inquiry submitted successfully!');
        setTimeout(() => {
          router.push('/thank-you');
        }, 2000);
      } else {
        toast.error('Submission failed. Please try again.');
        setIsSubmitting(false);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  const totalPassengers = formData.passengers.adults + formData.passengers.children + formData.passengers.infants;
  const passengerLabel = `${formData.passengers.adults.toString()} ADT - ${formData.passengers.children.toString()} CHD - ${formData.passengers.infants.toString()} INF`;

  return (
    <form onSubmit={handleSubmit} className={`premium-inquiry-form ${pathname !== '/' ? 'is-inner-page' : ''}`}>
      {/* Row 1 */}
      <div className="form-row three-cols">
        <div className="form-group icon-group custom-datepicker-wrapper">
          <DatePicker
            selected={formData.departureDate}
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
                  <span className="value">{formData.passengers.adults.toString().padStart(2, '0')}</span>
                  <button type="button" onClick={() => handlePassengerChange('adults', 'inc')} className="plus">+</button>
                </div>
              </div>
              <div className="dropdown-item">
                <span>Child(s)</span>
                <div className="counter">
                  <button type="button" onClick={() => handlePassengerChange('children', 'dec')} className="minus">-</button>
                  <span className="value">{formData.passengers.children.toString().padStart(2, '0')}</span>
                  <button type="button" onClick={() => handlePassengerChange('children', 'inc')} className="plus">+</button>
                </div>
              </div>
              <div className="dropdown-item">
                <span>Infant(s)</span>
                <div className="counter">
                  <button type="button" onClick={() => handlePassengerChange('infants', 'dec')} className="minus">-</button>
                  <span className="value">{formData.passengers.infants.toString().padStart(2, '0')}</span>
                  <button type="button" onClick={() => handlePassengerChange('infants', 'inc')} className="plus">+</button>
                </div>
              </div>
            </div>
          )}
        </div>

        <NightSelect
          name="nights"
          label="No. of Nights"
          value={formData.nights}
          onChange={(name, val) => setFormData(prev => ({ ...prev, [name]: val }))}
        />
      </div>

      {/* Row 2 */}
      <div className="form-row three-cols">
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Passenger Name*"
            value={formData.name}
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
      </div>

      {/* Row 3 */}
      <div className="form-row captcha-row">
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
        <div className="form-group message-group">
          <input
            type="text"
            name="message"
            placeholder="Type a message"
            value={formData.message}
            onChange={handleChange}
            required
          />

        </div>
        <div>
          <button type="submit" className="submit-icon-btn" disabled={isSubmitting}>
            <span className='textbtn'>
              Submit
            </span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>

          </button>
        </div>
      </div>
    </form>
  );
}

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
