import * as SplashScreen from 'expo-splash-screen';
import { use, useEffect } from 'react';

import { RootNavigationStackContext } from './RootNavigationStackProvider';

type SplashScreenControllerProps = {
  isNavigationReady: boolean;
};

export function SplashScreenController({
  isNavigationReady,
}: SplashScreenControllerProps) {
  const { current } = use(RootNavigationStackContext);

  useEffect(() => {
    if (isNavigationReady && current !== 'Loading') {
      SplashScreen.hideAsync();
    }
  }, [current, isNavigationReady]);

  return null;
}
