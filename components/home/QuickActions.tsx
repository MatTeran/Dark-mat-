import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import type { QuickAction, QuickActionId } from '../../types/home';
import { Card } from '../ui/Card';
import { Spacer } from '../ui/Spacer';
import { Text } from '../ui/Text';
import { colors, radii, spacing } from '../../lib/theme';

interface QuickActionsProps {
  actions: QuickAction[];
  onAction: (id: QuickActionId) => void;
}

export function QuickActions({ actions, onAction }: QuickActionsProps) {
  return (
    <View>
      <Text variant="subtitle">Quick Actions</Text>
      <Spacer size="md" />
      <View style={styles.grid}>
        {actions.map((action) => (
          <Card
            key={action.id}
            onPress={() => onAction(action.id)}
            style={styles.tile}
            padded={false}
          >
            <View style={styles.tileInner}>
              <View style={styles.iconWrap}>
                <Ionicons
                  name={action.icon}
                  size={20}
                  color={colors.goldAccent}
                />
              </View>
              <Spacer size="sm" />
              <Text variant="subtitle" style={styles.label}>
                {action.label}
              </Text>
              <Text variant="caption">{action.subtitle}</Text>
            </View>
          </Card>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  tile: {
    width: '47.5%',
    flexGrow: 1,
  },
  tileInner: {
    padding: spacing.md,
    minHeight: 118,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.goldMuted,
  },
  label: {
    fontSize: 16,
  },
});
