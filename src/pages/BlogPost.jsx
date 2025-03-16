import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { posts } from '../data/posts';
import ReactMarkdown from 'react-markdown';

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const post = posts.find(post => post.slug === slug);
  
  useEffect(() => {
    if (!post) {
      navigate('/not-found', { replace: true });
    }
  }, [post, navigate]);
  
  if (!post) return null;
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
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
