import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function NotFound() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.description}>
          The page you're looking for doesn't exist.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  content: {
    alignItems: 'center',
    flex: 1,
    gap: 8,
    justifyContent: 'center',
  },
  description: {
    color: '#64748b',
    fontFamily: 'SpaceGrotesk_400Regular',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
  },
});
