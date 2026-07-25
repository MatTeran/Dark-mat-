import { StyleSheet, View } from 'react-native';

import { spacing } from '../../lib/theme';
import { Text } from '../ui/Text';

interface HomeGreetingProps {
  greeting: string;
  firstName: string;
  motivationalMessage: string;
}

export function HomeGreeting({
  greeting,
  firstName,
  motivationalMessage,
}: HomeGreetingProps) {
  return (
    <View
      accessible
      accessibilityRole="header"
      accessibilityLabel={`${greeting}, ${firstName}. ${motivationalMessage}`}
      style={styles.wrap}
    >
      <Text variant="title" style={styles.greeting}>
        {greeting}, {firstName}
      </Text>
      <Text variant="bodyMuted" style={styles.support}>
        {motivationalMessage}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.xs,
  },
  greeting: {
    fontSize: 28,
    lineHeight: 34,
  },
  support: {
    fontSize: 15,
    lineHeight: 22,
  },
});
