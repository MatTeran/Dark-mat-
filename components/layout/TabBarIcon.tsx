import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';

import { colors } from '../../lib/theme';

type IconName = ComponentProps<typeof Ionicons>['name'];

interface TabBarIconProps {
  name: IconName;
  focused: boolean;
  size?: number;
}

export function TabBarIcon({ name, focused, size = 22 }: TabBarIconProps) {
  return (
    <Ionicons
      name={name}
      size={size}
      color={focused ? colors.goldAccent : colors.secondaryText}
    />
  );
}
