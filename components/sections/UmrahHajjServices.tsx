import React from 'react';
import { ServicesSectionData } from '@/types';

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
                                    <img src={item.icon} alt={item.title} />
                                </div>
                                <div className="service-info">
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="services-main-image">
                        <img src={data.mainImage} alt="Hajj and Umrah Services" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UmrahHajjServices;
