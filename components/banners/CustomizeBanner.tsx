'use client';

import React from 'react';
import Link from 'next/link';
import '@/styles/components/_customize-banner.scss';

import { getImageUrl } from '@/utils/api';

interface CustomizeBannerProps {
    data?: {
        heading: string;
        subheading: string;
        description: string;
        image_url: string;
        button_text: string;
        button_link: string;
    };
}

const CustomizeBanner = ({ data }: CustomizeBannerProps) => {
    // If no data provided, we could either hide it or show static content
    // Based on user request, let's make it dynamic with fallbacks

    const heading = data?.heading || "Hajj & Umrah Packages";
    const subheading = data?.subheading || "Customize Your";
    const description = data?.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
    const backgroundImage = getImageUrl(data?.image_url, '/bannerbackground.png');
    const buttonText = data?.button_text || "Customize Your Package";

    let buttonLink = data?.button_link || "/customize-package";
    if (buttonLink.toLowerCase() === "customise your package") {
        buttonLink = "/customise-your-package";
    } else if (!buttonLink.startsWith('/') && !buttonLink.startsWith('http')) {
        buttonLink = `/${buttonLink.toLowerCase().replace(/\s+/g, '-')}`;
    }
    buttonLink = buttonLink.replace(/\.html$/i, '');

    return (
        <section className="customize-banner">
            <div className="container">
                <div className="banner-area" style={{ background: `url('${backgroundImage}') no-repeat center center/cover` }}>
                    <div className="banner-content">
                        <h2 className="banner-title">
                            <span>{subheading}</span>
                            {heading}
                        </h2>
                        <p className="banner-description">
                            {description}
                        </p>
                        <Link href={buttonLink} className="btn btn--secondary customize-btn">
                            {buttonText}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CustomizeBanner;
