import { use } from 'react';

import { APP_START_CONFIG } from '@/config/appStart';
import { RemoteConfigContext } from '@/features/remote-config/RemoteConfigProvider';
import { useSimulatedStartupCheck } from '@/shared/hooks/useSimulatedStartupCheck';
import { recordStartupStep } from '@/shared/utils/startupTelemetry';

export const SecurityStatus = {
  COMPROMISED: 'Compromised',
  LOADING: 'Loading',
  PASSED: 'Passed',
} as const;

export type SecurityStatus =
  (typeof SecurityStatus)[keyof typeof SecurityStatus];

export function useSecurityStatus(): SecurityStatus {
  const { config: remoteConfig, isReady: isRemoteConfigReady } =
    use(RemoteConfigContext);

  const { isComplete } = useSimulatedStartupCheck({
    isEnabled: isRemoteConfigReady && remoteConfig.securityPolicy.isRequired,
    ...APP_START_CONFIG.startup.security.delayRangeMs,
    onComplete: () => recordStartupStep('Security', 'resolved'),
    onStart: () => recordStartupStep('Security', 'started'),
  });

  if (!isRemoteConfigReady) {
    return SecurityStatus.LOADING;
  }

  if (!remoteConfig.securityPolicy.isRequired) {
    return SecurityStatus.PASSED;
  }

  if (!isComplete) {
    return SecurityStatus.LOADING;
  }

  return APP_START_CONFIG.startup.security.isCompromised
    ? SecurityStatus.COMPROMISED
    : SecurityStatus.PASSED;
}
