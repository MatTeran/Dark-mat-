import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  Banner,
  BeltBadge,
  Button,
  FadeIn,
  ProfileMenuRow,
  Screen,
  Spacer,
  Text,
} from '../../components';
import { useAuth } from '../../hooks';
import { useProfile } from '../../lib/providers/ProfileProvider';
import { colors, radii, spacing } from '../../lib/theme';
import type { ProfileStackParamList } from '../../types/navigation';
import { getAuthErrorMessage } from '../../utils';

type Props = NativeStackScreenProps<ProfileStackParamList, 'ProfileHome'>;

export function ProfileHomeScreen({ navigation }: Props) {
  const { user, signOut } = useAuth();
  const {
    hub,
    membershipLabel,
    beltLabel,
    stripesLabel,
    paymentLabel,
    attendanceLabel,
    familyCountLabel,
  } = useProfile();
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
    <Screen scroll contentStyle={styles.content}>
      <FadeIn>
        <Text variant="hero">Profile</Text>
        <Spacer size="sm" />
        <Text variant="bodyMuted">Your personal hub at Dark Mat.</Text>
      </FadeIn>

      <Spacer size="xl" />

      <FadeIn delay={60}>
        <View style={styles.identity}>
          <View style={styles.avatar}>
            <Text variant="title" gold>
              {(user?.fullName || 'DM')
                .split(' ')
                .map((part) => part[0])
                .join('')
                .slice(0, 2)
                .toUpperCase()}
            </Text>
          </View>
          <View style={styles.identityCopy}>
            <Text variant="subtitle">{user?.fullName || 'Dark Mat Athlete'}</Text>
            <Text variant="caption">{user?.email}</Text>
            <Spacer size="sm" />
            <BeltBadge
              belt={hub.beltProgress.belt}
              stripes={hub.beltProgress.stripes}
            />
          </View>
        </View>
      </FadeIn>

      <Spacer size="xl" />

      <FadeIn delay={100}>
        <View style={styles.menu}>
          <ProfileMenuRow
            icon="card-outline"
            label="Membership"
            value={membershipLabel}
            onPress={() => navigation.navigate('Membership')}
          />
          <ProfileMenuRow
            icon="ribbon-outline"
            label="Belt Rank"
            value={beltLabel}
            onPress={() => navigation.navigate('BeltRank')}
          />
          <ProfileMenuRow
            icon="remove-outline"
            label="Stripes"
            value={stripesLabel}
            onPress={() => navigation.navigate('BeltRank')}
          />
          <ProfileMenuRow
            icon="wallet-outline"
            label="Payment Method"
            value={paymentLabel}
            onPress={() => navigation.navigate('PaymentMethod')}
          />
          <ProfileMenuRow
            icon="stats-chart-outline"
            label="Attendance"
            value={attendanceLabel}
            onPress={() => navigation.navigate('Attendance')}
          />
          <ProfileMenuRow
            icon="settings-outline"
            label="Settings"
            value="Preferences"
            onPress={() => navigation.navigate('Settings')}
          />
          <ProfileMenuRow
            icon="notifications-outline"
            label="Notifications"
            value="Manage alerts"
            onPress={() => navigation.navigate('Notifications')}
          />
          <ProfileMenuRow
            icon="people-outline"
            label="Linked Family Members"
            value={familyCountLabel}
            onPress={() => navigation.navigate('LinkedFamily')}
          />
        </View>
      </FadeIn>

      {error ? (
        <>
          <Spacer size="md" />
          <Banner message={error} />
        </>
      ) : null}

      <Spacer size="xl" />

      <FadeIn delay={140}>
        <Button
          label="Logout"
          variant="secondary"
          loading={loading}
          onPress={handleSignOut}
        />
      </FadeIn>

      <View style={styles.bottomSpace} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {},
  identity: {
    flexDirection: 'row',
    gap: spacing.md,
    backgroundColor: colors.secondaryBackground,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: radii.md,
    backgroundColor: colors.goldMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  identityCopy: {
    flex: 1,
  },
  menu: {
    gap: spacing.sm,
  },
  bottomSpace: {
    height: spacing.lg,
  },
});
