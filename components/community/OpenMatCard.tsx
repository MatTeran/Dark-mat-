import { StyleSheet, View } from 'react-native';

import { colors, radii, spacing } from '../../lib/theme';
import type { OpenMatSession } from '../../types/community';
import { Card } from '../ui/Card';
import { Spacer } from '../ui/Spacer';
import { Text } from '../ui/Text';

interface OpenMatCardProps {
  session: OpenMatSession;
}

export function OpenMatCard({ session }: OpenMatCardProps) {
  return (
    <Card>
      <View style={styles.header}>
        <Text variant="subtitle">{session.title}</Text>
        <View style={styles.badge}>
          <Text variant="caption" style={styles.badgeText}>
            {session.giType}
          </Text>
        </View>
      </View>
      <Spacer size="xs" />
      <Text variant="bodyMuted">
        {session.dayLabel} · {session.timeLabel}
      </Text>
      {session.notes ? (
        <>
          <Spacer size="xs" />
          <Text variant="caption">{session.notes}</Text>
        </>
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  badge: {
    borderRadius: radii.pill,
    backgroundColor: colors.goldMuted,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
  },
  badgeText: {
    color: colors.goldAccent,
  },
});
