import {
  SpaceGrotesk_400Regular,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
} from '@expo-google-fonts/space-grotesk';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';

import { RootNavigator } from './navigation/RootNavigator';

SplashScreen.preventAutoHideAsync();

export function App() {
  const [hasLoadedFonts] = useFonts({
    SpaceGrotesk_400Regular,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
  });

  if (!hasLoadedFonts) {
    // Async font loading only occurs in development
    return null;
  }

  return (
    <>
      <StatusBar style="dark" />
      <RootNavigator
        linking={{
          enabled: 'auto',
          prefixes: ['appstartdemo://'],
        }}
        onReady={() => {
          SplashScreen.hideAsync();
        }}
      />
    </>
  );
}
