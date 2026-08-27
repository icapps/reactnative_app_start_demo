import * as Sentry from '@sentry/react-native';

import { log } from '@/shared/utils/logger';

const startedAt = Date.now();

type StartupStepPhase = 'started' | 'resolved';

type StartupStep = {
  atMs: number;
  name: string;
  phase: StartupStepPhase;
};

const steps: StartupStep[] = [];

export function recordStartupStep(name: string, phase: StartupStepPhase) {
  const step = {
    atMs: Date.now() - startedAt,
    name,
    phase,
  } satisfies StartupStep;

  steps.push(step);

  log('startup', `${name} ${phase} at +${step.atMs}ms`);
  Sentry.addBreadcrumb({
    category: 'app-start',
    data: step,
    level: 'info',
    message: `${name} ${phase}`,
  });
}

export function recordStartupComplete(destination: string) {
  const elapsedMs = Date.now() - startedAt;
  const resolutionOrder = steps
    .filter(({ phase }) => phase === 'resolved')
    .map(({ name }) => name);

  log(
    'startup',
    `startup complete at +${elapsedMs}ms, destination=${destination}, resolution order=${resolutionOrder.join(' > ')}`,
  );
  Sentry.addBreadcrumb({
    category: 'app-start',
    data: {
      destination,
      elapsedMs,
      resolutionOrder,
    },
    level: 'info',
    message: 'startup complete',
  });
  Sentry.captureMessage('startup complete', {
    extra: {
      destination,
      elapsedMs,
      resolutionOrder,
    },
    level: 'info',
  });
}
