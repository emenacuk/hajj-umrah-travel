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

  const midPoint = Math.ceil(items.length / 2);
  const leftColumn = items.slice(0, midPoint);
  const rightColumn = items.slice(midPoint);

  return (
    <div className="faq-grid">
      <div className="faq-column">
        {leftColumn.map((item, index) => (
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
                <p dangerouslySetInnerHTML={{ __html: item.answer }} />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="faq-column">
        {rightColumn.map((item, index) => {
          const globalIndex = index + midPoint;
          return (
            <div key={globalIndex} className="faq-item">
              <button
                className="faq-question"
                onClick={() => toggleItem(globalIndex)}
                aria-expanded={openIndex === globalIndex}
              >
                <h3>{item.question}</h3>
                <span className="faq-icon">{openIndex === globalIndex ? '−' : '+'}</span>
              </button>
              {openIndex === globalIndex && (
                <div className="faq-answer">
                  <p dangerouslySetInnerHTML={{ __html: item.answer }} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

