import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '../translations/en';
import ka from '../translations/ka';

// Available languages
const languages = {
  ka,
  en
};

// Default language is Georgian
const defaultLanguage = 'ka';

// Create context
export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Try to get language from localStorage or use default
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage && languages[savedLanguage] ? savedLanguage : defaultLanguage;
  });
  
  // Get translations for current language
  const translations = languages[language] || languages[defaultLanguage];
  
  // Helper function to update document title
  const updateDocumentTitle = (lang) => {
    document.title = lang === 'ka' 
      ? 'საქართველოს სახელმწიფო უსაფრთხოების სამსახური'
      : 'State Security Service of Georgia';
  };
  
  // Helper function to update favicon
  const updateFavicon = (lang) => {
    const favicon = document.getElementById('favicon');
    if (favicon) {
      favicon.href = lang === 'ka' 
        ? '/src/assets/images/logo.png'
        : '/src/assets/images/logo_en.png';
    }
  };
  
  // Function to change language
  const changeLanguage = (lang) => {
    if (languages[lang]) {
      // Update language in state
      setLanguage(lang);
      
      // Save to localStorage
      localStorage.setItem('language', lang);
      
      // Set html lang attribute
      document.documentElement.lang = lang;
      
      // Update document title and favicon immediately
      updateDocumentTitle(lang);
      updateFavicon(lang);
      
      // Dispatch a custom event that components can listen for
      window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
    }
  };
  
  // Set initial html lang attribute, title and favicon
  useEffect(() => {
    document.documentElement.lang = language;
    updateDocumentTitle(language);
    updateFavicon(language);
  }, [language]);
  
  // Translate function
  const t = (key) => {
    // Nested key support (e.g., "nav.home")
    const keys = key.split('.');
    let translation = translations;
    
    for (const k of keys) {
      translation = translation?.[k];
      if (!translation) break;
    }
    
    return translation || key; // Fallback to key if translation not found
  };
  
  return (
    <LanguageContext.Provider 
      value={{ language, changeLanguage, t, availableLanguages: Object.keys(languages) }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use language context
export const useLanguage = () => useContext(LanguageContext);
