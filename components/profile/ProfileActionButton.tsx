import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { useAppTheme } from '../../lib/providers/ThemeProvider';
import { radii, spacing } from '../../lib/theme';
import { Text } from '../ui/Text';

type IconName = ComponentProps<typeof Ionicons>['name'];

interface ProfileActionButtonProps {
  label: string;
  icon: IconName;
  onPress: () => void;
}

export function ProfileActionButton({
  label,
  icon,
  onPress,
}: ProfileActionButtonProps) {
  const { colors } = useAppTheme();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          borderColor: colors.goldAccent,
          opacity: pressed ? 0.85 : 1,
        },
      ]}
    >
      <View style={styles.inner}>
        <Ionicons name={icon} size={16} color={colors.goldAccent} />
        <Text variant="body" style={{ color: colors.goldAccent }}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    borderWidth: 1.5,
    borderRadius: radii.pill,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
});
