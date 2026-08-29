import { resolveSecurityStatus, SecurityStatus } from './resolveSecurityStatus';

test.each([
  [false, true, false, false, SecurityStatus.LOADING],
  [true, false, false, true, SecurityStatus.PASSED],
  [true, true, false, false, SecurityStatus.LOADING],
  [true, true, true, true, SecurityStatus.COMPROMISED],
  [true, true, true, false, SecurityStatus.PASSED],
])(
  'resolves ready=%s, required=%s, complete=%s, compromised=%s to %s',
  (isRemoteConfigReady, isSecurityRequired, isComplete, isCompromised, expected) => {
    // Arrange — security inputs are supplied by the table
    // Act — resolve the security status
    const status = resolveSecurityStatus({
      isComplete,
      isCompromised,
      isRemoteConfigReady,
      isSecurityRequired,
    });
    // Assert — configuration readiness and policy gates are respected
    expect(status).toBe(expected);
  },
);
