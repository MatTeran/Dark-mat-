import { TextStyle } from 'react-native';

import { colors } from './colors';

/**
 * Type scale for Dark Mat — expressive display + clean UI body.
 * Fonts: Syne (brand/display), Outfit (UI).
 */
export const fontFamilies = {
  display: 'Syne_700Bold',
  regular: 'Outfit_400Regular',
  medium: 'Outfit_500Medium',
  semibold: 'Outfit_600SemiBold',
  bold: 'Outfit_700Bold',
} as const;

export const typography = {
  brand: {
    fontFamily: fontFamilies.display,
    fontSize: 40,
    letterSpacing: 2,
    color: colors.text,
  } satisfies TextStyle,

  hero: {
    fontFamily: fontFamilies.display,
    fontSize: 32,
    letterSpacing: 0.5,
    color: colors.text,
  } satisfies TextStyle,

  title: {
    fontFamily: fontFamilies.bold,
    fontSize: 24,
    letterSpacing: 0.2,
    color: colors.text,
  } satisfies TextStyle,

  subtitle: {
    fontFamily: fontFamilies.semibold,
    fontSize: 18,
    color: colors.text,
  } satisfies TextStyle,

  body: {
    fontFamily: fontFamilies.regular,
    fontSize: 16,
    lineHeight: 24,
    color: colors.text,
  } satisfies TextStyle,

  bodyMuted: {
    fontFamily: fontFamilies.regular,
    fontSize: 16,
    lineHeight: 24,
    color: colors.secondaryText,
  } satisfies TextStyle,

  caption: {
    fontFamily: fontFamilies.medium,
    fontSize: 13,
    letterSpacing: 0.4,
    color: colors.secondaryText,
  } satisfies TextStyle,

  label: {
    fontFamily: fontFamilies.semibold,
    fontSize: 14,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: colors.secondaryText,
  } satisfies TextStyle,

  button: {
    fontFamily: fontFamilies.semibold,
    fontSize: 16,
    letterSpacing: 0.3,
    color: colors.primaryBackground,
  } satisfies TextStyle,
} as const;

export type TypographyVariant = keyof typeof typography;
