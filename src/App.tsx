import { useNavigationContainerRef } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

import { navigationIntegration } from '@/config/sentry';
import { AppConfigProvider } from '@/features/app-config/AppConfigProvider';
import { AppVersionStatusProvider } from '@/features/app-version/AppVersionStatusProvider';
import { MaintenanceStatusProvider } from '@/features/maintenance/MaintenanceStatusProvider';
import { SecurityCheckStatusProvider } from '@/features/security/SecurityCheckStatusProvider';
import { RootNavigationStackProvider } from '@/navigation/RootNavigationStackProvider';
import type { RootStackParamList } from '@/navigation/RootNavigator';
import { RootNavigator } from '@/navigation/RootNavigator';
import { SplashScreenController } from '@/navigation/SplashScreenController';
import { StartupTelemetryReporter } from '@/navigation/StartupTelemetryReporter';

SplashScreen.preventAutoHideAsync();

export function App() {
  const [isNavigationReady, setIsNavigationReady] = useState(false);
  const navigationRef = useNavigationContainerRef<RootStackParamList>();

  const handleNavigationReady = () => {
    navigationIntegration.registerNavigationContainer(navigationRef);
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
          </SecurityCheckStatusProvider>
        </MaintenanceStatusProvider>
      </AppVersionStatusProvider>
    </AppConfigProvider>
  );
}
