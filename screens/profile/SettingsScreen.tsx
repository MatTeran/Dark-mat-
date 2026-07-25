import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, View } from 'react-native';

import {
  Button,
  Card,
  Screen,
  SettingToggleRow,
  Spacer,
  Text,
} from '../../components';
import { useProfile } from '../../lib/providers/ProfileProvider';
import { colors, radii, spacing } from '../../lib/theme';
import type { ProfileStackParamList } from '../../types/navigation';
import type { MeasurementUnits } from '../../types/profile';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Settings'>;

const UNITS: MeasurementUnits[] = ['imperial', 'metric'];

export function SettingsScreen({ navigation }: Props) {
  const { hub, updateSettings } = useProfile();
  const { settings } = hub;

  return (
    <Screen scroll contentStyle={styles.content}>
      <Button label="Back" variant="ghost" onPress={() => navigation.goBack()} />
      <Spacer size="md" />
      <Text variant="hero">Settings</Text>
      <Spacer size="sm" />
      <Text variant="bodyMuted">App preferences for your account.</Text>

      <Spacer size="xl" />

      <Card>
        <SettingToggleRow
          label="Check-in reminders"
          description="Nudge before your next reserved class."
          value={settings.checkInReminders}
          onValueChange={(checkInReminders) =>
            updateSettings({ checkInReminders })
          }
        />
        <View style={styles.divider} />
        <SettingToggleRow
          label="Share activity"
          description="Show recent training in Community highlights."
          value={settings.shareActivity}
          onValueChange={(shareActivity) => updateSettings({ shareActivity })}
        />
      </Card>

      <Spacer size="xl" />
      <Text variant="subtitle">Units</Text>
      <Spacer size="sm" />
      <View style={styles.chipRow}>
        {UNITS.map((option) => {
          const selected = option === settings.units;
          return (
            <Pressable
              key={option}
              onPress={() => updateSettings({ units: option })}
              style={[styles.chip, selected && styles.chipSelected]}
            >
              <Text
                variant="caption"
                style={selected ? styles.chipTextSelected : undefined}
              >
                {option === 'imperial' ? 'Imperial' : 'Metric'}
              </Text>
            </Pressable>
          );
        })}
      </View>
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
  chipRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  chip: {
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.secondaryBackground,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  chipSelected: {
    borderColor: colors.goldAccent,
    backgroundColor: colors.goldMuted,
  },
  chipTextSelected: {
    color: colors.goldAccent,
  },
});
