import { use } from 'react';

import { AppVersionStatusContext } from '@/features/app-version/AppVersionStatusProvider';
import { AppVersionStatus } from '@/features/app-version/useAppVersionStatus';
import { MaintenanceStatusContext } from '@/features/maintenance/MaintenanceStatusProvider';
import { MaintenanceStatus } from '@/features/maintenance/useMaintenanceStatus';
import { SecurityCheckStatusContext } from '@/features/security/SecurityCheckStatusProvider';
import { SecurityCheckStatus } from '@/features/security/useSecurityCheckStatus';

export type RootNavigationStack =
  | 'Loading'
  | 'ForceUpdate'
  | 'Maintenance'
  | 'DeviceCompromised'
  | 'Main';

export function useRootNavigationStack(): RootNavigationStack {
  const { status: appVersionStatus } = use(AppVersionStatusContext);
  const { status: maintenanceStatus } = use(MaintenanceStatusContext);
  const { status: securityCheckStatus } = use(SecurityCheckStatusContext);

  if (
    appVersionStatus === AppVersionStatus.LOADING ||
    maintenanceStatus === MaintenanceStatus.LOADING ||
    securityCheckStatus === SecurityCheckStatus.LOADING
  ) {
    return 'Loading';
  }

  if (appVersionStatus === AppVersionStatus.UPDATE_REQUIRED) {
    return 'ForceUpdate';
  }

  if (maintenanceStatus === MaintenanceStatus.ACTIVE) {
    return 'Maintenance';
  }

  if (securityCheckStatus === SecurityCheckStatus.COMPROMISED) {
    return 'DeviceCompromised';
  }

  return 'Main';
}
