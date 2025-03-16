import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-2xl text-gray-600 mb-8">Page Not Found</p>
      <p className="text-lg text-gray-500 mb-8 text-center">
        The page you are looking for might have been removed or is temporarily unavailable.
      </p>
      <Link 
        to="/" 
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Go Back Home
      </Link>
    </div>
  );
}
