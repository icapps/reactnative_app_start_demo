import 'react-native-gesture-handler';
import * as Sentry from '@sentry/react-native';
import { registerRootComponent } from 'expo';

import { initializeSentry } from '@/config/sentry';
import { startAppStartupSpan } from '@/shared/utils/startupTelemetry';

initializeSentry();
startAppStartupSpan(); // Starts before requiring App, so eager module evaluation is captured

const { App } = require('@/App');

registerRootComponent(Sentry.wrap(App));
