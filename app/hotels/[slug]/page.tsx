import { fetchHotelBySlug, getGeneralSettings, generatePageMetadata } from '@/utils/api';
import { getMockHotel } from '@/data/hotelMockData';
import HotelDetailTemplate from '@/templates/HotelDetailTemplate';
import PageScript from '@/components/common/PageScript';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const cleanSlug = params.slug.replace(/\.html$/i, '');
  try {
    const [hotelData, generalSettings] = await Promise.all([
      fetchHotelBySlug(cleanSlug),
      getGeneralSettings()
    ]);
    return generatePageMetadata(hotelData, generalSettings, `hotels/${cleanSlug}`);
  } catch (error) {
    return { title: 'Hotel Detail' };
  }
}

export default async function HotelDetailPage({ params }: PageProps) {
  const cleanSlug = params.slug.replace(/\.html$/i, '');
  try {
    // Try real API — fall back to mock data for testing
    const apiData = await fetchHotelBySlug(cleanSlug);
    const hotelData = apiData ?? getMockHotel(params.slug);

    if (!hotelData) {
      notFound();
    }

    return (
      <>
        <PageScript html={hotelData.script} ownerKey={cleanSlug} />
        <HotelDetailTemplate data={hotelData} />
      </>
    );
  } catch (error) {
    console.error('Error loading hotel page:', error);
    // Even on error, show mock data instead of 404
    const mockData = getMockHotel(cleanSlug);
    return (
      <>
        <HotelDetailTemplate data={mockData} />
      </>
    );
  }
}
