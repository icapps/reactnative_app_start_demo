import { APP_START_CONFIG } from '@/config/appStart';
import { useRandomDelay } from '@/shared/hooks/useRandomDelay';
import { recordStartupStep } from '@/shared/utils/startupTelemetry';

export const SecurityCheckStatus = {
  COMPROMISED: 'Compromised',
  LOADING: 'Loading',
  PASSED: 'Passed',
} as const;

export type SecurityCheckStatus =
  (typeof SecurityCheckStatus)[keyof typeof SecurityCheckStatus];

export function useSecurityCheckStatus(): SecurityCheckStatus {
  const { isComplete } = useRandomDelay({
    ...APP_START_CONFIG.startup.security.delayRangeMs,
    onComplete: () => recordStartupStep('security', 'resolved'),
    onStart: () => recordStartupStep('security', 'started'),
  });

  if (!isComplete) {
    return SecurityCheckStatus.LOADING;
  }

  return APP_START_CONFIG.startup.security.isCompromised
    ? SecurityCheckStatus.COMPROMISED
    : SecurityCheckStatus.PASSED;
}
