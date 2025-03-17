import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById, createPost, updatePost } from '../../api';
import api from '../../api'; // Import the API client
import { useAuth } from '../../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import MediaUpload from '../../components/MediaUpload';

export default function PostEditor() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState(null);
  const isEditMode = !!postId;
  const [uploadedMedia, setUploadedMedia] = useState([]);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset,
    watch,
    setValue
  } = useForm({
    defaultValues: {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      published: true
    }
  });
  
  // Watch content for preview and title for slug generation
  const content = watch('content');
  const title = watch('title');
  
  // Generate slug from title
  useEffect(() => {
    if (!isEditMode && title) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-');
      setValue('slug', generatedSlug);
    }
  }, [title, setValue, isEditMode]);
  
  // Fetch post data if in edit mode
  useEffect(() => {
    const fetchPost = async () => {
      if (isEditMode) {
        try {
          setLoading(true);
          const postData = await getPostById(postId);
          
          reset({
            title: postData.title,
            slug: postData.slug,
            excerpt: postData.excerpt,
            content: postData.content,
            published: postData.published
          });
          
          if (postData.image) {
            setImagePreview(postData.image);
          }
        } catch (err) {
          console.error('Error fetching post:', err);
          setError('Failed to load post data');
        } finally {
          setLoading(false);
        }
      }
    };
    
    fetchPost();
  }, [isEditMode, postId, navigate, reset]);

  // Handle image upload using the API client
  const uploadImage = async (file) => {
    if (!file) return null;
    
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      // Use the API client which has the correct base URL
      const response = await api.post('/uploads?type=blog', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      
      return response.data.imageUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Failed to upload image');
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const imageFile = data.image?.[0];
      let imageUrl = imagePreview;
      
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }
      
      const postData = {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        published: data.published,
        image: imageUrl,
      };
      
      if (isEditMode) {
        await updatePost(postId, postData);
      } else {
        await createPost(postData);
      }
      
      navigate('/admin');
    } catch (err) {
      console.error('Error saving post:', err);
      setError('Failed to save post: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUploadComplete = (result) => {
    // For featured image, just set the image preview
    setImagePreview(result.mediaUrl);
    setValue('imageUrl', result.mediaUrl);
  };
  
  // Handle media upload completion (for content images/videos)
  const handleContentMediaUploadComplete = (result) => {
    // Add media to the collection
    setUploadedMedia([...uploadedMedia, result]);
    
    // Insert markdown for the media into the content
    const mediaMarkdown = result.mediaType === 'video' 
      ? `<video controls src="${result.mediaUrl}" style="max-width: 100%;"></video>\n\n`
      : `![](${result.mediaUrl})\n\n`;
    
    const currentContent = watch('content') || '';
    setValue('content', currentContent + mediaMarkdown);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-susi-black">
          {isEditMode ? 'Edit Post' : 'Create New Post'}
        </h1>
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="px-4 py-2 bg-susi-gray-500 text-susi-white rounded hover:bg-susi-gray-600 transition-colors"
        >
          {showPreview ? 'Hide Preview' : 'Show Preview'}
        </button>
      </div>
      
      {error && (
        <div className="p-4 mb-4 text-red-500 bg-red-50 border border-red-300 rounded">
          {error}
        </div>
      )}
      
      <div className={`grid ${showPreview ? 'grid-cols-1 lg:grid-cols-2 gap-6' : 'grid-cols-1'}`}>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-susi-gray-600 mb-1">
                  Title *
                </label>
                <input
                  id="title"
                  type="text"
                  className="w-full p-2 border border-susi-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-susi-gray-500"
                  placeholder="Post title"
                  {...register('title', { required: 'Title is required' })}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="slug" className="block text-susi-gray-600 mb-1">
                  Slug *
                </label>
                <input
                  id="slug"
                  type="text"
                  className="w-full p-2 border border-susi-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-susi-gray-500"
                  placeholder="post-url-slug"
                  {...register('slug', { required: 'Slug is required' })}
                />
                {errors.slug && (
                  <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>
                )}
              </div>
            </div>
            
            <div>
              <label htmlFor="excerpt" className="block text-susi-gray-600 mb-1">
                Excerpt *
              </label>
              <textarea
                id="excerpt"
                rows="3"
                className="w-full p-2 border border-susi-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-susi-gray-500"
                placeholder="Brief description of the post"
                {...register('excerpt', { required: 'Excerpt is required' })}
              ></textarea>
              {errors.excerpt && (
                <p className="text-red-500 text-sm mt-1">{errors.excerpt.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="content" className="block text-susi-gray-600 mb-1">
                Content * (Markdown supported)
              </label>
              
              {/* Media upload for content */}
              <div className="mb-2">
                <MediaUpload
                  onUploadComplete={handleContentMediaUploadComplete}
                  mediaType="all"
                  maxSize={50}
                  label="Add Media"
                />
              </div>
              
              <textarea
                id="content"
                rows="12"
                className="w-full p-2 border border-susi-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-susi-gray-500 font-mono"
                placeholder="Write your post content here... Markdown is supported"
                {...register('content', { required: 'Content is required' })}
              ></textarea>
              {errors.content && (
                <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
              )}
              
              {/* Display uploaded media for reference */}
              {uploadedMedia.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-susi-gray-500 mb-2">Uploaded Media:</p>
                  <div className="grid grid-cols-4 gap-2">
                    {uploadedMedia.map((media, index) => (
                      <div key={index} className="relative">
                        {media.mediaType === 'video' ? (
                          <video 
                            src={media.mediaUrl} 
                            className="w-full h-16 object-cover rounded border border-susi-gray-300" 
                          />
                        ) : (
                          <img 
                            src={media.mediaUrl} 
                            alt={`Upload ${index + 1}`} 
                            className="w-full h-16 object-cover rounded border border-susi-gray-300" 
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-susi-gray-600 mb-1">
                Featured Image
              </label>
              
              <MediaUpload
                onUploadComplete={handleImageUploadComplete}
                mediaType="image"
                maxSize={5}
                label="Select Image"
              />
              
              {/* Hidden input to store the image URL */}
              <input 
                type="hidden" 
                {...register('imageUrl')} 
              />
              
              {imagePreview && (
                <div className="mt-2">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="h-40 object-cover rounded border border-susi-gray-300" 
                  />
                </div>
              )}
            </div>
            
            <div className="flex items-center">
              <input
                id="published"
                type="checkbox"
                className="h-4 w-4 text-susi-gray-700 focus:ring-susi-gray-500 border-susi-gray-300 rounded"
                {...register('published')}
              />
              <label htmlFor="published" className="ml-2 block text-susi-gray-600">
                Publish post
              </label>
            </div>
            
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-susi-gray-700 text-susi-white rounded hover:bg-susi-darkgray transition-colors disabled:bg-susi-gray-400 flex-grow"
              >
                {loading ? 'Saving...' : (isEditMode ? 'Update Post' : 'Create Post')}
              </button>
              
              <button
                type="button"
                onClick={() => navigate('/admin')}
                disabled={loading}
                className="px-6 py-2 border border-susi-gray-300 text-susi-gray-700 rounded hover:bg-susi-lightbeige transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
        
        {showPreview && (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Preview</h2>
            <div className="prose max-w-none">
              <ReactMarkdown>{content || 'Nothing to preview yet'}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
