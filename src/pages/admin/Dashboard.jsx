import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPosts, deletePost } from '../../api';
import { useAuth } from '../../contexts/AuthContext';

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        // Use MongoDB API instead of Firebase
        const fetchedPosts = await getPosts({ all: true });
        
        // Format posts for display
        const formattedPosts = fetchedPosts.map(post => ({
          id: post._id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          image: post.image,
          published: post.published,
          createdAt: post.createdAt,
        }));
        
        setPosts(formattedPosts);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        // Use MongoDB API instead of Firebase
        await deletePost(postId);
        setPosts(posts.filter(post => post.id !== postId));
      } catch (err) {
        console.error('Error deleting post:', err);
        setError('Failed to delete post. Please try again later.');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-susi-gray-700"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-susi-black">Admin Dashboard</h1>
        <Link 
          to="/admin/posts/new" 
          className="px-4 py-2 bg-susi-gray-700 text-susi-white rounded hover:bg-susi-darkgray transition-colors"
        >
          New Post
        </Link>
      </div>

      {error && (
        <div className="p-4 mb-4 text-red-500 bg-red-50 border border-red-300 rounded">
          {error}
        </div>
      )}

      <div className="bg-susi-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-susi-gray-300">
          <thead className="bg-susi-lightbeige">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-susi-gray-600 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-susi-gray-600 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-susi-gray-600 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-bold text-susi-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-susi-gray-300">
            {posts.map(post => (
              <tr key={post.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-susi-gray-700">{post.title}</div>
                  <div className="text-sm text-susi-gray-500 truncate max-w-xs">{post.excerpt}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-susi-gray-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    post.published 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link 
                    to={`/admin/posts/edit/${post.id}`}
                    className="text-susi-gray-600 hover:text-susi-black mr-4"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            
            {posts.length === 0 && (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-sm text-susi-gray-500">
                  No posts found. Create your first post!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
