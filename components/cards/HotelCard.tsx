'use client';
import React from 'react';
import Link from 'next/link';

interface HotelCardProps {
  id: string;
  name: string;
  city: string;
  distance_from_masjid: string;
  rating: number;
  image: string;
  link?: string;
}

export default function HotelCard({ id, name, city, distance_from_masjid, rating, image, link = '#' }: HotelCardProps) {
  return (
    <div className="hotel-card">
      <div className="hotel-image-wrapper">
        <img src={image} alt={name} />
      </div>
      <div className="hotel-content">
        <div>
          <div className="hotel-title">{name}</div>
          <div className="hotel-info-row">
            <div className="info-item">
              <span className="info-label">City:</span>
              <span className="info-value">{city}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Distance:</span>
              <span className="info-value">{distance_from_masjid}</span>
            </div>
          </div>
          <div className="hotel-rating">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={i < rating ? 'star-filled' : 'star'}>
                <img src="/star.svg" alt="" />
              </span>
            ))}
          </div>
        </div>
        <div className="hotel-actions">
          <Link href={link} className="btn-details">
            Get Details
          </Link>
        </div>
      </div>
    </div>
  );
}
