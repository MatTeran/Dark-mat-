import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

import type { NextClass } from '../../types/home';
import { formatClassTime, formatShortDate } from '../../utils';
import { Card } from '../ui/Card';
import { Spacer } from '../ui/Spacer';
import { Text } from '../ui/Text';
import { colors, radii, spacing } from '../../lib/theme';

interface NextClassCardProps {
  nextClass: NextClass;
  onPress?: () => void;
}

export function NextClassCard({ nextClass, onPress }: NextClassCardProps) {
  const accent = useRef(new Animated.Value(0.35)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(accent, {
          toValue: 1,
          duration: 1400,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(accent, {
          toValue: 0.35,
          duration: 1400,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [accent]);

  return (
    <Card onPress={onPress} style={styles.card}>
      <View style={styles.row}>
        <View style={styles.copy}>
          <Text variant="label" gold>
            Next Class
          </Text>
          <Spacer size="xs" />
          <Text variant="subtitle">{nextClass.title}</Text>
          <Spacer size="xxs" />
          <Text variant="bodyMuted">
            {formatShortDate(nextClass.startsAt)} · {formatClassTime(nextClass.startsAt)}
          </Text>
          <Spacer size="xs" />
          <Text variant="caption">
            {[nextClass.coach, nextClass.room, `${nextClass.durationMinutes} min`]
              .filter(Boolean)
              .join(' · ')}
          </Text>
        </View>
        <Animated.View style={[styles.badge, { opacity: accent }]}>
          <Text variant="caption" gold style={styles.badgeText}>
            Soon
          </Text>
        </Animated.View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  copy: {
    flex: 1,
  },
  badge: {
    backgroundColor: colors.goldMuted,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
  },
  badgeText: {
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
});
