import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button, Input, Screen, Spacer, Text } from '../../components';
import { APP_NAME } from '../../lib/constants';
import { spacing } from '../../lib/theme';
import type { AuthStackParamList } from '../../types';
import { isValidEmail } from '../../utils';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'> & {
  onAuthenticated: () => void;
};

export function LoginScreen({ navigation, onAuthenticated }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const emailError =
    submitted && !isValidEmail(email) ? 'Enter a valid email address.' : null;

  const handleLogin = () => {
    setSubmitted(true);
    if (!isValidEmail(email)) {
      return;
    }
    // Placeholder auth gate — password optional until Supabase is wired.
    onAuthenticated();
  };

  return (
    <Screen scroll keyboard contentStyle={styles.content}>
      <View>
        <View style={styles.header}>
          <Text variant="brand" gold>
            {APP_NAME.toUpperCase()}
          </Text>
          <Spacer size="sm" />
          <Text variant="bodyMuted">Sign in to your academy.</Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Email"
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            error={emailError}
            placeholder="you@email.com"
            returnKeyType="next"
          />
          <Spacer size="md" />
          <Input
            label="Password"
            secureTextEntry
            autoComplete="password"
            value={password}
            onChangeText={setPassword}
            placeholder="Any password for now"
            returnKeyType="done"
            onSubmitEditing={handleLogin}
          />
        </View>
      </View>

      <View style={styles.actions}>
        <Button label="Sign In" onPress={handleLogin} />
        <Spacer size="sm" />
        <Button
          label="Create account"
          variant="ghost"
          onPress={() => navigation.navigate('Register')}
        />
        <Spacer size="xs" />
        <Button
          label="Continue without account"
          variant="secondary"
          onPress={onAuthenticated}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'space-between',
    paddingBottom: spacing.xl,
  },
  header: {
    marginBottom: spacing.xxl,
    marginTop: spacing.xl,
  },
  form: {
    marginBottom: spacing.xl,
  },
  actions: {
    marginTop: spacing.lg,
    gap: spacing.xxs,
  },
});
