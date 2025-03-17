import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import logoImageGeo from '../assets/images/logo_small_bw.png';
import logoImageEng from '../assets/images/logo_small_bw_en.png';

export default function Footer() {
  const { t, language } = useLanguage();
  const year = new Date().getFullYear();
  
  // Choose logo based on current language
  const logoImage = language === 'en' ? logoImageEng : logoImageGeo;

  return (
    <footer className="bg-susi-darkgray text-susi-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="inline-block">
              <img src={logoImage} alt="Susi Logo" className="h-8 mb-4" />
            </Link>
            <p className="text-susi-beige text-sm">
              © {year} Susi Blog. {t('footer.allRightsReserved')}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Column 1 */}
            <div>
              <h3 className="text-lg font-bold mb-3 text-susi-beige">{t('nav.aboutUs')}</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about/information" className="text-susi-beige hover:text-white">
                    {t('aboutUs.information')}
                  </Link>
                </li>
                <li>
                  <Link to="/about/head-deputies" className="text-susi-beige hover:text-white">
                    {t('aboutUs.headAndDeputies')}
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Column 2 */}
            <div>
              <h3 className="text-lg font-bold mb-3 text-susi-beige">{t('nav.information')}</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/info/standard-acts" className="text-susi-beige hover:text-white">
                    {t('information.standardActs')}
                  </Link>
                </li>
                <li>
                  <Link to="/info/international-cooperation" className="text-susi-beige hover:text-white">
                    {t('information.internationalCooperation')}
                  </Link>
                </li>
                <li>
                  <Link to="/info/reports" className="text-susi-beige hover:text-white">
                    {t('information.reports')}
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Column 3 */}
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-lg font-bold mb-3 text-susi-beige">{t('nav.news')}</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/news" className="text-susi-beige hover:text-white">
                    {t('news.allNews')}
                  </Link>
                </li>
                <li>
                  <Link to="/news/photo-gallery" className="text-susi-beige hover:text-white">
                    {t('news.photoGallery')}
                  </Link>
                </li>
                <li>
                  <Link to="/news/video-gallery" className="text-susi-beige hover:text-white">
                    {t('news.videoGallery')}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Bottom links */}
        <div className="border-t border-susi-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <Link to="/privacy" className="text-susi-beige text-sm hover:text-white">
              {t('footer.privacy')}
            </Link>
            <Link to="/terms" className="text-susi-beige text-sm hover:text-white">
              {t('footer.terms')}
            </Link>
            <Link to="/contact" className="text-susi-beige text-sm hover:text-white">
              {t('footer.contact')}
            </Link>
          </div>
          
          <div className="flex space-x-4">
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <svg className="h-5 w-5 text-susi-beige hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg className="h-5 w-5 text-susi-beige hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <svg className="h-5 w-5 text-susi-beige hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
