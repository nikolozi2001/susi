import { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function MediaViewer({ media, onClose }) {
  const { t } = useLanguage();
  const isVideo = media?.mediaType === 'video' || 
                 (media?.url && media.url.match(/\.(mp4|webm|ogg|mov)$/i));
  
  // Prevent scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  
  // Handle ESC key to close viewer
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);
  
  if (!media) return null;
  
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {isVideo ? (
          <video 
            src={media.url || media.mediaUrl} 
            className="max-w-full max-h-[90vh]" 
            controls 
            autoPlay
          ></video>
        ) : (
          <img 
            src={media.url || media.mediaUrl} 
            alt={media.title || 'Media'} 
            className="max-w-full max-h-[90vh] object-contain"
          />
        )}
        
        {media.title && (
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-3">
            <h3 className="font-medium">{media.title}</h3>
            {media.description && <p className="text-sm mt-1">{media.description}</p>}
          </div>
        )}
        
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
