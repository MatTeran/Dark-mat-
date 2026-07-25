import { StyleSheet, View } from 'react-native';

import type { UpcomingEvent } from '../../types/home';
import { Card } from '../ui/Card';
import { Spacer } from '../ui/Spacer';
import { Text } from '../ui/Text';
import { colors, radii, spacing } from '../../lib/theme';

interface UpcomingEventsProps {
  events: UpcomingEvent[];
}

export function UpcomingEvents({ events }: UpcomingEventsProps) {
  return (
    <View>
      <Text variant="subtitle">Upcoming Events</Text>
      <Spacer size="md" />
      <View style={styles.stack}>
        {events.map((event) => (
          <Card key={event.id}>
            <View style={styles.row}>
              <View style={styles.dateChip}>
                <Text variant="caption" gold style={styles.dateText}>
                  {event.dateLabel}
                </Text>
              </View>
              <View style={styles.copy}>
                <Text variant="body">{event.title}</Text>
                <Text variant="caption">{event.meta}</Text>
              </View>
            </View>
          </Card>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  dateChip: {
    minWidth: 88,
    borderRadius: radii.md,
    backgroundColor: colors.goldMuted,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  dateText: {
    textAlign: 'center',
  },
  copy: {
    flex: 1,
    gap: 2,
  },
});
