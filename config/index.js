import Constants from 'expo-constants';
import developmentConfig from './env.development';
import stagingConfig from './env.staging';
import productionConfig from './env.production';

// Get the environment from the process.env or use 'development' as default
const getEnvironment = () => {
  // For Expo Go, we'll use development by default
  if (__DEV__) {
    return 'development';
  }

  // For EAS builds, we can use the channel to determine the environment
  // This will be set when building with EAS
  const channel = Constants.expoConfig?.extra?.eas?.channel;
  
  if (channel) {
    if (channel.startsWith('staging')) {
      return 'staging';
    } else if (channel.startsWith('production')) {
      return 'production';
    }
  }
  
  // Default to development if we can't determine the environment
  return 'development';
};

// Select the appropriate configuration based on the environment
const getConfig = () => {
  const env = getEnvironment();
  
  switch (env) {
    case 'staging':
      return stagingConfig;
    case 'production':
      return productionConfig;
    case 'development':
    default:
      return developmentConfig;
  }
};

// Export the configuration
export default getConfig();
