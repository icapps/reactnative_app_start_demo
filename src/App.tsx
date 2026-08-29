import { useNavigationContainerRef } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

import { navigationIntegration } from '@/config/sentry';
import { AppVersionStatusProvider } from '@/features/app-version/AppVersionStatusProvider';
import { MaintenanceStatusProvider } from '@/features/maintenance/MaintenanceStatusProvider';
import { RemoteConfigProvider } from '@/features/remote-config/RemoteConfigProvider';
import { SecurityStatusProvider } from '@/features/security/SecurityStatusProvider';
import type { RootStackParamList } from '@/navigation/RootNavigator';
import { RootNavigator } from '@/navigation/RootNavigator';
import { RootNavigationStackProvider } from '@/navigation/startup/RootNavigationStackProvider';
import { SplashScreenController } from '@/navigation/startup/SplashScreenController';
import { StartupTelemetryReporter } from '@/navigation/startup/StartupTelemetryReporter';

SplashScreen.preventAutoHideAsync();

export function App() {
  const [isNavigationReady, setIsNavigationReady] = useState(false);
  const navigationRef = useNavigationContainerRef<RootStackParamList>();

  const handleNavigationReady = () => {
    navigationIntegration.registerNavigationContainer(navigationRef);
    setIsNavigationReady(true);
  };

  return (
    <RemoteConfigProvider>
      <AppVersionStatusProvider>
        <MaintenanceStatusProvider>
          <SecurityStatusProvider>
            <RootNavigationStackProvider>
              <StatusBar style="dark" />
              <SplashScreenController isNavigationReady={isNavigationReady} />
              <StartupTelemetryReporter isNavigationReady={isNavigationReady} />
              <RootNavigator
                linking={{
                  enabled: 'auto',
                  prefixes: ['appstartdemo://'],
                }}
                ref={navigationRef}
                onReady={handleNavigationReady}
              />
            </RootNavigationStackProvider>
          </SecurityStatusProvider>
        </MaintenanceStatusProvider>
      </AppVersionStatusProvider>
    </RemoteConfigProvider>
  );
}
