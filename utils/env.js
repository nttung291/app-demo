import Constants from 'expo-constants';
import * as dotenv from 'dotenv';
import { Platform } from 'react-native';

// Load environment variables based on the current environment
const getEnvVars = () => {
  const environment = Constants.expoConfig?.extra?.environment || 'development';
  
  // Load the appropriate .env file based on the environment
  let envFile;
  switch (environment) {
    case 'staging':
      envFile = '.env.staging';
      break;
    case 'production':
      envFile = '.env.production';
      break;
    case 'development':
    default:
      envFile = '.env.development';
      break;
  }

  // Load environment variables from the .env file
  // Note: This will only work in development with Metro bundler
  // For production builds, we rely on the values from app.config.js
  if (__DEV__) {
    dotenv.config({ path: envFile });
  }

  // Define API URL based on environment
  const apiUrl = Constants.expoConfig?.extra?.apiUrl || 
    (Platform.OS === 'web' ? 'http://localhost:3001' : 'http://127.0.0.1:3001');

  return {
    apiUrl,
    environment,
  };
};

export default getEnvVars();
