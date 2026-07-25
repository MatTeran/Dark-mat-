import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AuthScreen, Banner, Button, Input, Spacer } from '../../components';
import { useAuth } from '../../hooks';
import { APP_NAME } from '../../lib/constants';
import { spacing } from '../../lib/theme';
import type { AuthStackParamList } from '../../types';
import { getAuthErrorMessage, getEmailError, getPasswordError } from '../../utils';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const { signIn, isConfigured } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const emailError = submitted ? getEmailError(email) : null;
  const passwordError = submitted ? getPasswordError(password) : null;

  const handleLogin = async () => {
    setSubmitted(true);
    setFormError(null);

    const nextEmailError = getEmailError(email);
    const nextPasswordError = getPasswordError(password);
    if (nextEmailError || nextPasswordError) {
      return;
    }

    if (!isConfigured) {
      setFormError(
        'Supabase is not configured. Add EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY to .env.',
      );
      return;
    }

    setLoading(true);
    try {
      await signIn({ email, password });
      // RootNavigator switches to Home when session becomes authenticated.
    } catch (error) {
      setFormError(getAuthErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthScreen
      title={APP_NAME.toUpperCase()}
      subtitle="Sign in to your academy."
      brand
      footer={
        <View>
          <Button label="Sign In" loading={loading} onPress={handleLogin} />
          <Spacer size="sm" />
          <Button
            label="Forgot password?"
            variant="ghost"
            disabled={loading}
            onPress={() => navigation.navigate('ForgotPassword')}
          />
          <Button
            label="Create account"
            variant="ghost"
            disabled={loading}
            onPress={() => navigation.navigate('Register')}
          />
        </View>
      }
    >
      {!isConfigured ? (
        <>
          <Banner
            tone="info"
            message="Connect Supabase via .env to enable live authentication."
          />
          <Spacer size="md" />
        </>
      ) : null}

      {formError ? (
        <>
          <Banner message={formError} />
          <Spacer size="md" />
        </>
      ) : null}

      <View style={styles.form}>
        <Input
          label="Email"
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          textContentType="emailAddress"
          value={email}
          onChangeText={setEmail}
          error={emailError}
          placeholder="you@email.com"
          editable={!loading}
          returnKeyType="next"
        />
        <Spacer size="md" />
        <Input
          label="Password"
          secureTextEntry
          autoComplete="password"
          textContentType="password"
          value={password}
          onChangeText={setPassword}
          error={passwordError}
          placeholder="••••••••"
          editable={!loading}
          returnKeyType="done"
          onSubmitEditing={handleLogin}
        />
      </View>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  form: {
    marginBottom: spacing.md,
  },
});
