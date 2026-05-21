'use client';

import React, { useState } from 'react';
import { PageData } from '@/types';
import CustomizeForm from './CustomizeForm';

interface CustomizePackageContentProps {
    data?: PageData;
}

export default function CustomizePackageContent({ data }: CustomizePackageContentProps) {
    const [packageType, setPackageType] = useState<'umrah' | 'hajj'>('umrah');

    const handleTypeChange = (type: 'umrah' | 'hajj') => {
        setPackageType(type);
    };

    return (
        <div className="customize-grid">
            <div className="form-column">
                <div className='sectionheadings sectionheadings--center'>
                    <div className='sectionheadingstext'>
                        {data?.banner_heading ? (
                            <div
                                className="section-title"
                                dangerouslySetInnerHTML={{ __html: data.banner_heading.replace(/<p>&nbsp;<\/p>/g, '') }}
                            />
                        ) : (
                            <h2 className="section-title">Customize your {packageType} 2025-2026</h2>
                        )}

                        {data?.banner_subheading ? (
                            <div
                                className="section-subtitle"
                                dangerouslySetInnerHTML={{ __html: data.banner_subheading.replace(/<p>&nbsp;<\/p>/g, '') }}
                            />
                        ) : (
                            <p className="section-subtitle">
                                Tailor your spiritual journey to your exact needs. Choose your preferred accommodation, flights, and services for a truly personalized experience.
                            </p>
                        )}
                    </div>
                </div>

                <CustomizeForm packageType={packageType} data={data} />
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
                    {data?.image_url ? (
                        <img
                            src={`${data._raw?.image_url?.startsWith('http') ? '' : 'https://lime-stingray-174731.hostingersite.com/media/'}${data.image_url}`}
                            alt={data._raw?.image_alt || "Person in Ihram"}
                            className="person-image"
                        />
                    ) : (
                        <img src="/umrahpilgrim.png" alt="Person in Ihram" className="person-image" />
                    )}
                </div>
            </div>
        </div>
    );
}
