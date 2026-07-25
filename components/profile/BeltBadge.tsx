import { StyleSheet, View } from 'react-native';

import { colors, radii, spacing } from '../../lib/theme';
import type { BeltRank } from '../../types/user';
import { Text } from '../ui/Text';

const BELT_COLORS: Record<BeltRank, string> = {
  white: '#F5F5F5',
  blue: '#1D4ED8',
  purple: '#7C3AED',
  brown: '#78350F',
  black: '#111111',
};

interface BeltBadgeProps {
  belt: BeltRank;
  stripes: 0 | 1 | 2 | 3 | 4;
  size?: 'md' | 'lg';
}

export function BeltBadge({ belt, stripes, size = 'md' }: BeltBadgeProps) {
  const height = size === 'lg' ? 28 : 18;
  const stripeWidth = size === 'lg' ? 5 : 3;

  return (
    <View style={styles.wrap}>
      <View
        style={[
          styles.belt,
          {
            height,
            backgroundColor: BELT_COLORS[belt],
            borderColor: belt === 'white' || belt === 'black' ? colors.border : 'transparent',
          },
        ]}
      >
        <View style={styles.stripeTrack}>
          {Array.from({ length: 4 }).map((_, index) => (
            <View
              key={`stripe-${index}`}
              style={[
                styles.stripe,
                {
                  width: stripeWidth,
                  height: height - 6,
                  opacity: index < stripes ? 1 : 0.2,
                  backgroundColor:
                    belt === 'white' || belt === 'black'
                      ? colors.goldAccent
                      : '#FFFFFF',
                },
              ]}
            />
          ))}
        </View>
      </View>
      <Text variant="caption" style={styles.caption}>
        {belt.charAt(0).toUpperCase() + belt.slice(1)} · {stripes} stripe
        {stripes === 1 ? '' : 's'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.sm,
  },
  belt: {
    borderRadius: radii.sm,
    borderWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.sm,
  },
  stripeTrack: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 4,
  },
  stripe: {
    borderRadius: 1,
  },
  caption: {
    color: colors.secondaryText,
  },
});
