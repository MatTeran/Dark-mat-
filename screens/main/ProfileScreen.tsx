import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Banner, Button, Screen, Spacer, Text } from '../../components';
import { useAuth } from '../../hooks';
import { colors, radii, spacing } from '../../lib/theme';
import { getAuthErrorMessage } from '../../utils';

export function ProfileScreen() {
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignOut = async () => {
    setError(null);
    setLoading(true);
    try {
      await signOut();
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen>
      <Text variant="hero">Profile</Text>
      <Spacer size="sm" />
      <Text variant="bodyMuted">Athlete settings and membership.</Text>

      <Spacer size="xl" />

      <View style={styles.card}>
        <Text variant="subtitle">Athlete</Text>
        <Spacer size="xs" />
        <Text variant="body">{user?.fullName || 'Dark Mat Athlete'}</Text>
        <Text variant="caption">{user?.email}</Text>
      </View>

      {error ? (
        <>
          <Spacer size="md" />
          <Banner message={error} />
        </>
      ) : null}

      <Spacer size="lg" />

      <Button
        label="Sign Out"
        variant="secondary"
        loading={loading}
        onPress={handleSignOut}
      />
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
