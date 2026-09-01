import { createContext, type ReactNode } from 'react';

import { APP_START_CONFIG } from '@/config/appStart';

import { RemoteConfigStatus } from './resolveRemoteConfigStatus';
import { useRemoteConfig } from './useRemoteConfig';

type RemoteConfigContextValue = {
  config: typeof APP_START_CONFIG.startup.remoteConfig;
  isSettled: boolean;
  retry: () => void;
  status: RemoteConfigStatus;
};

export const RemoteConfigContext = createContext<RemoteConfigContextValue>({
  config: APP_START_CONFIG.startup.remoteConfig,
  isSettled: false,
  retry: () => undefined,
  status: RemoteConfigStatus.LOADING,
});

export function RemoteConfigProvider({ children }: { children: ReactNode }) {
  const { config, isSettled, retry, status } = useRemoteConfig();

  return (
    <RemoteConfigContext.Provider value={{ config, isSettled, retry, status }}>
      {children}
    </RemoteConfigContext.Provider>
  );
}
