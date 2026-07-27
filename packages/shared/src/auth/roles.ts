import type { AuthUser, UserRole } from '../types';

/** Role helpers prepared for future permission gates. */
export function getUserRole(user: AuthUser | null | undefined): UserRole | null {
  return user?.role ?? null;
}

export function hasCoachAccess(user: AuthUser | null | undefined): boolean {
  const role = getUserRole(user);
  return role === 'coach' || role === 'admin' || role === 'staff';
}

export function hasAdminAccess(user: AuthUser | null | undefined): boolean {
  return getUserRole(user) === 'admin';
}

export function canManageMembers(user: AuthUser | null | undefined): boolean {
  return hasCoachAccess(user);
}

export function canPublishAnnouncements(
  user: AuthUser | null | undefined,
): boolean {
  return hasCoachAccess(user);
}

export function canManageClasses(user: AuthUser | null | undefined): boolean {
  return hasCoachAccess(user);
}
