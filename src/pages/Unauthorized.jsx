import { Link } from 'react-router-dom';

export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <h1 className="text-6xl font-bold text-susi-gray-800 mb-4">403</h1>
      <p className="text-2xl text-susi-gray-600 mb-8">Access Denied</p>
      <p className="text-lg text-susi-gray-500 mb-8 text-center max-w-2xl">
        You don't have permission to access this page. If you believe this is an error, 
        please contact the administrator.
      </p>
      <Link 
        to="/" 
        className="px-6 py-3 bg-susi-gray-700 text-susi-white rounded-lg hover:bg-susi-darkgray transition-colors"
      >
        Go Back Home
      </Link>
    </div>
  );
}
