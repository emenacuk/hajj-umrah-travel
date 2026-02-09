'use client';

import React from 'react';
import Link from 'next/link';
import '@/styles/components/_customize-banner.scss';

const CustomizeBanner = () => {
    return (
        <section className="customize-banner">
            <div className="container">
                <div className="banner-area" style={{background: "url('/bannerbackground.png') no-repeat center center/cover"}}>              
                    <div className="banner-content">                      
                        <h2 className="banner-title">
                            <span>Customize Your</span>
                            Hajj & Umrah Packages
                        </h2>
                            <p className="banner-description">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </p>
                        <Link href="/customize-package" className="btn btn--secondary customize-btn">
                            Customize Your Package
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CustomizeBanner;
