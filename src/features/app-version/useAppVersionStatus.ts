import * as Application from 'expo-application';
import { use } from 'react';

import { RemoteConfigContext } from '@/features/remote-config/RemoteConfigProvider';

export {
  AppVersionStatus,
  resolveAppVersionStatus,
} from './resolveAppVersionStatus';

import type { AppVersionStatus } from './resolveAppVersionStatus';
import { resolveAppVersionStatus } from './resolveAppVersionStatus';

export function useAppVersionStatus(): AppVersionStatus {
  const { config: remoteConfig, isReady: isRemoteConfigReady } =
    use(RemoteConfigContext);

  const currentAppVersion = Application.nativeApplicationVersion ?? '0.0.0';

  return resolveAppVersionStatus({
    currentAppVersion,
    isRemoteConfigReady,
    minVersion: remoteConfig.minVersion,
  });
}
