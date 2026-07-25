import { StyleSheet, View } from 'react-native';

import { colors, radii, spacing } from '../../lib/theme';
import type { Seminar } from '../../types/community';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Spacer } from '../ui/Spacer';
import { Text } from '../ui/Text';

interface SeminarCardProps {
  seminar: Seminar;
  onToggleRegister: () => void;
}

export function SeminarCard({ seminar, onToggleRegister }: SeminarCardProps) {
  return (
    <Card>
      <Text variant="caption" gold>
        {seminar.dateLabel} · {seminar.timeLabel}
      </Text>
      <Spacer size="xs" />
      <Text variant="subtitle">{seminar.title}</Text>
      <Spacer size="xxs" />
      <Text variant="bodyMuted">{seminar.instructor}</Text>
      <Spacer size="md" />
      <View style={styles.meta}>
        <View style={styles.chip}>
          <Text variant="caption" style={styles.chipText}>
            {seminar.priceLabel}
          </Text>
        </View>
        <View style={styles.chip}>
          <Text variant="caption" style={styles.chipText}>
            {seminar.spotsLeft} spots left
          </Text>
        </View>
      </View>
      <Spacer size="md" />
      <Button
        label={seminar.registered ? 'Registered' : 'Register'}
        variant={seminar.registered ? 'secondary' : 'primary'}
        onPress={onToggleRegister}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  meta: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  chip: {
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.primaryBackground,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
  },
  chipText: {
    color: colors.secondaryText,
  },
});
