import { StyleSheet, View } from 'react-native';

import { Screen, Spacer, Text } from '../../components';
import { colors, radii, spacing } from '../../lib/theme';

export function ScheduleScreen() {
  return (
    <Screen>
      <Text variant="hero">Schedule</Text>
      <Spacer size="sm" />
      <Text variant="bodyMuted">
        Class calendar and booking will live here.
      </Text>

      <Spacer size="xl" />

      <View style={styles.row}>
        <View style={styles.dot} />
        <View style={styles.copy}>
          <Text variant="subtitle">Gi Fundamentals</Text>
          <Text variant="caption">Mon · 6:00 PM · Placeholder</Text>
        </View>
      </View>
      <Spacer size="md" />
      <View style={styles.row}>
        <View style={styles.dot} />
        <View style={styles.copy}>
          <Text variant="subtitle">No-Gi Sparring</Text>
          <Text variant="caption">Wed · 7:30 PM · Placeholder</Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.secondaryBackground,
    borderRadius: radii.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.goldAccent,
  },
  copy: {
    flex: 1,
    gap: spacing.xxs,
  },
});
