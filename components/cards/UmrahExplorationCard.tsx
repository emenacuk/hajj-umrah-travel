import Link from 'next/link';
import { UmrahPackageData } from '@/types';

interface UmrahExplorationCardProps {
    package: UmrahPackageData;
}

export default function UmrahExplorationCard({ package: pkg }: UmrahExplorationCardProps) {
    return (
        <div className="umrah-exploration-card">
            <Link href={`/${pkg.id}`}>
                <div className="card-image">
                    <img src={pkg.image} alt={pkg.title} />
                    <div className="card-overlay">
                        <h3>{pkg.title}</h3>
                        <div className="card-divider">
                            <img src="/whitestyle.png" alt="" />
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
