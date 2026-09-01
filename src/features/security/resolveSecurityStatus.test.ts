import { resolveSecurityStatus, SecurityStatus } from './resolveSecurityStatus';

test.each([
  [false, true, false, false, false, SecurityStatus.LOADING],
  [true, false, false, false, true, SecurityStatus.PASSED],
  [true, true, false, false, false, SecurityStatus.LOADING],
  [true, true, true, false, true, SecurityStatus.ERROR],
  [true, true, true, true, false, SecurityStatus.COMPROMISED],
  [true, true, true, false, false, SecurityStatus.PASSED],
])(
  'resolves ready=%s, required=%s, settled=%s, compromised=%s, error=%s to %s',
  (isRemoteConfigSettled, isSecurityRequired, isSettled, isCompromised, hasError, expected) => {
    // Arrange — security inputs are supplied by the table
    // Act — resolve the security status
    const status = resolveSecurityStatus({
      hasError,
      isCompromised,
      isRemoteConfigSettled,
      isSecurityRequired,
      isSettled,
    });
    // Assert — configuration readiness and policy gates are respected
    expect(status).toBe(expected);
  },
);
