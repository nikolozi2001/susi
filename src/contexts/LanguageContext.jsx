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
  
  // Function to change language
  const changeLanguage = (lang) => {
    if (languages[lang]) {
      setLanguage(lang);
      localStorage.setItem('language', lang);
      // Set html lang attribute
      document.documentElement.lang = lang;
    }
  };
  
  // Set initial html lang attribute
  useEffect(() => {
    document.documentElement.lang = language;
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
