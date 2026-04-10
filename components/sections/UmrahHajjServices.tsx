import React from 'react';
import { ServicesSectionData } from '@/types';
import { getImageUrl } from '@/utils/api';

interface UmrahHajjServicesProps {
    data?: ServicesSectionData;
}

const UmrahHajjServices: React.FC<UmrahHajjServicesProps> = ({ data }) => {
    if (!data) return null;

    return (
        <section className="section umrah-hajj-services">
            <div className="container">
                <div className='sectionheadings'>
                    <div className='sectionheadingstext'>
                    <h2 className="section-title">{data.title}</h2>
                    <p className="section-subtitle">
                        {data.description}
                    </p>
                    </div>
                </div>
                <div className="services-grid">
                    <div className="services-list">
                        {data.items.map((item) => (
                            <div key={item.id} className="service-card">
                                <div className="service-icon">
                                    <img src={getImageUrl(item.icon)} alt={item.title} />
                                </div>
                                <div className="service-info">
                                    <span className='service-title'>{item.title}</span>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="services-main-image">
                        <img src={getImageUrl(data.mainImage)} alt="Hajj and Umrah Services" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UmrahHajjServices;
