import { Switch, StyleSheet, View } from 'react-native';

import { colors, spacing } from '../../lib/theme';
import { Text } from '../ui/Text';

interface SettingToggleRowProps {
  label: string;
  description?: string;
  value: boolean;
  onValueChange: (next: boolean) => void;
}

export function SettingToggleRow({
  label,
  description,
  value,
  onValueChange,
}: SettingToggleRowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.copy}>
        <Text variant="body">{label}</Text>
        {description ? (
          <Text variant="caption">{description}</Text>
        ) : null}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.border, true: colors.goldMuted }}
        thumbColor={value ? colors.goldAccent : colors.secondaryText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  copy: {
    flex: 1,
    gap: 4,
  },
});
