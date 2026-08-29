import type { AppVersionStatus } from '@/features/app-version/resolveAppVersionStatus';
import type { MaintenanceStatus } from '@/features/maintenance/resolveMaintenanceStatus';
import type { SecurityStatus } from '@/features/security/resolveSecurityStatus';

export type RootNavigationStack =
  | 'Loading'
  | 'ForceUpdate'
  | 'Maintenance'
  | 'DeviceCompromised'
  | 'Main';

type NavigationStatusInput = {
  appVersionStatus: AppVersionStatus;
  maintenanceStatus: MaintenanceStatus;
  securityStatus: SecurityStatus;
};

export function resolveNavigationStack({
  appVersionStatus,
  maintenanceStatus,
  securityStatus,
}: NavigationStatusInput): RootNavigationStack {
  if (
    appVersionStatus === 'Loading' ||
    maintenanceStatus === 'Loading' ||
    securityStatus === 'Loading'
  ) {
    return 'Loading';
  }

  if (appVersionStatus === 'UpdateRequired') {
    return 'ForceUpdate';
  }

  if (maintenanceStatus === 'Active') {
    return 'Maintenance';
  }

  if (securityStatus === 'Compromised') {
    return 'DeviceCompromised';
  }

  return 'Main';
}
