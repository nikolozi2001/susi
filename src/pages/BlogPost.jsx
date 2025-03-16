import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPostBySlug } from '../api';
import ReactMarkdown from 'react-markdown';
import { posts as localPosts } from '../data/posts';

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        
        // Use MongoDB API instead of Firebase
        const fetchedPost = await getPostBySlug(slug);
        
        setPost({
          id: fetchedPost._id,
          title: fetchedPost.title,
          slug: fetchedPost.slug,
          excerpt: fetchedPost.excerpt,
          content: fetchedPost.content,
          image: fetchedPost.image,
          date: new Date(fetchedPost.createdAt).toLocaleDateString(),
          author: fetchedPost.author?.name || 'Unknown Author'
        });
      } catch (err) {
        console.error('Error fetching post:', err);
        
        // Try to find post in local data as fallback
        const localPost = localPosts.find(p => p.slug === slug);
        if (localPost) {
          setPost(localPost);
          setError('Using local data: MongoDB connection may be down');
        } else {
          navigate('/not-found', { replace: true });
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchPost();
  }, [slug, navigate]);
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-susi-gray-700"></div>
      </div>
    );
  }
  
  if (!post) return null;
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {error && (
        <div className="p-4 mb-4 text-yellow-700 bg-yellow-50 border border-yellow-300 rounded">
          {error}
        </div>
      )}
      
      {post.image && (
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
        />
      )}
      
      <p className="text-susi-gray-500 mb-2">{post.date}</p>
      <h1 className="text-4xl font-bold mb-6 text-susi-black">{post.title}</h1>
      
      <div className="prose lg:prose-xl max-w-none">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
      
      <div className="mt-10 pt-6 border-t border-susi-gray-300">
        <Link to="/" className="text-susi-gray-700 hover:text-susi-black">
          ← Back to all posts
        </Link>
      </div>
    </div>
  );
}
