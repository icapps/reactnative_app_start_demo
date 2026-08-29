import * as Application from 'expo-application';
import { use } from 'react';

import { RemoteConfigContext } from '@/features/remote-config/RemoteConfigProvider';

import { compareSemver } from './compareSemver';

export const AppVersionStatus = {
  LOADING: 'Loading',
  UP_TO_DATE: 'UpToDate',
  UPDATE_REQUIRED: 'UpdateRequired',
} as const;

export type AppVersionStatus =
  (typeof AppVersionStatus)[keyof typeof AppVersionStatus];

export function useAppVersionStatus(): AppVersionStatus {
  const { config: remoteConfig, isReady: isRemoteConfigReady } =
    use(RemoteConfigContext);

  const currentAppVersion = Application.nativeApplicationVersion ?? '0.0.0';

  if (!isRemoteConfigReady) {
    return AppVersionStatus.LOADING;
  }

  if (compareSemver(currentAppVersion, remoteConfig.minVersion) < 0) {
    return AppVersionStatus.UPDATE_REQUIRED;
  }

  return AppVersionStatus.UP_TO_DATE;
}
