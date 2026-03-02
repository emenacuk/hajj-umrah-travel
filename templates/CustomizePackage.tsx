import React from 'react';
import { PageData } from '@/types';
import '@/styles/components/_customize-package.scss';
import CustomizePackageContent from '@/components/packages/CustomizePackageContent';

interface CustomizePackageProps {
    data?: PageData;
}

export default function CustomizePackage({ data }: CustomizePackageProps) {
    return (
        <section className="customize-package-section">
            <div className="container">
                <CustomizePackageContent data={data} />
            </div>
        </section>
    );
}
