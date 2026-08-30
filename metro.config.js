const { getSentryExpoConfig } = require('@sentry/react-native/metro');

const config = getSentryExpoConfig(__dirname);

// Defers require() evaluation to first use instead of at bundle load time
config.transformer.getTransformOptions = async () => {
  return {
    transform: {
      experimentalImportSupport: true,
      inlineRequires: true,
    },
  };
};

module.exports = config;
