import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';

import {
  FadeIn,
  FloatingActionButton,
  Screen,
  Spacer,
  Text,
  WorkoutCard,
} from '../../components';
import { useWorkouts } from '../../lib/providers/WorkoutProvider';
import { spacing } from '../../lib/theme';
import type { WorkoutStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<WorkoutStackParamList, 'WorkoutList'>;

export function WorkoutLogListScreen({ navigation }: Props) {
  const { workouts } = useWorkouts();

  return (
    <View style={styles.root}>
      <Screen scroll contentStyle={styles.content}>
        <FadeIn>
          <Text variant="hero">Workout Log</Text>
          <Spacer size="sm" />
          <Text variant="bodyMuted">
            Every round. Every detail. Your mat history.
          </Text>
        </FadeIn>

        <Spacer size="xl" />

        {workouts.length === 0 ? (
          <FadeIn delay={80}>
            <View style={styles.empty}>
              <Text variant="subtitle" gold>
                No sessions yet
              </Text>
              <Spacer size="xs" />
              <Text variant="bodyMuted" style={styles.center}>
                Tap + to log your first training session.
              </Text>
            </View>
          </FadeIn>
        ) : (
          <View style={styles.list}>
            {workouts.map((workout, index) => (
              <FadeIn key={workout.id} delay={60 + index * 50}>
                <WorkoutCard
                  workout={workout}
                  onPress={() =>
                    navigation.navigate('WorkoutDetails', {
                      workoutId: workout.id,
                    })
                  }
                />
              </FadeIn>
            ))}
          </View>
        )}

        <View style={styles.bottomSpace} />
      </Screen>

      <FloatingActionButton
        onPress={() => navigation.navigate('WorkoutDetails', {})}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {},
  list: {
    gap: spacing.md,
  },
  empty: {
    minHeight: 200,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  center: {
    textAlign: 'center',
  },
  bottomSpace: {
    height: 120,
  },
});
