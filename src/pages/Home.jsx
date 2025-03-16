import { useState, useEffect } from 'react';
import { getPosts } from '../api';
import BlogCard from '../components/BlogCard';
import { posts as localPosts } from '../data/posts';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingLocal, setUsingLocal] = useState(false);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        console.log('Fetching posts with searchTerm:', searchTerm);
        
        // Get posts - the API function already handles fallback to local data
        const fetchedPosts = await getPosts({ 
          published: true,
          search: searchTerm || undefined 
        });
        
        console.log('Fetched posts:', fetchedPosts);
        
        // Check if we're using local data by examining the structure
        const isLocalData = fetchedPosts && 
          Array.isArray(fetchedPosts) && 
          fetchedPosts.length > 0 && 
          !fetchedPosts[0]._id;
        
        // Format posts for display
        const formattedPosts = fetchedPosts.map(post => ({
          id: post._id || post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          image: post.image,
          date: post.date || (post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Unknown date'),
          author: post.author?.name || 'Unknown Author'
        }));
        
        setPosts(formattedPosts);
        setUsingLocal(isLocalData);
        
        if (isLocalData) {
          setError('Could not connect to the server. Using sample data.');
        } else {
          setError(null);
        }
      } catch (err) {
        console.error('Error in component when fetching posts:', err);
        setError('Failed to load posts. Using local sample data.');
        setUsingLocal(true);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, [searchTerm]);
  
  // Filter local posts when using local data
  const displayedPosts = usingLocal 
    ? localPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
    : posts;
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-susi-gray-700"></div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-susi-black">Blog Posts</h1>
      
      {error && (
        <div className="p-4 mb-4 text-yellow-700 bg-yellow-50 border border-yellow-300 rounded">
          {error}
        </div>
      )}
      
      {usingLocal && (
        <div className="p-4 mb-4 text-blue-700 bg-blue-50 border border-blue-300 rounded">
          Using local sample data. The MongoDB connection is not available.
        </div>
      )}
      
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
        {displayedPosts.map(post => (
          <BlogCard key={post.id || post.slug} post={post} />
        ))}
      </div>
      
      {displayedPosts.length === 0 && (
        <div className="text-center py-10">
          <p className="text-xl text-susi-gray-600">No posts found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
}
