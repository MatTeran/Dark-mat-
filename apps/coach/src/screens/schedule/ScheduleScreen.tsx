import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import {
  Card,
  Screen,
  Spacer,
  Text,
  radii,
  spacing,
  useAppTheme,
} from '@darkmat/shared';

import {
  EmptyState,
  FadeInItem,
  SectionHeader,
  StatusPill,
} from '../../components/ui/Motion';
import { useCoachData } from '../../lib/providers/CoachDataProvider';
import type { ScheduleStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<ScheduleStackParamList, 'ScheduleHome'>;

type FilterKey = 'all' | 'today' | 'gi' | 'no_gi' | 'kids' | 'open_mat' | 'seminar';

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'today', label: 'Today' },
  { key: 'gi', label: 'Gi' },
  { key: 'no_gi', label: 'No-Gi' },
  { key: 'kids', label: 'Kids' },
  { key: 'open_mat', label: 'Open Mat' },
  { key: 'seminar', label: 'Seminars' },
];

export function ScheduleScreen({ navigation }: Props) {
  const { colors } = useAppTheme();
  const { classes } = useCoachData();
  const [filter, setFilter] = useState<FilterKey>('today');
  const today = new Date().toISOString().slice(0, 10);

  const filtered = useMemo(() => {
    return classes
      .filter((item) => {
        if (filter === 'today') return item.date === today;
        if (filter === 'gi') return item.giType === 'gi';
        if (filter === 'no_gi') return item.giType === 'no_gi';
        if (filter === 'kids') return item.audience === 'kids' || item.level === 'kids';
        if (filter === 'open_mat') return item.isOpenMat;
        if (filter === 'seminar') return item.isSeminar;
        return true;
      })
      .sort((a, b) =>
        `${a.date}${a.startTime}`.localeCompare(`${b.date}${b.startTime}`),
      );
  }, [classes, filter, today]);

  return (
    <Screen scroll>
      <View style={styles.top}>
        <View>
          <Text variant="hero">Schedule</Text>
          <Text variant="body" muted>
            Classes, open mats, and seminars
          </Text>
        </View>
        <Pressable
          onPress={() => navigation.navigate('ClassForm', undefined)}
          style={[styles.addButton, { backgroundColor: colors.goldAccent }]}
        >
          <Text variant="caption" style={{ color: colors.primaryBackground }}>
            Add
          </Text>
        </Pressable>
      </View>

      <Spacer size="md" />

      <View style={styles.filters}>
        {FILTERS.map((item) => {
          const active = item.key === filter;
          return (
            <Pressable
              key={item.key}
              onPress={() => setFilter(item.key)}
              style={[
                styles.chip,
                {
                  backgroundColor: active
                    ? colors.goldMuted
                    : colors.cardBackground,
                  borderColor: active ? colors.goldAccent : colors.border,
                },
              ]}
            >
              <Text
                variant="caption"
                style={{ color: active ? colors.goldAccent : colors.secondaryText }}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Spacer size="lg" />
      <SectionHeader title="Classes" subtitle={`${filtered.length} shown`} />

      {filtered.length === 0 ? (
        <EmptyState
          title="No classes"
          subtitle="Create a class or switch filters."
        />
      ) : (
        <View style={styles.list}>
          {filtered.map((item, index) => (
            <FadeInItem key={item.id} index={index}>
              <Card
                onPress={() =>
                  navigation.navigate('ClassDetail', { classId: item.id })
                }
              >
                <View style={styles.row}>
                  <View style={styles.copy}>
                    <Text variant="subtitle">{item.title}</Text>
                    <Text variant="caption" muted>
                      {item.date} · {item.startTime}–{item.endTime}
                    </Text>
                    <Text variant="caption" muted>
                      {item.instructorName} ·{' '}
                      {item.giType === 'gi' ? 'Gi' : 'No-Gi'} · {item.audience}
                    </Text>
                  </View>
                  <View style={styles.meta}>
                    <StatusPill
                      label={item.status}
                      color={
                        item.status === 'cancelled'
                          ? colors.error
                          : colors.success
                      }
                    />
                    <Text variant="caption" gold>
                      {item.reservedCount}/{item.capacity}
                    </Text>
                  </View>
                </View>
              </Card>
            </FadeInItem>
          ))}
        </View>
      )}
      <Spacer size="xl" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  addButton: {
    borderRadius: radii.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  chip: {
    borderWidth: 1,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  list: {
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  copy: {
    flex: 1,
    gap: 4,
  },
  meta: {
    alignItems: 'flex-end',
    gap: spacing.xs,
  },
});
