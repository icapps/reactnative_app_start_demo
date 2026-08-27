import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getHeavyModule } from '@/features/heavy/heavyModuleMap';
import { fonts } from '@/shared/utils/fonts';

const HeavyModule = getHeavyModule('eager');

export function Settings() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Heavy</Text>
        <Text style={styles.subtitle}>
          This feature was loaded eagerly during app start.
        </Text>
      </View>
      <HeavyModule />
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
