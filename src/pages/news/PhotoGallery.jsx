import { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import api from '../../api';
import MediaUpload from '../../components/MediaUpload';

export default function PhotoGallery() {
  const { t } = useLanguage();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  
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
  
  // Fetch photos from server
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        console.log('Fetching photos from gallery endpoint...');
        const response = await api.get('/uploads/gallery/photos');
        console.log('Photos response:', response.data);
        setPhotos(response.data || []);
      } catch (err) {
        console.error('Error fetching photos:', err);
        console.error('Error details:', err.response?.data || 'No response data');
        setError(t('errors.loadingError'));
        // Use demo data as fallback
        console.log('Using demo photo data as fallback');
        setPhotos([
          { 
            id: '1', 
            url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=1562',
            title: 'Office Meeting', 
            createdAt: '2023-06-15' 
          },
          { 
            id: '2', 
            url: 'https://images.unsplash.com/photo-1551739440-5dd934d3a94a?q=80&w=1528',
            title: 'Security Training', 
            createdAt: '2023-07-22' 
          },
          { 
            id: '3', 
            url: 'https://images.unsplash.com/photo-1593642532871-8b12e02d091c?q=80&w=1530',
            title: 'Cybersecurity Equipment', 
            createdAt: '2023-08-10' 
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPhotos();
  }, [t]);
  
  const handleUploadComplete = (result) => {
    console.log('Upload completed:', result);
    // Add new photo to the list
    setPhotos(prevPhotos => [result, ...prevPhotos]);
  };
  
  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
  };
  
  const handleDelete = async (photoId) => {
    if (!isAdmin || !window.confirm(t('gallery.confirmDelete'))) return;
    
    try {
      await api.delete(`/uploads/${photoId}`);
      setPhotos(photos.filter(photo => photo.id !== photoId));
      if (selectedPhoto?.id === photoId) {
        setSelectedPhoto(null);
      }
    } catch (err) {
      console.error('Error deleting photo:', err);
      alert(t('gallery.deleteError'));
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-susi-black">{t('news.photoGallery')}</h1>
      
      {error && (
        <div className="p-4 mb-4 text-yellow-700 bg-yellow-50 border border-yellow-300 rounded">
          {error}
        </div>
      )}
      
      {/* Admin upload section */}
      {isAdmin && (
        <div className="mb-8 p-6 bg-susi-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">{t('gallery.uploadNewPhoto')}</h2>
          <MediaUpload
            onUploadComplete={handleUploadComplete}
            mediaType="image"
            maxSize={10}
            label={t('upload.selectImage')}
            className="mb-4"
          />
        </div>
      )}
      
      {/* Photo grid */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-susi-gray-700"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {photos.map(photo => (
            <div key={photo.id} className="relative group">
              <div 
                className="aspect-square overflow-hidden bg-susi-gray-100 rounded cursor-pointer"
                onClick={() => handlePhotoClick(photo)}
              >
                <img 
                  src={photo.url || photo.mediaUrl} 
                  alt={photo.title || 'Gallery photo'} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
              {isAdmin && (
                <button
                  onClick={() => handleDelete(photo.id)}
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
      
      {/* Photo modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden">
            <img 
              src={selectedPhoto.url || selectedPhoto.mediaUrl} 
              alt={selectedPhoto.title || 'Gallery photo'} 
              className="max-w-full max-h-[90vh] object-contain"
            />
            <button
              onClick={() => setSelectedPhoto(null)}
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
