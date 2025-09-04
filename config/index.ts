// Import environment configs
const developmentConfig = require('./env.development');
const stagingConfig = require('./env.staging');
const productionConfig = require('./env.production');

// Get the environment from the process.env or use 'development' as default
const getEnvironment = () => {
  // For Expo Go, we'll use development by default
  if (typeof __DEV__ !== 'undefined' && __DEV__) {
    return 'development';
  }

  // For EAS builds, try to use the environment variable
  // This will be set when building with EAS
  let channel;
  try {
    channel = process.env.EAS_BUILD_CHANNEL;
  } catch (e) {
    // If process.env is not available, default to development
    return 'development';
  }
  
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
module.exports = getConfig();
