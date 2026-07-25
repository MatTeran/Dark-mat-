import { StyleSheet, View } from 'react-native';

import type { Announcement } from '../../types/community';
import { formatShortDate } from '../../utils';
import { Card } from '../ui/Card';
import { Spacer } from '../ui/Spacer';
import { Text } from '../ui/Text';
import { colors, radii, spacing } from '../../lib/theme';

interface LatestAnnouncementCardProps {
  announcement: Announcement;
  onPress?: () => void;
}

export function LatestAnnouncementCard({
  announcement,
  onPress,
}: LatestAnnouncementCardProps) {
  return (
    <View>
      <Text variant="subtitle">Academy Announcement</Text>
      <Spacer size="md" />
      <Card onPress={onPress}>
        <View style={styles.header}>
          <Text variant="label" gold>
            Latest
          </Text>
          <Text variant="caption">{formatShortDate(announcement.createdAt)}</Text>
        </View>
        <Spacer size="xs" />
        <Text variant="subtitle">{announcement.title}</Text>
        <Spacer size="xs" />
        <Text variant="bodyMuted" numberOfLines={2}>
          {announcement.body}
        </Text>
        <Spacer size="sm" />
        <View style={styles.footer}>
          <Text variant="caption">{announcement.authorName}</Text>
          <View style={styles.cta}>
            <Text variant="caption" gold>
              View
            </Text>
          </View>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cta: {
    borderRadius: radii.pill,
    backgroundColor: colors.goldMuted,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
});
