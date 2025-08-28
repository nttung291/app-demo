export default {
  name: 'app-demo',
  scheme: 'appdemo',
  icon: './assets/images/icon.png',
  version: '1.0.0',
  orientation: 'portrait',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/images/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.anonymous.appdemo',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'com.anonymous.appdemo',
  },
  extra: {
    apiUrl: 'https://api.appdemo.com',
    eas: {
      projectId: 'your-production-project-id',
    },
    environment: 'production',
  },
};
