import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  Banner,
  FadeIn,
  LatestAnnouncementCard,
  NextClassCard,
  QuickActions,
  RecentActivity,
  Screen,
  Spacer,
  Text,
  UpcomingEvents,
} from '../../components';
import { useAuth } from '../../hooks';
import {
  QUICK_ACTIONS,
  RECENT_ACTIVITY,
  UPCOMING_EVENTS,
} from '../../lib/mocks/home';
import { useCommunity } from '../../lib/providers/CommunityProvider';
import { spacing } from '../../lib/theme';
import type { MainTabParamList } from '../../types';
import type { QuickActionId } from '../../types/home';
import { getFirstName, getGreeting, toNextClassCardModel } from '../../utils';

type HomeNavigation = BottomTabNavigationProp<MainTabParamList, 'Home'>;

export function HomeScreen() {
  const { user } = useAuth();
  const { announcements } = useCommunity();
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
      case 'profile':
        navigation.navigate('Profile');
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
        <RecentActivity items={RECENT_ACTIVITY} />
      </FadeIn>

      <Spacer size="xl" />

      <FadeIn delay={320}>
        <UpcomingEvents events={UPCOMING_EVENTS} />
      </FadeIn>

      <View style={styles.bottomSpace} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {},
  bottomSpace: {
    height: spacing.lg,
  },
});
