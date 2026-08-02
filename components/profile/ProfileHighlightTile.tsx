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
  /** Full-width card (e.g. belt rank across the profile). */
  wide?: boolean;
}

export function ProfileHighlightTile({
  label,
  title,
  subtitle,
  icon,
  onPress,
  media,
  wide = false,
}: ProfileHighlightTileProps) {
  const { colors } = useAppTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${label}: ${title}`}
      onPress={onPress}
      style={({ pressed }) => [
        wide ? styles.widePressable : styles.pressable,
        pressed && styles.pressed,
      ]}
    >
      <View
        style={[
          styles.tile,
          wide && styles.tileWide,
          {
            backgroundColor: colors.secondaryBackground,
            borderColor: colors.border,
          },
        ]}
      >
        <View style={styles.header}>
          <Text variant="caption" style={{ color: colors.goldAccent }}>
            {label}
          </Text>
          <Ionicons name={icon} size={16} color={colors.goldAccent} />
        </View>

        {wide && media ? (
          <View style={styles.wideBody}>
            <View style={styles.wideMedia}>{media}</View>
            <View style={styles.wideCopy}>
              <Text
                variant="subtitle"
                numberOfLines={1}
                style={[styles.title, styles.titleWide, { color: colors.text }]}
              >
                {title}
              </Text>
              {subtitle ? (
                <Text
                  variant="caption"
                  numberOfLines={2}
                  style={[
                    styles.subtitle,
                    styles.subtitleWide,
                    { color: colors.secondaryText },
                  ]}
                >
                  {subtitle}
                </Text>
              ) : null}
            </View>
          </View>
        ) : (
          <>
            {media ? <View style={styles.media}>{media}</View> : null}
            <Text
              variant="subtitle"
              numberOfLines={1}
              style={[styles.title, { color: colors.text }]}
            >
              {title}
            </Text>
            {subtitle ? (
              <Text
                variant="caption"
                numberOfLines={2}
                style={[styles.subtitle, { color: colors.secondaryText }]}
              >
                {subtitle}
              </Text>
            ) : null}
          </>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    width: '100%',
  },
  widePressable: {
    width: '100%',
  },
  pressed: {
    opacity: 0.92,
  },
  tile: {
    minHeight: 112,
    borderRadius: radii.xl,
    borderWidth: 1,
    padding: spacing.md,
  },
  tileWide: {
    minHeight: 108,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
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
  wideBody: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  wideMedia: {
    flex: 1.15,
    minWidth: 0,
  },
  wideCopy: {
    flex: 0.85,
    minWidth: 0,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 17,
  },
  titleWide: {
    fontSize: 22,
    lineHeight: 26,
    textAlign: 'right',
  },
  subtitle: {
    marginTop: 4,
    lineHeight: 18,
  },
  subtitleWide: {
    textAlign: 'right',
  },
});
