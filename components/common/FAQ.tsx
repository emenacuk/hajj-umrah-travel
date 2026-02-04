'use client';

import { useState } from 'react';
import { FAQItem } from '@/types';
import '@/styles/components/_faq.scss';

interface FAQProps {
  items: FAQItem[];
}

export default function FAQ({ items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq">
      {items.map((item, index) => (
        <div key={index} className="faq-item">
          <button
            className="faq-question"
            onClick={() => toggleItem(index)}
            aria-expanded={openIndex === index}
          >
            <h3>{item.question}</h3>
            <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
          </button>
          {openIndex === index && (
            <div className="faq-answer">
              <p>{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

