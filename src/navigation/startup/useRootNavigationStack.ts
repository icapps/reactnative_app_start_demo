import { use } from 'react';

import { AppVersionStatusContext } from '@/features/app-version/AppVersionStatusProvider';
import { MaintenanceStatusContext } from '@/features/maintenance/MaintenanceStatusProvider';
import { SecurityStatusContext } from '@/features/security/SecurityStatusProvider';

import {
  type RootNavigationStack,
  resolveNavigationStack,
} from './resolveNavigationStack';

export type { RootNavigationStack } from './resolveNavigationStack';
export { resolveNavigationStack } from './resolveNavigationStack';

export function useRootNavigationStack(): RootNavigationStack {
  const { status: appVersionStatus } = use(AppVersionStatusContext);
  const { status: maintenanceStatus } = use(MaintenanceStatusContext);
  const { status: securityStatus } = use(SecurityStatusContext);

  return resolveNavigationStack({
    appVersionStatus,
    maintenanceStatus,
    securityStatus,
  });
}
