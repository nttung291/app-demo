import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import translations
import en from '../translations/en.json';
import es from '../translations/es.json';

// Language resources
const resources = {
  en: {
    translation: en
  },
  es: {
    translation: es
  }
};

// Language detection and caching
const LANGUAGE_DETECTOR = {
  type: 'languageDetector',
  async: true,
  detect: async (callback: (lng: string) => void) => {
    try {
      // Get stored language from AsyncStorage
      const storedLanguage = await AsyncStorage.getItem('user-language');
      
      if (storedLanguage) {
        // Return stored language
        return callback(storedLanguage);
      } else {
        // If no stored language, use device language
        const deviceLanguage = getLocales()[0]?.languageCode || 'en';
        // Check if we support the device language, otherwise use English
        const supportedLanguage = Object.keys(resources).includes(deviceLanguage) 
          ? deviceLanguage 
          : 'en';
        
        // Store the detected language for next time
        await AsyncStorage.setItem('user-language', supportedLanguage);
        return callback(supportedLanguage);
      }
    } catch (error) {
      // If there's an error, default to English
      console.log('Error detecting language:', error);
      return callback('en');
    }
  },
  cacheUserLanguage: async (language: string) => {
    try {
      // Cache the language in AsyncStorage
      await AsyncStorage.setItem('user-language', language);
    } catch (error) {
      console.log('Error caching language:', error);
    }
  }
};

// Initialize i18next
i18next
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    compatibilityJSON: 'v4', // Required for Android
    interpolation: {
      escapeValue: false // React already escapes values
    },
    react: {
      useSuspense: false // Prevents issues with SSR and Suspense
    }
  });

// Handle language detection manually instead of using the detector plugin
(async () => {
  try {
    const storedLanguage = await AsyncStorage.getItem('user-language');
    if (storedLanguage) {
      i18next.changeLanguage(storedLanguage);
    } else {
      const deviceLanguage = getLocales()[0]?.languageCode || 'en';
      const supportedLanguage = Object.keys(resources).includes(deviceLanguage) 
        ? deviceLanguage 
        : 'en';
      await AsyncStorage.setItem('user-language', supportedLanguage);
      i18next.changeLanguage(supportedLanguage);
    }
  } catch (error) {
    console.log('Error initializing language:', error);
    i18next.changeLanguage('en');
  }
})();

export default i18next;
