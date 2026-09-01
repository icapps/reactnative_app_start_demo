export const RemoteConfigStatus = {
  ERROR: 'Error',
  LOADING: 'Loading',
  READY: 'Ready',
} as const;

export type RemoteConfigStatus =
  (typeof RemoteConfigStatus)[keyof typeof RemoteConfigStatus];

type RemoteConfigStatusInput = {
  hasError: boolean;
  isSettled: boolean;
};

export function resolveRemoteConfigStatus({
  hasError,
  isSettled,
}: RemoteConfigStatusInput): RemoteConfigStatus {
  if (!isSettled) {
    return RemoteConfigStatus.LOADING;
  }

  return hasError ? RemoteConfigStatus.ERROR : RemoteConfigStatus.READY;
}
