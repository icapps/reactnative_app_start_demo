import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { useStartupCompletion } from './useStartupCompletion';

type SplashScreenControllerProps = {
  isNavigationReady: boolean;
};

export function SplashScreenController({
  isNavigationReady,
}: SplashScreenControllerProps) {
  const { isSettled: isStartupSettled } =
    useStartupCompletion(isNavigationReady);

  useEffect(() => {
    if (!isStartupSettled) {
      return;
    }

    SplashScreen.hideAsync();
  }, [isStartupSettled]);

  return null;
}
