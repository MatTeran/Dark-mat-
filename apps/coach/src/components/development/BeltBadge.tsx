import { StyleSheet, View } from 'react-native';

import {
  Text,
  radii,
  spacing,
  type BeltRank,
  type BeltStripeCount,
} from '@darkmat/shared';

const BELT_COLORS: Record<
  BeltRank,
  { fill: string; stripe: string; border: string; label: string }
> = {
  white: {
    fill: '#F4F4F4',
    stripe: '#1A1A1A',
    border: 'rgba(212,175,55,0.45)',
    label: '#111111',
  },
  blue: {
    fill: '#1B4F9C',
    stripe: '#F4F4F4',
    border: 'rgba(212,175,55,0.35)',
    label: '#FFFFFF',
  },
  purple: {
    fill: '#5A2D82',
    stripe: '#F4F4F4',
    border: 'rgba(212,175,55,0.35)',
    label: '#FFFFFF',
  },
  brown: {
    fill: '#6B3F24',
    stripe: '#F4F4F4',
    border: 'rgba(212,175,55,0.35)',
    label: '#FFFFFF',
  },
  black: {
    fill: '#111111',
    stripe: '#F4F4F4',
    border: 'rgba(212,175,55,0.65)',
    label: '#F4D35E',
  },
};

interface BeltBadgeProps {
  belt: BeltRank;
  stripes: BeltStripeCount;
  size?: 'md' | 'lg';
  showLabel?: boolean;
}

/** Premium BJJ belt badge with tape-style stripe marks. */
export function BeltBadge({
  belt,
  stripes,
  size = 'lg',
  showLabel = true,
}: BeltBadgeProps) {
  const palette = BELT_COLORS[belt];
  const width = size === 'lg' ? 220 : 168;
  const height = size === 'lg' ? 28 : 22;
  const tapeWidth = size === 'lg' ? 10 : 8;
  const gap = 5;

  return (
    <View style={styles.wrap}>
      <View
        style={[
          styles.belt,
          {
            width,
            height,
            backgroundColor: palette.fill,
            borderColor: palette.border,
          },
        ]}
      >
        <View style={styles.barEnd} />
        <View style={styles.stripeRow}>
          {Array.from({ length: 4 }).map((_, index) => {
            const filled = index < stripes;
            return (
              <View
                key={`tape-${index}`}
                style={[
                  styles.tape,
                  {
                    width: tapeWidth,
                    height: height - 8,
                    marginRight: index < 3 ? gap : 0,
                    backgroundColor: filled ? palette.stripe : 'transparent',
                    opacity: filled ? 1 : 0.18,
                    borderWidth: filled ? 0 : StyleSheet.hairlineWidth,
                    borderColor: palette.stripe,
                  },
                ]}
              />
            );
          })}
        </View>
        <View style={styles.barEnd} />
      </View>
      {showLabel ? (
        <Text variant="subtitle">
          {belt.charAt(0).toUpperCase() + belt.slice(1)} · {stripes} stripe
          {stripes === 1 ? '' : 's'}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.sm,
    alignItems: 'flex-start',
  },
  belt: {
    borderRadius: radii.sm,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    overflow: 'hidden',
  },
  barEnd: {
    width: 8,
    height: '70%',
    borderRadius: 2,
    backgroundColor: 'rgba(212,175,55,0.55)',
  },
  stripeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: spacing.sm,
  },
  tape: {
    borderRadius: 1,
  },
});
