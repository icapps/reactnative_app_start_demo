import { APP_START_CONFIG } from '@/config/appStartConfig';
import { useRandomDelay } from '@/shared/hooks/useRandomDelay';

export const SecurityCheckStatus = {
  COMPROMISED: 'Compromised',
  LOADING: 'Loading',
  PASSED: 'Passed',
} as const;

export type SecurityCheckStatus =
  (typeof SecurityCheckStatus)[keyof typeof SecurityCheckStatus];

export function useSecurityCheckStatus(): SecurityCheckStatus {
  const { isReady } = useRandomDelay(
    APP_START_CONFIG.startup.security.delayRangeMs,
  );

  if (!isReady) {
    return SecurityCheckStatus.LOADING;
  }

  return APP_START_CONFIG.startup.security.isCompromised
    ? SecurityCheckStatus.COMPROMISED
    : SecurityCheckStatus.PASSED;
}
