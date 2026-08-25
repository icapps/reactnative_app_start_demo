import { createContext, type ReactNode } from 'react';

import {
  SecurityCheckStatus,
  type SecurityCheckStatus as SecurityCheckStatusType,
  useSecurityCheckStatus,
} from './useSecurityCheckStatus';

type SecurityCheckStatusContextValue = {
  status: SecurityCheckStatusType;
};

export const SecurityCheckStatusContext =
  createContext<SecurityCheckStatusContextValue>({
    status: SecurityCheckStatus.LOADING,
  });

export function SecurityCheckStatusProvider({
  children,
}: {
  children: ReactNode;
}) {
  const status = useSecurityCheckStatus();

  return (
    <SecurityCheckStatusContext.Provider value={{ status }}>
      {children}
    </SecurityCheckStatusContext.Provider>
  );
}
