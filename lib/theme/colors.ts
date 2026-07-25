/**
 * Dark Mat brand color palettes.
 * Premium athletic aesthetic — gold accents stay consistent across modes.
 */

export const darkColors = {
  primaryBackground: '#0D0D0D',
  secondaryBackground: '#181818',
  goldAccent: '#D4AF37',
  goldPressed: '#B8952F',
  text: '#FFFFFF',
  secondaryText: '#A0A0A0',
  error: '#FF4D4D',
  success: '#22C55E',
  elevatedSurface: '#1D1D1D',
  border: '#2A2A2A',
  overlay: 'rgba(13, 13, 13, 0.72)',
  goldMuted: 'rgba(212, 175, 55, 0.16)',
  goldTintSurface: '#2A2414',
} as const;

export const lightColors = {
  primaryBackground: '#F5F5F3',
  secondaryBackground: '#FFFFFF',
  goldAccent: '#C4A035',
  goldPressed: '#A8882A',
  text: '#0D0D0D',
  secondaryText: '#6B6B6B',
  error: '#DC2626',
  success: '#16A34A',
  elevatedSurface: '#FFFFFF',
  border: '#E4E4E0',
  overlay: 'rgba(245, 245, 243, 0.82)',
  goldMuted: 'rgba(196, 160, 53, 0.14)',
  goldTintSurface: '#F3EBD4',
} as const;

/** Default export remains the dark palette for static fallbacks. */
export const colors = darkColors;

export type ThemeColors = {
  -readonly [K in keyof typeof darkColors]: string;
};

export type ColorToken = keyof typeof darkColors;

export function getColorsForScheme(scheme: 'light' | 'dark'): ThemeColors {
  return scheme === 'light' ? { ...lightColors } : { ...darkColors };
}
