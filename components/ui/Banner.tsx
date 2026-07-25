import { StyleSheet, View } from 'react-native';

import { colors, radii, spacing } from '../../lib/theme';
import { Text } from './Text';

type BannerTone = 'error' | 'success' | 'info';

export interface BannerProps {
  message: string;
  tone?: BannerTone;
}

/**
 * Inline feedback strip for forms — errors, success, and info.
 */
export function Banner({ message, tone = 'error' }: BannerProps) {
  return (
    <View style={[styles.base, toneStyles[tone]]}>
      <Text
        variant="caption"
        style={[
          styles.text,
          tone === 'error' && styles.errorText,
          tone === 'success' && styles.successText,
          tone === 'info' && styles.infoText,
        ]}
      >
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
  },
  text: {
    lineHeight: 18,
  },
  errorText: {
    color: colors.error,
  },
  successText: {
    color: colors.success,
  },
  infoText: {
    color: colors.secondaryText,
  },
});

const toneStyles = StyleSheet.create({
  error: {
    backgroundColor: 'rgba(255, 77, 77, 0.12)',
    borderColor: 'rgba(255, 77, 77, 0.35)',
  },
  success: {
    backgroundColor: 'rgba(34, 197, 94, 0.12)',
    borderColor: 'rgba(34, 197, 94, 0.35)',
  },
  info: {
    backgroundColor: colors.goldMuted,
    borderColor: 'rgba(212, 175, 55, 0.35)',
  },
});
