import { useEffect, useRef, useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import {
  Animated,
  Easing,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { fonts } from '@/utils/fonts';

type Segment<T extends string> = {
  label: string;
  value: T;
};

type SegmentedControlProps<T extends string> = {
  onChange: (value: T) => void;
  segments: readonly Segment<T>[];
  value: T;
};

export function SegmentedControl<T extends string>({
  onChange,
  segments,
  value,
}: SegmentedControlProps<T>) {
  const [segmentWidth, setSegmentWidth] = useState(0);
  const indicatorPosition = useRef(
    new Animated.Value(
      segments.findIndex((segment) => segment.value === value),
    ),
  ).current;

  useEffect(() => {
    if (!segmentWidth) {
      return;
    }

    Animated.timing(indicatorPosition, {
      duration: 280,
      easing: Easing.out(Easing.cubic),
      toValue: segments.findIndex((segment) => segment.value === value),
      useNativeDriver: true,
    }).start();
  }, [indicatorPosition, segmentWidth, segments, value]);

  const handleLayout = ({ nativeEvent }: LayoutChangeEvent) => {
    setSegmentWidth(
      (nativeEvent.layout.width - 8 - (segments.length - 1) * 4) /
        segments.length,
    );
  };

  return (
    <View onLayout={handleLayout} style={styles.group}>
      {segmentWidth > 0 && (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.indicator,
            {
              transform: [
                {
                  translateX: indicatorPosition.interpolate({
                    inputRange: segments.map((_, index) => index),
                    outputRange: segments.map(
                      (_, index) => index * (segmentWidth + 4),
                    ),
                  }),
                },
              ],
              width: segmentWidth,
            },
          ]}
        />
      )}
      {segments.map((segment) => (
        <View key={segment.value} style={styles.segmentClip}>
          <Pressable
            android_ripple={styles.segmentRipple}
            onPress={() => onChange(segment.value)}
            style={({ pressed: isPressed }) => [
              styles.segment,
              Platform.OS === 'ios' && isPressed && styles.segmentPressed,
            ]}
          >
            <Text
              style={[
                styles.segmentLabel,
                value === segment.value && styles.segmentLabelActive,
              ]}
            >
              {segment.label}
            </Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    backgroundColor: '#e8edf2',
    borderRadius: 12,
    flexDirection: 'row',
    gap: 4,
    overflow: 'hidden',
    padding: 4,
  },
  indicator: {
    backgroundColor: '#002548',
    borderRadius: 8,
    bottom: 4,
    left: 4,
    position: 'absolute',
    top: 4,
  },
  segment: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 36,
    paddingVertical: 8,
  },
  segmentClip: {
    borderRadius: 8,
    flex: 1,
    overflow: 'hidden',
  },
  segmentLabel: {
    color: '#64748b',
    fontFamily: fonts.semiBold,
    fontSize: 13,
  },
  segmentLabelActive: {
    color: '#ffffff',
  },
  segmentPressed: {
    opacity: 0.7,
  },
  segmentRipple: {
    color: '#47556999',
  },
});
