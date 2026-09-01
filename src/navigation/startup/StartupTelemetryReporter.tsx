import { useEffect, useRef } from 'react';

import { recordStartupComplete } from '@/shared/utils/startupTelemetry';

import { useStartupCompletion } from './useStartupCompletion';

type StartupTelemetryReporterProps = {
  isNavigationReady: boolean;
};

export function StartupTelemetryReporter({
  isNavigationReady,
}: StartupTelemetryReporterProps) {
  const { currentScreen, isSettled: isStartupSettled } =
    useStartupCompletion(isNavigationReady);
  const hasReported = useRef(false);

  useEffect(() => {
    if (isStartupSettled && !hasReported.current) {
      hasReported.current = true;
      recordStartupComplete(currentScreen);
    }
  }, [currentScreen, isStartupSettled]);

  return null;
}
