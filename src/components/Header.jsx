import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-indigo-600">My Blog</Link>
        <nav className="flex gap-4">
          <Link to="/" className="text-gray-700 hover:text-indigo-600">Home</Link>
          <Link to="/about" className="text-gray-700 hover:text-indigo-600">About</Link>
        </nav>
      </div>
    </header>
  );
}
