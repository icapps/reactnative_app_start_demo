import { use } from 'react';

import { APP_START_CONFIG } from '@/config/appStart';
import { RemoteConfigContext } from '@/features/remote-config/RemoteConfigProvider';
import { useSimulatedStartupCheck } from '@/shared/hooks/useSimulatedStartupCheck';
import { recordStartupStep } from '@/shared/utils/startupTelemetry';

export {
  resolveSecurityStatus,
  SecurityStatus,
} from './resolveSecurityStatus';

import { resolveSecurityStatus } from './resolveSecurityStatus';

export function useSecurityStatus() {
  const { config: remoteConfig, isSettled: isRemoteConfigSettled } =
    use(RemoteConfigContext);

  const { hasError, isSettled, retry } = useSimulatedStartupCheck({
    isEnabled: isRemoteConfigSettled && remoteConfig.securityPolicy.isRequired,
    ...APP_START_CONFIG.startup.security.delayRangeMs,
    onError: () => recordStartupStep('Security', 'error'),
    onStart: () => recordStartupStep('Security', 'started'),
    onSuccess: () => recordStartupStep('Security', 'resolved'),
    shouldFail: APP_START_CONFIG.startup.security.shouldFail,
  });

  return {
    retry,
    status: resolveSecurityStatus({
      hasError,
      isCompromised: APP_START_CONFIG.startup.security.isCompromised,
      isRemoteConfigSettled,
      isSecurityRequired: remoteConfig.securityPolicy.isRequired,
      isSettled,
    }),
  };
}
