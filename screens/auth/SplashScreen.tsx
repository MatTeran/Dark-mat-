import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import { Text } from '../../components';
import { APP_NAME, APP_TAGLINE, AUTH_SPLASH_DURATION_MS } from '../../lib/constants';
import { colors, spacing } from '../../lib/theme';
import type { AuthStackParamList } from '../../types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Splash'>;

/**
 * Branded launch moment — mark is the hero, then soft transition to auth.
 */
export function SplashScreen({ navigation }: Props) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(12);
  const lineWidth = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 700, easing: Easing.out(Easing.cubic) });
    translateY.value = withTiming(0, { duration: 700, easing: Easing.out(Easing.cubic) });
    lineWidth.value = withDelay(
      280,
      withTiming(72, { duration: 600, easing: Easing.out(Easing.cubic) }),
    );

    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, AUTH_SPLASH_DURATION_MS);

    return () => clearTimeout(timer);
  }, [lineWidth, navigation, opacity, translateY]);

  const contentStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const accentStyle = useAnimatedStyle(() => ({
    width: lineWidth.value,
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, contentStyle]}>
        <Text variant="brand" gold style={styles.brand}>
          {APP_NAME.toUpperCase()}
        </Text>
        <Animated.View style={[styles.accent, accentStyle]} />
        <Text variant="bodyMuted" style={styles.tagline}>
          {APP_TAGLINE}
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackground,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  content: {
    alignItems: 'center',
  },
  brand: {
    textAlign: 'center',
  },
  accent: {
    height: 2,
    backgroundColor: colors.goldAccent,
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  tagline: {
    textAlign: 'center',
  },
});
