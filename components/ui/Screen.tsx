import { PropsWithChildren } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
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
  keyboard?: boolean;
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
  keyboard = false,
  style,
  contentStyle,
}: ScreenProps) {
  const insets = useSafeAreaInsets();
  const paddingStyle = {
    paddingTop: insets.top + (padded ? spacing.md : 0),
    paddingBottom: insets.bottom + (padded ? spacing.lg : 0),
    paddingHorizontal: padded ? spacing.lg : 0,
  };

  const body = scroll ? (
    <ScrollView
      style={styles.base}
      contentContainerStyle={[styles.scrollContent, paddingStyle, contentStyle]}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.base, paddingStyle, style, contentStyle]}>{children}</View>
  );

  if (!keyboard) {
    return body;
  }

  return (
    <KeyboardAvoidingView
      style={styles.base}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}
    >
      {body}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: colors.primaryBackground,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
