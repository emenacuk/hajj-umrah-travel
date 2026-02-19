import { fetchHajjPackageBySlug } from '@/utils/api';
import { resolveTemplate } from '@/utils/templateResolver';
import { notFound } from 'next/navigation';
import { dynamicParams } from '@/data/static-routes';

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

        // Attempt to find route config for template override
        const routeConfig = dynamicParams.general?.find(route => route.slug === params.slug);
        const templateName = routeConfig?.template || 'single_hajj';

        const pageData = {
            template_name: templateName,
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

        return resolveTemplate(pageData.template_name, pageData);
    } catch (error) {
        console.error('Error loading Hajj package:', error);
        notFound();
    }
}
