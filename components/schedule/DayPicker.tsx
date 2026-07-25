import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { WEEKDAYS } from '../../lib/data/schedule';
import { colors, radii, spacing } from '../../lib/theme';
import type { Weekday } from '../../types/schedule';
import { Text } from '../ui/Text';

interface DayPickerProps {
  selected: Weekday;
  onSelect: (day: Weekday) => void;
}

export function DayPicker({ selected, onSelect }: DayPickerProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {WEEKDAYS.map((day) => {
        const active = day.key === selected;
        return (
          <Pressable
            key={day.key}
            onPress={() => onSelect(day.key)}
            style={[styles.chip, active && styles.chipActive]}
          >
            <Text
              variant="caption"
              style={[styles.label, active && styles.labelActive]}
            >
              {day.short}
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
    minWidth: 52,
    height: 40,
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
    letterSpacing: 0.4,
  },
  labelActive: {
    color: colors.goldAccent,
  },
});
