export const SecurityStatus = {
  COMPROMISED: 'Compromised',
  ERROR: 'Error',
  LOADING: 'Loading',
  PASSED: 'Passed',
} as const;

export type SecurityStatus =
  (typeof SecurityStatus)[keyof typeof SecurityStatus];

type SecurityStatusInput = {
  isRemoteConfigSettled: boolean;
  isSecurityRequired: boolean;
  isCompromised: boolean;
  hasError: boolean;
  isSettled: boolean;
};

export function resolveSecurityStatus({
  isRemoteConfigSettled,
  isSecurityRequired,
  isCompromised,
  hasError,
  isSettled,
}: SecurityStatusInput): SecurityStatus {
  if (!isRemoteConfigSettled) {
    return SecurityStatus.LOADING;
  }

  if (!isSecurityRequired) {
    return SecurityStatus.PASSED;
  }

  if (!isSettled) {
    return SecurityStatus.LOADING;
  }

  if (hasError) {
    return SecurityStatus.ERROR;
  }

  return isCompromised ? SecurityStatus.COMPROMISED : SecurityStatus.PASSED;
}
