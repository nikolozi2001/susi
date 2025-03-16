import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';

export default function Header() {
  const { currentUser, logout, isAdmin } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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

  return (
    <header className="bg-susi-white shadow-md">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-susi-gray-700">My Blog</Link>
        <nav className="flex gap-4 items-center">
          <Link to="/" className="text-susi-gray-500 hover:text-susi-black">Home</Link>
          
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
        </nav>
      </div>
    </header>
  );
}
