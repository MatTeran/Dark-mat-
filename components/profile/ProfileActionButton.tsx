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
        styles.pressable,
        pressed && styles.pressed,
      ]}
    >
      <View
        style={[
          styles.button,
          {
            borderColor: colors.goldAccent,
            backgroundColor: filled ? colors.goldAccent : 'transparent',
          },
        ]}
      >
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
  pressable: {
    flex: 1,
  },
  pressed: {
    opacity: 0.88,
  },
  button: {
    width: '100%',
    borderWidth: 1.5,
    borderRadius: radii.pill,
    minHeight: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
});
