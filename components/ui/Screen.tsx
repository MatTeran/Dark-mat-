import { PropsWithChildren } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, spacing } from '../../lib/theme';

export interface ScreenProps extends PropsWithChildren {
  scroll?: boolean;
  padded?: boolean;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
}

/**
 * Standard screen shell with Dark Mat background + safe areas.
 */
export function Screen({
  children,
  scroll = false,
  padded = true,
  style,
  contentStyle,
}: ScreenProps) {
  const insets = useSafeAreaInsets();
  const containerStyle = [
    styles.base,
    {
      paddingTop: insets.top + (padded ? spacing.md : 0),
      paddingBottom: insets.bottom + (padded ? spacing.md : 0),
      paddingHorizontal: padded ? spacing.lg : 0,
    },
    style,
  ];

  if (scroll) {
    return (
      <ScrollView
        style={styles.base}
        contentContainerStyle={[containerStyle, contentStyle]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    );
  }

  return <View style={[containerStyle, contentStyle]}>{children}</View>;
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: colors.primaryBackground,
  },
});
