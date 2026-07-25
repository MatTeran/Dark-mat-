import { Pressable, StyleSheet, View } from 'react-native';

import { colors, radii, spacing } from '../../lib/theme';
import { Text } from '../ui/Text';

interface ChipOption<T extends string> {
  value: T;
  label: string;
}

interface ChipSelectProps<T extends string> {
  label: string;
  options: ChipOption<T>[];
  values: T[];
  onChange: (values: T[]) => void;
  multi?: boolean;
}

export function ChipSelect<T extends string>({
  label,
  options,
  values,
  onChange,
  multi = true,
}: ChipSelectProps<T>) {
  const toggle = (value: T) => {
    if (!multi) {
      onChange([value]);
      return;
    }

    if (values.includes(value)) {
      onChange(values.filter((item) => item !== value));
      return;
    }
    onChange([...values, value]);
  };

  return (
    <View>
      <Text variant="label">{label}</Text>
      <View style={styles.wrap}>
        {options.map((option) => {
          const active = values.includes(option.value);
          return (
            <Pressable
              key={option.value}
              onPress={() => toggle(option.value)}
              style={[styles.chip, active && styles.chipActive]}
            >
              <Text
                variant="caption"
                style={[styles.chipText, active && styles.chipTextActive]}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  chip: {
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.secondaryBackground,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  chipActive: {
    backgroundColor: colors.goldMuted,
    borderColor: colors.goldAccent,
  },
  chipText: {
    color: colors.secondaryText,
  },
  chipTextActive: {
    color: colors.goldAccent,
  },
});
