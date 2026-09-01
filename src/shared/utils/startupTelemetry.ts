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
let hasAppStartupEnded = false;

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
    // A check starting after the root already ended can't attach to it - Sentry
    // has already serialized and sent that transaction, so give it its own
    const span = hasAppStartupEnded
      ? Sentry.startInactiveSpan({
          forceTransaction: true,
          name,
          op: 'app.startup.check.late',
        })
      : Sentry.startInactiveSpan({
          name,
          op: 'app.startup.check',
          parentSpan: getAppStartupSpan(),
        });

    stepSpans.set(name, span);

    return;
  }

  const stepSpan = stepSpans.get(name);

  if (stepSpan) {
    if (phase === 'error') {
      stepSpan.setStatus({ code: 2, message: 'internal_error' });
    }

    stepSpan.end();
    stepSpans.delete(name);
  }
}

export function recordStartupComplete(destination: string) {
  const elapsedMs = Date.now() - startedAt;

  const span = getAppStartupSpan();

  // Force-end any checks still in flight so they aren't dropped from the transaction
  for (const [name, pendingSpan] of stepSpans) {
    pendingSpan.setStatus({ code: 2, message: 'cancelled' });
    pendingSpan.end();
    stepSpans.delete(name);
  }

  const resolutionOrder = steps
    .filter(({ phase }) => phase === 'resolved')
    .map(({ name }) => name);

  span.setAttributes({
    'startup.destination': destination,
    'startup.resolution_order': resolutionOrder.join(' > '),
  });

  log(
    'Startup',
    `Startup complete at +${elapsedMs}ms, destination=${destination}, resolution order=${resolutionOrder.join(' > ')}`,
  );

  if (steps.some(({ phase }) => phase === 'error')) {
    span.setStatus({ code: 2, message: 'internal_error' });
  }

  span.end();
  hasAppStartupEnded = true;
}
