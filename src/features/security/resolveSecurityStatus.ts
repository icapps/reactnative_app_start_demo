export const SecurityStatus = {
  COMPROMISED: 'Compromised',
  LOADING: 'Loading',
  PASSED: 'Passed',
} as const;

export type SecurityStatus =
  (typeof SecurityStatus)[keyof typeof SecurityStatus];

type SecurityStatusInput = {
  isRemoteConfigReady: boolean;
  isSecurityRequired: boolean;
  isComplete: boolean;
  isCompromised: boolean;
};

export function resolveSecurityStatus({
  isRemoteConfigReady,
  isSecurityRequired,
  isComplete,
  isCompromised,
}: SecurityStatusInput): SecurityStatus {
  if (!isRemoteConfigReady) {
    return SecurityStatus.LOADING;
  }

  if (!isSecurityRequired) {
    return SecurityStatus.PASSED;
  }

  if (!isComplete) {
    return SecurityStatus.LOADING;
  }

  return isCompromised ? SecurityStatus.COMPROMISED : SecurityStatus.PASSED;
}
