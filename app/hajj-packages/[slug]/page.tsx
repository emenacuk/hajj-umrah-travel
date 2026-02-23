import { fetchHajjPackageBySlug } from '@/utils/api';
import { resolveTemplate } from '@/utils/templateResolver';
import { notFound } from 'next/navigation';

interface HajjPackagePageProps {
    params: {
        slug: string;
    };
}

export default async function HajjPackagePage({ params }: HajjPackagePageProps) {
    try {
        const packageData = await fetchHajjPackageBySlug(params.slug);

        if (!packageData) {
            notFound();
        }

        const templateName = 'single_hajj';

        const pageData = {
            page_template: templateName,
            title: packageData.title || packageData.package_title || 'Hajj Package',
            content: {
                package: packageData,
                banner: packageData.banner || {
                    title: packageData.title || packageData.package_title,
                    image: packageData.image || packageData.package_image
                },
                hotels: packageData.hotels || [],
                reviews: packageData.reviews || [],
                relatedPackages: packageData.relatedPackages || [],
                inclusions: packageData.inclusions || [],
                contact: packageData.contact || {},
                faqs: packageData.faqs || [],
            },
        };

        return resolveTemplate(pageData.page_template, pageData);
    } catch (error) {
        console.error('Error loading Hajj package:', error);
        notFound();
    }
}
