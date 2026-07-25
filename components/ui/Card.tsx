import { PropsWithChildren } from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { colors, radii, spacing } from '../../lib/theme';

export interface CardProps extends PropsWithChildren {
  onPress?: PressableProps['onPress'];
  padded?: boolean;
  /** Layout styles for the outer wrapper (width/flex). Applied to Pressable when interactive. */
  style?: StyleProp<ViewStyle>;
  /** Visual styles for the inner surface (overflow, background overrides). */
  contentStyle?: StyleProp<ViewStyle>;
}

/**
 * Elevated dark surface for interactive dashboard modules.
 * Layout styles must land on the outer wrapper so flex/grid sizing works.
 */
export function Card({
  children,
  onPress,
  padded = true,
  style,
  contentStyle,
}: CardProps) {
  const surface = (
    <View
      style={[
        styles.card,
        padded && styles.padded,
        onPress ? styles.fill : null,
        !onPress ? style : null,
        contentStyle,
      ]}
    >
      {children}
    </View>
  );

  if (!onPress) {
    return surface;
  }

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [style, pressed && styles.pressed]}
    >
      {surface}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.secondaryBackground,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000000',
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  fill: {
    alignSelf: 'stretch',
  },
  padded: {
    padding: spacing.lg,
  },
  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.985 }],
  },
});
