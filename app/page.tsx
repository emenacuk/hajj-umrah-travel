import { fetchPageData, generatePageMetadata, getGeneralSettings } from '@/utils/api';
import { resolveTemplate } from '@/utils/templateResolver';
import PageScript from '@/components/common/PageScript';
import { Metadata } from 'next';

export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata(): Promise<Metadata> {
  const [pageData, generalSettings] = await Promise.all([
    fetchPageData('home'),
    getGeneralSettings()
  ]);
  return generatePageMetadata(pageData, generalSettings, 'home');
}

export default async function HomePage() {
  const pageData = await fetchPageData('home');

  if (!pageData) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <h1>Welcome</h1>
        <p>Loading page content...</p>
      </div>
    );
  }

  return (
    <>
      <PageScript html={pageData.script} ownerKey="home" />
      {resolveTemplate(pageData.page_template || 'home', pageData)}
    </>
  );
}


