import { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import api from '../../api';
import MediaUpload from '../../components/MediaUpload';

export default function VideoGallery() {
  const { t } = useLanguage();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  
  // Check if user is admin
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const response = await api.get('/auth/me');
          setIsAdmin(response.data.role === 'admin');
        }
      } catch (err) {
        console.error('Error checking admin status:', err);
      }
    };
    
    checkAdmin();
  }, []);
  
  // Fetch videos from server
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        console.log('Fetching videos from gallery endpoint...');
        const response = await api.get('/uploads/gallery/videos');
        console.log('Videos response:', response.data);
        setVideos(response.data || []);
      } catch (err) {
        console.error('Error fetching videos:', err);
        console.error('Error details:', err.response?.data || 'No response data');
        setError(t('gallery.loadingError'));
        
        // Use demo data as fallback
        console.log('Using demo video data as fallback');
        setVideos([
          { 
            id: '1', 
            url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            title: 'Security Briefing', 
            thumbnail: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?q=80&w=1548',
            createdAt: '2023-06-15' 
          },
          { 
            id: '2', 
            url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            title: 'Training Session', 
            thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1470',
            createdAt: '2023-07-22' 
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchVideos();
  }, [t]);
  
  const handleUploadComplete = (result) => {
    // Add new video to the list
    setVideos(prevVideos => [result, ...prevVideos]);
  };
  
  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };
  
  const handleDelete = async (videoId) => {
    if (!isAdmin || !window.confirm(t('gallery.confirmDelete'))) return;
    
    try {
      await api.delete(`/uploads/${videoId}?mediaType=video`);
      setVideos(videos.filter(video => video.id !== videoId));
      if (selectedVideo?.id === videoId) {
        setSelectedVideo(null);
      }
    } catch (err) {
      console.error('Error deleting video:', err);
      alert(t('gallery.deleteError'));
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-susi-black">{t('news.videoGallery')}</h1>
      
      {error && (
        <div className="p-4 mb-4 text-yellow-700 bg-yellow-50 border border-yellow-300 rounded">
          {error}
        </div>
      )}
      
      {/* Admin upload section */}
      {isAdmin && (
        <div className="mb-8 p-6 bg-susi-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">{t('gallery.uploadNewVideo')}</h2>
          <MediaUpload
            onUploadComplete={handleUploadComplete}
            mediaType="video"
            maxSize={50}
            label={t('upload.selectVideo')}
            className="mb-4"
          />
        </div>
      )}
      
      {/* Video grid */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-susi-gray-700"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map(video => (
            <div key={video.id} className="relative group">
              <div 
                className="aspect-video overflow-hidden bg-susi-gray-100 rounded cursor-pointer"
                onClick={() => handleVideoClick(video)}
              >
                {video.thumbnail ? (
                  <div className="relative h-full">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title || 'Video thumbnail'} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-susi-black bg-opacity-60 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ) : (
                  <video 
                    src={video.url || video.mediaUrl} 
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="mt-2">
                <h3 className="text-lg font-medium text-susi-gray-800">{video.title || 'Untitled Video'}</h3>
                <p className="text-sm text-susi-gray-500">
                  {new Date(video.createdAt).toLocaleDateString()}
                </p>
              </div>
              {isAdmin && (
                <button
                  onClick={() => handleDelete(video.id)}
                  className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
      )}
      
      {/* Video modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="relative w-full max-w-4xl">
            <video 
              src={selectedVideo.url || selectedVideo.mediaUrl} 
              className="w-full" 
              controls 
              autoPlay
            ></video>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedVideo(null);
              }}
              className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
