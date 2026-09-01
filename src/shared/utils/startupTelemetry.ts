import type { Span } from '@sentry/react-native';
import * as Sentry from '@sentry/react-native';

import { log } from '@/shared/utils/logger';

type StartupStepPhase = 'error' | 'resolved' | 'started';

type StartupStep = {
  atMs: number;
  name: string;
  phase: StartupStepPhase;
};

const startedAt = Date.now();

let appStartupSpan: Span | undefined;

const steps: StartupStep[] = [];
const stepSpans = new Map<string, Span>();

function getAppStartupSpan() {
  appStartupSpan ??= Sentry.startInactiveSpan({
    forceTransaction: true,
    name: 'App Startup',
    op: 'app.startup',
  });

  return appStartupSpan;
}

export function startAppStartupSpan() {
  return getAppStartupSpan();
}

export function recordStartupStep(name: string, phase: StartupStepPhase) {
  const step = {
    atMs: Date.now() - startedAt,
    name,
    phase,
  } satisfies StartupStep;

  steps.push(step);

  log('Startup', `${name} ${phase} at +${step.atMs}ms`);

  if (phase === 'started') {
    const span = Sentry.startInactiveSpan({
      name,
      op: 'app.startup.check',
      parentSpan: getAppStartupSpan(),
    });

    stepSpans.set(name, span);
    return;
  }

  const stepSpan = stepSpans.get(name);
  if (stepSpan) {
    stepSpan.end();
    stepSpans.delete(name);
  }
}

export function recordStartupComplete(destination: string) {
  const elapsedMs = Date.now() - startedAt;
  const resolutionOrder = steps
    .filter(({ phase }) => phase === 'resolved')
    .map(({ name }) => name);

  log(
    'Startup',
    `Startup complete at +${elapsedMs}ms, destination=${destination}, resolution order=${resolutionOrder.join(' > ')}`,
  );

  const span = getAppStartupSpan();
  span.setAttributes({
    'startup.destination': destination,
    'startup.resolution_order': resolutionOrder.join(' > '),
  });

  span.end();
}
