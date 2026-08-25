import { APP_START_CONFIG } from '@/config/appStartConfig';
import { useRandomDelay } from '@/shared/hooks/useRandomDelay';

export const MaintenanceStatus = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  LOADING: 'Loading',
} as const;

export type MaintenanceStatus =
  (typeof MaintenanceStatus)[keyof typeof MaintenanceStatus];

export function useMaintenanceStatus(): MaintenanceStatus {
  const { isReady } = useRandomDelay(
    APP_START_CONFIG.startup.maintenance.delayRangeMs,
  );

  if (!isReady) {
    return MaintenanceStatus.LOADING;
  }

  return APP_START_CONFIG.startup.maintenance.isActive
    ? MaintenanceStatus.ACTIVE
    : MaintenanceStatus.INACTIVE;
}
