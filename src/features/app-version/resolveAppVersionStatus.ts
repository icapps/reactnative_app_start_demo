import { compareSemver } from './compareSemver';

export const AppVersionStatus = {
  LOADING: 'Loading',
  UP_TO_DATE: 'UpToDate',
  UPDATE_REQUIRED: 'UpdateRequired',
} as const;

export type AppVersionStatus =
  (typeof AppVersionStatus)[keyof typeof AppVersionStatus];

type AppVersionStatusInput = {
  isRemoteConfigSettled: boolean;
  currentAppVersion: string;
  minVersion: string;
};

export function resolveAppVersionStatus({
  isRemoteConfigSettled,
  currentAppVersion,
  minVersion,
}: AppVersionStatusInput): AppVersionStatus {
  if (!isRemoteConfigSettled) {
    return AppVersionStatus.LOADING;
  }

  if (compareSemver(currentAppVersion, minVersion) < 0) {
    return AppVersionStatus.UPDATE_REQUIRED;
  }

  return AppVersionStatus.UP_TO_DATE;
}
