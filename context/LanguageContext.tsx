import React, { createContext, useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../utils/i18n';

// Define the context type
type LanguageContextType = {
  language: string;
  setLanguage: (language: string) => Promise<void>;
  availableLanguages: { code: string; name: string }[];
};

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: async () => {},
  availableLanguages: [
    { code: 'en', name: 'English' },
    { code: 'vi', name: 'Tiếng Việt' }
  ]
});

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);

// Language provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  const [language, setLanguageState] = useState(i18n.language || 'en');
  
  // Available languages
  const availableLanguages = [
    { code: 'en', name: 'English' },
    { code: 'vi', name: 'Tiếng Việt' }
  ];

  // Initialize language from storage on component mount
  useEffect(() => {
    const initLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem('user-language');
        if (storedLanguage) {
          await i18n.changeLanguage(storedLanguage);
          setLanguageState(storedLanguage);
        }
      } catch (error) {
        console.error('Error initializing language:', error);
      }
    };
    
    initLanguage();
  }, []);

  // Function to change language
  const setLanguage = async (languageCode: string) => {
    try {
      await i18n.changeLanguage(languageCode);
      await AsyncStorage.setItem('user-language', languageCode);
      setLanguageState(languageCode);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  // Context value
  const contextValue: LanguageContextType = {
    language,
    setLanguage,
    availableLanguages
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
