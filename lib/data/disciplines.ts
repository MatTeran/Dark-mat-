import type { Discipline } from '../../types/schedule';
import { colors } from '../theme';

/**
 * Discipline accents tuned for Dark Mat — muted, premium, readable on #181818.
 */
export const DISCIPLINE_META: Record<
  Discipline,
  { label: string; color: string }
> = {
  adult_bjj: { label: 'Adult BJJ', color: '#5B8CFF' },
  youth_bjj: { label: 'Youth BJJ', color: '#7EB6FF' },
  pee_wee_bjj: { label: 'Pee Wee BJJ', color: '#4ADE80' },
  womens_bjj: { label: "Women's BJJ", color: '#F472B6' },
  boxing: { label: 'Boxing', color: '#F87171' },
  muay_thai: { label: 'Muay Thai', color: '#FB923C' },
  wrestling: { label: 'Wrestling', color: '#C084FC' },
  peak_performance: { label: 'Peak Performance', color: '#34D399' },
  tae_kwon_do: { label: 'Tae Kwon Do', color: colors.goldAccent },
  open_mat: { label: 'Open Mat', color: '#D6C4A1' },
  open_gym: { label: 'Open Gym', color: '#A0A0A0' },
};
