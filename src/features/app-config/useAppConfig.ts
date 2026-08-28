import { APP_START_CONFIG } from '@/config/appStart';
import { useRandomDelay } from '@/shared/hooks/useRandomDelay';
import { recordStartupStep } from '@/shared/utils/startupTelemetry';

export function useAppConfig() {
  const { isComplete } = useRandomDelay({
    ...APP_START_CONFIG.startup.versionCheck.delayRangeMs,
    onComplete: () => recordStartupStep('app_config', 'resolved'),
    onStart: () => recordStartupStep('app_config', 'started'),
  });

  return {
    config: APP_START_CONFIG.startup.versionCheck,
    isReady: isComplete,
  };
}
