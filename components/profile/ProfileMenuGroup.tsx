import { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors, radii } from '../../lib/theme';

export function ProfileMenuGroup({ children }: PropsWithChildren) {
  return <View style={styles.group}>{children}</View>;
}

const styles = StyleSheet.create({
  group: {
    width: '100%',
    backgroundColor: colors.secondaryBackground,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
});
