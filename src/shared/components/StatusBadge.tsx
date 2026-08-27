import { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { fonts } from '@/shared/utils/fonts';

type StatusBadgeProps = {
  label: string;
  type: 'loading' | 'success';
};

export function StatusBadge({ label, type }: StatusBadgeProps) {
  const dotOpacity = useSharedValue(1);
  const dotScale = useSharedValue(1);

  useEffect(() => {
    if (type !== 'loading') {
      dotOpacity.value = 1;
      dotScale.value = 1;
      return;
    }

    dotOpacity.value = withRepeat(
      withTiming(0.35, { duration: 900 }),
      -1,
      true,
    );
    dotScale.value = withRepeat(withTiming(1.3, { duration: 900 }), -1, true);

    return () => {
      cancelAnimation(dotOpacity);
      cancelAnimation(dotScale);
    };
  }, [dotOpacity, dotScale, type]);

  const dotStyle = useAnimatedStyle(() => {
    return {
      opacity: dotOpacity.value,
      transform: [{ scale: dotScale.value }],
    };
  });

  return (
    <Animated.View style={styles.container}>
      <Animated.View
        style={[
          styles.dot,
          type === 'success' && styles.dotSuccess,
          type === 'loading' && styles.dotLoading,
          dotStyle,
        ]}
      />
      <Text style={styles.label}>{label}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    borderRadius: 4,
    height: 8,
    width: 8,
  },
  dotLoading: {
    backgroundColor: '#f97316',
  },
  dotSuccess: {
    backgroundColor: '#22c55e',
  },
  label: {
    color: '#64748b',
    fontFamily: fonts.semiBold,
    fontSize: 11,
    letterSpacing: 0.8,
  },
});
