import {
  AppVersionStatus,
  resolveAppVersionStatus,
} from './resolveAppVersionStatus';

test.each([
  [false, '1.0.0', '2.0.0', AppVersionStatus.LOADING],
  [true, '1.0.0', '2.0.0', AppVersionStatus.UPDATE_REQUIRED],
  [true, '2.0.0', '2.0.0', AppVersionStatus.UP_TO_DATE],
  [true, '2.1.0', '2.0.0', AppVersionStatus.UP_TO_DATE],
])(
  'resolves ready=%s, current=%s, minimum=%s to %s',
  (isSettled, currentVersion, minimumVersion, expected) => {
    // Arrange — versions and readiness are supplied by the table
    // Act — resolve the app version status
    const status = resolveAppVersionStatus({
      currentAppVersion: currentVersion,
      isRemoteConfigSettled: isSettled,
      minVersion: minimumVersion,
    });
    // Assert — readiness is resolved before version comparison
    expect(status).toBe(expected);
  },
);
