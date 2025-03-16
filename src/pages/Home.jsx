import { useState, useEffect } from 'react';
import { getPosts } from '../api';
import BlogCard from '../components/BlogCard';
import { posts as localPosts } from '../data/posts';
import { useLanguage } from '../contexts/LanguageContext';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingLocal, setUsingLocal] = useState(false);
  const { t } = useLanguage();
  
  // Debounce search term to avoid too many API calls
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  
  // Debounce the search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // Wait 500ms before applying the search term
    
    return () => clearTimeout(timer);
  }, [searchTerm]);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        console.log('Fetching posts with searchTerm:', debouncedSearchTerm);
        
        // Get posts - the API function already handles fallback to local data
        const fetchedPosts = await getPosts({ 
          published: true,
          search: debouncedSearchTerm || undefined 
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
          setError(t('errors.connectionError'));
        } else {
          setError(null);
        }
      } catch (err) {
        console.error('Error in component when fetching posts:', err);
        setError(t('errors.connectionError'));
        setUsingLocal(true);
        
        // Filter local posts when using local data as fallback
        const filteredPosts = localPosts
          .filter(post => 
            post.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
          )
          .map(post => ({
            ...post,
            id: post.id || Math.random().toString(36).substr(2, 9)
          }));
          
        setPosts(filteredPosts);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, [debouncedSearchTerm, t]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-susi-black">{t('home.blogPosts')}</h1>
      
      {error && (
        <div className="p-4 mb-4 text-yellow-700 bg-yellow-50 border border-yellow-300 rounded">
          {error}
        </div>
      )}
      
      <div className="mb-8">
        <input
          type="text"
          placeholder={t('home.searchPosts')}
          className="w-full p-3 border border-susi-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-susi-gray-500 bg-susi-white text-susi-gray-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-susi-gray-700"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <BlogCard key={post.id || post.slug} post={post} />
            ))}
          </div>
          
          {posts.length === 0 && (
            <div className="text-center py-10">
              <p className="text-xl text-susi-gray-600">{t('home.noPostsFound')}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
