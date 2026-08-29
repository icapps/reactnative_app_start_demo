import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { useStartupCompletion } from './useStartupCompletion';

type SplashScreenControllerProps = {
  isNavigationReady: boolean;
};

export function SplashScreenController({
  isNavigationReady,
}: SplashScreenControllerProps) {
  const { isComplete: isStartupComplete } =
    useStartupCompletion(isNavigationReady);

  useEffect(() => {
    if (isStartupComplete) {
      SplashScreen.hideAsync();
    }
  }, [isStartupComplete]);

  return null;
}
