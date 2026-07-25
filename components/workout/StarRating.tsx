import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';

import { colors, spacing } from '../../lib/theme';
import { Text } from '../ui/Text';

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
}

export function StarRating({ value, onChange }: StarRatingProps) {
  return (
    <View>
      <Text variant="label">Rating</Text>
      <View style={styles.row}>
        {[1, 2, 3, 4, 5].map((star) => {
          const active = star <= value;
          return (
            <Pressable
              key={star}
              onPress={() => onChange(star)}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel={`${star} star${star === 1 ? '' : 's'}`}
            >
              <Ionicons
                name={active ? 'star' : 'star-outline'}
                size={28}
                color={active ? colors.goldAccent : colors.secondaryText}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
});
