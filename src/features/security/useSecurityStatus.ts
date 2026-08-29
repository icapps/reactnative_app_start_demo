import { use } from 'react';

import { APP_START_CONFIG } from '@/config/appStart';
import { RemoteConfigContext } from '@/features/remote-config/RemoteConfigProvider';
import { useSimulatedStartupCheck } from '@/shared/hooks/useSimulatedStartupCheck';
import { recordStartupStep } from '@/shared/utils/startupTelemetry';

export {
  resolveSecurityStatus,
  SecurityStatus,
} from './resolveSecurityStatus';

import type { SecurityStatus } from './resolveSecurityStatus';
import { resolveSecurityStatus } from './resolveSecurityStatus';

export function useSecurityStatus(): SecurityStatus {
  const { config: remoteConfig, isReady: isRemoteConfigReady } =
    use(RemoteConfigContext);

  const { isComplete } = useSimulatedStartupCheck({
    isEnabled: isRemoteConfigReady && remoteConfig.securityPolicy.isRequired,
    ...APP_START_CONFIG.startup.security.delayRangeMs,
    onComplete: () => recordStartupStep('Security', 'resolved'),
    onStart: () => recordStartupStep('Security', 'started'),
  });

  return resolveSecurityStatus({
    isComplete,
    isCompromised: APP_START_CONFIG.startup.security.isCompromised,
    isRemoteConfigReady,
    isSecurityRequired: remoteConfig.securityPolicy.isRequired,
  });
}
