import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useState, useRef, useEffect } from "react";
import logoGe from "../assets/images/logo.png";
import logoEn from "../assets/images/logo_en.png";

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
        className="flex items-center gap-1 text-susi-beige hover:text-susi-white"
        onClick={handleClick}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {title}
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute left-0 mt-2 w-60 bg-susi-gray-800 rounded-md shadow-lg z-10 py-1"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          role="menu"
          aria-orientation="vertical"
        >
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="block px-4 py-2 text-sm text-susi-beige hover:bg-susi-gray-700 hover:text-susi-white"
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

// Language selector component with flag icons
const LanguageSelector = () => {
  const { language, changeLanguage, availableLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  // Flag SVGs
  const flags = {
    ka: (
      <svg
        width="20"
        height="14"
        viewBox="0 0 30 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="30" height="20" fill="white" />
        <path d="M0 0H30V20H0V0Z" fill="white" />
        <path d="M13 0H17V20H13V0Z" fill="#FF0000" />
        <path d="M0 8H30V12H0V8Z" fill="#FF0000" />
        <path
          d="M6.5 3.5L7 5L8.5 5.5L7 6L6.5 7.5L6 6L4.5 5.5L6 5L6.5 3.5Z"
          fill="#FF0000"
        />
        <path
          d="M23.5 3.5L24 5L25.5 5.5L24 6L23.5 7.5L23 6L21.5 5.5L23 5L23.5 3.5Z"
          fill="#FF0000"
        />
        <path
          d="M6.5 12.5L7 14L8.5 14.5L7 15L6.5 16.5L6 15L4.5 14.5L6 14L6.5 12.5Z"
          fill="#FF0000"
        />
        <path
          d="M23.5 12.5L24 14L25.5 14.5L24 15L23.5 16.5L23 15L21.5 14.5L23 14L23.5 12.5Z"
          fill="#FF0000"
        />
      </svg>
    ),
    en: (
      <svg
        width="20"
        height="14"
        viewBox="0 0 30 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="30" height="20" fill="#012169" />
        <path d="M0 0L30 20M30 0L0 20" stroke="white" strokeWidth="3" />
        <path d="M15 0V20M0 10H30" stroke="white" strokeWidth="5" />
        <path d="M15 0V20M0 10H30" stroke="#C8102E" strokeWidth="3" />
        <path d="M0 0L30 20M30 0L0 20" stroke="#C8102E" strokeWidth="1" />
      </svg>
    ),
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-susi-beige font-medium hover:text-susi-white"
        aria-label={`Change language, current language: ${language}`}
      >
        <span className="flex items-center justify-center border border-susi-gray-600 rounded overflow-hidden w-6 h-4">
          {flags[language]}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 bg-susi-gray-800 rounded-md shadow-lg z-10 py-1">
          {availableLanguages.map((lang) => (
            <button
              key={lang}
              onClick={() => {
                changeLanguage(lang);
                setIsOpen(false);
              }}
              className={`flex items-center gap-2 w-full px-4 py-2 text-sm ${
                language === lang
                  ? "bg-susi-gray-700 text-susi-white"
                  : "text-susi-beige hover:bg-susi-gray-700 hover:text-susi-white"
              }`}
            >
              <span className="flex items-center justify-center border border-susi-gray-600 rounded overflow-hidden w-6 h-4">
                {flags[lang]}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// User profile dropdown component
const UserProfileDropdown = () => {
  const { currentUser, logout, isAdmin } = useAuth();
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to log out", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (!currentUser) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-susi-beige hover:text-susi-white"
        aria-label="User menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-susi-gray-800 rounded-md shadow-lg z-10 py-1">
          {isAdmin && (
            <Link
              to="/admin"
              className="block px-4 py-2 text-sm text-susi-beige hover:bg-susi-gray-700 hover:text-susi-white"
              onClick={() => setIsOpen(false)}
            >
              {t("nav.admin")}
            </Link>
          )}

          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex w-full px-4 py-2 text-sm text-susi-beige hover:bg-susi-gray-700 hover:text-susi-white disabled:text-susi-gray-400"
          >
            {isLoggingOut ? t("auth.loggingOut") : t("nav.logout")}
          </button>
        </div>
      )}
    </div>
  );
};

export default function Header() {
  const { currentUser, isAdmin } = useAuth();
  const { t, language } = useLanguage();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Define navigation dropdown items with translated labels
  const aboutUsItems = [
    { label: t("aboutUs.information"), path: "/about/information" },
    { label: t("aboutUs.headAndDeputies"), path: "/about/head-deputies" },
  ];

  const informationItems = [
    { label: t("information.standardActs"), path: "/info/standard-acts" },
    {
      label: t("information.internationalCooperation"),
      path: "/info/international-cooperation",
    },
    { label: t("information.reports"), path: "/info/reports" },
  ];

  const newsItems = [
    { label: t("news.allNews"), path: "/news" },
    { label: t("news.photoGallery"), path: "/news/photo-gallery" },
    { label: t("news.videoGallery"), path: "/news/video-gallery" },
  ];

  const mainNavItems = [
    { path: "/", label: t("nav.home") },
    {
      label: t("nav.aboutUs"),
      submenu: [
        { path: "/about/information", label: t("aboutUs.information") },
        { path: "/about/head-deputies", label: t("aboutUs.headAndDeputies") },
      ],
    },
    {
      label: t("nav.information"),
      submenu: [
        { path: "/info/standard-acts", label: t("information.standardActs") },
        {
          path: "/info/international-cooperation",
          label: t("information.internationalCooperation"),
        },
        { path: "/info/reports", label: t("information.reports") },
      ],
    },
    {
      label: t("nav.news"),
      submenu: [
        { path: "/news", label: t("news.allNews") },
        { path: "/news/photo-gallery", label: t("news.photoGallery") },
        { path: "/news/video-gallery", label: t("news.videoGallery") },
      ],
    },
    { path: "/links", label: t("nav.links") },
    { path: "/contact", label: t("nav.contactUs") },
  ];

  // Toggle mobile nav
  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  // Determine which logo to use based on language
  const logoImage = language === "en" ? logoEn : logoGe;

  return (
    <header className="bg-susi-darkgray shadow-md text-susi-white">
      {/* Hotline Bar */}
      <div className="bg-red-700 text-white py-2">
        <div className="container mx-auto px-4 flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center">
            <span className="text-sm sm:text-base font-bold mr-1 sm:mr-2">{t("hotline.title")}:</span>
            <a 
              href="tel:123" 
              className="text-lg sm:text-xl font-bold hover:underline flex items-center"
              aria-label="Call emergency hotline 123"
            >
              <span className="bg-red-800 bg-opacity-30 px-2 py-1 rounded">123</span>
            </a>
          </div>
          <div className="uppercase text-xs sm:text-sm font-bold tracking-wide sm:tracking-wider">
            <Link 
              to="/report-threat" 
              className="hover:underline flex items-center px-2 py-1 rounded hover:bg-red-800 hover:bg-opacity-30"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 mr-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                />
              </svg>
              {t("hotline.reportThreats")}
            </Link>
          </div>
        </div>
      </div>

      {/* Top Bar */}
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center mr-8">
            <img src={logoImage} alt="Susi Blog Logo" className="h-10" />
          </Link>

          {/* Main navigation with dropdowns */}
          <nav className="hidden md:flex gap-6 items-center z-30">
            <Link to="/" className="text-susi-beige hover:text-susi-white">
              {t("nav.home")}
            </Link>
            <NavDropdown title={t("nav.aboutUs")} items={aboutUsItems} />
            <NavDropdown
              title={t("nav.information")}
              items={informationItems}
            />
            <NavDropdown title={t("nav.news")} items={newsItems} />
            <Link to="/links" className="text-susi-beige hover:text-susi-white">
              {t("nav.links")}
            </Link>
            <Link
              to="/contact"
              className="text-susi-beige hover:text-susi-white"
            >
              {t("nav.contactUs")}
            </Link>
          </nav>
        </div>

        {/* User authentication section - only language selector and user profile visible */}
        <nav className="flex gap-4 items-center">
          {/* User profile dropdown with logout */}
          <UserProfileDropdown />

          {/* Mobile menu button */}
          <button
            className="md:hidden text-susi-beige hover:text-susi-white ml-4"
            onClick={toggleMobileNav}
            aria-expanded={isMobileNavOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>

          {/* Language selector - positioned at the far right */}
          <div className="ml-2">
            <LanguageSelector />
          </div>
        </nav>
      </div>

      {/* Mobile navigation - alternative approach using toggleable menu */}
      <div
        className={`md:hidden border-t border-susi-gray-700 ${
          isMobileNavOpen ? "block" : "hidden"
        }`}
      >
        <div className="container mx-auto px-4 py-2">
          <nav className="flex flex-col">
            <Link
              to="/"
              className="py-2 text-susi-beige hover:text-susi-white"
              onClick={() => setIsMobileNavOpen(false)}
            >
              {t("nav.home")}
            </Link>

            {/* About Us section */}
            <details className="group py-1">
              <summary className="text-susi-beige hover:text-susi-white cursor-pointer flex items-center justify-between py-1">
                {t("nav.aboutUs")}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="pl-4 space-y-1 mt-1">
                {aboutUsItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    className="block py-1 text-sm text-susi-beige hover:text-susi-white"
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </details>

            {/* Information section */}
            <details className="group py-1">
              <summary className="text-susi-beige hover:text-susi-white cursor-pointer flex items-center justify-between py-1">
                {t("nav.information")}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="pl-4 space-y-1 mt-1">
                {informationItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    className="block py-1 text-sm text-susi-beige hover:text-susi-white"
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </details>

            {/* News section */}
            <details className="group py-1">
              <summary className="text-susi-beige hover:text-susi-white cursor-pointer flex items-center justify-between py-1">
                {t("nav.news")}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="pl-4 space-y-1 mt-1">
                {newsItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    className="block py-1 text-sm text-susi-beige hover:text-susi-white"
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </details>

            {/* Add Links and Contact Us to mobile menu */}
            <Link
              to="/links"
              className="py-2 text-susi-beige hover:text-susi-white"
              onClick={() => setIsMobileNavOpen(false)}
            >
              {t("nav.links")}
            </Link>
            <Link
              to="/contact"
              className="py-2 text-susi-beige hover:text-susi-white"
              onClick={() => setIsMobileNavOpen(false)}
            >
              {t("nav.contactUs")}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
