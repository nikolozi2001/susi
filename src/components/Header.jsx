import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useState, useRef, useEffect } from 'react';
import logoImage from '../assets/images/logo.png';

// Improved dropdown component with better interaction
const NavDropdown = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  
  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);
  
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };
  
  const handleMouseLeave = () => {
    // Add delay before closing to allow user to move cursor to dropdown
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 300); // 300ms delay
  };
  
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div 
      className="relative group" 
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button 
        className="flex items-center gap-1 text-susi-gray-500 hover:text-susi-black"
        onClick={handleClick}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {title}
        <svg 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div 
          className="absolute left-0 mt-2 w-60 bg-white rounded-md shadow-lg z-10 py-1"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          role="menu"
          aria-orientation="vertical"
        >
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="block px-4 py-2 text-sm text-susi-gray-600 hover:bg-susi-lightbeige hover:text-susi-black"
              onClick={() => setIsOpen(false)}
              role="menuitem"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

// Language selector component
const LanguageSelector = () => {
  const { language, changeLanguage, availableLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();
  
  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-susi-gray-700 font-medium"
      >
        {t(`language.${language}`)}
        <svg 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-20 bg-white rounded-md shadow-lg z-10 py-1">
          {availableLanguages.map(lang => (
            <button
              key={lang}
              onClick={() => {
                changeLanguage(lang);
                setIsOpen(false);
              }}
              className={`block w-full text-left px-4 py-2 text-sm ${language === lang ? 'bg-susi-lightbeige text-susi-black' : 'text-susi-gray-600 hover:bg-susi-lightbeige hover:text-susi-black'}`}
            >
              {t(`language.${lang}`)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default function Header() {
  const { currentUser, logout, isAdmin } = useAuth();
  const { t } = useLanguage();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Define navigation dropdown items with translated labels
  const aboutUsItems = [
    { label: t('aboutUs.information'), path: "/about/information" },
    { label: t('aboutUs.headAndDeputies'), path: "/about/head-deputies" }
  ];
  
  const informationItems = [
    { label: t('information.standardActs'), path: "/info/standard-acts" },
    { label: t('information.internationalCooperation'), path: "/info/international-cooperation" },
    { label: t('information.reports'), path: "/info/reports" }
  ];
  
  const newsItems = [
    { label: t('news.allNews'), path: "/news" },
    { label: t('news.photoGallery'), path: "/news/photo-gallery" },
    { label: t('news.videoGallery'), path: "/news/video-gallery" }
  ];

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
    } catch (error) {
      console.error("Failed to log out", error);
    } finally {
      setIsLoggingOut(false);
    }
  };
  
  // Toggle mobile nav
  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  return (
    <header className="bg-susi-white shadow-md">
      {/* Top Bar */}
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center mr-8">
            <img 
              src={logoImage} 
              alt="Susi Blog Logo" 
              className="h-10" 
            />
          </Link>
          
          {/* Main navigation with dropdowns */}
          <nav className="hidden md:flex gap-6 items-center z-30">
            <Link to="/" className="text-susi-gray-500 hover:text-susi-black">{t('nav.home')}</Link>
            <NavDropdown title={t('nav.aboutUs')} items={aboutUsItems} />
            <NavDropdown title={t('nav.information')} items={informationItems} />
            <NavDropdown title={t('nav.news')} items={newsItems} />
          </nav>
        </div>
        
        {/* User authentication section */}
        <nav className="flex gap-4 items-center">
          {/* Language switcher */}
          <LanguageSelector />
          
          {isAdmin && (
            <Link to="/admin" className="text-susi-gray-500 hover:text-susi-black">
              {t('nav.admin')}
            </Link>
          )}
          
          {currentUser ? (
            <>
              <span className="text-susi-gray-500">
                {currentUser.email}
              </span>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="text-susi-gray-500 hover:text-susi-black disabled:text-susi-gray-400"
              >
                {isLoggingOut ? t('auth.loggingOut') : t('nav.logout')}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-susi-gray-500 hover:text-susi-black">
                {t('nav.login')}
              </Link>
              <Link to="/signup" className="px-4 py-2 bg-susi-gray-700 text-susi-white rounded hover:bg-susi-darkgray transition-colors">
                {t('nav.signup')}
              </Link>
            </>
          )}
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-susi-gray-600 hover:text-susi-black ml-4"
            onClick={toggleMobileNav}
            aria-expanded={isMobileNavOpen}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </nav>
      </div>
      
      {/* Mobile navigation - alternative approach using toggleable menu */}
      <div className={`md:hidden border-t border-susi-gray-200 ${isMobileNavOpen ? 'block' : 'hidden'}`}>
        <div className="container mx-auto px-4 py-2">
          <nav className="flex flex-col">
            <Link to="/" className="py-2 text-susi-gray-500 hover:text-susi-black" onClick={() => setIsMobileNavOpen(false)}>
              {t('nav.home')}
            </Link>
            
            {/* About Us section */}
            <details className="group py-1">
              <summary className="text-susi-gray-500 hover:text-susi-black cursor-pointer flex items-center justify-between py-1">
                {t('nav.aboutUs')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="pl-4 space-y-1 mt-1">
                {aboutUsItems.map((item, index) => (
                  <Link 
                    key={index} 
                    to={item.path} 
                    className="block py-1 text-sm text-susi-gray-600 hover:text-susi-black"
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </details>
            
            {/* Information section */}
            <details className="group py-1">
              <summary className="text-susi-gray-500 hover:text-susi-black cursor-pointer flex items-center justify-between py-1">
                {t('nav.information')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="pl-4 space-y-1 mt-1">
                {informationItems.map((item, index) => (
                  <Link 
                    key={index} 
                    to={item.path} 
                    className="block py-1 text-sm text-susi-gray-600 hover:text-susi-black"
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </details>
            
            {/* News section */}
            <details className="group py-1">
              <summary className="text-susi-gray-500 hover:text-susi-black cursor-pointer flex items-center justify-between py-1">
                {t('nav.news')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="pl-4 space-y-1 mt-1">
                {newsItems.map((item, index) => (
                  <Link 
                    key={index} 
                    to={item.path} 
                    className="block py-1 text-sm text-susi-gray-600 hover:text-susi-black"
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </details>
          </nav>
        </div>
      </div>
    </header>
  );
}
