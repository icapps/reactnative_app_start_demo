export const APP_START_CONFIG = {
  heavyLoading: {
    defaultStrategy: 'eager' as const,
  },
  startup: {
    versionCheck: {
      delayRangeMs: {
        maxMs: 3_000,
        minMs: 300,
      },
      isEnabled: true,
      minVersion: '0.0.1',
      recommendedVersion: '0.0.1',
    },
  },
};
