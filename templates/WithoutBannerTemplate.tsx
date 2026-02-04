import { PageData } from '@/types';

interface WithoutBannerTemplateProps {
  data: PageData;
}

export default function WithoutBannerTemplate({ data }: WithoutBannerTemplateProps) {
  return (
    <section className="section">
      <div className="container">
        {data.title && <h1>{data.title}</h1>}
        {data.content?.description && (
          <div className="content-body">
            <p>{data.content.description}</p>
          </div>
        )}
        {data.content?.body && (
          <div className="content-body" dangerouslySetInnerHTML={{ __html: data.content.body }} />
        )}
      </div>
    </section>
  );
}


