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
import { useAppTheme } from '../../hooks';
import type { AppearancePreference } from '../../hooks/useTheme';
import { useProfile } from '../../lib/providers/ProfileProvider';
import { radii, spacing } from '../../lib/theme';
import type { ProfileStackParamList } from '../../types/navigation';
import type { MeasurementUnits } from '../../types/profile';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Settings'>;

const UNITS: MeasurementUnits[] = ['imperial', 'metric'];

const APPEARANCE_OPTIONS: Array<{
  id: AppearancePreference;
  label: string;
  description: string;
}> = [
  {
    id: 'system',
    label: 'System',
    description: 'Match device settings',
  },
  {
    id: 'dark',
    label: 'Dark',
    description: 'Matte black surfaces',
  },
  {
    id: 'light',
    label: 'Light',
    description: 'Bright charcoal & white',
  },
];

export function SettingsScreen({ navigation }: Props) {
  const { hub, updateSettings } = useProfile();
  const { settings } = hub;
  const { colors, preference, setPreference, colorScheme } = useAppTheme();

  return (
    <Screen scroll contentStyle={styles.content}>
      <Button label="Back" variant="ghost" onPress={() => navigation.goBack()} />
      <Spacer size="md" />
      <Text variant="hero">Settings</Text>
      <Spacer size="sm" />
      <Text variant="bodyMuted">App preferences for your account.</Text>

      <Spacer size="xl" />

      <Text variant="subtitle">Appearance</Text>
      <Spacer size="xs" />
      <Text variant="caption">
        Currently using {colorScheme === 'dark' ? 'Dark' : 'Light'} mode
        {preference === 'system' ? ' (from device)' : ''}.
      </Text>
      <Spacer size="sm" />
      <View style={styles.appearanceStack}>
        {APPEARANCE_OPTIONS.map((option) => {
          const selected = preference === option.id;
          return (
            <Pressable
              key={option.id}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              accessibilityLabel={`${option.label}. ${option.description}`}
              onPress={() => {
                void setPreference(option.id);
              }}
              style={({ pressed }) => [
                styles.appearanceRow,
                {
                  backgroundColor: colors.secondaryBackground,
                  borderColor: selected ? colors.goldAccent : colors.border,
                },
                pressed && styles.pressed,
              ]}
            >
              <View style={styles.appearanceCopy}>
                <Text variant="body">{option.label}</Text>
                <Text variant="caption">{option.description}</Text>
              </View>
              <View
                style={[
                  styles.radio,
                  {
                    borderColor: selected ? colors.goldAccent : colors.border,
                  },
                ]}
              >
                {selected ? (
                  <View
                    style={[
                      styles.radioDot,
                      { backgroundColor: colors.goldAccent },
                    ]}
                  />
                ) : null}
              </View>
            </Pressable>
          );
        })}
      </View>

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
        <View
          style={[styles.divider, { backgroundColor: colors.border }]}
        />
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
              style={[
                styles.chip,
                {
                  borderColor: selected ? colors.goldAccent : colors.border,
                  backgroundColor: selected
                    ? colors.goldMuted
                    : colors.secondaryBackground,
                },
              ]}
            >
              <Text
                variant="caption"
                style={selected ? { color: colors.goldAccent } : undefined}
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
  appearanceStack: {
    gap: spacing.sm,
  },
  appearanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    borderWidth: 1,
    borderRadius: radii.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    minHeight: 64,
  },
  appearanceCopy: {
    flex: 1,
    gap: 2,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: radii.pill,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: radii.pill,
  },
  pressed: {
    opacity: 0.92,
  },
  divider: {
    height: 1,
    marginVertical: spacing.xs,
  },
  chipRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  chip: {
    borderRadius: radii.pill,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
});
