import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';

import { Button, Card, Screen, Spacer, Text } from '../../components';
import {
  formatMembershipPlan,
  formatMembershipStatus,
} from '../../lib/mocks/profile';
import { useProfile } from '../../lib/providers/ProfileProvider';
import { colors, radii, spacing } from '../../lib/theme';
import type { ProfileStackParamList } from '../../types/navigation';
import { formatShortDate } from '../../utils';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Membership'>;

export function MembershipScreen({ navigation }: Props) {
  const { hub } = useProfile();
  const { membership } = hub;

  return (
    <Screen scroll contentStyle={styles.content}>
      <Button label="Back" variant="ghost" onPress={() => navigation.goBack()} />
      <Spacer size="md" />
      <Text variant="hero">Membership</Text>
      <Spacer size="sm" />
      <Text variant="bodyMuted">Your Dark Mat membership details.</Text>

      <Spacer size="xl" />

      <Card>
        <Text variant="caption" gold>
          {membership.academyName}
        </Text>
        <Spacer size="xs" />
        <Text variant="title">{formatMembershipPlan(membership.plan)}</Text>
        <Spacer size="sm" />
        <View style={styles.statusPill}>
          <Text variant="caption" style={styles.statusText}>
            {formatMembershipStatus(membership.status)}
          </Text>
        </View>
        <Spacer size="lg" />
        <DetailRow label="Price" value={membership.priceLabel} />
        <DetailRow
          label="Member since"
          value={formatShortDate(membership.memberSince)}
        />
        <DetailRow
          label="Renews on"
          value={formatShortDate(membership.renewsOn)}
        />
      </Card>

      <Spacer size="lg" />
      <Text variant="caption">
        Billing changes and plan upgrades will connect to Stripe in a later
        release.
      </Text>
    </Screen>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.detailRow}>
      <Text variant="caption">{label}</Text>
      <Text variant="body">{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {},
  statusPill: {
    alignSelf: 'flex-start',
    backgroundColor: colors.goldMuted,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  statusText: {
    color: colors.goldAccent,
  },
  detailRow: {
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: 4,
  },
});
