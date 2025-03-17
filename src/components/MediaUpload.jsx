import { useState, useRef, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import api from '../api';

export default function MediaUpload({ 
  onUploadComplete, 
  mediaType = 'image', // 'image', 'video', or 'all'
  maxSize = 10, // in MB
  allowMultiple = false,
  label,
  className = '' 
}) {
  const { t } = useLanguage();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  
  // Determine accepted file types
  const getAcceptedTypes = () => {
    switch (mediaType) {
      case 'image':
        return 'image/*';
      case 'video':
        return 'video/*';
      case 'all':
        return 'image/*,video/*';
      default:
        return 'image/*';
    }
  };
  
  // Handle file validation and upload
  const processFiles = async (files) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    setError(null);
    setProgress(0);

    try {
      const uploadResults = [];
      const maxSizeInBytes = maxSize * 1024 * 1024;

      // Handle multiple files if allowed
      const filesToProcess = allowMultiple ? Array.from(files) : [files[0]];

      for (let file of filesToProcess) {
        // Check file size
        if (file.size > maxSizeInBytes) {
          throw new Error(t('upload.fileTooLarge', { size: maxSize }));
        }

        // Check file type
        const isImage = file.type.startsWith('image/');
        const isVideo = file.type.startsWith('video/');
        
        if (mediaType === 'image' && !isImage) {
          throw new Error(t('upload.onlyImagesAllowed'));
        }
        
        if (mediaType === 'video' && !isVideo) {
          throw new Error(t('upload.onlyVideosAllowed'));
        }

        // Determine upload type for path construction
        const uploadType = isImage ? 'image' : 'video';
        const typeParam = isImage ? (uploadType === 'image' ? 'blog' : uploadType) : '';
        
        console.log(`Uploading ${uploadType} file: ${file.name} (${file.size} bytes)`);
        
        const formData = new FormData();
        formData.append('media', file);
        
        // Upload with progress tracking
        const response = await api.post(`/uploads?type=${typeParam}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percentCompleted);
          }
        });
        
        console.log('Upload successful, response:', response.data);
        uploadResults.push(response.data);
      }

      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      // Return all results to parent component
      onUploadComplete(allowMultiple ? uploadResults : uploadResults[0]);
      
      // Show success message briefly
      setProgress(100);
      setTimeout(() => setProgress(0), 1500);
      
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.message || t('upload.genericError'));
    } finally {
      setUploading(false);
    }
  };

  // Standard file input change handler
  const handleFileChange = (e) => {
    processFiles(e.target.files);
  };
  
  // Drag and drop handlers
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);
  
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  }, []);
  
  // Trigger file dialog when clicking on the dropzone
  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={`w-full ${className}`}>
      <label className="block text-susi-gray-600 mb-2 font-medium">
        {label || t('upload.selectMedia')}
      </label>
      
      <div 
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
          ${dragActive ? 'border-susi-gray-500 bg-susi-gray-50' : 'border-susi-gray-300'} 
          transition-colors duration-200`}
        onClick={handleClick}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          disabled={uploading}
          accept={getAcceptedTypes()}
          multiple={allowMultiple}
          className="hidden"
        />
        
        <div className="space-y-2">
          <div className="flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-susi-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <div className="text-sm text-susi-gray-500">
            {t('upload.dragDrop')}
          </div>
          <div className="text-xs text-susi-gray-400">
            {mediaType === 'image' 
              ? 'JPG, PNG, GIF, WEBP' 
              : mediaType === 'video' 
                ? 'MP4, WEBM, OGG, MOV' 
                : 'Images and Videos'}
          </div>
          <div className="text-xs text-susi-gray-400">
            {t('upload.maxFileSize', { size: maxSize })}
          </div>
        </div>
      </div>
      
      {uploading && (
        <div className="mt-4">
          <div className="h-2 bg-susi-gray-200 rounded-full overflow-hidden">
            <div 
              className="bg-susi-gray-700 h-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-center mt-1 text-susi-gray-500">
            {progress === 100 
              ? t('upload.uploadedSuccessfully')
              : `${progress}% ${t('upload.uploading')}`}
          </p>
        </div>
      )}
      
      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}
    </div>
  );
}
