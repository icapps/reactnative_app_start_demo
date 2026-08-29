import { APP_START_CONFIG } from '@/config/appStart';
import { useSimulatedStartupCheck } from '@/shared/hooks/useSimulatedStartupCheck';
import { recordStartupStep } from '@/shared/utils/startupTelemetry';

export {
  MaintenanceStatus,
  resolveMaintenanceStatus,
} from './resolveMaintenanceStatus';

import type { MaintenanceStatus } from './resolveMaintenanceStatus';
import { resolveMaintenanceStatus } from './resolveMaintenanceStatus';

export function useMaintenanceStatus(): MaintenanceStatus {
  const { isComplete } = useSimulatedStartupCheck({
    ...APP_START_CONFIG.startup.maintenance.delayRangeMs,
    onComplete: () => recordStartupStep('Maintenance', 'resolved'),
    onStart: () => recordStartupStep('Maintenance', 'started'),
  });

  return resolveMaintenanceStatus({
    isActive: APP_START_CONFIG.startup.maintenance.isActive,
    isComplete,
  });
}
