import { StyleSheet, View } from 'react-native';

import { CLASS_LEVEL_LABELS } from '../../lib/data/schedule';
import { colors, radii, spacing } from '../../lib/theme';
import type { ScheduleClass } from '../../types/schedule';
import { formatGiType, formatTimeRange } from '../../utils/schedule';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Spacer } from '../ui/Spacer';
import { Text } from '../ui/Text';

interface ClassCardProps {
  item: ScheduleClass;
  reserved?: boolean;
  reserving?: boolean;
  onReserve: () => void;
}

export function ClassCard({
  item,
  reserved = false,
  reserving = false,
  onReserve,
}: ClassCardProps) {
  return (
    <Card>
      <View style={styles.topRow}>
        <View style={styles.copy}>
          <Text variant="caption" gold>
            {formatTimeRange(item.startTime, item.endTime)}
          </Text>
          <Spacer size="xs" />
          <Text variant="subtitle" style={styles.title}>
            {item.title}
          </Text>
          <Spacer size="xxs" />
          <Text variant="bodyMuted">{item.instructor}</Text>
        </View>
        {typeof item.spotsLeft === 'number' ? (
          <View style={styles.spots}>
            <Text variant="caption" style={styles.spotsText}>
              {item.spotsLeft} left
            </Text>
          </View>
        ) : null}
      </View>

      <Spacer size="md" />

      <View style={styles.metaRow}>
        <View style={styles.metaChip}>
          <Text variant="caption" style={styles.metaChipText}>
            {formatGiType(item.giType)}
          </Text>
        </View>
        <View style={styles.metaChip}>
          <Text variant="caption" style={styles.metaChipText}>
            {CLASS_LEVEL_LABELS[item.level]}
          </Text>
        </View>
      </View>

      <Spacer size="md" />

      <Button
        label={reserved ? 'Reserved' : 'Reserve'}
        variant={reserved ? 'secondary' : 'primary'}
        loading={reserving}
        onPress={onReserve}
        disabled={reserved}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  copy: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontSize: 17,
  },
  spots: {
    borderRadius: radii.pill,
    backgroundColor: colors.goldMuted,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
  },
  spotsText: {
    color: colors.goldAccent,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  metaChip: {
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.primaryBackground,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
  },
  metaChipText: {
    color: colors.secondaryText,
  },
});
