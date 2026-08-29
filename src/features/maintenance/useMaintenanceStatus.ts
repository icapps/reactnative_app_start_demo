import { APP_START_CONFIG } from '@/config/appStart';
import { useSimulatedStartupCheck } from '@/shared/hooks/useSimulatedStartupCheck';
import { recordStartupStep } from '@/shared/utils/startupTelemetry';

export const MaintenanceStatus = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  LOADING: 'Loading',
} as const;

export type MaintenanceStatus =
  (typeof MaintenanceStatus)[keyof typeof MaintenanceStatus];

export function useMaintenanceStatus(): MaintenanceStatus {
  const { isComplete } = useSimulatedStartupCheck({
    ...APP_START_CONFIG.startup.maintenance.delayRangeMs,
    onComplete: () => recordStartupStep('Maintenance', 'resolved'),
    onStart: () => recordStartupStep('Maintenance', 'started'),
  });

  if (!isComplete) {
    return MaintenanceStatus.LOADING;
  }

  return APP_START_CONFIG.startup.maintenance.isActive
    ? MaintenanceStatus.ACTIVE
    : MaintenanceStatus.INACTIVE;
}
