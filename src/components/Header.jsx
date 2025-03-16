import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
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

export default function Header() {
  const { currentUser, logout, isAdmin } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Define navigation dropdown items
  const aboutUsItems = [
    { label: "Information", path: "/about/information" },
    { label: "Head and Deputies", path: "/about/head-deputies" }
  ];
  
  const informationItems = [
    { label: "Standard Acts", path: "/info/standard-acts" },
    { label: "International Cooperation", path: "/info/international-cooperation" },
    { label: "Reports", path: "/info/reports" }
  ];
  
  const newsItems = [
    { label: "News", path: "/news" },
    { label: "Photo Gallery", path: "/news/photo-gallery" },
    { label: "Video Gallery", path: "/news/video-gallery" }
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
            <Link to="/" className="text-susi-gray-500 hover:text-susi-black">Home</Link>
            <NavDropdown title="About Us" items={aboutUsItems} />
            <NavDropdown title="Information" items={informationItems} />
            <NavDropdown title="News" items={newsItems} />
          </nav>
        </div>
        
        {/* User authentication section */}
        <nav className="flex gap-4 items-center">
          {isAdmin && (
            <Link to="/admin" className="text-susi-gray-500 hover:text-susi-black">
              Admin
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
                {isLoggingOut ? 'Logging out...' : 'Logout'}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-susi-gray-500 hover:text-susi-black">
                Login
              </Link>
              <Link to="/signup" className="px-4 py-2 bg-susi-gray-700 text-susi-white rounded hover:bg-susi-darkgray transition-colors">
                Sign Up
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
              Home
            </Link>
            
            {/* About Us section */}
            <details className="group py-1">
              <summary className="text-susi-gray-500 hover:text-susi-black cursor-pointer flex items-center justify-between py-1">
                About Us
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
                Information
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
                News
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
