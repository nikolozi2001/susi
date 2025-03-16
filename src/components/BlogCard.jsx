import { Link } from 'react-router-dom';

export default function BlogCard({ post }) {
  return (
    <div className="bg-susi-white rounded-lg shadow-md overflow-hidden">
      {post.image && (
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <p className="text-sm text-susi-gray-500 mb-2">{post.date}</p>
        <h2 className="text-xl font-bold mb-2 text-susi-darkgray">{post.title}</h2>
        <p className="text-susi-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
        <Link 
          to={`/post/${post.slug}`}
          className="text-susi-gray-700 font-medium hover:text-susi-black"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}
