import { useCallback, useState } from 'react';

import type { AuthStatus } from '../types';

/**
 * Lightweight local auth gate for the initial architecture.
 * Replace with Supabase session subscription + React Query later.
 */
export function useAuth() {
  const [status, setStatus] = useState<AuthStatus>('unauthenticated');

  const enterApp = useCallback(() => {
    setStatus('authenticated');
  }, []);

  const exitApp = useCallback(() => {
    setStatus('unauthenticated');
  }, []);

  return {
    status,
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading',
    enterApp,
    exitApp,
  };
}

export type UseAuthReturn = ReturnType<typeof useAuth>;
