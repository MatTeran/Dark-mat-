import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button, Input, Screen, Spacer, Text } from '../../components';
import { spacing } from '../../lib/theme';
import type { AuthStackParamList } from '../../types';
import { getPasswordError, isValidEmail } from '../../utils';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'> & {
  onAuthenticated: () => void;
};

export function RegisterScreen({ navigation, onAuthenticated }: Props) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const nameError = submitted && !fullName.trim() ? 'Name is required.' : null;
  const emailError =
    submitted && !isValidEmail(email) ? 'Enter a valid email address.' : null;
  const passwordError = submitted ? getPasswordError(password) : null;

  const handleRegister = () => {
    setSubmitted(true);
    if (!fullName.trim() || !isValidEmail(email) || getPasswordError(password)) {
      return;
    }
    // Placeholder: wire to services/supabase/auth once env is configured.
    onAuthenticated();
  };

  return (
    <Screen scroll contentStyle={styles.content}>
      <View style={styles.header}>
        <Text variant="hero">Join Dark Mat</Text>
        <Spacer size="sm" />
        <Text variant="bodyMuted">
          Create your athlete profile and start logging mat time.
        </Text>
      </View>

      <View style={styles.form}>
        <Input
          label="Full name"
          autoComplete="name"
          value={fullName}
          onChangeText={setFullName}
          error={nameError}
          placeholder="Your name"
        />
        <Spacer size="md" />
        <Input
          label="Email"
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          error={emailError}
          placeholder="you@email.com"
        />
        <Spacer size="md" />
        <Input
          label="Password"
          secureTextEntry
          autoComplete="new-password"
          value={password}
          onChangeText={setPassword}
          error={passwordError}
          placeholder="At least 8 characters"
        />
      </View>

      <View style={styles.actions}>
        <Button label="Create Account" onPress={handleRegister} />
        <Spacer size="sm" />
        <Button
          label="Already have an account"
          variant="ghost"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    marginBottom: spacing.xxl,
  },
  form: {
    marginBottom: spacing.xl,
  },
  actions: {
    marginTop: spacing.md,
  },
});
