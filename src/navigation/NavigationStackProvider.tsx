import { createContext, type ReactNode } from 'react';

import { type NavigationStack, useNavigationStack } from './useNavigationStack';

type NavigationStackContextValue = {
  current: NavigationStack;
};

export const RootNavigationStackContext =
  createContext<NavigationStackContextValue>({ current: 'Loading' });

export function RootNavigationStackProvider({
  children,
}: {
  children: ReactNode;
}) {
  const current = useNavigationStack();

  return (
    <RootNavigationStackContext.Provider value={{ current }}>
      {children}
    </RootNavigationStackContext.Provider>
  );
}
