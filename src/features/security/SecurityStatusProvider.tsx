import { createContext, type ReactNode } from 'react';

import {
  SecurityStatus,
  type SecurityStatus as SecurityStatusType,
  useSecurityStatus,
} from './useSecurityStatus';

type SecurityStatusContextValue = {
  status: SecurityStatusType;
};

export const SecurityStatusContext = createContext<SecurityStatusContextValue>({
  status: SecurityStatus.LOADING,
});

export function SecurityStatusProvider({ children }: { children: ReactNode }) {
  const status = useSecurityStatus();

  return (
    <SecurityStatusContext.Provider value={{ status }}>
      {children}
    </SecurityStatusContext.Provider>
  );
}
