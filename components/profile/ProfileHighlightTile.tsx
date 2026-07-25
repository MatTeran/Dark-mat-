import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps, ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { useAppTheme } from '../../lib/providers/ThemeProvider';
import { radii, spacing } from '../../lib/theme';
import { Text } from '../ui/Text';

type IconName = ComponentProps<typeof Ionicons>['name'];

interface ProfileHighlightTileProps {
  label: string;
  title: string;
  subtitle?: string;
  icon: IconName;
  onPress: () => void;
  media?: ReactNode;
}

export function ProfileHighlightTile({
  label,
  title,
  subtitle,
  icon,
  onPress,
  media,
}: ProfileHighlightTileProps) {
  const { colors } = useAppTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${label}: ${title}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.tile,
        {
          backgroundColor: colors.secondaryBackground,
          borderColor: colors.border,
          opacity: pressed ? 0.92 : 1,
        },
      ]}
    >
      <View style={styles.header}>
        <Text variant="caption" gold>
          {label}
        </Text>
        <Ionicons name={icon} size={16} color={colors.goldAccent} />
      </View>

      {media ? <View style={styles.media}>{media}</View> : null}

      <Text variant="subtitle" numberOfLines={1} style={styles.title}>
        {title}
      </Text>
      {subtitle ? (
        <Text variant="caption" muted numberOfLines={2} style={styles.subtitle}>
          {subtitle}
        </Text>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    minHeight: 132,
    borderRadius: radii.xl,
    borderWidth: 1,
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  media: {
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: 17,
  },
  subtitle: {
    marginTop: 4,
    lineHeight: 18,
  },
});
