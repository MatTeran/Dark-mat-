import 'react-native-url-polyfill/auto';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { assertSupabaseConfigured, env } from '../../lib/env';

let client: SupabaseClient | null = null;

/**
 * Lazy Supabase client. Returns null when env vars are not configured
 * so local UI work can proceed without a backend.
 */
export function getSupabaseClient(): SupabaseClient | null {
  if (!assertSupabaseConfigured()) {
    if (__DEV__) {
      console.warn(
        '[Dark Mat] Supabase env vars missing. Auth/API calls are disabled until configured.',
      );
    }
    return null;
  }

  if (!client) {
    client = createClient(env.supabaseUrl, env.supabaseAnonKey, {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    });
  }

  return client;
}
