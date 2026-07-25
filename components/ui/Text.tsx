import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet,
} from 'react-native';

import { typography, TypographyVariant } from '../../lib/theme';

export interface AppTextProps extends RNTextProps {
  variant?: TypographyVariant;
  muted?: boolean;
  gold?: boolean;
}

/**
 * Brand-aware text primitive. Prefer this over raw RN Text.
 */
export function Text({
  variant = 'body',
  muted = false,
  gold = false,
  style,
  ...rest
}: AppTextProps) {
  return (
    <RNText
      style={[
        typography[variant],
        muted && styles.muted,
        gold && styles.gold,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  muted: {
    color: '#A0A0A0',
  },
  gold: {
    color: '#D4AF37',
  },
});
