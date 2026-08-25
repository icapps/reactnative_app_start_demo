import { createContext, type ReactNode } from 'react';

import {
  AppVersionStatus,
  type AppVersionStatus as AppVersionStatusType,
  useAppVersionStatus,
} from './useAppVersionStatus';

type AppVersionStatusContextValue = {
  status: AppVersionStatusType;
};

export const AppVersionStatusContext =
  createContext<AppVersionStatusContextValue>({
    status: AppVersionStatus.LOADING,
  });

export function AppVersionStatusProvider({
  children,
}: {
  children: ReactNode;
}) {
  const status = useAppVersionStatus();

  return (
    <AppVersionStatusContext.Provider value={{ status }}>
      {children}
    </AppVersionStatusContext.Provider>
  );
}
