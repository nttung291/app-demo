import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LanguageDetector from 'i18next-react-native-language-detector';

// Import translations
import en from './translations/en.json';
import vi from './translations/vi.json';

// Language resources
const resources = {
  en: {
    translation: en
  },
  vi: {
    translation: vi
  }
};

// Custom AsyncStorage language detector
const languageDetectorOptions = {
  // Order of lookup
  order: ['asyncStorage', 'navigator'],
  
  // Cache user language selection
  caches: ['asyncStorage'],
  
  // AsyncStorage key
  lookupAsyncStorage: 'user-language',
  
  // Callback when language changes
  onChange: (language: string) => {
    console.log('Language changed to:', language);
  },
  
  // Fallback language
  fallbackLng: 'en'
};

// Initialize i18next
i18next
  .use(LanguageDetector)
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
    },
    detection: languageDetectorOptions
  });

export default i18next;
