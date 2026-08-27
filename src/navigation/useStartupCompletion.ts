import { use } from 'react';

import { RootNavigationStackContext } from './RootNavigationStackProvider';

export function useStartupCompletion(isNavigationReady: boolean) {
  const { current: currentScreen } = use(RootNavigationStackContext);

  return {
    currentScreen,
    isComplete: isNavigationReady && currentScreen !== 'Loading',
  };
}
