import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { colors, radii, spacing } from '../../lib/theme';
import { Text } from '../ui/Text';

type IconName = ComponentProps<typeof Ionicons>['name'];

interface ProfileMenuRowProps {
  icon: IconName;
  label: string;
  value?: string;
  onPress: () => void;
  showDivider?: boolean;
}

/**
 * Horizontal settings row: icon | label + value | chevron.
 */
export function ProfileMenuRow({
  icon,
  label,
  value,
  onPress,
  showDivider = false,
}: ProfileMenuRowProps) {
  return (
    <View style={styles.shell}>
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [styles.row, pressed && styles.pressed]}
      >
        <View style={styles.iconWrap}>
          <Ionicons name={icon} size={18} color={colors.goldAccent} />
        </View>

        <View style={styles.copy}>
          <Text variant="body" numberOfLines={1} style={styles.label}>
            {label}
          </Text>
          {value ? (
            <Text variant="caption" numberOfLines={1} style={styles.value}>
              {value}
            </Text>
          ) : null}
        </View>

        <View style={styles.trailing}>
          <Ionicons
            name="chevron-forward"
            size={18}
            color={colors.secondaryText}
          />
        </View>
      </Pressable>
      {showDivider ? <View style={styles.divider} /> : null}
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
    minHeight: 64,
  },
  pressed: {
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: radii.md,
    backgroundColor: colors.goldMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  copy: {
    flexGrow: 1,
    flexShrink: 1,
    minWidth: 0,
    justifyContent: 'center',
    paddingRight: spacing.sm,
  },
  label: {
    color: colors.text,
  },
  value: {
    marginTop: 2,
    color: colors.secondaryText,
  },
  trailing: {
    marginLeft: spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginLeft: spacing.md + 36 + spacing.md,
  },
});
