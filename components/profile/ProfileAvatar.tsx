import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, View } from 'react-native';

import { colors, radii, spacing } from '../../lib/theme';
import { Text } from '../ui/Text';

interface ProfileAvatarProps {
  uri: string | null;
  initials: string;
  onPress: () => void;
  size?: number;
}

export function ProfileAvatar({
  uri,
  initials,
  onPress,
  size = 76,
}: ProfileAvatarProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Change profile photo"
      onPress={onPress}
      style={({ pressed }) => [
        styles.wrap,
        { width: size, height: size },
        pressed && styles.pressed,
      ]}
    >
      {uri ? (
        <Image source={{ uri }} style={styles.image} />
      ) : (
        <View style={styles.fallback}>
          <Text variant="title" gold style={styles.initials}>
            {initials}
          </Text>
        </View>
      )}
      <View style={styles.badge}>
        <Ionicons name="camera" size={12} color={colors.primaryBackground} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: radii.lg,
    overflow: 'hidden',
    backgroundColor: colors.goldMuted,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  image: {
    width: '100%',
    height: '100%',
  },
  fallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontSize: 28,
  },
  badge: {
    position: 'absolute',
    right: spacing.xxs,
    bottom: spacing.xxs,
    width: 24,
    height: 24,
    borderRadius: radii.pill,
    backgroundColor: colors.goldAccent,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.secondaryBackground,
  },
});
