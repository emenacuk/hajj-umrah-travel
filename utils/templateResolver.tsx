import { PageData } from '@/types';
import HomeTemplate from '@/templates/HomeTemplate';
import UmrahPackageTemplate from '@/templates/UmrahPackageTemplate';
import HajjPackageTemplate from '@/templates/HajjPackageTemplate';
import WithoutBannerTemplate from '@/templates/WithoutBannerTemplate';
import StaticWithBannerTemplate from '@/templates/StaticWithBannerTemplate';
import ContactTemplate from '@/templates/ContactTemplate';
import BlogTemplate from '@/templates/BlogTemplate';
import SingleUmrahTemplate from '@/templates/SingleUmrahTemplate';
import SingleHajjTemplate from '@/templates/SingleHajjTemplate';
import CustomizePackage from '@/templates/CustomizePackage';
import VisaPageTemplate from '@/templates/VisaTemplate';

// Template resolver - maps template_name to component
export function resolveTemplate(templateName: string, pageData: PageData) {
  switch (templateName.toLowerCase()) {
    case 'home':
      return <HomeTemplate data={pageData} />;

    case 'umrah_package':
    case 'umrah-package':
    case 'umrahpackage':
      return <UmrahPackageTemplate data={pageData} />;

    case 'hajj_package':
    case 'hajj-package':
    case 'hajjpackage':
      return <HajjPackageTemplate data={pageData} />;

    case 'without_banner':
    case 'without-banner':
    case 'withoutbanner':
      return <WithoutBannerTemplate data={pageData} />;

    case 'static_with_banner':
    case 'static-with-banner':
    case 'staticwithbanner':
      return <StaticWithBannerTemplate data={pageData} />;

    case 'contact':
    case 'contact_us':
    case 'contact-us':
      return <ContactTemplate data={pageData} />;

    case 'blog':
      return <BlogTemplate data={pageData} />;

    case 'singleumrahtemplate':
    case 'single_umrah':
    case 'single-umrah':
      return <SingleUmrahTemplate data={pageData} />;

    case 'single_hajj':
    case 'single-hajj':
    case 'singlehajjtemplate':
      return <SingleHajjTemplate data={pageData} />;

    case 'customize_package':
    case 'customize-package':
    case 'customizepackage':
    case 'customize-hajj-umrah':
      return <CustomizePackage data={pageData} />;

    case 'visa':
    case 'visa_page':
    case 'visa-page':
      return <VisaPageTemplate data={pageData} />;

    default:
      return <WithoutBannerTemplate data={pageData} />;
  }
}


