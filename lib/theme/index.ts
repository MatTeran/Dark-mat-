import { colors } from './colors';
import { radii, spacing } from './spacing';
import { fontFamilies, typography } from './typography';

export { colors, fontFamilies, radii, spacing, typography };
export type { ColorToken } from './colors';
export type { RadiusToken, SpacingToken } from './spacing';
export type { TypographyVariant } from './typography';

export const theme = {
  colors,
  typography,
  fontFamilies,
  spacing,
  radii,
} as const;

export type Theme = typeof theme;
