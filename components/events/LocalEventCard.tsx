import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';

import { useAppTheme } from '../../lib/providers/ThemeProvider';
import { radii, spacing } from '../../lib/theme';
import type { LocalEvent } from '../../types/localEvents';
import { formatDistanceMiles } from '../../utils/geo';
import { Text } from '../ui/Text';

interface LocalEventCardProps {
  event: LocalEvent;
  onPress: () => void;
}

function kindLabel(kind: LocalEvent['kind']): string {
  switch (kind) {
    case 'seminar':
      return 'Seminar';
    case 'camp':
      return 'Camp';
    case 'tournament':
      return 'Tournament';
    default:
      return 'Event';
  }
}

export function LocalEventCard({ event, onPress }: LocalEventCardProps) {
  const { colors } = useAppTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${event.title}, ${formatDistanceMiles(event.distanceMiles)} away`}
      onPress={onPress}
      style={({ pressed }) => [pressed && styles.pressed]}
    >
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.secondaryBackground,
            borderColor: colors.border,
          },
        ]}
      >
        <View style={styles.top}>
          <View
            style={[styles.badge, { backgroundColor: colors.goldMuted }]}
          >
            <Text variant="caption" style={{ color: colors.goldAccent }}>
              {kindLabel(event.kind)}
            </Text>
          </View>
          <Text variant="caption" style={{ color: colors.secondaryText }}>
            {formatDistanceMiles(event.distanceMiles)}
          </Text>
        </View>

        <Text
          variant="subtitle"
          numberOfLines={2}
          style={[styles.title, { color: colors.text }]}
        >
          {event.title}
        </Text>

        <View style={styles.metaRow}>
          <Ionicons
            name="calendar-outline"
            size={14}
            color={colors.secondaryText}
          />
          <Text
            variant="caption"
            style={{ color: colors.secondaryText, flex: 1 }}
            numberOfLines={1}
          >
            {event.periodLabel}
          </Text>
        </View>

        <View style={styles.metaRow}>
          <Ionicons
            name="location-outline"
            size={14}
            color={colors.secondaryText}
          />
          <Text
            variant="caption"
            style={{ color: colors.secondaryText, flex: 1 }}
            numberOfLines={1}
          >
            {event.city}
          </Text>
          <Ionicons
            name="open-outline"
            size={16}
            color={colors.goldAccent}
          />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.92,
  },
  card: {
    borderRadius: radii.xl,
    borderWidth: 1,
    padding: spacing.md,
    gap: spacing.xs,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  badge: {
    borderRadius: radii.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
  },
  title: {
    fontSize: 17,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: 2,
  },
});
