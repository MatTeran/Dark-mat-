import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';

import {
  Button,
  Card,
  Screen,
  SettingToggleRow,
  Spacer,
  Text,
} from '../../components';
import { useProfile } from '../../lib/providers/ProfileProvider';
import { colors, spacing } from '../../lib/theme';
import type { ProfileStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Notifications'>;

export function NotificationsScreen({ navigation }: Props) {
  const { hub, updateNotifications } = useProfile();
  const { notifications } = hub;

  return (
    <Screen scroll contentStyle={styles.content}>
      <Button label="Back" variant="ghost" onPress={() => navigation.goBack()} />
      <Spacer size="md" />
      <Text variant="hero">Notifications</Text>
      <Spacer size="sm" />
      <Text variant="bodyMuted">Choose what Dark Mat can push to you.</Text>

      <Spacer size="xl" />

      <Card>
        <SettingToggleRow
          label="Class reminders"
          description="Before reserved classes start."
          value={notifications.classReminders}
          onValueChange={(classReminders) =>
            updateNotifications({ classReminders })
          }
        />
        <View style={styles.divider} />
        <SettingToggleRow
          label="Academy announcements"
          description="New posts from coaches and staff."
          value={notifications.academyAnnouncements}
          onValueChange={(academyAnnouncements) =>
            updateNotifications({ academyAnnouncements })
          }
        />
        <View style={styles.divider} />
        <SettingToggleRow
          label="Birthday alerts"
          description="Teammate birthdays in Community."
          value={notifications.birthdayAlerts}
          onValueChange={(birthdayAlerts) =>
            updateNotifications({ birthdayAlerts })
          }
        />
        <View style={styles.divider} />
        <SettingToggleRow
          label="Payment reminders"
          description="Upcoming membership renewals."
          value={notifications.paymentReminders}
          onValueChange={(paymentReminders) =>
            updateNotifications({ paymentReminders })
          }
        />
        <View style={styles.divider} />
        <SettingToggleRow
          label="Team chat"
          description="New messages in the team channel."
          value={notifications.teamChat}
          onValueChange={(teamChat) => updateNotifications({ teamChat })}
        />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {},
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.xs,
  },
});
