import { PageData } from '@/types';

interface WithoutBannerTemplateProps {
  data: PageData;
}

export default function WithoutBannerTemplate({ data }: WithoutBannerTemplateProps) {
  const mainContent = data?.content?.main_content || '';

  return (
    <section className="static-section">
      <div className="container">
        <div className="content-body" dangerouslySetInnerHTML={{ __html: mainContent }} />
      </div>
    </section>
  );
}


