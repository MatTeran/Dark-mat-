import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';

import { useAppTheme } from '../../lib/providers/ThemeProvider';
import { radii, spacing } from '../../lib/theme';
import type { AttendanceSummary } from '../../types/profile';
import { ProgressBar } from '../journey/ProgressBar';
import { Spacer } from '../ui/Spacer';
import { Text } from '../ui/Text';

interface ProfileAttendanceSnapshotProps {
  summary: AttendanceSummary;
  onPress: () => void;
}

export function ProfileAttendanceSnapshot({
  summary,
  onPress,
}: ProfileAttendanceSnapshotProps) {
  const { colors } = useAppTheme();
  const percent = Math.min(
    100,
    Math.round((summary.classesAttended / Math.max(summary.goal, 1)) * 100),
  );

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Attendance ${summary.classesAttended} of ${summary.goal} classes`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.secondaryBackground,
          borderColor: colors.border,
          opacity: pressed ? 0.94 : 1,
        },
      ]}
    >
      <View style={styles.header}>
        <View>
          <Text variant="caption" gold>
            This month
          </Text>
          <Spacer size="xxs" />
          <Text variant="subtitle">{summary.monthLabel}</Text>
        </View>
        <Ionicons
          name="chevron-forward"
          size={18}
          color={colors.secondaryText}
        />
      </View>

      <Spacer size="md" />

      <View style={styles.metrics}>
        <Text variant="title" style={styles.bigStat}>
          {summary.classesAttended}
          <Text variant="bodyMuted"> / {summary.goal}</Text>
        </Text>
        <Text variant="caption" muted>
          classes toward your goal
        </Text>
      </View>

      <Spacer size="sm" />
      <ProgressBar
        progress={percent}
        height={7}
        accessibilityLabel={`${percent} percent of monthly class goal`}
      />

      <Spacer size="md" />
      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <Ionicons name="flame" size={14} color={colors.goldAccent} />
          <Text variant="caption">{summary.streakDays}-day streak</Text>
        </View>
        <View style={styles.footerItem}>
          <Ionicons name="people-outline" size={14} color={colors.goldAccent} />
          <Text variant="caption">{summary.openMats} open mats</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.xl,
    borderWidth: 1,
    padding: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  metrics: {
    gap: 2,
  },
  bigStat: {
    fontSize: 28,
  },
  footer: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
});
