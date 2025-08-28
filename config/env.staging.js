export default {
  name: 'app-demo (Staging)',
  scheme: 'appdemo-staging',
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
    bundleIdentifier: 'com.anonymous.appdemo.staging',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'com.anonymous.appdemo.staging',
  },
  extra: {
    apiUrl: 'https://api-staging.appdemo.com',
    eas: {
      projectId: 'your-staging-project-id',
    },
    environment: 'staging',
  },
};
