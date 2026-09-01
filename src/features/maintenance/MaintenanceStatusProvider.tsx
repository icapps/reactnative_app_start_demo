import { createContext, type ReactNode } from 'react';

import {
  MaintenanceStatus,
  type MaintenanceStatus as MaintenanceStatusType,
  useMaintenanceStatus,
} from './useMaintenanceStatus';

type MaintenanceStatusContextValue = {
  retry: () => void;
  status: MaintenanceStatusType;
};

export const MaintenanceStatusContext =
  createContext<MaintenanceStatusContextValue>({
    retry: () => undefined,
    status: MaintenanceStatus.LOADING,
  });

export function MaintenanceStatusProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { retry, status } = useMaintenanceStatus();

  return (
    <MaintenanceStatusContext.Provider value={{ retry, status }}>
      {children}
    </MaintenanceStatusContext.Provider>
  );
}
