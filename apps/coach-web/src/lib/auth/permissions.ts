import type { AuthUser, UserRole } from '@darkmat/shared/types';
import {
  canEditMemberDevelopment,
  canFullyManageMemberDevelopment,
  canManageClasses,
  canPublishAnnouncements,
  hasCoachAccess,
  hasManagerAccess,
  hasOwnerAccess,
} from '@darkmat/shared/auth/roles';

export type CoachWebRole = Extract<
  UserRole,
  'coach' | 'manager' | 'owner' | 'admin' | 'staff'
>;

export interface CoachSession {
  user: AuthUser;
  academyId: string;
  academyName: string;
}

const DEMO_USER: AuthUser = {
  id: 'guest-coach-user',
  email: 'coach@darkmat.demo',
  fullName: 'Coach Rivera',
  role: 'coach',
};

export function isDemoMode(): boolean {
  return (
    process.env.NEXT_PUBLIC_COACH_WEB_DEMO === '1' ||
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  );
}

export function getDemoSession(): CoachSession {
  return {
    user: DEMO_USER,
    academyId: 'academy-dark-mat',
    academyName: 'Dark Mat HQ',
  };
}

/** Members and unknown roles cannot enter Coach Web. */
export function canAccessCoachWeb(user: AuthUser | null | undefined): boolean {
  return hasCoachAccess(user);
}

export function assertCoachWebAccess(user: AuthUser | null | undefined): void {
  if (!canAccessCoachWeb(user)) {
    throw new Error('Coach Web access denied for this role.');
  }
}

export const permissions = {
  canAccessCoachWeb,
  canEditMemberDevelopment,
  canFullyManageMemberDevelopment,
  canManageClasses,
  canPublishAnnouncements,
  hasManagerAccess,
  hasOwnerAccess,
  hasCoachAccess,
};
