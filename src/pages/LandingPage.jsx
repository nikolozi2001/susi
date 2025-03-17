import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { getPosts } from '../api';
import BlogCard from '../components/BlogCard';

// Import hero image
import heroImage from '../assets/images/main.jpg';

export default function LandingPage() {
  const { t } = useLanguage();
  const [latestPosts, setLatestPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch the latest posts for the featured section
  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        setLoading(true);
        const posts = await getPosts({ published: true, limit: 3 });
        setLatestPosts(posts);
      } catch (error) {
        console.error('Error fetching latest posts:', error);
        setLatestPosts([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLatestPosts();
  }, []);

  // Features section data
  const features = [
    {
      id: 'security',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      titleKey: 'landing.securityTitle',
      descKey: 'landing.securityDescription'
    },
    {
      id: 'information',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      titleKey: 'landing.informationTitle',
      descKey: 'landing.informationDescription'
    },
    {
      id: 'cooperation',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      titleKey: 'landing.cooperationTitle',
      descKey: 'landing.cooperationDescription'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="bg-cover bg-center h-[60vh] relative flex items-center"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${heroImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      >
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {t('landing.heroTitle')}
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              {t('landing.heroSubtitle')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/report-threat" className="px-6 py-3 bg-red-600 text-white font-bold rounded hover:bg-red-700 transition-colors">
                {t('hotline.reportThreats')}
              </Link>
              <Link to="/contact" className="px-6 py-3 bg-gray-800 text-white font-bold rounded hover:bg-gray-700 transition-colors">
                {t('contact.title')}
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-susi-black">
            {t('landing.featuresTitle')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map(feature => (
              <div key={feature.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-susi-gray-700 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-susi-gray-800">
                  {t(feature.titleKey)}
                </h3>
                <p className="text-susi-gray-600">
                  {t(feature.descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Hotline Section */}
      <section className="bg-red-700 text-white py-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">{t('hotline.title')}</h2>
            <p className="text-lg">{t('landing.hotlineDescription')}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <a href="tel:123" className="text-3xl font-bold hover:underline">123</a>
          </div>
        </div>
      </section>
      
      {/* Latest News Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-susi-black">
              {t('landing.latestNewsTitle')}
            </h2>
            <Link to="/news" className="text-susi-gray-700 hover:text-susi-black font-medium">
              {t('landing.viewAllNews')} →
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-susi-gray-700"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestPosts.map(post => (
                <BlogCard 
                  key={post.id || post._id || post.slug} 
                  post={post} 
                />
              ))}
              
              {latestPosts.length === 0 && (
                <div className="col-span-3 text-center py-12 text-susi-gray-500">
                  {t('landing.noNewsAvailable')}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      
      {/* Quick Links Section */}
      <section className="py-16 bg-susi-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-susi-black">
            {t('landing.quickLinksTitle')}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Link to="/news/photo-gallery" className="bg-white p-6 rounded-lg shadow text-center hover:shadow-md transition-shadow">
              <div className="text-4xl mb-3">🖼️</div>
              <h3 className="font-bold text-susi-gray-800">{t('news.photoGallery')}</h3>
            </Link>
            
            <Link to="/news/video-gallery" className="bg-white p-6 rounded-lg shadow text-center hover:shadow-md transition-shadow">
              <div className="text-4xl mb-3">🎬</div>
              <h3 className="font-bold text-susi-gray-800">{t('news.videoGallery')}</h3>
            </Link>
            
            <Link to="/links" className="bg-white p-6 rounded-lg shadow text-center hover:shadow-md transition-shadow">
              <div className="text-4xl mb-3">🔗</div>
              <h3 className="font-bold text-susi-gray-800">{t('links.title')}</h3>
            </Link>
            
            <Link to="/contact" className="bg-white p-6 rounded-lg shadow text-center hover:shadow-md transition-shadow">
              <div className="text-4xl mb-3">📞</div>
              <h3 className="font-bold text-susi-gray-800">{t('contact.title')}</h3>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Mission Statement */}
      <section className="py-16 bg-susi-darkgray text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-6">{t('landing.missionTitle')}</h2>
          <p className="text-lg mb-8">
            {t('landing.missionStatement')}
          </p>
          <Link to="/about/information" className="inline-block px-6 py-3 border-2 border-white text-white font-bold rounded hover:bg-white hover:text-susi-darkgray transition-colors">
            {t('landing.learnMore')}
          </Link>
        </div>
      </section>
    </div>
  );
}
