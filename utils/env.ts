//@ts-nocheck
import { Platform } from 'react-native';

const getEnvVars = () => {
  let environment = 'development';
  let apiUrl;
  
  try {
    if (global.__expo && global.__expo.appConfig && global.__expo.appConfig.extra) {
      environment = global.__expo.appConfig.extra.environment || 'development';
      apiUrl = global.__expo.appConfig.extra.apiUrl;
    }
  } catch (e) {
    environment = 'development';
  }
  
  if (!apiUrl) {
    apiUrl = Platform.OS === 'web' ? 'http://localhost:3001' : 'http://127.0.0.1:3001';
  }

  return {
    apiUrl,
    environment,
  };
};

export default getEnvVars();
