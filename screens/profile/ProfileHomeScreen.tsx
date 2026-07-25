import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  Banner,
  BeltBadge,
  Button,
  FadeIn,
  ProfileAvatar,
  ProfileMenuGroup,
  ProfileMenuRow,
  Screen,
  Spacer,
  Text,
} from '../../components';
import { useAuth, useAppTheme } from '../../hooks';
import { useProfile } from '../../lib/providers/ProfileProvider';
import { radii, spacing } from '../../lib/theme';
import type { ProfileStackParamList } from '../../types/navigation';
import {
  getAuthErrorMessage,
  getFirstName,
  pickProfilePhoto,
  promptProfilePhotoActions,
} from '../../utils';

type Props = NativeStackScreenProps<ProfileStackParamList, 'ProfileHome'>;

function getInitials(fullName: string | null | undefined): string {
  if (!fullName?.trim()) {
    return 'DM';
  }
  return fullName
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function ProfileHomeScreen({ navigation }: Props) {
  const { colors } = useAppTheme();
  const { user, signOut, isGuest } = useAuth();
  const {
    hub,
    membershipLabel,
    beltLabel,
    stripesLabel,
    paymentLabel,
    attendanceLabel,
    familyCountLabel,
    setAvatarUri,
  } = useProfile();
  const [loading, setLoading] = useState(false);
  const [photoLoading, setPhotoLoading] = useState(false);
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

  const applyPhoto = async (source: 'camera' | 'library') => {
    setError(null);
    setPhotoLoading(true);
    try {
      const uri = await pickProfilePhoto(source);
      if (uri) {
        await setAvatarUri(uri);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Could not update profile photo.',
      );
    } finally {
      setPhotoLoading(false);
    }
  };

  const handleAvatarPress = () => {
    promptProfilePhotoActions({
      hasPhoto: Boolean(hub.avatarUri),
      onTakePhoto: () => {
        void applyPhoto('camera');
      },
      onChooseLibrary: () => {
        void applyPhoto('library');
      },
      onRemove: () => {
        void setAvatarUri(null);
      },
    });
  };

  const displayName = user?.fullName || 'Dark Mat Athlete';

  return (
    <Screen scroll contentStyle={styles.content}>
      <FadeIn>
        <Text variant="hero">Profile</Text>
        <Spacer size="sm" />
        <Text variant="bodyMuted">Your personal hub at Dark Mat.</Text>
      </FadeIn>

      <Spacer size="xl" />

      <FadeIn delay={60}>
        <View
          style={[
            styles.identity,
            {
              backgroundColor: colors.secondaryBackground,
              borderColor: colors.border,
            },
          ]}
        >
          <ProfileAvatar
            uri={hub.avatarUri}
            initials={getInitials(user?.fullName)}
            onPress={handleAvatarPress}
          />
          <View style={styles.identityCopy}>
            <Text variant="subtitle" numberOfLines={1}>
              {displayName}
            </Text>
            <Text variant="caption" numberOfLines={1}>
              {user?.email}
            </Text>
            {isGuest ? (
              <>
                <Spacer size="xs" />
                <Text variant="caption" gold>
                  Guest demo mode
                </Text>
              </>
            ) : null}
            <Spacer size="sm" />
            <BeltBadge
              belt={hub.beltProgress.belt}
              stripes={hub.beltProgress.stripes}
            />
            <Spacer size="xs" />
            <Text variant="caption" gold>
              {photoLoading
                ? 'Updating photo…'
                : hub.avatarUri
                  ? 'Tap photo to change'
                  : `Add a photo, ${getFirstName(user?.fullName)}`}
            </Text>
          </View>
        </View>
      </FadeIn>

      <Spacer size="xl" />

      <FadeIn delay={100}>
        <ProfileMenuGroup>
          <ProfileMenuRow
            icon="map-outline"
            label="Journey"
            value="XP, streaks & badges"
            onPress={() =>
              navigation.getParent()?.navigate('Home', { screen: 'Journey' })
            }
            showDivider
          />
          <ProfileMenuRow
            icon="card-outline"
            label="Membership"
            value={membershipLabel}
            onPress={() => navigation.navigate('Membership')}
            showDivider
          />
          <ProfileMenuRow
            icon="ribbon-outline"
            label="Belt Rank"
            value={beltLabel}
            onPress={() => navigation.navigate('BeltRank')}
            showDivider
          />
          <ProfileMenuRow
            icon="remove-outline"
            label="Stripes"
            value={stripesLabel}
            onPress={() => navigation.navigate('BeltRank')}
            showDivider
          />
          <ProfileMenuRow
            icon="wallet-outline"
            label="Payment Method"
            value={paymentLabel}
            onPress={() => navigation.navigate('PaymentMethod')}
            showDivider
          />
          <ProfileMenuRow
            icon="stats-chart-outline"
            label="Attendance"
            value={attendanceLabel}
            onPress={() => navigation.navigate('Attendance')}
            showDivider
          />
          <ProfileMenuRow
            icon="settings-outline"
            label="Settings"
            value="Preferences"
            onPress={() => navigation.navigate('Settings')}
            showDivider
          />
          <ProfileMenuRow
            icon="notifications-outline"
            label="Notifications"
            value="Manage alerts"
            onPress={() => navigation.navigate('Notifications')}
            showDivider
          />
          <ProfileMenuRow
            icon="people-outline"
            label="Linked Family Members"
            value={familyCountLabel}
            onPress={() => navigation.navigate('LinkedFamily')}
          />
        </ProfileMenuGroup>
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
  content: {
    width: '100%',
  },
  identity: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    borderRadius: radii.lg,
    borderWidth: 1,
    padding: spacing.lg,
  },
  identityCopy: {
    flex: 1,
    minWidth: 0,
  },
  bottomSpace: {
    height: spacing.xl,
  },
});
