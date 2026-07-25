import { StyleSheet, View } from 'react-native';

import { useAppTheme } from '../../lib/providers/ThemeProvider';
import { spacing } from '../../lib/theme';
import { Text } from '../ui/Text';

export interface ProfileStatItem {
  value: string;
  label: string;
}

interface ProfileStatsRowProps {
  stats: ProfileStatItem[];
}

export function ProfileStatsRow({ stats }: ProfileStatsRowProps) {
  const { colors } = useAppTheme();

  return (
    <View
      style={styles.row}
      accessibilityRole="summary"
      accessibilityLabel={stats
        .map((stat) => `${stat.value} ${stat.label}`)
        .join(', ')}
    >
      {stats.map((stat, index) => (
        <View key={stat.label} style={styles.stat}>
          {index > 0 ? (
            <View
              style={[styles.divider, { backgroundColor: colors.border }]}
            />
          ) : null}
          <View style={styles.copy}>
            <Text variant="subtitle" style={styles.value}>
              {stat.value}
            </Text>
            <Text variant="caption" muted>
              {stat.label}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  stat: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    width: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
    marginVertical: spacing.xxs,
  },
  copy: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: spacing.xs,
  },
  value: {
    fontSize: 20,
  },
});
