export const APP_START_CONFIG = {
  moduleEvaluation: {
    heavy: {
      defaultStrategy: 'eager' as const,
      evaluationDurationMs: 7_000,
    },
  },
  startup: {
    maintenance: {
      delayRangeMs: {
        maxMs: 600,
        minMs: 250,
      },
      isActive: false,
    },
    remoteConfig: {
      delayRangeMs: {
        maxMs: 800,
        minMs: 400,
      },
      minVersion: '0.0.1',
      securityPolicy: {
        isRequired: true,
      },
    },
    security: {
      delayRangeMs: {
        maxMs: 350,
        minMs: 150,
      },
      isCompromised: false,
    },
  },
};
