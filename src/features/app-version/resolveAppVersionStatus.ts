import { compareSemver } from './compareSemver';

export const AppVersionStatus = {
  LOADING: 'Loading',
  UP_TO_DATE: 'UpToDate',
  UPDATE_REQUIRED: 'UpdateRequired',
} as const;

export type AppVersionStatus =
  (typeof AppVersionStatus)[keyof typeof AppVersionStatus];

type AppVersionStatusInput = {
  isRemoteConfigReady: boolean;
  currentAppVersion: string;
  minVersion: string;
};

export function resolveAppVersionStatus({
  isRemoteConfigReady,
  currentAppVersion,
  minVersion,
}: AppVersionStatusInput): AppVersionStatus {
  if (!isRemoteConfigReady) {
    return AppVersionStatus.LOADING;
  }

  if (compareSemver(currentAppVersion, minVersion) < 0) {
    return AppVersionStatus.UPDATE_REQUIRED;
  }

  return AppVersionStatus.UP_TO_DATE;
}
