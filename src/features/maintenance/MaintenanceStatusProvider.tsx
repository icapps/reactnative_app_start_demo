import { createContext, type ReactNode } from 'react';

import {
  MaintenanceStatus,
  type MaintenanceStatus as MaintenanceStatusType,
  useMaintenanceStatus,
} from './useMaintenanceStatus';

type MaintenanceStatusContextValue = {
  status: MaintenanceStatusType;
};

export const MaintenanceStatusContext =
  createContext<MaintenanceStatusContextValue>({
    status: MaintenanceStatus.LOADING,
  });

export function MaintenanceStatusProvider({
  children,
}: {
  children: ReactNode;
}) {
  const status = useMaintenanceStatus();

  return (
    <MaintenanceStatusContext.Provider value={{ status }}>
      {children}
    </MaintenanceStatusContext.Provider>
  );
}
