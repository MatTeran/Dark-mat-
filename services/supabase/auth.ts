import type { AuthCredentials, AuthSession, RegisterPayload } from '../../types';
import { getSupabaseClient } from './client';

export class AuthServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthServiceError';
  }
}

function requireClient() {
  const supabase = getSupabaseClient();
  if (!supabase) {
    throw new AuthServiceError(
      'Supabase is not configured. Add EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY.',
    );
  }
  return supabase;
}

export async function signInWithEmail({
  email,
  password,
}: AuthCredentials): Promise<AuthSession> {
  const supabase = requireClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  });

  if (error || !data.session) {
    throw new AuthServiceError(error?.message ?? 'Unable to sign in.');
  }

  return {
    accessToken: data.session.access_token,
    refreshToken: data.session.refresh_token,
    userId: data.session.user.id,
    expiresAt: data.session.expires_at ?? 0,
  };
}

export async function signUpWithEmail({
  email,
  password,
  fullName,
}: RegisterPayload): Promise<AuthSession | null> {
  const supabase = requireClient();
  const { data, error } = await supabase.auth.signUp({
    email: email.trim().toLowerCase(),
    password,
    options: {
      data: { full_name: fullName.trim() },
    },
  });

  if (error) {
    throw new AuthServiceError(error.message);
  }

  if (!data.session) {
    return null;
  }

  return {
    accessToken: data.session.access_token,
    refreshToken: data.session.refresh_token,
    userId: data.session.user.id,
    expiresAt: data.session.expires_at ?? 0,
  };
}

export async function signOut(): Promise<void> {
  const supabase = requireClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new AuthServiceError(error.message);
  }
}
