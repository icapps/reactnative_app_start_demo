import { use } from 'react';

import { AppVersionStatusContext } from '@/features/app-version/AppVersionStatusProvider';
import { AppVersionStatus } from '@/features/app-version/useAppVersionStatus';
import { MaintenanceStatusContext } from '@/features/maintenance/MaintenanceStatusProvider';
import { MaintenanceStatus } from '@/features/maintenance/useMaintenanceStatus';
import { SecurityStatusContext } from '@/features/security/SecurityStatusProvider';
import { SecurityStatus } from '@/features/security/useSecurityStatus';

export type RootNavigationStack =
  | 'Loading'
  | 'ForceUpdate'
  | 'Maintenance'
  | 'DeviceCompromised'
  | 'Main';

export function useRootNavigationStack(): RootNavigationStack {
  const { status: appVersionStatus } = use(AppVersionStatusContext);
  const { status: maintenanceStatus } = use(MaintenanceStatusContext);
  const { status: securityStatus } = use(SecurityStatusContext);

  if (
    appVersionStatus === AppVersionStatus.LOADING ||
    maintenanceStatus === MaintenanceStatus.LOADING ||
    securityStatus === SecurityStatus.LOADING
  ) {
    return 'Loading';
  }

  if (appVersionStatus === AppVersionStatus.UPDATE_REQUIRED) {
    return 'ForceUpdate';
  }

  if (maintenanceStatus === MaintenanceStatus.ACTIVE) {
    return 'Maintenance';
  }

  if (securityStatus === SecurityStatus.COMPROMISED) {
    return 'DeviceCompromised';
  }

  return 'Main';
}
