import { View } from 'react-native';

import { styles } from './styles';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useEffect } from 'react';

interface Props {
  total: number;
  current: number;
}

export function ProgressBar({ total, current }: Props) {
  const percentage = Math.round((current / total) * 100);
  const animatedWidth = useSharedValue(percentage);

  const animatedBarStyle = useAnimatedStyle(() => {
    return {
      width: `${animatedWidth.value}%`,
    }
  })

  useEffect(() => {
    animatedWidth.value = withTiming(percentage, {
      easing: Easing.elastic(1),
    });
  }, [percentage]);

  return (
    <View style={styles.track}>
      <Animated.View style={[styles.progress, animatedBarStyle]} />
    </View>
  );
}