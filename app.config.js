import config from './config';

export default ({ config: expoConfig }) => {
  // Merge the base configuration from app.json with our environment-specific config
  return {
    ...expoConfig,
    name: config.name,
    scheme: config.scheme,
    version: config.version,
    orientation: config.orientation,
    userInterfaceStyle: config.userInterfaceStyle,
    icon: config.icon,
    splash: config.splash,
    ios: config.ios,
    android: config.android,
    extra: {
      ...expoConfig.extra,
      ...config.extra,
    },
  };
};
