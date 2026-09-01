import { use } from 'react';

import { RootNavigationStackContext } from './RootNavigationStackProvider';

export function useStartupCompletion(isNavigationReady: boolean) {
  const { current: currentScreen } = use(RootNavigationStackContext);
  const isStartupError = currentScreen === 'StartupError';

  return {
    currentScreen,
    isSettled:
      isStartupError || (isNavigationReady && currentScreen !== 'Loading'),
  };
}
