import { createContext, type ReactNode } from 'react';

import {
  SecurityStatus,
  type SecurityStatus as SecurityStatusType,
  useSecurityStatus,
} from './useSecurityStatus';

type SecurityStatusContextValue = {
  retry: () => void;
  status: SecurityStatusType;
};

export const SecurityStatusContext = createContext<SecurityStatusContextValue>({
  retry: () => undefined,
  status: SecurityStatus.LOADING,
});

export function SecurityStatusProvider({ children }: { children: ReactNode }) {
  const { retry, status } = useSecurityStatus();

  return (
    <SecurityStatusContext.Provider value={{ retry, status }}>
      {children}
    </SecurityStatusContext.Provider>
  );
}
