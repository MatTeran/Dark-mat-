import { StyleSheet, View } from 'react-native';

import type { ActivityItem } from '../../types/home';
import { formatShortDate } from '../../utils';
import { Card } from '../ui/Card';
import { Spacer } from '../ui/Spacer';
import { Text } from '../ui/Text';
import { colors, spacing } from '../../lib/theme';

interface RecentActivityProps {
  items: ActivityItem[];
}

export function RecentActivity({ items }: RecentActivityProps) {
  return (
    <View>
      <Text variant="subtitle">Recent Activity</Text>
      <Spacer size="md" />
      <Card padded={false}>
        {items.map((item, index) => (
          <View
            key={item.id}
            style={[
              styles.row,
              index < items.length - 1 && styles.rowBorder,
            ]}
          >
            <View style={styles.dot} />
            <View style={styles.copy}>
              <Text variant="body">{item.title}</Text>
              <Text variant="caption">
                {item.detail} · {formatShortDate(item.occurredAt)}
              </Text>
            </View>
          </View>
        ))}
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  rowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.goldAccent,
  },
  copy: {
    flex: 1,
    gap: 2,
  },
});
