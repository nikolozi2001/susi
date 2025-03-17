import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPosts, deletePost } from '../../api';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t, language } = useLanguage();
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
    if (window.confirm(t('admin.confirmDelete'))) {
      try {
        // Use MongoDB API instead of Firebase
        await deletePost(postId);
        setPosts(posts.filter(post => post.id !== postId));
      } catch (err) {
        console.error('Error deleting post:', err);
        setError(t('admin.deleteError'));
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(language === 'ka' ? 'ka-GE' : 'en-US', options);
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
        <h1 className="text-3xl font-bold text-susi-black">
          {t('admin.dashboard')}
        </h1>
        <Link 
          to="/admin/posts/new" 
          className="px-4 py-2 bg-susi-gray-700 text-susi-white rounded hover:bg-susi-darkgray transition-colors"
        >
          {t('admin.newPost')}
        </Link>
      </div>

      {error && (
        <div className="p-4 mb-4 text-red-500 bg-red-50 border border-red-300 rounded">
          {error}
        </div>
      )}

      <div className="bg-susi-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-susi-gray-700 text-white">
              <tr>
                <th className="py-3 px-4 text-left">
                  {t('admin.title')}
                </th>
                <th className="py-3 px-4 text-left whitespace-nowrap w-32">
                  {t('post.publishedOn')}
                </th>
                <th className="py-3 px-4 text-left whitespace-nowrap w-28">
                  {t('admin.status')}
                </th>
                <th className="py-3 px-4 text-right whitespace-nowrap w-28">
                  {t('admin.actions')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-susi-gray-200">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <tr key={post._id || post.id} className="hover:bg-susi-gray-50">
                    <td className="py-3 px-4">
                      <div className="max-w-xs sm:max-w-sm md:max-w-md truncate" title={post.title}>
                        {post.title}
                      </div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      {formatDate(post.createdAt || post.date)}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        post.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {post.published ? t('admin.published') : t('admin.draft')}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <Link
                          to={`/admin/posts/edit/${post._id || post.id}`}
                          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                        >
                          {t('admin.edit')}
                        </Link>
                        <button
                          onClick={() => handleDelete(post._id || post.id)}
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                        >
                          {t('admin.delete')}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-sm text-susi-gray-500">
                    {t('admin.noPostsFound')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
