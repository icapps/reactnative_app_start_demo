import { AppVersionStatus } from '@/features/app-version/resolveAppVersionStatus';
import { MaintenanceStatus } from '@/features/maintenance/resolveMaintenanceStatus';
import { RemoteConfigStatus } from '@/features/remote-config/resolveRemoteConfigStatus';
import { SecurityStatus } from '@/features/security/resolveSecurityStatus';

import { resolveNavigationStack } from './resolveNavigationStack';

test.each([
  [
    AppVersionStatus.LOADING,
    MaintenanceStatus.INACTIVE,
    RemoteConfigStatus.READY,
    SecurityStatus.PASSED,
    'Loading',
  ],
  [
    AppVersionStatus.UP_TO_DATE,
    MaintenanceStatus.LOADING,
    RemoteConfigStatus.READY,
    SecurityStatus.PASSED,
    'Loading',
  ],
  [
    AppVersionStatus.UP_TO_DATE,
    MaintenanceStatus.INACTIVE,
    RemoteConfigStatus.LOADING,
    SecurityStatus.LOADING,
    'Loading',
  ],
  [
    AppVersionStatus.UPDATE_REQUIRED,
    MaintenanceStatus.ACTIVE,
    RemoteConfigStatus.READY,
    SecurityStatus.COMPROMISED,
    'ForceUpdate',
  ],
  [
    AppVersionStatus.UP_TO_DATE,
    MaintenanceStatus.ACTIVE,
    RemoteConfigStatus.READY,
    SecurityStatus.COMPROMISED,
    'Maintenance',
  ],
  [
    AppVersionStatus.UP_TO_DATE,
    MaintenanceStatus.INACTIVE,
    RemoteConfigStatus.READY,
    SecurityStatus.COMPROMISED,
    'DeviceCompromised',
  ],
  [
    AppVersionStatus.UP_TO_DATE,
    MaintenanceStatus.INACTIVE,
    RemoteConfigStatus.READY,
    SecurityStatus.PASSED,
    'Main',
  ],
  [
    AppVersionStatus.UP_TO_DATE,
    MaintenanceStatus.ERROR,
    RemoteConfigStatus.READY,
    SecurityStatus.PASSED,
    'StartupError',
  ],
  [
    AppVersionStatus.UP_TO_DATE,
    MaintenanceStatus.ERROR,
    RemoteConfigStatus.LOADING,
    SecurityStatus.PASSED,
    'StartupError',
  ],
  [
    AppVersionStatus.UP_TO_DATE,
    MaintenanceStatus.INACTIVE,
    RemoteConfigStatus.ERROR,
    SecurityStatus.PASSED,
    'StartupError',
  ],
  [
    AppVersionStatus.UP_TO_DATE,
    MaintenanceStatus.INACTIVE,
    RemoteConfigStatus.READY,
    SecurityStatus.ERROR,
    'StartupError',
  ],
])(
  'resolves %s, %s, %s, %s to %s',
  (appVersionStatus, maintenanceStatus, remoteConfigStatus, securityStatus, expected) => {
    // Arrange — inputs are supplied by the table
    // Act — resolve the navigation destination
    const navigationStack = resolveNavigationStack({
      appVersionStatus,
      maintenanceStatus,
      remoteConfigStatus,
      securityStatus,
    });
    // Assert — the highest-priority applicable destination wins
    expect(navigationStack).toBe(expected);
  },
);
