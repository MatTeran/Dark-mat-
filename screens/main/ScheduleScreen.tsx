import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import {
  Banner,
  ClassCard,
  ScheduleFilters,
  ScheduleGiFilters,
  ScheduleViewToggle,
  Screen,
  Spacer,
  Text,
  WeeklyCalendar,
} from '../../components';
import { APP_NAME } from '../../lib/constants';
import { WEEKDAYS } from '../../lib/data/schedule';
import { useAppTheme } from '../../hooks';
import { radii, spacing } from '../../lib/theme';
import type {
  ScheduleFilter,
  ScheduleGiFilter,
  ScheduleViewMode,
  Weekday,
} from '../../types/schedule';
import {
  getClassesForDay,
  getClassesForWeek,
  getNextWeekAnchor,
  getWeekDates,
  getWeekdayLabel,
  groupClassesByDay,
} from '../../utils/schedule';

export function ScheduleScreen() {
  const { colors } = useAppTheme();
  const [viewMode, setViewMode] = useState<ScheduleViewMode>('day');
  const [selectedDay, setSelectedDay] = useState<Weekday>('mon');
  const [filter, setFilter] = useState<ScheduleFilter>('all');
  const [giFilter, setGiFilter] = useState<ScheduleGiFilter>('all');
  const [reservedIds, setReservedIds] = useState<string[]>([]);
  const [reservingId, setReservingId] = useState<string | null>(null);
  const [banner, setBanner] = useState<string | null>(null);

  const weekAnchor = useMemo(() => getNextWeekAnchor(), []);
  const weekDates = useMemo(() => getWeekDates(weekAnchor), [weekAnchor]);
  const weekRangeLabel = useMemo(() => {
    const start = weekDates.mon;
    const end = weekDates.sun;
    const startText = start.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
    });
    const endText = end.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
    });
    return `${startText} – ${endText}`;
  }, [weekDates]);

  const dayClasses = useMemo(
    () => getClassesForDay(selectedDay, filter, giFilter),
    [filter, giFilter, selectedDay],
  );

  const weekGroups = useMemo(
    () => groupClassesByDay(getClassesForWeek(filter, giFilter)),
    [filter, giFilter],
  );

  const weekClassCount = useMemo(
    () => weekGroups.reduce((sum, group) => sum + group.classes.length, 0),
    [weekGroups],
  );

  const handleReserve = (classId: string, title: string) => {
    if (reservedIds.includes(classId)) {
      return;
    }

    setReservingId(classId);
    setBanner(null);

    setTimeout(() => {
      setReservedIds((current) => [...current, classId]);
      setReservingId(null);
      setBanner(`Reserved · ${title}`);
    }, 450);
  };

  const selectedDateLabel = weekDates[selectedDay].toLocaleDateString(
    undefined,
    {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    },
  );

  return (
    <Screen scroll contentStyle={styles.content}>
      <Text variant="hero">Schedule</Text>
      <Spacer size="sm" />
      <Text variant="bodyMuted">
        {APP_NAME} · Tracy, California · Next week
      </Text>
      <Spacer size="xxs" />
      <Text variant="caption" style={{ color: colors.secondaryText }}>
        {weekRangeLabel}
      </Text>

      <Spacer size="lg" />
      <ScheduleViewToggle value={viewMode} onChange={setViewMode} />

      <Spacer size="lg" />

      {viewMode === 'day' ? (
        <WeeklyCalendar
          selected={selectedDay}
          onSelect={setSelectedDay}
          weekAnchor={weekAnchor}
          headerLabel="Next Week"
        />
      ) : (
        <View
          style={[
            styles.weekSummary,
            {
              backgroundColor: colors.secondaryBackground,
              borderColor: colors.border,
            },
          ]}
        >
          <Text variant="label" gold>
            Next week
          </Text>
          <Spacer size="xs" />
          <Text variant="subtitle">
            {weekClassCount} class{weekClassCount === 1 ? '' : 'es'} scheduled
          </Text>
          <Spacer size="xxs" />
          <Text variant="caption" style={{ color: colors.secondaryText }}>
            {weekRangeLabel} · tap a day header to open Day view
          </Text>
        </View>
      )}

      <Spacer size="lg" />

      <Text variant="label">Program</Text>
      <Spacer size="sm" />
      <ScheduleFilters selected={filter} onSelect={setFilter} />

      <Spacer size="md" />
      <Text variant="label">BJJ format</Text>
      <Spacer size="sm" />
      <ScheduleGiFilters selected={giFilter} onSelect={setGiFilter} />

      {banner ? (
        <>
          <Spacer size="md" />
          <Banner tone="success" message={banner} />
        </>
      ) : null}

      <Spacer size="lg" />

      {viewMode === 'day' ? (
        <>
          <Text variant="subtitle">{getWeekdayLabel(selectedDay)}</Text>
          <Spacer size="xxs" />
          <Text variant="caption" style={{ color: colors.secondaryText }}>
            {selectedDateLabel} · {dayClasses.length} class
            {dayClasses.length === 1 ? '' : 'es'}
          </Text>

          <Spacer size="md" />

          {dayClasses.length === 0 ? (
            <View style={styles.empty}>
              <Text variant="bodyMuted">
                No classes match this filter for {getWeekdayLabel(selectedDay)}.
              </Text>
            </View>
          ) : (
            <View style={styles.list}>
              {dayClasses.map((item) => (
                <ClassCard
                  key={item.id}
                  item={item}
                  reserved={reservedIds.includes(item.id)}
                  reserving={reservingId === item.id}
                  onReserve={() => handleReserve(item.id, item.title)}
                />
              ))}
            </View>
          )}
        </>
      ) : (
        <View style={styles.weekAgenda}>
          {weekGroups.map((group) => {
            const date = weekDates[group.day];
            const isToday =
              date.toDateString() === new Date().toDateString();
            const dayMeta = WEEKDAYS.find((item) => item.key === group.day);
            const dateLabel = date.toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
            });

            return (
              <View key={group.day} style={styles.daySection}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`Open ${getWeekdayLabel(group.day)} in Day view`}
                  onPress={() => {
                    setSelectedDay(group.day);
                    setViewMode('day');
                  }}
                  style={({ pressed }) => [pressed && styles.pressed]}
                >
                  <View
                    style={[
                      styles.dayHeader,
                      {
                        backgroundColor: isToday
                          ? colors.goldMuted
                          : colors.elevatedSurface,
                        borderColor: isToday
                          ? colors.goldAccent
                          : colors.border,
                      },
                    ]}
                  >
                    <View>
                      <Text
                        variant="subtitle"
                        style={{
                          color: isToday ? colors.goldAccent : colors.text,
                        }}
                      >
                        {dayMeta?.label ?? getWeekdayLabel(group.day)}
                      </Text>
                      <Text
                        variant="caption"
                        style={{ color: colors.secondaryText }}
                      >
                        {dateLabel}
                        {isToday ? ' · Today' : ''}
                      </Text>
                    </View>
                    <Text
                      variant="caption"
                      style={{
                        color: isToday
                          ? colors.goldAccent
                          : colors.secondaryText,
                      }}
                    >
                      {group.classes.length} class
                      {group.classes.length === 1 ? '' : 'es'}
                    </Text>
                  </View>
                </Pressable>

                <Spacer size="sm" />

                {group.classes.length === 0 ? (
                  <Text
                    variant="caption"
                    style={[styles.restDay, { color: colors.secondaryText }]}
                  >
                    Rest day · no classes match this filter
                  </Text>
                ) : (
                  <View style={styles.list}>
                    {group.classes.map((item) => (
                      <ClassCard
                        key={item.id}
                        item={item}
                        reserved={reservedIds.includes(item.id)}
                        reserving={reservingId === item.id}
                        onReserve={() => handleReserve(item.id, item.title)}
                      />
                    ))}
                  </View>
                )}
              </View>
            );
          })}
        </View>
      )}

      <View style={styles.bottomSpace} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {},
  weekSummary: {
    borderRadius: radii.lg,
    borderWidth: 1,
    padding: spacing.lg,
  },
  list: {
    gap: spacing.md,
  },
  empty: {
    paddingVertical: spacing.xl,
  },
  weekAgenda: {
    gap: spacing.xl,
  },
  daySection: {
    width: '100%',
  },
  dayHeader: {
    borderRadius: radii.lg,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  restDay: {
    paddingHorizontal: spacing.xs,
  },
  pressed: {
    opacity: 0.9,
  },
  bottomSpace: {
    height: spacing.lg,
  },
});
