import { Suspense } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StatusBadge } from '@/components/StatusBadge';
import { getHeavyModule } from '@/features/heavy/heavyModuleMap';
import { fonts } from '@/utils/fonts';

const LazyHeavyModule = getHeavyModule('lazy');

export function LazySettings() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Heavy</Text>
        <Text style={styles.subtitle}>
          This feature only loads once this tab is opened.
        </Text>
      </View>
      <Suspense
        fallback={
          <View style={styles.status}>
            <StatusBadge label="MODULE LOADING" type="loading" />
            <Text style={styles.description}>The module is loading now.</Text>
          </View>
        }
      >
        <LazyHeavyModule />
      </Suspense>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 32,
    padding: 16,
  },
  description: {
    color: '#64748b',
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 21,
  },
  header: {
    gap: 4,
  },
  status: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    gap: 8,
    padding: 16,
  },
  subtitle: {
    color: '#475569',
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 22,
  },
  title: {
    color: '#002548',
    fontFamily: fonts.bold,
    fontSize: 32,
    lineHeight: 38,
  },
});
