import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { Share, StyleSheet, View } from 'react-native';

import {
  Banner,
  BeltBadge,
  Button,
  FadeIn,
  ProfileActionButton,
  ProfileMenuGroup,
  ProfileMenuRow,
  ProfileShieldAvatar,
  ProfileStatsRow,
  Screen,
  Spacer,
  Text,
  WorkoutProgressCard,
} from '../../components';
import { useAuth } from '../../hooks';
import { useProfile } from '../../lib/providers/ProfileProvider';
import { useWorkouts } from '../../lib/providers/WorkoutProvider';
import { spacing } from '../../lib/theme';
import type { MainTabParamList } from '../../types';
import type { ProfileStackParamList } from '../../types/navigation';
import type { WorkoutMetricFilter } from '../../types/workoutMetrics';
import {
  getAuthErrorMessage,
  getFirstName,
  pickProfilePhoto,
  promptProfilePhotoActions,
} from '../../utils';
import { buildWorkoutProgressMetrics } from '../../utils/workoutMetrics';

type Props = NativeStackScreenProps<ProfileStackParamList, 'ProfileHome'>;
type ProfileNavigation = CompositeNavigationProp<
  Props['navigation'],
  BottomTabNavigationProp<MainTabParamList>
>;

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

function formatMemberSince(iso: string): string {
  const year = new Date(iso).getFullYear();
  if (Number.isNaN(year)) {
    return 'MEMBER';
  }
  return `MEMBER SINCE ${year}`;
}

function formatRenewsOn(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function ProfileHomeScreen({ navigation }: Props) {
  const tabNavigation = navigation as ProfileNavigation;
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
  const { workouts } = useWorkouts();
  const [filter, setFilter] = useState<WorkoutMetricFilter>('all');
  const [loading, setLoading] = useState(false);
  const [photoLoading, setPhotoLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const metrics = useMemo(
    () => buildWorkoutProgressMetrics(workouts, filter),
    [workouts, filter],
  );

  const displayName = user?.fullName || 'Dark Mat Athlete';
  const memberSinceLabel = formatMemberSince(hub.membership.memberSince);

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

  const handleShareProfile = async () => {
    try {
      await Share.share({
        message: `${displayName} · ${beltLabel} belt · ${hub.membership.academyName}`,
      });
    } catch {
      // User dismissed the share sheet.
    }
  };

  return (
    <Screen scroll contentStyle={styles.content}>
      <FadeIn>
        <View style={styles.hero}>
          <ProfileShieldAvatar
            uri={hub.avatarUri}
            initials={getInitials(user?.fullName)}
            onPress={handleAvatarPress}
          />

          <Spacer size="md" />
          <Text variant="label" gold style={styles.memberSince}>
            {isGuest ? 'GUEST DEMO' : memberSinceLabel}
          </Text>
          <Spacer size="xs" />
          <Text variant="hero" style={styles.name} numberOfLines={2}>
            {displayName}
          </Text>

          <Spacer size="sm" />
          <BeltBadge
            belt={hub.beltProgress.belt}
            stripes={hub.beltProgress.stripes}
            centered
            compact
          />

          {photoLoading ? (
            <>
              <Spacer size="xs" />
              <Text variant="caption" gold>
                Updating photo…
              </Text>
            </>
          ) : !hub.avatarUri ? (
            <>
              <Spacer size="xs" />
              <Text variant="caption" muted>
                Tap shield to add a photo, {getFirstName(user?.fullName)}
              </Text>
            </>
          ) : null}
        </View>
      </FadeIn>

      <Spacer size="lg" />

      <FadeIn delay={40}>
        <ProfileStatsRow
          stats={[
            {
              value: `${hub.attendanceSummary.classesAttended}`,
              label: 'Classes',
            },
            {
              value: `${hub.attendanceSummary.streakDays}`,
              label: 'Day streak',
            },
            {
              value: `${hub.attendanceSummary.openMats}`,
              label: 'Open mats',
            },
          ]}
        />
      </FadeIn>

      <Spacer size="lg" />

      <FadeIn delay={70}>
        <View style={styles.actions}>
          <ProfileActionButton
            label="Share profile"
            icon="qr-code-outline"
            onPress={() => {
              void handleShareProfile();
            }}
          />
          <ProfileActionButton
            label="Edit"
            icon="create-outline"
            onPress={() => navigation.navigate('Settings')}
          />
        </View>
      </FadeIn>

      <Spacer size="xl" />

      <FadeIn delay={100}>
        <WorkoutProgressCard
          metrics={metrics}
          filter={filter}
          onFilterChange={setFilter}
          onSeeMore={() =>
            tabNavigation.navigate('WorkoutLog', { screen: 'WorkoutList' })
          }
        />
      </FadeIn>

      <Spacer size="xl" />

      <FadeIn delay={130}>
        <ProfileMenuGroup>
          <ProfileMenuRow
            icon="card-outline"
            label="Membership"
            value={`${membershipLabel} · Renews ${formatRenewsOn(hub.membership.renewsOn)}`}
            onPress={() => navigation.navigate('Membership')}
            showDivider
            accent
          />
          <ProfileMenuRow
            icon="ribbon-outline"
            label="Belt Rank"
            value={`${beltLabel} · ${stripesLabel}`}
            onPress={() => navigation.navigate('BeltRank')}
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
            icon="map-outline"
            label="Journey"
            value="XP, streaks & badges"
            onPress={() =>
              tabNavigation.navigate('Home', { screen: 'Journey' })
            }
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
            icon="settings-outline"
            label="Settings"
            value="Appearance & preferences"
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
            label="Linked Family"
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

      <FadeIn delay={160}>
        <Button
          label="Log out"
          variant="ghost"
          loading={loading}
          onPress={handleSignOut}
        />
        <Text variant="caption" muted style={styles.academy}>
          {hub.membership.academyName}
        </Text>
      </FadeIn>

      <View style={styles.bottomSpace} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    width: '100%',
  },
  hero: {
    width: '100%',
    alignItems: 'center',
    paddingTop: spacing.sm,
  },
  memberSince: {
    letterSpacing: 1.2,
    textAlign: 'center',
  },
  name: {
    textAlign: 'center',
    fontSize: 34,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  academy: {
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  bottomSpace: {
    height: spacing.xl,
  },
});
