import 'react-native-gesture-handler';
import * as Sentry from '@sentry/react-native';
import { registerRootComponent } from 'expo';

import { App } from '@/App';
import { initializeSentry } from '@/config/sentry';

initializeSentry();

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Sentry.wrap(App));
