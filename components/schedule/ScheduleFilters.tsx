import { Pressable, ScrollView, StyleSheet } from 'react-native';

import { SCHEDULE_FILTERS } from '../../lib/data/schedule';
import { colors, radii, spacing } from '../../lib/theme';
import type { ScheduleFilter } from '../../types/schedule';
import { Text } from '../ui/Text';

interface ScheduleFiltersProps {
  selected: ScheduleFilter;
  onSelect: (filter: ScheduleFilter) => void;
}

export function ScheduleFilters({ selected, onSelect }: ScheduleFiltersProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {SCHEDULE_FILTERS.map((filter) => {
        const active = filter.key === selected;
        return (
          <Pressable
            key={filter.key}
            onPress={() => onSelect(filter.key)}
            style={[styles.chip, active && styles.chipActive]}
          >
            <Text
              variant="caption"
              style={[styles.label, active && styles.labelActive]}
            >
              {filter.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: spacing.xs,
    paddingRight: spacing.md,
  },
  chip: {
    height: 36,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
    backgroundColor: colors.secondaryBackground,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: {
    backgroundColor: colors.goldMuted,
    borderColor: colors.goldAccent,
  },
  label: {
    color: colors.secondaryText,
    letterSpacing: 0.3,
  },
  labelActive: {
    color: colors.goldAccent,
  },
});
