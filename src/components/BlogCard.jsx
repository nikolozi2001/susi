import { Link } from 'react-router-dom';

export default function BlogCard({ post }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {post.image && (
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <p className="text-sm text-gray-500 mb-2">{post.date}</p>
        <h2 className="text-xl font-bold mb-2">{post.title}</h2>
        <p className="text-gray-700 mb-4 line-clamp-3">{post.excerpt}</p>
        <Link 
          to={`/post/${post.slug}`}
          className="text-indigo-600 font-medium hover:underline"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}
