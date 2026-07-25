import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  getSession,
  onAuthStateChange,
  resetPasswordForEmail,
  signInWithEmail,
  signOut as signOutRequest,
  signUpWithEmail,
} from '../../services/supabase/auth';
import { isSupabaseConfigured } from '../../services/supabase/client';
import type {
  AuthCredentials,
  AuthSession,
  AuthStatus,
  AuthUser,
  RegisterPayload,
} from '../../types';

interface AuthContextValue {
  status: AuthStatus;
  session: AuthSession | null;
  user: AuthUser | null;
  isConfigured: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (credentials: AuthCredentials) => Promise<void>;
  signUp: (
    payload: RegisterPayload,
  ) => Promise<{ needsEmailConfirmation: boolean }>;
  resetPassword: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [status, setStatus] = useState<AuthStatus>('loading');
  const [session, setSession] = useState<AuthSession | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const isConfigured = isSupabaseConfigured();

  useEffect(() => {
    let isMounted = true;
    let unsubscribe: (() => void) | undefined;

    async function bootstrap() {
      if (!isConfigured) {
        if (isMounted) {
          setStatus('unauthenticated');
        }
        return;
      }

      try {
        const current = await getSession();
        if (!isMounted) {
          return;
        }

        setSession(current.session);
        setUser(current.user);
        setStatus(current.session ? 'authenticated' : 'unauthenticated');

        unsubscribe = onAuthStateChange(({ session: nextSession, user: nextUser }) => {
          setSession(nextSession);
          setUser(nextUser);
          setStatus(nextSession ? 'authenticated' : 'unauthenticated');
        });
      } catch {
        if (isMounted) {
          setSession(null);
          setUser(null);
          setStatus('unauthenticated');
        }
      }
    }

    bootstrap();

    return () => {
      isMounted = false;
      unsubscribe?.();
    };
  }, [isConfigured]);

  const signIn = useCallback(async (credentials: AuthCredentials) => {
    const result = await signInWithEmail(credentials);
    setSession(result.session);
    setUser(result.user);
    setStatus('authenticated');
  }, []);

  const signUp = useCallback(async (payload: RegisterPayload) => {
    const result = await signUpWithEmail(payload);
    if (result.session && result.user) {
      setSession(result.session);
      setUser(result.user);
      setStatus('authenticated');
    }
    return { needsEmailConfirmation: result.needsEmailConfirmation };
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    await resetPasswordForEmail(email);
  }, []);

  const signOut = useCallback(async () => {
    await signOutRequest();
    setSession(null);
    setUser(null);
    setStatus('unauthenticated');
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      session,
      user,
      isConfigured,
      isAuthenticated: status === 'authenticated',
      isLoading: status === 'loading',
      signIn,
      signUp,
      resetPassword,
      signOut,
    }),
    [
      isConfigured,
      resetPassword,
      session,
      signIn,
      signOut,
      signUp,
      status,
      user,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider.');
  }
  return context;
}
