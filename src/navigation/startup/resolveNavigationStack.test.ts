import { AppVersionStatus } from '@/features/app-version/resolveAppVersionStatus';
import { MaintenanceStatus } from '@/features/maintenance/resolveMaintenanceStatus';
import { SecurityStatus } from '@/features/security/resolveSecurityStatus';

import { resolveNavigationStack } from './resolveNavigationStack';

test.each([
  [
    AppVersionStatus.LOADING,
    MaintenanceStatus.INACTIVE,
    SecurityStatus.PASSED,
    'Loading',
  ],
  [
    AppVersionStatus.UP_TO_DATE,
    MaintenanceStatus.LOADING,
    SecurityStatus.PASSED,
    'Loading',
  ],
  [
    AppVersionStatus.UP_TO_DATE,
    MaintenanceStatus.INACTIVE,
    SecurityStatus.LOADING,
    'Loading',
  ],
  [
    AppVersionStatus.UPDATE_REQUIRED,
    MaintenanceStatus.ACTIVE,
    SecurityStatus.COMPROMISED,
    'ForceUpdate',
  ],
  [
    AppVersionStatus.UP_TO_DATE,
    MaintenanceStatus.ACTIVE,
    SecurityStatus.COMPROMISED,
    'Maintenance',
  ],
  [
    AppVersionStatus.UP_TO_DATE,
    MaintenanceStatus.INACTIVE,
    SecurityStatus.COMPROMISED,
    'DeviceCompromised',
  ],
  [
    AppVersionStatus.UP_TO_DATE,
    MaintenanceStatus.INACTIVE,
    SecurityStatus.PASSED,
    'Main',
  ],
])(
  'resolves %s, %s, %s to %s',
  (appVersionStatus, maintenanceStatus, securityStatus, expected) => {
    // Arrange — inputs are supplied by the table
    // Act — resolve the navigation destination
    const navigationStack = resolveNavigationStack({
      appVersionStatus,
      maintenanceStatus,
      securityStatus,
    });
    // Assert — the highest-priority applicable destination wins
    expect(navigationStack).toBe(expected);
  },
);
