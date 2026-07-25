import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  Banner,
  FadeIn,
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
  NEXT_CLASS,
  QUICK_ACTIONS,
  RECENT_ACTIVITY,
  UPCOMING_EVENTS,
} from '../../lib/mocks/home';
import { spacing } from '../../lib/theme';
import type { MainTabParamList } from '../../types';
import type { QuickActionId } from '../../types/home';
import { getFirstName, getGreeting } from '../../utils';

type HomeNavigation = BottomTabNavigationProp<MainTabParamList, 'Home'>;

export function HomeScreen() {
  const { user } = useAuth();
  const navigation = useNavigation<HomeNavigation>();
  const [checkInMessage, setCheckInMessage] = useState<string | null>(null);

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
        setCheckInMessage(`Checked in for ${NEXT_CLASS.title}. See you on the mat.`);
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

      <FadeIn delay={80}>
        <NextClassCard
          nextClass={NEXT_CLASS}
          onPress={() => navigation.navigate('Schedule')}
        />
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
  content: {
    paddingTop: spacing.sm,
  },
  bottomSpace: {
    height: spacing.lg,
  },
});
