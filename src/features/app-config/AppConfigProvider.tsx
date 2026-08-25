import { createContext, type ReactNode } from 'react';

import { APP_START_CONFIG } from '@/config/appStartConfig';

import { useAppConfig } from './useAppConfig';

type AppConfigContextValue = {
  config: typeof APP_START_CONFIG.startup.versionCheck;
  isReady: boolean;
};

export const AppConfigContext = createContext<AppConfigContextValue>({
  config: APP_START_CONFIG.startup.versionCheck,
  isReady: false,
});

export function AppConfigProvider({ children }: { children: ReactNode }) {
  const { config, isReady } = useAppConfig();

  return (
    <AppConfigContext.Provider value={{ config, isReady }}>
      {children}
    </AppConfigContext.Provider>
  );
}
