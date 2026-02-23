import { fetchPageData } from '@/utils/api';
import { resolveTemplate } from '@/utils/templateResolver';

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

  return resolveTemplate(pageData.page_template || 'home', pageData);
}


