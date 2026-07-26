import { useMemo, useState } from 'react';
import {
  LayoutChangeEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { CLASS_LEVEL_COLORS, WEEKDAYS } from '../../lib/data/schedule';
import { useAppTheme } from '../../lib/providers/ThemeProvider';
import { radii, spacing } from '../../lib/theme';
import type { ScheduleClass, Weekday } from '../../types/schedule';
import { formatClock } from '../../utils/schedule';
import {
  durationToHeight,
  layoutDayClasses,
  minutesToY,
} from '../../utils/scheduleLayout';
import { Text } from '../ui/Text';

const START_HOUR = 5;
const END_HOUR = 21;
const HOUR_HEIGHT = 56;
const TIME_GUTTER = 44;
const GRID_HEIGHT = (END_HOUR - START_HOUR) * HOUR_HEIGHT;
const MIN_DAY_WIDTH = 52;

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

/**
 * Timed week calendar grid.
 * Absolute layout lives on Views — never on Pressable (NativeWind-safe).
 */
export function ScheduleWeekGrid({
  classes,
  weekDates,
  selectedDay,
  onSelectDay,
  onPressClass,
}: ScheduleWeekGridProps) {
  const { colors } = useAppTheme();
  const [gridWidth, setGridWidth] = useState(0);

  const hours = useMemo(
    () =>
      Array.from({ length: END_HOUR - START_HOUR }, (_, index) => START_HOUR + index),
    [],
  );

  const dayWidth = useMemo(() => {
    if (gridWidth <= 0) {
      return MIN_DAY_WIDTH;
    }
    return Math.max((gridWidth - TIME_GUTTER) / 7, MIN_DAY_WIDTH);
  }, [gridWidth]);

  const contentWidth = TIME_GUTTER + dayWidth * 7;

  const byDay = useMemo(() => {
    const map = {} as Record<Weekday, ReturnType<typeof layoutDayClasses>>;
    for (const day of WEEKDAYS) {
      map[day.key] = layoutDayClasses(
        classes.filter((item) => item.day === day.key),
      );
    }
    return map;
  }, [classes]);

  const onGridLayout = (event: LayoutChangeEvent) => {
    setGridWidth(event.nativeEvent.layout.width);
  };

  return (
    <View
      style={[
        styles.shell,
        {
          backgroundColor: colors.secondaryBackground,
          borderColor: colors.border,
        },
      ]}
      onLayout={onGridLayout}
    >
      {/* Day headers */}
      <View style={[styles.dayHeaderRow, { borderBottomColor: colors.border }]}>
        <View style={{ width: TIME_GUTTER }} />
        <View style={styles.dayHeaders}>
          {WEEKDAYS.map((day) => {
            const active = day.key === selectedDay;
            const dateNumber = weekDates[day.key].getDate();
            return (
              <View key={day.key} style={{ width: dayWidth }}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`${day.label} ${dateNumber}`}
                  onPress={() => onSelectDay(day.key)}
                  style={({ pressed }) => [pressed && styles.pressed]}
                >
                  <View
                    style={[
                      styles.dayHeader,
                      active && { backgroundColor: colors.goldMuted },
                    ]}
                  >
                    <Text
                      variant="caption"
                      style={{
                        color: active
                          ? colors.goldAccent
                          : colors.secondaryText,
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
                    <View
                      style={[
                        styles.activeDot,
                        {
                          backgroundColor: active
                            ? colors.goldAccent
                            : 'transparent',
                        },
                      ]}
                    />
                  </View>
                </Pressable>
              </View>
            );
          })}
        </View>
      </View>

      <ScrollView
        style={styles.verticalScroll}
        contentContainerStyle={{ width: contentWidth }}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
      >
        <ScrollView
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={[styles.grid, { width: contentWidth, height: GRID_HEIGHT }]}>
            {/* Background hour lines */}
            {hours.map((hour) => {
              const top = (hour - START_HOUR) * HOUR_HEIGHT;
              return (
                <View
                  key={`line-${hour}`}
                  pointerEvents="none"
                  style={[styles.hourLineWrap, { top }]}
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

            {/* Day columns with events */}
            <View
              style={[
                styles.columnsRow,
                {
                  marginLeft: TIME_GUTTER,
                  width: dayWidth * 7,
                },
              ]}
            >
              {WEEKDAYS.map((day) => {
                const laidOut = byDay[day.key];
                return (
                  <View
                    key={day.key}
                    style={[
                      styles.dayColumn,
                      {
                        width: dayWidth,
                        borderLeftColor: colors.border,
                      },
                    ]}
                  >
                    {laidOut.map((entry) => {
                      const color = CLASS_LEVEL_COLORS[entry.item.level];
                      const textColor = needsDarkText(color)
                        ? '#0D0D0D'
                        : '#FFFFFF';
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
                      const colWidth = (dayWidth - 4) / entry.columns;
                      const left = 2 + entry.column * colWidth;
                      const slotWidth = Math.max(colWidth - 2, 16);
                      const slotHeight = Math.max(height - 2, 18);

                      return (
                        <View
                          key={entry.item.id}
                          style={[
                            styles.eventSlot,
                            {
                              top,
                              left,
                              width: slotWidth,
                              height: slotHeight,
                            },
                          ]}
                        >
                          <Pressable
                            accessibilityRole="button"
                            accessibilityLabel={`${entry.item.title} ${formatClock(entry.item.startTime)}`}
                            onPress={() => onPressClass(entry.item)}
                            style={({ pressed }) => [
                              pressed && styles.pressed,
                            ]}
                          >
                            <View
                              style={[
                                styles.eventBlock,
                                {
                                  backgroundColor: color,
                                  width: slotWidth,
                                  height: slotHeight,
                                },
                              ]}
                            >
                              <Text
                                numberOfLines={2}
                                style={[
                                  styles.eventTitle,
                                  { color: textColor },
                                ]}
                              >
                                {entry.item.title}
                              </Text>
                              {slotHeight > 34 ? (
                                <Text
                                  numberOfLines={1}
                                  style={[
                                    styles.eventTime,
                                    { color: textColor },
                                  ]}
                                >
                                  {formatClock(entry.item.startTime)}
                                </Text>
                              ) : null}
                            </View>
                          </Pressable>
                        </View>
                      );
                    })}
                  </View>
                );
              })}
            </View>
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
  dayHeaders: {
    flexDirection: 'row',
  },
  dayHeader: {
    alignItems: 'center',
    paddingVertical: spacing.xs,
    borderRadius: radii.pill,
    gap: 2,
    marginHorizontal: 2,
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 2,
  },
  verticalScroll: {
    maxHeight: 440,
  },
  grid: {
    position: 'relative',
  },
  hourLineWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: HOUR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  hourLabel: {
    width: TIME_GUTTER - 4,
    textAlign: 'right',
    fontSize: 10,
    marginTop: -5,
    paddingRight: 4,
  },
  hourLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
  },
  columnsRow: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    flexDirection: 'row',
  },
  dayColumn: {
    height: GRID_HEIGHT,
    borderLeftWidth: StyleSheet.hairlineWidth,
    position: 'relative',
  },
  eventSlot: {
    position: 'absolute',
    overflow: 'hidden',
  },
  eventBlock: {
    borderRadius: radii.sm,
    paddingHorizontal: 3,
    paddingVertical: 2,
    overflow: 'hidden',
  },
  eventTitle: {
    fontSize: 9,
    fontWeight: '700',
    lineHeight: 11,
  },
  eventTime: {
    fontSize: 8,
    marginTop: 1,
    opacity: 0.9,
  },
  pressed: {
    opacity: 0.88,
  },
});
