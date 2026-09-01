import { APP_START_CONFIG } from '@/config/appStart';
import { useSimulatedStartupCheck } from '@/shared/hooks/useSimulatedStartupCheck';
import { recordStartupStep } from '@/shared/utils/startupTelemetry';

export {
  MaintenanceStatus,
  resolveMaintenanceStatus,
} from './resolveMaintenanceStatus';

import { resolveMaintenanceStatus } from './resolveMaintenanceStatus';

export function useMaintenanceStatus() {
  const { hasError, isSettled, retry } = useSimulatedStartupCheck({
    ...APP_START_CONFIG.startup.maintenance.delayRangeMs,
    onError: () => recordStartupStep('Maintenance', 'error'),
    onStart: () => recordStartupStep('Maintenance', 'started'),
    onSuccess: () => recordStartupStep('Maintenance', 'resolved'),
    shouldFail: APP_START_CONFIG.startup.maintenance.shouldFail,
  });

  return {
    retry,
    status: resolveMaintenanceStatus({
      hasError,
      isActive: APP_START_CONFIG.startup.maintenance.isActive,
      isSettled,
    }),
  };
}
