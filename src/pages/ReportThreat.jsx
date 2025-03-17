import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLanguage } from '../contexts/LanguageContext';
import MediaUpload from '../components/MediaUpload';

export default function ReportThreat() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [uploadedMedia, setUploadedMedia] = useState([]);
  
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm();
  
  const onUploadComplete = (result) => {
    // Add the new media to our list
    setUploadedMedia([...uploadedMedia, result]);
  };
  
  const removeMedia = (indexToRemove) => {
    setUploadedMedia(uploadedMedia.filter((_, index) => index !== indexToRemove));
  };
  
  const onSubmit = async (data) => {
    try {
      setSending(true);
      // Combine form data with uploaded media
      const reportData = {
        ...data,
        media: uploadedMedia
      };
      
      // Here you would normally send the data to your backend
      console.log("Threat report data:", reportData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form and media uploads
      reset();
      setUploadedMedia([]);
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting report:", error);
    } finally {
      setSending(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-red-700 mb-2">
        {t('reportThreat.title')}
      </h1>
      <p className="text-susi-gray-600 mb-6">
        {t('reportThreat.introduction')}
      </p>
      
      {/* Security information message */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-bold text-blue-800 mb-2">
          {t('hotline.reportThreats')}
        </h3>
        <div className="text-susi-gray-700 whitespace-pre-line">
          {t('reportThreat.securityMessage')}
        </div>
      </div>
      
      {submitted ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <h2 className="text-xl text-green-700 font-bold mb-2">{t('reportThreat.thankYou')}</h2>
          <p className="text-green-700 mb-4">
            {t('reportThreat.submissionSuccess')}
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {t('reportThreat.submitAnother')}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-4">
            <label htmlFor="reportType" className="block text-susi-gray-600 mb-1 font-medium">
              {t('reportThreat.threatType')}
            </label>
            <select
              id="reportType"
              className="w-full p-3 border border-susi-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              {...register('reportType', { required: t('reportThreat.selectTypeError') })}
            >
              <option value="">{t('reportThreat.threatTypeSelect')}</option>
              <option value="suspicious_activity">{t('reportThreat.suspiciousActivity')}</option>
              <option value="cybercrime">{t('reportThreat.cybercrime')}</option>
              <option value="terrorism">{t('reportThreat.terrorism')}</option>
              <option value="violence">{t('reportThreat.violence')}</option>
              <option value="other">{t('reportThreat.other')}</option>
            </select>
            {errors.reportType && (
              <p className="text-red-500 text-sm mt-1">{errors.reportType.message}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label htmlFor="description" className="block text-susi-gray-600 mb-1 font-medium">
              {t('reportThreat.description')}
            </label>
            <textarea
              id="description"
              rows="5"
              className="w-full p-3 border border-susi-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder={t('reportThreat.descriptionPlaceholder')}
              {...register('description', { 
                required: t('reportThreat.descriptionRequired'),
                minLength: { value: 20, message: t('reportThreat.minDescription') }
              })}
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>
          
          {/* Media upload section */}
          <div className="mb-6">
            <MediaUpload
              onUploadComplete={onUploadComplete}
              mediaType="all"
              maxSize={50}
              label={t('upload.addMedia')}
            />
            
            {/* Display uploaded media */}
            {uploadedMedia.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {uploadedMedia.map((media, index) => (
                  <div key={index} className="relative group">
                    {media.mediaType === 'video' ? (
                      <video 
                        src={media.mediaUrl} 
                        className="w-full h-24 object-cover rounded border border-susi-gray-300" 
                        controls
                      />
                    ) : (
                      <img 
                        src={media.mediaUrl} 
                        alt={`Upload ${index + 1}`} 
                        className="w-full h-24 object-cover rounded border border-susi-gray-300" 
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => removeMedia(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="location" className="block text-susi-gray-600 mb-1 font-medium">
                {t('reportThreat.location')}
              </label>
              <input
                id="location"
                type="text"
                className="w-full p-3 border border-susi-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder={t('reportThreat.locationPlaceholder')}
                {...register('location')}
              />
            </div>
            
            <div>
              <label htmlFor="date" className="block text-susi-gray-600 mb-1 font-medium">
                {t('reportThreat.dateTime')}
              </label>
              <input
                id="date"
                type="datetime-local"
                className="w-full p-3 border border-susi-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                {...register('date')}
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="contact" className="block text-susi-gray-600 mb-1 font-medium">
              {t('reportThreat.contactInfo')}
            </label>
            <input
              id="contact"
              type="text"
              className="w-full p-3 border border-susi-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder={t('reportThreat.contactInfoPlaceholder')}
              {...register('contact')}
            />
            <p className="text-xs text-susi-gray-500 mt-1">
              {t('reportThreat.contactInfoHelp')}
            </p>
          </div>
          
          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-red-600 focus:ring-red-500"
                {...register('anonymous', { required: false })}
              />
              <span className="ml-2 text-sm text-susi-gray-600">
                {t('reportThreat.anonymous')}
              </span>
            </label>
          </div>
          
          <div className="text-right">
            <button
              type="submit"
              disabled={sending}
              className="px-6 py-3 bg-red-700 text-white rounded hover:bg-red-800 transition-colors disabled:bg-red-300"
            >
              {sending ? t('reportThreat.submitting') : t('reportThreat.submit')}
            </button>
          </div>
        </form>
      )}
      
      <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-lg font-bold text-red-700">{t('reportThreat.emergencyContact')}</h3>
        <p className="text-susi-gray-600">
          {t('reportThreat.emergencyInstructions')}
        </p>
        <a 
          href="tel:123" 
          className="text-2xl font-bold text-red-700 mt-2 block hover:underline"
        >
          123
        </a>
      </div>
    </div>
  );
}
