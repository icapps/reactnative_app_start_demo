import type { AppVersionStatus } from '@/features/app-version/resolveAppVersionStatus';
import type { MaintenanceStatus } from '@/features/maintenance/resolveMaintenanceStatus';
import type { RemoteConfigStatus } from '@/features/remote-config/resolveRemoteConfigStatus';
import type { SecurityStatus } from '@/features/security/resolveSecurityStatus';

export type RootNavigationStack =
  | 'Loading'
  | 'ForceUpdate'
  | 'Maintenance'
  | 'DeviceCompromised'
  | 'StartupError'
  | 'Main';

type NavigationStatusInput = {
  appVersionStatus: AppVersionStatus;
  maintenanceStatus: MaintenanceStatus;
  remoteConfigStatus: RemoteConfigStatus;
  securityStatus: SecurityStatus;
};

export function resolveNavigationStack({
  appVersionStatus,
  maintenanceStatus,
  remoteConfigStatus,
  securityStatus,
}: NavigationStatusInput): RootNavigationStack {
  if (
    maintenanceStatus === 'Error' ||
    remoteConfigStatus === 'Error' ||
    securityStatus === 'Error'
  ) {
    return 'StartupError';
  }

  if (
    appVersionStatus === 'Loading' ||
    maintenanceStatus === 'Loading' ||
    remoteConfigStatus === 'Loading' ||
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
