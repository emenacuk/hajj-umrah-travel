'use client';
import React, { useState, useEffect, useCallback } from 'react';

interface HotelSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function HotelSearch({ onSearch, placeholder = "Search Hotels...(Min 3 characters)" }: HotelSearchProps) {
  const [query, setQuery] = useState('');

  const isFirstRender = React.useRef(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Prevent initial call on mount if query is empty
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }

      // Hit api when user type at least 3 characters or when empty (to reset)
      if (query.length >= 3 || query.length === 0) {
        onSearch(query);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  return (
    <div className="hotel-search-container">
      <div className="search-wrapper">
        <input 
          type="text" 
          placeholder={placeholder} 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="btn-search">
          <img src="/search.svg" alt="search" />
        </div>
      </div>
    </div>
  );
}
