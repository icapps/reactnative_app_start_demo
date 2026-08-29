import { createContext, type ReactNode } from 'react';

import { APP_START_CONFIG } from '@/config/appStart';

import { useRemoteConfig } from './useRemoteConfig';

type RemoteConfigContextValue = {
  config: typeof APP_START_CONFIG.startup.remoteConfig;
  isReady: boolean;
};

export const RemoteConfigContext = createContext<RemoteConfigContextValue>({
  config: APP_START_CONFIG.startup.remoteConfig,
  isReady: false,
});

export function RemoteConfigProvider({ children }: { children: ReactNode }) {
  const { config, isReady } = useRemoteConfig();

  return (
    <RemoteConfigContext.Provider value={{ config, isReady }}>
      {children}
    </RemoteConfigContext.Provider>
  );
}
