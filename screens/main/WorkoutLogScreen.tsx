import { StyleSheet, View } from 'react-native';

import { Screen, Spacer, Text } from '../../components';
import { colors, radii, spacing } from '../../lib/theme';

export function WorkoutLogScreen() {
  return (
    <Screen>
      <Text variant="hero">Workout Log</Text>
      <Spacer size="sm" />
      <Text variant="bodyMuted">
        Track rounds, submissions, and training notes.
      </Text>

      <Spacer size="xl" />

      <View style={styles.empty}>
        <Text variant="subtitle" gold>
          No sessions yet
        </Text>
        <Spacer size="xs" />
        <Text variant="bodyMuted" style={styles.center}>
          Your training history will appear here once logging is connected.
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    minHeight: 220,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondaryBackground,
    borderRadius: radii.lg,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  center: {
    textAlign: 'center',
  },
});
