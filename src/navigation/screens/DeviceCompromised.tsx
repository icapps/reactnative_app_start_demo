import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { fonts } from '@/shared/utils/fonts';

export function DeviceCompromised() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>SECURITY CHECK</Text>
          <Text style={styles.title}>This device is not supported</Text>
        </View>
        <Text style={styles.description}>
          For your security, this app cannot run on a compromised device.
        </Text>
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
  title: {
    color: '#002548',
    fontFamily: fonts.bold,
    fontSize: 32,
    lineHeight: 38,
  },
});
