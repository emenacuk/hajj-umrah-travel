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
import SingleListing from '@/templates/SingleListing';
import AboutUSTemplate from '@/templates/AboutUSTemplate';
import ReviewsTemplate from '@/templates/ReviewsTemplate';
import NotFound from '@/app/not-found';

// Template resolver - maps template name to component
export function resolveTemplate(templateIdentifier: string, pageData: PageData) {
  const name = templateIdentifier || pageData.page_template;
  switch (name.toLowerCase()) {
    case 'home template':
    case 'home':
    case '0':
      return <HomeTemplate data={pageData} />;

    case 'hajj package template':
    case 'hajj_package':
    case 'hajj-package':
    case 'hajjpackage':
    case '2':
      return <HajjPackageTemplate data={pageData} />;

    case 'umrah package template':
    case 'umrah_package':
    case 'umrah-package':
    case 'umrahpackage':
    case '3':
      return <UmrahPackageTemplate data={pageData} />;

    case 'package listing template':
    case 'listing':
    case '4':
      return <SingleListing data={pageData} />;

    case 'about us template':
    case 'about_us':
    case 'about-us':
    case 'aboutus':
    case '5':
      return <AboutUSTemplate data={pageData} />;

    case 'contact us template':
    case 'contact':
    case 'contact_us':
    case 'contact-us':
    case '6':
      return <ContactTemplate data={pageData} />;

    case 'static with banner template':
    case 'static_with_banner':
    case 'static-with-banner':
    case 'staticwithbanner':
    case '7':
      return <StaticWithBannerTemplate data={pageData} />;

    case 'static without banner template':
    case 'without_banner':
    case 'without-banner':
    case 'withoutbanner':
    case '8':
      return <WithoutBannerTemplate data={pageData} />;

    case 'blog template':
    case 'blog':
    case '9':
      return <BlogTemplate data={pageData} />;

    case 'reviews template':
    case 'reviews':
    case 'reviews_page':
    case 'reviews-page':
    case '10':
      return <ReviewsTemplate data={pageData} />;

    case 'customization template':
    case 'customize_package':
    case 'customize-package':
    case 'customizepackage':
    case 'customize-hajj-umrah':
    case '12':
      return <CustomizePackage data={pageData} />;

    case 'visa template':
    case 'visa':
    case 'visa_page':
    case 'visa-page':
    case '13':
      return <VisaPageTemplate data={pageData} />;

    case 'single_umrah':
    case 'single-umrah':
    case 'singleumrahtemplate':
      return <SingleUmrahTemplate data={pageData} />;

    case 'single_hajj':
    case 'single-hajj':
    case 'singlehajjtemplate':
      return <SingleHajjTemplate data={pageData} />;

    default:
      return <NotFound />;
  }
}


