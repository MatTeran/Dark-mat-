import { StyleSheet, View } from 'react-native';

import { Button, Screen, Spacer, Text } from '../../components';
import { colors, radii, spacing } from '../../lib/theme';
import { formatBeltLabel } from '../../utils';

interface ProfileScreenProps {
  onSignOut: () => void;
}

export function ProfileScreen({ onSignOut }: ProfileScreenProps) {
  return (
    <Screen>
      <Text variant="hero">Profile</Text>
      <Spacer size="sm" />
      <Text variant="bodyMuted">Athlete settings and membership.</Text>

      <Spacer size="xl" />

      <View style={styles.card}>
        <Text variant="subtitle">Athlete</Text>
        <Spacer size="xs" />
        <Text variant="body">Jordan Silva</Text>
        <Text variant="caption">{formatBeltLabel('blue', 2)}</Text>
      </View>

      <Spacer size="lg" />

      <Button label="Sign Out" variant="secondary" onPress={onSignOut} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.secondaryBackground,
    borderRadius: radii.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xxs,
  },
});
