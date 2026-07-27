/**
 * Typed access to Expo public environment variables.
 */
function readEnv(key: string): string | undefined {
  return process.env[key];
}

const supabasePublishableKey =
  readEnv('EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY') ??
  readEnv('EXPO_PUBLIC_SUPABASE_ANON_KEY') ??
  '';

export const env = {
  supabaseUrl: readEnv('EXPO_PUBLIC_SUPABASE_URL') ?? '',
  supabaseAnonKey: supabasePublishableKey,
  stripePublishableKey: readEnv('EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY') ?? '',
  isDev: typeof __DEV__ !== 'undefined' ? __DEV__ : false,
} as const;

export function assertSupabaseConfigured(): boolean {
  return Boolean(env.supabaseUrl && env.supabaseAnonKey);
}

export function assertStripeConfigured(): boolean {
  return Boolean(env.stripePublishableKey);
}
