/**
 * Dark Mat brand color palette.
 * Premium dark aesthetic inspired by Apple Fitness, Whoop, and Nike Run Club.
 */
export const colors = {
  primaryBackground: '#0D0D0D',
  secondaryBackground: '#181818',
  goldAccent: '#D4AF37',
  text: '#FFFFFF',
  secondaryText: '#A0A0A0',
  error: '#FF4D4D',
  success: '#22C55E',

  /** Subtle elevation / dividers on dark surfaces */
  border: '#2A2A2A',
  overlay: 'rgba(13, 13, 13, 0.72)',
  goldMuted: 'rgba(212, 175, 55, 0.16)',
} as const;

export type ColorToken = keyof typeof colors;
