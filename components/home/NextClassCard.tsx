import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import {
  AccessibilityInfo,
  Animated,
  Easing,
  Linking,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import type {
  NextClassReservationStatus,
  NextClassSummary,
} from '../../types/home';
import { formatClassTime, formatShortDate } from '../../utils';
import { colors, radii, spacing } from '../../lib/theme';
import { Card } from '../ui/Card';
import { Spacer } from '../ui/Spacer';
import { Text } from '../ui/Text';
import { NextClassActionButton } from './NextClassActionButton';

interface NextClassCardProps {
  nextClass: NextClassSummary;
  reservationStatus: NextClassReservationStatus;
  actionLoading?: boolean;
  xpEarnedLabel?: string | null;
  onPrimaryAction: () => void;
  onOpenDetails?: () => void;
}

function primaryLabel(status: NextClassReservationStatus): string {
  switch (status) {
    case 'reserved':
      return 'Reserved';
    case 'check_in':
      return 'Check In';
    case 'checked_in':
      return 'Checked In';
    default:
      return 'Reserve Spot';
  }
}

export function NextClassCard({
  nextClass,
  reservationStatus,
  actionLoading = false,
  xpEarnedLabel,
  onPrimaryAction,
  onOpenDetails,
}: NextClassCardProps) {
  const accent = useRef(new Animated.Value(0.35)).current;
  const xpOpacity = useRef(new Animated.Value(0)).current;
  const xpTranslate = useRef(new Animated.Value(8)).current;

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

  useEffect(() => {
    if (!xpEarnedLabel) {
      xpOpacity.setValue(0);
      xpTranslate.setValue(8);
      return;
    }

    AccessibilityInfo.announceForAccessibility?.(
      `Checked in. ${xpEarnedLabel}`,
    );

    Animated.parallel([
      Animated.timing(xpOpacity, {
        toValue: 1,
        duration: 280,
        useNativeDriver: true,
      }),
      Animated.timing(xpTranslate, {
        toValue: 0,
        duration: 280,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [xpEarnedLabel, xpOpacity, xpTranslate]);

  const isCompleteAction =
    reservationStatus === 'reserved' || reservationStatus === 'checked_in';

  const handleCalendar = async () => {
    const start = encodeURIComponent(nextClass.startsAt);
    const title = encodeURIComponent(nextClass.title);
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start.replace(/[-:]/g, '').split('.')[0]}Z/${start.replace(/[-:]/g, '').split('.')[0]}Z`;
    try {
      await Linking.openURL(url);
    } catch {
      // Placeholder until native calendar integration.
    }
  };

  const handleDirections = async () => {
    const query = encodeURIComponent(
      `${nextClass.location || nextClass.room}, Tracy CA`,
    );
    try {
      await Linking.openURL(`https://maps.apple.com/?q=${query}`);
    } catch {
      // Placeholder until maps deep-link preferences land.
    }
  };

  return (
    <Card style={styles.card}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Next class ${nextClass.title}`}
        onPress={onOpenDetails}
        disabled={!onOpenDetails}
      >
        <View style={styles.row}>
          <View style={styles.copy}>
            <Text variant="label" gold>
              Next Class
            </Text>
            <Spacer size="xs" />
            <Text variant="subtitle">{nextClass.title}</Text>
            <Spacer size="xxs" />
            <Text variant="bodyMuted">
              {formatShortDate(nextClass.startsAt)} ·{' '}
              {formatClassTime(nextClass.startsAt)}
            </Text>
            <Spacer size="xs" />
            <Text variant="caption">
              {[
                nextClass.coach,
                nextClass.format,
                nextClass.location || nextClass.room,
                `${nextClass.durationMinutes} min`,
              ]
                .filter(Boolean)
                .join(' · ')}
            </Text>
          </View>
          <Animated.View style={[styles.badge, { opacity: accent }]}>
            <Text variant="caption" gold style={styles.badgeText}>
              {nextClass.status === 'live' ? 'Live' : 'Soon'}
            </Text>
          </Animated.View>
        </View>
      </Pressable>

      <Spacer size="md" />

      <NextClassActionButton
        label={primaryLabel(reservationStatus)}
        loading={actionLoading}
        disabled={isCompleteAction}
        onPress={onPrimaryAction}
        accessibilityHint={
          reservationStatus === 'available'
            ? 'Reserves your spot for this class'
            : reservationStatus === 'check_in'
              ? 'Checks you into this class'
              : undefined
        }
      />

      {xpEarnedLabel ? (
        <>
          <Spacer size="sm" />
          <Animated.View
            style={[
              styles.xpRow,
              {
                opacity: xpOpacity,
                transform: [{ translateY: xpTranslate }],
              },
            ]}
          >
            <Text variant="caption" gold>
              {xpEarnedLabel}
            </Text>
          </Animated.View>
        </>
      ) : null}

      <Spacer size="sm" />
      <View style={styles.secondaryRow}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Add to calendar"
          hitSlop={8}
          onPress={() => {
            void handleCalendar();
          }}
          style={({ pressed }) => [styles.secondaryAction, pressed && styles.pressed]}
        >
          <Ionicons name="calendar-outline" size={16} color={colors.secondaryText} />
          <Text variant="caption">Add to Calendar</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Get directions"
          hitSlop={8}
          onPress={() => {
            void handleDirections();
          }}
          style={({ pressed }) => [styles.secondaryAction, pressed && styles.pressed]}
        >
          <Ionicons name="navigate-outline" size={16} color={colors.secondaryText} />
          <Text variant="caption">Directions</Text>
        </Pressable>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    backgroundColor: colors.elevatedSurface,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  copy: {
    flex: 1,
    minWidth: 0,
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
  xpRow: {
    alignItems: 'center',
  },
  secondaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  secondaryAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    minHeight: 44,
    paddingHorizontal: spacing.xxs,
  },
  pressed: {
    opacity: 0.75,
  },
});
