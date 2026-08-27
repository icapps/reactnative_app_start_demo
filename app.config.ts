import type { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  android: {
    adaptiveIcon: {
      backgroundColor: '#002548',
      foregroundImage: 'src/assets/images/icon.png',
    },
    package: 'be.rnmeetup.appstartdemo',
  },
  icon: 'src/assets/images/icon.png',
  ios: {
    bundleIdentifier: 'be.rnmeetup.appstartdemo',
    supportsTablet: true,
  },
  name: 'App Start Demo',
  orientation: 'portrait',
  plugins: [
    'expo-asset',
    [
      'expo-splash-screen',
      {
        backgroundColor: '#e7edf4',
        image: './src/assets/images/icon.png',
      },
    ],
    [
      'expo-font',
      {
        fonts: [
          './src/assets/fonts/SpaceGrotesk_400Regular.ttf',
          './src/assets/fonts/SpaceGrotesk_600SemiBold.ttf',
          './src/assets/fonts/SpaceGrotesk_700Bold.ttf',
        ],
      },
    ],
    [
      '@sentry/react-native/expo',
      {
        organization: process.env.SENTRY_ORG,
        project: process.env.SENTRY_PROJECT,
        url: 'https://sentry.io/',
      },
    ],
    'expo-status-bar',
  ],
  scheme: 'appstartdemo',
  slug: 'app-start-demo',
  userInterfaceStyle: 'automatic',
  version: '0.0.1',
};

export default config;
