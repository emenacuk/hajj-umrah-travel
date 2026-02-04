import { PageData } from '@/types';
import InnerBanner from '@/components/banners/InnerBanner';

interface StaticWithBannerTemplateProps {
  data: PageData;
}

export default function StaticWithBannerTemplate({ data }: StaticWithBannerTemplateProps) {
  const bannerData = data.content?.banner || {
    title: data.title || '',
    description: data.content?.description,
    image: data.content?.bannerImage,
  };

  return (
    <>
      {bannerData && <InnerBanner data={bannerData} />}
      <section className="section">
        <div className="container">
          {data.content?.body && (
            <div className="content-body" dangerouslySetInnerHTML={{ __html: data.content.body }} />
          )}
        </div>
      </section>
    </>
  );
}


