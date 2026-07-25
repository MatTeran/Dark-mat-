import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, useWindowDimensions, View } from 'react-native';

import type { QuickAction, QuickActionId } from '../../types/home';
import { Card } from '../ui/Card';
import { Spacer } from '../ui/Spacer';
import { Text } from '../ui/Text';
import { colors, radii, spacing } from '../../lib/theme';

interface QuickActionsProps {
  actions: QuickAction[];
  onAction: (id: QuickActionId) => void;
}

const COLUMNS = 2;
const GRID_GAP = spacing.md;

export function QuickActions({ actions, onAction }: QuickActionsProps) {
  const { width: windowWidth } = useWindowDimensions();
  // Screen horizontal padding is spacing.lg on each side.
  const contentWidth = windowWidth - spacing.lg * 2;
  const tileWidth = (contentWidth - GRID_GAP * (COLUMNS - 1)) / COLUMNS;

  return (
    <View>
      <Text variant="subtitle">Quick Actions</Text>
      <Spacer size="md" />
      <View style={styles.grid}>
        {actions.map((action) => (
          <Card
            key={action.id}
            onPress={() => onAction(action.id)}
            style={{ width: tileWidth }}
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
              <Text variant="subtitle" style={styles.label} numberOfLines={2}>
                {action.label}
              </Text>
              <Text variant="caption" numberOfLines={1}>
                {action.subtitle}
              </Text>
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
    gap: GRID_GAP,
  },
  tileInner: {
    padding: spacing.md,
    minHeight: 118,
    justifyContent: 'flex-start',
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
