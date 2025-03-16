import { useState } from 'react';
import { posts } from '../data/posts';
import BlogCard from '../components/BlogCard';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-susi-black">Blog Posts</h1>
      
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search posts..."
          className="w-full p-3 border border-susi-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-susi-gray-500 bg-susi-white text-susi-gray-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map(post => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
      
      {filteredPosts.length === 0 && (
        <div className="text-center py-10">
          <p className="text-xl text-susi-gray-600">No posts found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
}
