import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLanguage } from '../contexts/LanguageContext';
import api from '../api';

export default function Contact() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm();
  
  const onSubmit = async (data) => {
    try {
      setSending(true);
      // Here you would send the data to your backend
      console.log("Contact form data:", data);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form and show success message
      reset();
      setSubmitted(true);
      setError(null);
    } catch (err) {
      console.error("Error submitting form:", err);
      setError(t('contact.submitError'));
    } finally {
      setSending(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-susi-black mb-6">
        {t('contact.title')}
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="bg-susi-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-susi-darkgray mb-4">
            {t('contact.contactInfo')}
          </h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-susi-gray-700">{t('contact.address')}</h3>
              <p className="text-susi-gray-600">{t('contact.addressValue')}</p>
            </div>
            
            <div>
              <h3 className="font-bold text-susi-gray-700">{t('contact.phone')}</h3>
              <p className="text-susi-gray-600">{t('contact.phoneValue')}</p>
            </div>
            
            <div>
              <h3 className="font-bold text-susi-gray-700">{t('contact.fax')}</h3>
              <p className="text-susi-gray-600">{t('contact.faxValue')}</p>
            </div>
            
            <div>
              <h3 className="font-bold text-susi-gray-700">{t('contact.email')}</h3>
              <a href="mailto:info@ssg.gov.ge" className="text-susi-gray-600 hover:underline">
                info@ssg.gov.ge
              </a>
            </div>
          </div>
          
          {/* Map */}
          <div className="mt-6">
            <h3 className="font-bold text-susi-gray-700 mb-2">{t('contact.findUs')}</h3>
            <div className="aspect-[4/3] w-full bg-susi-gray-200 rounded overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2977.8485799757777!2d44.73135797634089!3d41.723786171259036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4044730e74a5d135%3A0xf3cfd2aa3f32b416!2z4YOh4YOQ4YOu4YOU4YOa4YOb4YOs4YOY4YOk4YOdIOGDo-GDoeGDkOGDpOGDoOGDl-GDruGDneGDlOGDkeGDmOGDoSDhg6Hhg5Dhg5vhg6Hhg5Dhg67hg6Phg6Dhg5g!5e0!3m2!1ska!2sge!4v1742229468030!5m2!1ska!2sge" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
              ></iframe>
            </div>
          </div>
        </div>
        
        {/* Contact Form */}
        <div className="bg-susi-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-susi-darkgray mb-4">
            {t('contact.contactForm')}
          </h2>
          
          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <h3 className="text-lg font-bold text-green-700 mb-2">{t('contact.thankYou')}</h3>
              <p className="text-green-700 mb-4">
                {t('contact.submissionSuccess')}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                {t('contact.submitAnother')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded">
                  {error}
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                  <label htmlFor="firstName" className="block text-susi-gray-600 mb-1">
                    {t('contact.firstName')} *
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    className="w-full p-3 border border-susi-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-susi-gray-500"
                    {...register('firstName', { required: t('contact.required') })}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                  )}
                </div>
                
                {/* Last Name */}
                <div>
                  <label htmlFor="lastName" className="block text-susi-gray-600 mb-1">
                    {t('contact.lastName')} *
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    className="w-full p-3 border border-susi-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-susi-gray-500"
                    {...register('lastName', { required: t('contact.required') })}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                  )}
                </div>
              </div>
              
              {/* Personal ID */}
              <div>
                <label htmlFor="personalId" className="block text-susi-gray-600 mb-1">
                  {t('contact.personalId')} *
                </label>
                <input
                  id="personalId"
                  type="text"
                  className="w-full p-3 border border-susi-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-susi-gray-500"
                  {...register('personalId', { 
                    required: t('contact.required'),
                    pattern: {
                      value: /^\d{11}$/,
                      message: t('contact.invalidPersonalId')
                    }
                  })}
                />
                {errors.personalId && (
                  <p className="text-red-500 text-sm mt-1">{errors.personalId.message}</p>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-susi-gray-600 mb-1">
                    {t('contact.phone')} *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className="w-full p-3 border border-susi-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-susi-gray-500"
                    {...register('phone', { required: t('contact.required') })}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>
                
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-susi-gray-600 mb-1">
                    {t('contact.email')} *
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full p-3 border border-susi-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-susi-gray-500"
                    {...register('email', { 
                      required: t('contact.required'),
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: t('contact.invalidEmail')
                      }
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>
              
              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-susi-gray-600 mb-1">
                  {t('contact.address')} *
                </label>
                <input
                  id="address"
                  type="text"
                  className="w-full p-3 border border-susi-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-susi-gray-500"
                  {...register('address', { required: t('contact.required') })}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                )}
              </div>
              
              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-susi-gray-600 mb-1">
                  {t('contact.subject')}
                </label>
                <input
                  id="subject"
                  type="text"
                  className="w-full p-3 border border-susi-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-susi-gray-500"
                  {...register('subject')}
                />
              </div>
              
              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-susi-gray-600 mb-1">
                  {t('contact.message')} *
                </label>
                <textarea
                  id="message"
                  rows="5"
                  className="w-full p-3 border border-susi-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-susi-gray-500"
                  {...register('message', { required: t('contact.required') })}
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>
              
              <div className="text-right">
                <button
                  type="submit"
                  disabled={sending}
                  className="px-6 py-3 bg-susi-gray-700 text-susi-white rounded hover:bg-susi-darkgray transition-colors disabled:bg-susi-gray-400"
                >
                  {sending ? t('contact.sending') : t('contact.send')}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
