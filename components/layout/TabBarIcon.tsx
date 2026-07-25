import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { StyleSheet, View } from 'react-native';

import { useAppTheme } from '../../lib/providers/ThemeProvider';
import { radii } from '../../lib/theme';

type IconName = ComponentProps<typeof Ionicons>['name'];

interface TabBarIconProps {
  name: IconName;
  focused: boolean;
  size?: number;
  primaryAction?: boolean;
}

export function TabBarIcon({
  name,
  focused,
  size = 22,
  primaryAction = false,
}: TabBarIconProps) {
  const { colors } = useAppTheme();

  if (primaryAction) {
    return (
      <View
        style={[
          styles.primaryWrap,
          focused
            ? { backgroundColor: colors.goldAccent }
            : {
                backgroundColor: colors.goldMuted,
                borderWidth: 1,
                borderColor: 'rgba(212, 175, 55, 0.35)',
              },
        ]}
      >
        <Ionicons
          name={name}
          size={size}
          color={focused ? colors.primaryBackground : colors.goldAccent}
        />
      </View>
    );
  }

  return (
    <Ionicons
      name={name}
      size={size}
      color={focused ? colors.goldAccent : colors.secondaryText}
    />
  );
}

const styles = StyleSheet.create({
  primaryWrap: {
    width: 42,
    height: 42,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -2,
  },
});
