import { useEffect, useRef } from 'react';

import { recordStartupComplete } from '@/shared/utils/startupTelemetry';

import { useStartupCompletion } from './useStartupCompletion';

type StartupTelemetryReporterProps = {
  isNavigationReady: boolean;
};

export function StartupTelemetryReporter({
  isNavigationReady,
}: StartupTelemetryReporterProps) {
  const { currentScreen, isComplete: isStartupComplete } =
    useStartupCompletion(isNavigationReady);
  const hasReported = useRef(false);

  useEffect(() => {
    if (isStartupComplete && !hasReported.current) {
      hasReported.current = true;
      recordStartupComplete(currentScreen);
    }
  }, [currentScreen, isStartupComplete]);

  return null;
}
