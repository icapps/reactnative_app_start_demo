import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getHeavyModule } from '@/features/heavy/heavyModuleMap';

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
    fontFamily: 'SpaceGrotesk_400Regular',
    fontSize: 15,
    lineHeight: 22,
  },
  title: {
    color: '#002548',
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 32,
    lineHeight: 38,
  },
});
