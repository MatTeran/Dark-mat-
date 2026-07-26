import { useMemo } from 'react';
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import {
  CLASS_LEVEL_COLORS,
  WEEKDAYS,
} from '../../lib/data/schedule';
import { useAppTheme } from '../../lib/providers/ThemeProvider';
import { radii, spacing } from '../../lib/theme';
import type { ScheduleClass, Weekday } from '../../types/schedule';
import {
  durationToHeight,
  layoutDayClasses,
  minutesToY,
} from '../../utils/scheduleLayout';
import { formatClock } from '../../utils/schedule';
import { Text } from '../ui/Text';

const START_HOUR = 5;
const END_HOUR = 21;
const HOUR_HEIGHT = 58;
const TIME_GUTTER = 46;
const GRID_HEIGHT = (END_HOUR - START_HOUR) * HOUR_HEIGHT;

interface ScheduleWeekGridProps {
  classes: ScheduleClass[];
  weekDates: Record<Weekday, Date>;
  selectedDay: Weekday;
  onSelectDay: (day: Weekday) => void;
  onPressClass: (item: ScheduleClass) => void;
}

function needsDarkText(color: string): boolean {
  return (
    color === '#38BDF8' ||
    color === '#2DD4BF' ||
    color === '#86EFAC' ||
    color === '#FDE68A' ||
    color === '#E7E5E4' ||
    color === '#F472B6' ||
    color === '#D6A35C'
  );
}

function formatHourLabel(hour: number): string {
  const period = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}${period}`;
}

export function ScheduleWeekGrid({
  classes,
  weekDates,
  selectedDay,
  onSelectDay,
  onPressClass,
}: ScheduleWeekGridProps) {
  const { colors } = useAppTheme();
  const hours = useMemo(
    () => Array.from({ length: END_HOUR - START_HOUR }, (_, i) => START_HOUR + i),
    [],
  );

  const screenWidth = Dimensions.get('window').width;
  const available = screenWidth - spacing.lg * 2 - TIME_GUTTER;
  const dayWidth = Math.max(available / 7, 48);

  const byDay = useMemo(() => {
    const map = {} as Record<Weekday, ReturnType<typeof layoutDayClasses>>;
    for (const day of WEEKDAYS) {
      map[day.key] = layoutDayClasses(
        classes.filter((item) => item.day === day.key),
      );
    }
    return map;
  }, [classes]);

  return (
    <View
      style={[
        styles.shell,
        {
          backgroundColor: colors.secondaryBackground,
          borderColor: colors.border,
        },
      ]}
    >
      <View style={[styles.dayHeaderRow, { borderBottomColor: colors.border }]}>
        <View style={{ width: TIME_GUTTER }} />
        {WEEKDAYS.map((day) => {
          const active = day.key === selectedDay;
          const dateNumber = weekDates[day.key].getDate();
          return (
            <Pressable
              key={day.key}
              accessibilityRole="button"
              accessibilityLabel={`${day.label} ${dateNumber}`}
              onPress={() => onSelectDay(day.key)}
              style={({ pressed }) => [
                { width: dayWidth },
                pressed && styles.pressed,
              ]}
            >
              <View
                style={[
                  styles.dayHeader,
                  active && {
                    backgroundColor: colors.goldMuted,
                  },
                ]}
              >
                <Text
                  variant="caption"
                  style={{
                    color: active ? colors.goldAccent : colors.secondaryText,
                  }}
                >
                  {day.short}
                </Text>
                <Text
                  variant="subtitle"
                  style={{
                    fontSize: 15,
                    color: active ? colors.goldAccent : colors.text,
                  }}
                >
                  {dateNumber}
                </Text>
                {active ? (
                  <View
                    style={[styles.activeDot, { backgroundColor: colors.goldAccent }]}
                  />
                ) : (
                  <View style={styles.activeDotSpacer} />
                )}
              </View>
            </Pressable>
          );
        })}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
      >
        <ScrollView
          style={styles.verticalScroll}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
        >
          <View style={{ width: TIME_GUTTER + dayWidth * 7, height: GRID_HEIGHT }}>
            {/* Hour lines + labels */}
            {hours.map((hour) => {
              const top = (hour - START_HOUR) * HOUR_HEIGHT;
              return (
                <View
                  key={hour}
                  style={[styles.hourRow, { top }]}
                  pointerEvents="none"
                >
                  <Text
                    variant="caption"
                    style={[styles.hourLabel, { color: colors.secondaryText }]}
                  >
                    {formatHourLabel(hour)}
                  </Text>
                  <View
                    style={[
                      styles.hourLine,
                      { backgroundColor: colors.border },
                    ]}
                  />
                </View>
              );
            })}

            {/* Day column dividers */}
            {WEEKDAYS.map((day, index) => (
              <View
                key={`col-${day.key}`}
                pointerEvents="none"
                style={[
                  styles.dayDivider,
                  {
                    left: TIME_GUTTER + index * dayWidth,
                    backgroundColor: colors.border,
                  },
                ]}
              />
            ))}

            {/* Event blocks */}
            {WEEKDAYS.map((day, dayIndex) => {
              const laidOut = byDay[day.key];
              return laidOut.map((entry) => {
                const color = CLASS_LEVEL_COLORS[entry.item.level];
                const textColor = needsDarkText(color) ? '#0D0D0D' : '#FFFFFF';
                const top = minutesToY(
                  entry.startMinutes,
                  START_HOUR,
                  HOUR_HEIGHT,
                );
                const height = durationToHeight(
                  entry.startMinutes,
                  entry.endMinutes,
                  HOUR_HEIGHT,
                );
                const width = (dayWidth - 4) / entry.columns;
                const left =
                  TIME_GUTTER +
                  dayIndex * dayWidth +
                  2 +
                  entry.column * width;

                return (
                  <Pressable
                    key={entry.item.id}
                    accessibilityRole="button"
                    accessibilityLabel={`${entry.item.title} ${formatClock(entry.item.startTime)}`}
                    onPress={() => onPressClass(entry.item)}
                    style={({ pressed }) => [
                      styles.eventBlock,
                      {
                        top,
                        left,
                        width: Math.max(width - 2, 18),
                        height: Math.max(height - 2, 20),
                        backgroundColor: color,
                        opacity: pressed ? 0.88 : 1,
                      },
                    ]}
                  >
                    <Text
                      numberOfLines={2}
                      style={[styles.eventTitle, { color: textColor }]}
                    >
                      {entry.item.title}
                    </Text>
                    {height > 36 ? (
                      <Text
                        numberOfLines={1}
                        style={[styles.eventTime, { color: textColor }]}
                      >
                        {formatClock(entry.item.startTime)}
                      </Text>
                    ) : null}
                  </Pressable>
                );
              });
            })}
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    width: '100%',
    borderRadius: radii.xl,
    borderWidth: 1,
    overflow: 'hidden',
  },
  dayHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  dayHeader: {
    alignItems: 'center',
    paddingVertical: spacing.xs,
    borderRadius: radii.pill,
    gap: 2,
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 2,
  },
  activeDotSpacer: {
    width: 4,
    height: 4,
    marginTop: 2,
  },
  verticalScroll: {
    maxHeight: 420,
  },
  hourRow: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: HOUR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  hourLabel: {
    width: TIME_GUTTER - 6,
    textAlign: 'right',
    fontSize: 10,
    marginTop: -6,
    paddingRight: 4,
  },
  hourLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    marginTop: 0,
  },
  dayDivider: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: StyleSheet.hairlineWidth,
  },
  eventBlock: {
    position: 'absolute',
    borderRadius: radii.sm,
    paddingHorizontal: 3,
    paddingVertical: 3,
    overflow: 'hidden',
  },
  eventTitle: {
    fontSize: 9,
    fontWeight: '700',
    lineHeight: 11,
  },
  eventTime: {
    fontSize: 8,
    marginTop: 2,
    opacity: 0.9,
  },
  pressed: {
    opacity: 0.9,
  },
});
