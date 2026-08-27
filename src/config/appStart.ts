export const APP_START_CONFIG = {
  moduleEvaluation: {
    heavy: {
      defaultStrategy: 'eager' as const,
    },
  },
  startup: {
    maintenance: {
      delayRangeMs: {
        maxMs: 1_500,
        minMs: 300,
      },
      isActive: false,
    },
    security: {
      delayRangeMs: {
        maxMs: 2_000,
        minMs: 500,
      },
      isCompromised: false,
    },
    versionCheck: {
      delayRangeMs: {
        maxMs: 1_500,
        minMs: 300,
      },
      minVersion: '0.0.1',
    },
  },
};
