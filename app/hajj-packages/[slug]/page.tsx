import { fetchHajjPackageBySlug, generatePageMetadata, getGeneralSettings } from '@/utils/api';
import { resolveTemplate } from '@/utils/templateResolver';
import PageScript from '@/components/common/PageScript';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const revalidate = 3600; // Revalidate every hour

interface HajjPackagePageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: HajjPackagePageProps): Promise<Metadata> {
    try {
        const [packageData, generalSettings] = await Promise.all([
            fetchHajjPackageBySlug(params.slug),
            getGeneralSettings()
        ]);
        return generatePageMetadata(packageData, generalSettings, `hajj-packages/${params.slug}`);
    } catch (error) {
        return { title: 'Hajj Package' };
    }
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
            script: packageData.script,
            content: {
                package: packageData,
                banner: packageData.banner || {
                    title: packageData.title || packageData.package_title,
                    image: packageData.image || packageData.package_image
                },
                hotels: packageData.hotels || [],
                reviews: packageData.reviews || [],
                relatedPackages: packageData.relatedPackages || [],
                ourclientsays_widget: packageData._raw?.ourclientsays_widget?.[0],
                section_1_widget: packageData._raw?.section_1_widget,
                section_2_widget: packageData._raw?.section_2_widget?.[0],
                inclusions: packageData.inclusions || [],
                contact: packageData.contact || {},
                faqs: packageData.faqs || [],
            },
        };

        return (
            <>
                <PageScript html={pageData.script} ownerKey={params.slug} />
                {resolveTemplate(pageData.page_template, pageData)}
            </>
        );
    } catch (error) {
        console.error('Error loading Hajj package:', error);
        notFound();
    }
}
