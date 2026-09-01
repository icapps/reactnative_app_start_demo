import { APP_START_CONFIG } from '@/config/appStart';
import { useSimulatedStartupCheck } from '@/shared/hooks/useSimulatedStartupCheck';
import { recordStartupStep } from '@/shared/utils/startupTelemetry';

import { resolveRemoteConfigStatus } from './resolveRemoteConfigStatus';

export function useRemoteConfig() {
  const { hasError, isSettled, retry } = useSimulatedStartupCheck({
    ...APP_START_CONFIG.startup.remoteConfig.delayRangeMs,
    onError: () => recordStartupStep('Remote Config', 'error'),
    onStart: () => recordStartupStep('Remote Config', 'started'),
    onSuccess: () => recordStartupStep('Remote Config', 'resolved'),
    shouldFail: APP_START_CONFIG.startup.remoteConfig.shouldFail,
  });

  return {
    config: APP_START_CONFIG.startup.remoteConfig,
    isSettled,
    retry,
    status: resolveRemoteConfigStatus({ hasError, isSettled }),
  };
}
