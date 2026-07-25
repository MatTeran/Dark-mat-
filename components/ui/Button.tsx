import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { colors, radii, spacing, typography } from '../../lib/theme';
import { Text } from './Text';

export type ButtonVariant =
  | 'primary'
  | 'primaryGold'
  | 'secondary'
  | 'ghost'
  | 'reserved'
  | 'outlineGold';

export interface ButtonProps extends Omit<PressableProps, 'children'> {
  label: string;
  variant?: ButtonVariant;
  loading?: boolean;
  loadingLabel?: string;
  fullWidth?: boolean;
}

/**
 * Primary interaction control — gold CTA matches Dark Mat branding.
 *
 * Background is painted on an inner View so NativeWind's Pressable
 * cssInterop cannot drop the surface fill (which left dark labels on charcoal).
 */
export function Button({
  label,
  variant = 'primary',
  loading = false,
  loadingLabel,
  fullWidth = true,
  disabled,
  style,
  ...rest
}: ButtonProps) {
  const isDisabled = Boolean(disabled) || loading;
  const resolvedVariant = variant === 'primary' ? 'primaryGold' : variant;
  const displayLabel = loading ? loadingLabel || label : label;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      style={({ pressed }) => [
        fullWidth && styles.fullWidth,
        pressed && !isDisabled && styles.pressScale,
        style as ViewStyle,
      ]}
      {...rest}
    >
      {({ pressed }) => (
        <View
          style={[
            styles.surface,
            surfaceStyles[resolvedVariant],
            pressed &&
              !isDisabled &&
              (resolvedVariant === 'primaryGold'
                ? styles.primaryPressed
                : undefined),
            isDisabled &&
              resolvedVariant === 'primaryGold' &&
              styles.primaryDisabledSurface,
          ]}
        >
          {loading ? (
            <View style={styles.loadingRow}>
              <ActivityIndicator
                color={
                  resolvedVariant === 'primaryGold'
                    ? colors.primaryBackground
                    : colors.goldAccent
                }
              />
              <Text
                style={[
                  typography.button,
                  labelStyles[resolvedVariant],
                  isDisabled &&
                    resolvedVariant === 'primaryGold' &&
                    styles.primaryDisabledLabel,
                ]}
              >
                {displayLabel}
              </Text>
            </View>
          ) : (
            <Text
              style={[
                typography.button,
                labelStyles[resolvedVariant],
                isDisabled &&
                  resolvedVariant === 'primaryGold' &&
                  styles.primaryDisabledLabel,
              ]}
            >
              {displayLabel}
            </Text>
          )}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fullWidth: {
    alignSelf: 'stretch',
    width: '100%',
  },
  pressScale: {
    transform: [{ scale: 0.985 }],
  },
  surface: {
    minHeight: 48,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  primaryPressed: {
    backgroundColor: colors.goldPressed,
  },
  primaryDisabledSurface: {
    backgroundColor: colors.goldTintSurface,
    borderColor: 'rgba(212, 175, 55, 0.45)',
  },
  primaryDisabledLabel: {
    color: '#E6D39A',
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
});

const surfaceStyles = StyleSheet.create({
  primaryGold: {
    backgroundColor: colors.goldAccent,
    borderColor: colors.goldAccent,
  },
  reserved: {
    backgroundColor: colors.goldTintSurface,
    borderColor: colors.goldAccent,
  },
  outlineGold: {
    backgroundColor: 'transparent',
    borderColor: colors.goldAccent,
  },
  secondary: {
    backgroundColor: colors.secondaryBackground,
    borderColor: colors.border,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
});

const labelStyles = StyleSheet.create({
  primaryGold: {
    color: colors.primaryBackground,
  },
  reserved: {
    color: colors.goldAccent,
  },
  outlineGold: {
    color: colors.goldAccent,
  },
  secondary: {
    color: colors.text,
  },
  ghost: {
    color: colors.goldAccent,
  },
});
