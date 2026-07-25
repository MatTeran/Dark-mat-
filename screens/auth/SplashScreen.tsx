import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

import { Text } from '../../components';
import { APP_NAME, APP_TAGLINE, AUTH_SPLASH_DURATION_MS } from '../../lib/constants';
import { colors, spacing } from '../../lib/theme';
import type { AuthStackParamList } from '../../types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Splash'>;

/**
 * Branded launch moment — mark is the hero, then soft transition to auth.
 * Uses RN Animated (not Reanimated) for Expo Go stability.
 */
export function SplashScreen({ navigation }: Props) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(12)).current;
  const lineWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 700,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 700,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(lineWidth, {
        toValue: 72,
        duration: 600,
        delay: 280,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, AUTH_SPLASH_DURATION_MS);

    return () => clearTimeout(timer);
  }, [lineWidth, navigation, opacity, translateY]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity,
            transform: [{ translateY }],
          },
        ]}
      >
        <Text variant="brand" gold style={styles.brand}>
          {APP_NAME.toUpperCase()}
        </Text>
        <Animated.View style={[styles.accent, { width: lineWidth }]} />
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
