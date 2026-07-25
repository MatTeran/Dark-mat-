import { StyleSheet, View } from 'react-native';

import { Screen, Spacer, Text } from '../../components';
import { useAuth } from '../../hooks';
import { ACADEMY } from '../../lib/constants';
import { colors, radii, spacing } from '../../lib/theme';

export function HomeScreen() {
  const { user } = useAuth();
  const firstName = user?.fullName?.split(' ')[0] ?? 'Athlete';

  return (
    <Screen>
      <Text variant="label" gold>
        Today
      </Text>
      <Spacer size="xs" />
      <Text variant="hero">Welcome back, {firstName}.</Text>
      <Spacer size="sm" />
      <Text variant="bodyMuted">
        {ACADEMY.name} · {ACADEMY.discipline}
      </Text>

      <Spacer size="xl" />

      <View style={styles.panel}>
        <Text variant="subtitle">Next session</Text>
        <Spacer size="xs" />
        <Text variant="bodyMuted">
          Placeholder for upcoming class from Supabase schedule.
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: colors.secondaryBackground,
    borderRadius: radii.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
