import { Pressable, StyleSheet, View } from 'react-native';

import { MOOD_OPTIONS } from '../../lib/data/workoutOptions';
import { colors, radii, spacing } from '../../lib/theme';
import type { WorkoutMood } from '../../types/workout';
import { Text } from '../ui/Text';

interface MoodSelectorProps {
  value: WorkoutMood;
  onChange: (value: WorkoutMood) => void;
}

export function MoodSelector({ value, onChange }: MoodSelectorProps) {
  return (
    <View>
      <Text variant="label">Mood after training</Text>
      <View style={styles.row}>
        {MOOD_OPTIONS.map((mood) => {
          const active = mood.value === value;
          return (
            <Pressable
              key={mood.value}
              onPress={() => onChange(mood.value)}
              style={[styles.item, active && styles.itemActive]}
            >
              <Text style={styles.emoji}>{mood.emoji}</Text>
              <Text
                variant="caption"
                style={[styles.label, active && styles.labelActive]}
              >
                {mood.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  item: {
    flex: 1,
    minWidth: 0,
    alignItems: 'center',
    gap: 4,
    paddingVertical: spacing.sm,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.secondaryBackground,
  },
  itemActive: {
    borderColor: colors.goldAccent,
    backgroundColor: colors.goldMuted,
  },
  emoji: {
    fontSize: 22,
  },
  label: {
    color: colors.secondaryText,
    textAlign: 'center',
  },
  labelActive: {
    color: colors.goldAccent,
  },
});
