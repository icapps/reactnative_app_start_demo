import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

import { AppConfigProvider } from '@/features/app-config/AppConfigProvider';
import { AppVersionStatusProvider } from '@/features/app-version/AppVersionStatusProvider';
import { MaintenanceStatusProvider } from '@/features/maintenance/MaintenanceStatusProvider';
import { SecurityCheckStatusProvider } from '@/features/security/SecurityCheckStatusProvider';
import { RootNavigationStackProvider } from '@/navigation/RootNavigationStackProvider';
import { RootNavigator } from '@/navigation/RootNavigator';
import { SplashScreenController } from '@/navigation/SplashScreenController';

SplashScreen.preventAutoHideAsync();

export function App() {
  const [isNavigationReady, setIsNavigationReady] = useState(false);

  const handleNavigationReady = () => {
    setIsNavigationReady(true);
  };

  return (
    <AppConfigProvider>
      <AppVersionStatusProvider>
        <MaintenanceStatusProvider>
          <SecurityCheckStatusProvider>
            <RootNavigationStackProvider>
              <StatusBar style="dark" />
              <SplashScreenController isNavigationReady={isNavigationReady} />
              <RootNavigator
                linking={{
                  enabled: 'auto',
                  prefixes: ['appstartdemo://'],
                }}
                onReady={handleNavigationReady}
              />
            </RootNavigationStackProvider>
          </SecurityCheckStatusProvider>
        </MaintenanceStatusProvider>
      </AppVersionStatusProvider>
    </AppConfigProvider>
  );
}
