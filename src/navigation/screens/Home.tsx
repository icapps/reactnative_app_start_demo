import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  getHeavyLoadingStrategy,
  type HeavyLoadingStrategy,
  setHeavyLoadingStrategy,
} from '@/features/heavy/heavyLoadingStrategy';
import { SegmentedControl } from '@/shared/components/SegmentedControl';
import { fonts } from '@/shared/utils/fonts';

export function Home() {
  const [strategy, setStrategy] = useState<HeavyLoadingStrategy>(
    getHeavyLoadingStrategy(),
  );

  function handleStrategyChange(nextStrategy: HeavyLoadingStrategy) {
    setHeavyLoadingStrategy(nextStrategy);
    setStrategy(nextStrategy);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Home</Text>
        <Text style={styles.subtitle}>
          This is the first meaningful screen the app renders.
        </Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.infoTitle}>Heavy module loading strategy</Text>
        <Text style={styles.infoDescription}>
          This preference applies the next time the app starts.
        </Text>
        <SegmentedControl
          onChange={handleStrategyChange}
          segments={[
            { label: 'Eager', value: 'eager' },
            { label: 'Lazy', value: 'lazy' },
          ]}
          value={strategy}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 32,
    padding: 16,
  },
  header: {
    gap: 4,
  },
  info: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    gap: 8,
    padding: 16,
  },
  infoDescription: {
    color: '#64748b',
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 21,
  },
  infoTitle: {
    color: '#002548',
    fontFamily: fonts.semiBold,
    fontSize: 16,
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
