import { use } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MaintenanceStatusContext } from '@/features/maintenance/MaintenanceStatusProvider';
import { RemoteConfigContext } from '@/features/remote-config/RemoteConfigProvider';
import { SecurityStatusContext } from '@/features/security/SecurityStatusProvider';
import { fonts } from '@/shared/utils/fonts';

export function StartupError() {
  const { retry: retryMaintenance } = use(MaintenanceStatusContext);
  const { retry: retryRemoteConfig } = use(RemoteConfigContext);
  const { retry: retrySecurity } = use(SecurityStatusContext);

  function handleStartupRetry() {
    retryMaintenance();
    retryRemoteConfig();
    retrySecurity();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>STARTUP ERROR</Text>
          <Text style={styles.title}>We could not start the app</Text>
        </View>
        <Text style={styles.description}>
          Something went wrong while starting the app. Please try again.
        </Text>
        <Pressable
          onPress={handleStartupRetry}
          style={({ pressed: isPressed }) => [
            styles.link,
            isPressed && styles.linkPressed,
          ]}
        >
          <Text style={styles.linkLabel}>Retry</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  content: {
    gap: 16,
  },
  description: {
    color: '#475569',
    fontFamily: fonts.regular,
    fontSize: 16,
    lineHeight: 24,
  },
  eyebrow: {
    color: '#b42318',
    fontFamily: fonts.semiBold,
    fontSize: 12,
    letterSpacing: 1.2,
  },
  header: {
    gap: 4,
  },
  link: {
    alignSelf: 'flex-end',
  },
  linkLabel: {
    color: '#0066cc',
    fontFamily: fonts.semiBold,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  linkPressed: {
    opacity: 0.75,
  },
  title: {
    color: '#002548',
    fontFamily: fonts.bold,
    fontSize: 32,
    lineHeight: 38,
  },
});
