import { createContext, type ReactNode } from 'react';

import {
  type RootNavigationStack,
  useRootNavigationStack,
} from './useRootNavigationStack';

type RootNavigationStackContextValue = {
  current: RootNavigationStack;
};

export const RootNavigationStackContext =
  createContext<RootNavigationStackContextValue>({ current: 'Loading' });

export function RootNavigationStackProvider({
  children,
}: {
  children: ReactNode;
}) {
  const current = useRootNavigationStack();

  return (
    <RootNavigationStackContext.Provider value={{ current }}>
      {children}
    </RootNavigationStackContext.Provider>
  );
}
