import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { useAppTheme } from '../../lib/providers/ThemeProvider';
import { spacing } from '../../lib/theme';
import { Text } from '../ui/Text';

type IconName = ComponentProps<typeof Ionicons>['name'];

interface ProfileMenuRowProps {
  icon: IconName;
  label: string;
  value?: string;
  onPress: () => void;
  showDivider?: boolean;
  /** Highlight the leading icon in gold (primary rows). */
  accent?: boolean;
}

/**
 * Flat navigation row: icon | label + value | chevron.
 */
export function ProfileMenuRow({
  icon,
  label,
  value,
  onPress,
  showDivider = false,
  accent = false,
}: ProfileMenuRowProps) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.shell}>
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [
          styles.row,
          pressed && { backgroundColor: colors.goldMuted },
        ]}
      >
        <Ionicons
          name={icon}
          size={22}
          color={accent ? colors.goldAccent : colors.text}
          style={styles.icon}
        />

        <View style={styles.copy}>
          <Text variant="body" numberOfLines={1}>
            {label}
          </Text>
          {value ? (
            <Text variant="caption" numberOfLines={1} muted>
              {value}
            </Text>
          ) : null}
        </View>

        <Ionicons
          name="chevron-forward"
          size={18}
          color={colors.secondaryText}
        />
      </Pressable>
      {showDivider ? (
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    width: '100%',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    minHeight: 60,
  },
  icon: {
    marginRight: spacing.md,
  },
  copy: {
    flexGrow: 1,
    flexShrink: 1,
    minWidth: 0,
    justifyContent: 'center',
    paddingRight: spacing.sm,
    gap: 2,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginLeft: spacing.md + 22 + spacing.md,
  },
});
