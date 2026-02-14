import Link from 'next/link';
import { UmrahPackageData } from '@/types';

import { Skeleton } from '@/components/common/Skeleton';

interface UmrahExplorationCardProps {
    package: UmrahPackageData;
    loading?: boolean;
}

export default function UmrahExplorationCard({ package: pkg, loading }: UmrahExplorationCardProps) {
    if (loading) return <Skeleton className="umrah-exploration-card" width="100%" height="450px" borderRadius="18px" />;

    return (
        <div className="umrah-exploration-card">
            <Link href={`/umrah/${pkg.id}`}>
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
