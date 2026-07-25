import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { useAppTheme } from '../../lib/providers/ThemeProvider';
import { radii, spacing } from '../../lib/theme';
import { useThemedStyles } from '../../lib/theme/useThemedStyles';
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
  const { colors } = useAppTheme();
  const styles = useThemedStyles((themeColors) => ({
    shell: {
      width: '100%' as const,
    },
    row: {
      width: '100%' as const,
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
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
      backgroundColor: themeColors.goldMuted,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      marginRight: spacing.md,
    },
    copy: {
      flexGrow: 1,
      flexShrink: 1,
      minWidth: 0,
      justifyContent: 'center' as const,
      paddingRight: spacing.sm,
    },
    label: {
      color: themeColors.text,
    },
    value: {
      marginTop: 2,
      color: themeColors.secondaryText,
    },
    trailing: {
      marginLeft: spacing.xs,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
    },
    divider: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: themeColors.border,
      marginLeft: spacing.md + 36 + spacing.md,
    },
  }));

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
