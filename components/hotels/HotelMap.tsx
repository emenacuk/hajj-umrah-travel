'use client';

import React, { useState, useEffect } from 'react';

interface HotelMapProps {
  mapHtml: string;
  address?: string;
}

const HotelMapSkeleton = () => (
  <div className="skeleton map-skeleton" style={{ width: '100%', height: '450px', borderRadius: '20px' }} />
);

export default function HotelMap({ mapHtml }: HotelMapProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!mapHtml) return null;

  return (
    <div className="hotel-map-client">
      {!isMounted ? (
        <HotelMapSkeleton />
      ) : (
        <div 
          className="map-container fade-in"
          dangerouslySetInnerHTML={{ __html: mapHtml }}
        />
      )}
    </div>
  );
}

