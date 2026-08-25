import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

import { AppConfigProvider } from '@/features/app-config/AppConfigProvider';
import { AppVersionStatusProvider } from '@/features/app-version/AppVersionStatusProvider';
import { RootNavigationStackProvider } from '@/navigation/NavigationStackProvider';
import { RootNavigator } from '@/navigation/RootNavigator';
import { SplashScreenController } from '@/navigation/SplashScreenController';

SplashScreen.preventAutoHideAsync();

export function App() {
  const [isNavigationReady, setIsNavigationReady] = useState(false);

  return (
    <AppConfigProvider>
      <AppVersionStatusProvider>
        <RootNavigationStackProvider>
          <StatusBar style="dark" />
          <SplashScreenController isNavigationReady={isNavigationReady} />
          <RootNavigator
            linking={{
              enabled: 'auto',
              prefixes: ['appstartdemo://'],
            }}
            onReady={() => setIsNavigationReady(true)}
          />
        </RootNavigationStackProvider>
      </AppVersionStatusProvider>
    </AppConfigProvider>
  );
}
