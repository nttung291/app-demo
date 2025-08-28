export default {
  name: 'app-demo (Dev)',
  scheme: 'appdemo-dev',
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
    bundleIdentifier: 'com.anonymous.appdemo.dev',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'com.anonymous.appdemo.dev',
  },
  extra: {
    apiUrl: 'http://localhost:3001',
    eas: {
      projectId: 'your-dev-project-id',
    },
    environment: 'development',
  },
};
