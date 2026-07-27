export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterPayload extends AuthCredentials {
  fullName: string;
}

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  userId: string;
  expiresAt: number;
}

/** Future role permissions — prepared for coach/admin gates. */
export type UserRole = 'member' | 'coach' | 'admin' | 'staff';

export interface AuthUser {
  id: string;
  email: string;
  fullName: string | null;
  /** Optional until Supabase profiles/roles are wired. */
  role?: UserRole;
}
