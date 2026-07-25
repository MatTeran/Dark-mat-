import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  ClassRow,
  DayPicker,
  Screen,
  Spacer,
  Text,
} from '../../components';
import { ACADEMY } from '../../lib/constants';
import { colors, spacing } from '../../lib/theme';
import type { Weekday } from '../../types/schedule';
import {
  getClassesForDay,
  getWeekdayFromDate,
  getWeekdayLabel,
} from '../../utils/schedule';

export function ScheduleScreen() {
  const [selectedDay, setSelectedDay] = useState<Weekday>(() =>
    getWeekdayFromDate(new Date()),
  );

  const classes = useMemo(
    () => getClassesForDay(selectedDay),
    [selectedDay],
  );

  return (
    <Screen scroll contentStyle={styles.content}>
      <Text variant="hero">Schedule</Text>
      <Spacer size="sm" />
      <Text variant="bodyMuted">
        {ACADEMY.name} · {ACADEMY.city}
      </Text>

      <Spacer size="lg" />

      <DayPicker selected={selectedDay} onSelect={setSelectedDay} />

      <Spacer size="lg" />

      <Text variant="subtitle">{getWeekdayLabel(selectedDay)}</Text>
      <Spacer size="xs" />
      <Text variant="caption">
        {classes.length} class{classes.length === 1 ? '' : 'es'}
      </Text>

      <Spacer size="md" />

      {classes.length === 0 ? (
        <View style={styles.empty}>
          <Text variant="bodyMuted">No classes on this day.</Text>
        </View>
      ) : (
        <View style={styles.list}>
          {classes.map((item) => (
            <ClassRow key={item.id} item={item} />
          ))}
        </View>
      )}

      <Spacer size="xl" />

      <Text variant="caption" style={styles.footnote}>
        Morning GI “Roll Call” classes require registration on the Band App.
        Boxing open hours: 10:00 AM – 8:30 PM (except during class times).
      </Text>

      <View style={styles.bottomSpace} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {},
  list: {
    gap: spacing.md,
  },
  empty: {
    paddingVertical: spacing.xl,
  },
  footnote: {
    color: colors.secondaryText,
    lineHeight: 18,
  },
  bottomSpace: {
    height: spacing.lg,
  },
});
