import { StyleSheet, Text, View } from 'react-native';

import { StatusBadge } from '@/components/StatusBadge';
import { fonts } from '@/utils/fonts';
import { log } from '@/utils/logger';

import { INITIAL_HEAVY_LOADING_STRATEGY } from './heavyLoadingStrategy';

log('Heavy', 'Module evaluation started');
const startedAt = Date.now();
while (Date.now() - startedAt < 10000) {}
log('Heavy', 'Module evaluation finished');

export function HeavyModule() {
  return (
    <View style={styles.status}>
      <StatusBadge
        label={
          INITIAL_HEAVY_LOADING_STRATEGY === 'eager'
            ? 'EAGER IMPORT'
            : 'MODULE LOADED'
        }
        type="success"
      />
      <Text style={styles.description}>
        {INITIAL_HEAVY_LOADING_STRATEGY === 'eager'
          ? 'The module was evaluated during app start.'
          : 'The module has finished loading.'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  description: {
    color: '#64748b',
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 21,
  },
  status: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    gap: 8,
    padding: 16,
  },
});
