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
  variant?: 'filled' | 'outline';
}

export function ProfileActionButton({
  label,
  icon,
  onPress,
  variant = 'outline',
}: ProfileActionButtonProps) {
  const { colors } = useAppTheme();
  const filled = variant === 'filled';

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          borderColor: colors.goldAccent,
          backgroundColor: filled ? colors.goldAccent : 'transparent',
          opacity: pressed ? 0.88 : 1,
        },
      ]}
    >
      <View style={styles.inner}>
        <Ionicons
          name={icon}
          size={16}
          color={filled ? colors.primaryBackground : colors.goldAccent}
        />
        <Text
          variant="body"
          style={{
            color: filled ? colors.primaryBackground : colors.goldAccent,
            fontSize: 15,
          }}
        >
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
    minHeight: 46,
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
