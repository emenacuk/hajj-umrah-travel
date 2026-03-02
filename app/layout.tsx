import { Metadata } from 'next';
import '@/styles/globals.scss';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageScript from '@/components/common/PageScript';
import { Toaster } from 'sonner';
import { getGeneralSettings, fetchPageData, generatePageMetadata } from '@/utils/api';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const [pageData, generalSettings] = await Promise.all([
      fetchPageData('home'),
      getGeneralSettings()
    ]);
    return generatePageMetadata(pageData, generalSettings, 'home');
  } catch (error) {
    return {
      title: 'Hajj & Umrah Packages - Trusted Travel Agency',
      description: 'Book your Hajj and Umrah packages with confidence. Trusted travel agency offering affordable and luxury packages.',
    };
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const generalSettings = await getGeneralSettings();
  const seoTagSetting = generalSettings?.settings?.find(
    (s: any) => s.ref_name === 'SEO Meta Tags in Header'
  );
  const globalSeoScript = seoTagSetting?.is_active ? (seoTagSetting.contents as string) : null;

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
        />
        {globalSeoScript && <PageScript html={globalSeoScript} ownerKey="global-seo" />}
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}


