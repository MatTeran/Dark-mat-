/**
 * Dark Mat brand color palettes.
 * Member and Coach share gold accents; Coach uses a deeper charcoal surface scale.
 */

export const darkColors = {
  primaryBackground: '#0D0D0D',
  secondaryBackground: '#181818',
  cardBackground: '#141414',
  elevatedSurface: '#1D1D1D',
  goldAccent: '#D4AF37',
  highlightGold: '#F4D35E',
  goldPressed: '#B8952F',
  text: '#FFFFFF',
  secondaryText: '#B8B8B8',
  error: '#FF4D4D',
  success: '#22C55E',
  warning: '#F59E0B',
  info: '#38BDF8',
  border: '#2A2A2A',
  overlay: 'rgba(13, 13, 13, 0.72)',
  goldMuted: 'rgba(212, 175, 55, 0.16)',
  goldTintSurface: '#2A2414',
} as const;

/** Coach Phase 1 surface tokens — calmer, denser charcoal hierarchy. */
export const coachDarkColors = {
  ...darkColors,
  primaryBackground: '#090909',
  secondaryBackground: '#141414',
  cardBackground: '#141414',
  elevatedSurface: '#1B1B1B',
  overlay: 'rgba(9, 9, 9, 0.78)',
} as const;

export const lightColors = {
  primaryBackground: '#F5F5F3',
  secondaryBackground: '#FFFFFF',
  cardBackground: '#FFFFFF',
  elevatedSurface: '#FFFFFF',
  goldAccent: '#C4A035',
  highlightGold: '#D4AF37',
  goldPressed: '#A8882A',
  text: '#0D0D0D',
  secondaryText: '#6B6B6B',
  error: '#DC2626',
  success: '#16A34A',
  warning: '#D97706',
  info: '#0284C7',
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

export type ThemeVariant = 'member' | 'coach';

export function getColorsForScheme(
  scheme: 'light' | 'dark',
  variant: ThemeVariant = 'member',
): ThemeColors {
  if (scheme === 'light') {
    return { ...lightColors };
  }
  return variant === 'coach' ? { ...coachDarkColors } : { ...darkColors };
}
