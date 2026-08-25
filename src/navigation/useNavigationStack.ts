import { use } from 'react';

import { AppVersionStatusContext } from '@/features/app-version/AppVersionStatusProvider';
import { AppVersionStatus } from '@/features/app-version/useAppVersionStatus';

export type NavigationStack = 'Loading' | 'ForceUpdate' | 'Main';

export function useNavigationStack(): NavigationStack {
  const { status: appVersionStatus } = use(AppVersionStatusContext);

  if (appVersionStatus === AppVersionStatus.LOADING) {
    return 'Loading';
  }

  if (appVersionStatus === AppVersionStatus.UPDATE_REQUIRED) {
    return 'ForceUpdate';
  }

  return 'Main';
}
