import { APP_START_CONFIG } from '@/config/appStartConfig';
import { useRandomDelay } from '@/shared/hooks/useRandomDelay';

export function useAppConfig() {
  const { isReady } = useRandomDelay(
    APP_START_CONFIG.startup.versionCheck.delayRangeMs,
  );

  return {
    config: APP_START_CONFIG.startup.versionCheck,
    isReady,
  };
}
