import * as Application from 'expo-application';
import { use } from 'react';

import { AppConfigContext } from '@/features/app-config/AppConfigProvider';

import { compareSemver } from './compareSemver';

export const AppVersionStatus = {
  LOADING: 'Loading',
  UP_TO_DATE: 'UpToDate',
  UPDATE_RECOMMENDED: 'UpdateRecommended',
  UPDATE_REQUIRED: 'UpdateRequired',
} as const;

export type AppVersionStatus =
  (typeof AppVersionStatus)[keyof typeof AppVersionStatus];

export function useAppVersionStatus(): AppVersionStatus {
  const { config: appConfig, isReady: isAppConfigReady } =
    use(AppConfigContext);

  const currentAppVersion = Application.nativeApplicationVersion ?? '0.0.0';

  if (!isAppConfigReady) {
    return AppVersionStatus.LOADING;
  }

  if (
    appConfig.isEnabled &&
    compareSemver(currentAppVersion, appConfig.minVersion) < 0
  ) {
    return AppVersionStatus.UPDATE_REQUIRED;
  }

  if (
    appConfig.isEnabled &&
    compareSemver(currentAppVersion, appConfig.recommendedVersion) < 0
  ) {
    return AppVersionStatus.UPDATE_RECOMMENDED;
  }

  return AppVersionStatus.UP_TO_DATE;
}
