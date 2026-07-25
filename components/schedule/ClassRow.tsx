import { StyleSheet, View } from 'react-native';

import { DISCIPLINE_META } from '../../lib/data/disciplines';
import { colors, radii, spacing } from '../../lib/theme';
import type { ScheduleClass } from '../../types/schedule';
import { formatTimeRange } from '../../utils/schedule';
import { Card } from '../ui/Card';
import { Spacer } from '../ui/Spacer';
import { Text } from '../ui/Text';

interface ClassRowProps {
  item: ScheduleClass;
}

export function ClassRow({ item }: ClassRowProps) {
  const meta = DISCIPLINE_META[item.discipline];

  return (
    <Card>
      <View style={styles.row}>
        <View style={[styles.accent, { backgroundColor: meta.color }]} />
        <View style={styles.copy}>
          <Text variant="caption" style={{ color: meta.color }}>
            {meta.label.toUpperCase()}
          </Text>
          <Spacer size="xxs" />
          <Text variant="subtitle" style={styles.title}>
            {item.title}
          </Text>
          <Spacer size="xxs" />
          <Text variant="bodyMuted">
            {formatTimeRange(item.startTime, item.endTime)}
          </Text>
          {item.notes ? (
            <>
              <Spacer size="xxs" />
              <Text variant="caption">{item.notes}</Text>
            </>
          ) : null}
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  accent: {
    width: 4,
    borderRadius: radii.pill,
    backgroundColor: colors.goldAccent,
  },
  copy: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontSize: 17,
  },
});
