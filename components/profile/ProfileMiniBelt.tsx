import { StyleSheet, View } from 'react-native';

import { useAppTheme } from '../../lib/providers/ThemeProvider';
import { radii } from '../../lib/theme';
import type { BeltRank } from '../../types/user';

const BELT_COLORS: Record<BeltRank, string> = {
  white: '#F5F5F5',
  blue: '#1D4ED8',
  purple: '#7C3AED',
  brown: '#78350F',
  black: '#111111',
};

interface ProfileMiniBeltProps {
  belt: BeltRank;
  stripes: 0 | 1 | 2 | 3 | 4;
  /** Wider bar for full-width profile belt tile. */
  size?: 'sm' | 'lg';
}

/** Compact belt bar for highlight tiles. */
export function ProfileMiniBelt({
  belt,
  stripes,
  size = 'sm',
}: ProfileMiniBeltProps) {
  const { colors } = useAppTheme();
  const needsBorder = belt === 'white' || belt === 'black';
  const large = size === 'lg';

  return (
    <View
      style={[
        styles.belt,
        large && styles.beltLg,
        {
          backgroundColor: BELT_COLORS[belt],
          borderColor: needsBorder ? colors.border : 'transparent',
        },
      ]}
    >
      <View style={styles.stripes}>
        {Array.from({ length: 4 }).map((_, index) => (
          <View
            key={`stripe-${index}`}
            style={[
              styles.stripe,
              large && styles.stripeLg,
              {
                opacity: index < stripes ? 1 : 0.22,
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
  );
}

const styles = StyleSheet.create({
  belt: {
    width: '100%',
    height: 16,
    borderRadius: radii.sm,
    borderWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  beltLg: {
    height: 22,
    paddingHorizontal: 10,
  },
  stripes: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 3,
  },
  stripe: {
    width: 3,
    height: 10,
    borderRadius: 1,
  },
  stripeLg: {
    width: 4,
    height: 14,
    gap: 4,
  },
});
