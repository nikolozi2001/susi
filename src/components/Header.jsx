import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-susi-white shadow-md">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-susi-gray-700">My Blog</Link>
        <nav className="flex gap-4">
          <Link to="/" className="text-susi-gray-500 hover:text-susi-black">Home</Link>
          <Link to="/about" className="text-susi-gray-500 hover:text-susi-black">About</Link>
        </nav>
      </div>
    </header>
  );
}
