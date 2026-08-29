import { APP_START_CONFIG } from '@/config/appStart';
import { useSimulatedStartupCheck } from '@/shared/hooks/useSimulatedStartupCheck';
import { recordStartupStep } from '@/shared/utils/startupTelemetry';

export function useRemoteConfig() {
  const { isComplete } = useSimulatedStartupCheck({
    ...APP_START_CONFIG.startup.remoteConfig.delayRangeMs,
    onComplete: () => recordStartupStep('Remote Config', 'resolved'),
    onStart: () => recordStartupStep('Remote Config', 'started'),
  });

  return {
    config: APP_START_CONFIG.startup.remoteConfig,
    isReady: isComplete,
  };
}
