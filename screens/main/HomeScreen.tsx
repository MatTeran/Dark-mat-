import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  Banner,
  Card,
  FadeIn,
  LatestAnnouncementCard,
  NextClassCard,
  QuickActions,
  Screen,
  Spacer,
  Text,
  UpcomingEvents,
} from '../../components';
import { useAuth } from '../../hooks';
import { QUICK_ACTIONS, UPCOMING_EVENTS } from '../../lib/mocks/home';
import { useCommunity } from '../../lib/providers/CommunityProvider';
import { useJourney } from '../../lib/providers/JourneyProvider';
import { colors, radii, spacing } from '../../lib/theme';
import type { HomeStackParamList, MainTabParamList } from '../../types';
import type { QuickActionId } from '../../types/home';
import {
  formatXp,
  getFirstName,
  getGreeting,
  toNextClassCardModel,
} from '../../utils';

type HomeNavigation = CompositeNavigationProp<
  NativeStackNavigationProp<HomeStackParamList, 'HomeMain'>,
  BottomTabNavigationProp<MainTabParamList>
>;

export function HomeScreen() {
  const { user } = useAuth();
  const { announcements } = useCommunity();
  const { profile } = useJourney();
  const navigation = useNavigation<HomeNavigation>();
  const [checkInMessage, setCheckInMessage] = useState<string | null>(null);
  const nextClass = useMemo(() => toNextClassCardModel(), []);
  const latestAnnouncement = useMemo(() => {
    return [...announcements].sort(
      (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt),
    )[0];
  }, [announcements]);

  const greeting = getGreeting();
  const firstName = getFirstName(user?.fullName);

  const handleQuickAction = (id: QuickActionId) => {
    switch (id) {
      case 'schedule':
        navigation.navigate('Schedule');
        break;
      case 'logWorkout':
        navigation.navigate('WorkoutLog');
        break;
      case 'journey':
        navigation.navigate('Journey');
        break;
      case 'checkIn':
        setCheckInMessage(
          nextClass
            ? `Checked in for ${nextClass.title}. See you on the mat.`
            : 'Checked in. See you on the mat.',
        );
        break;
      default:
        break;
    }
  };

  return (
    <Screen scroll contentStyle={styles.content}>
      <FadeIn>
        <Text variant="hero">
          {greeting}, {firstName}
        </Text>
      </FadeIn>

      <Spacer size="xl" />

      {nextClass ? (
        <FadeIn delay={80}>
          <NextClassCard
            nextClass={nextClass}
            onPress={() => navigation.navigate('Schedule')}
          />
        </FadeIn>
      ) : null}

      {latestAnnouncement ? (
        <>
          <Spacer size="xl" />
          <FadeIn delay={120}>
            <LatestAnnouncementCard
              announcement={latestAnnouncement}
              onPress={() =>
                navigation.navigate('Community', {
                  screen: 'AnnouncementDetail',
                  params: { announcementId: latestAnnouncement.id },
                })
              }
            />
          </FadeIn>
        </>
      ) : null}

      <Spacer size="xl" />

      <FadeIn delay={140}>
        <Card onPress={() => navigation.navigate('Journey')}>
          <Text variant="caption" gold>
            Progress
          </Text>
          <Spacer size="xs" />
          <Text variant="subtitle">Journey</Text>
          <Spacer size="xs" />
          <Text variant="bodyMuted">
            Level {profile.level} · {formatXp(profile.currentLevelXP)} /{' '}
            {formatXp(profile.nextLevelXP)} XP
          </Text>
          <Spacer size="sm" />
          <View style={styles.journeyPill}>
            <Text variant="caption" style={styles.journeyPillText}>
              Open Journey
            </Text>
          </View>
        </Card>
      </FadeIn>

      {checkInMessage ? (
        <>
          <Spacer size="md" />
          <FadeIn>
            <Banner tone="success" message={checkInMessage} />
          </FadeIn>
        </>
      ) : null}

      <Spacer size="xl" />

      <FadeIn delay={160}>
        <QuickActions actions={QUICK_ACTIONS} onAction={handleQuickAction} />
      </FadeIn>

      <Spacer size="xl" />

      <FadeIn delay={240}>
        <UpcomingEvents events={UPCOMING_EVENTS} />
      </FadeIn>

      <View style={styles.bottomSpace} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {},
  journeyPill: {
    alignSelf: 'flex-start',
    borderRadius: radii.pill,
    backgroundColor: colors.goldMuted,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  journeyPillText: {
    color: colors.goldAccent,
  },
  bottomSpace: {
    height: spacing.lg,
  },
});
