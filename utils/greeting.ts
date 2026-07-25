/**
 * Time-aware greeting for the Home dashboard.
 */
export function getGreeting(date = new Date()): string {
  const hour = date.getHours();

  if (hour < 12) {
    return 'Good Morning';
  }
  if (hour < 17) {
    return 'Good Afternoon';
  }
  return 'Good Evening';
}

export function getFirstName(fullName?: string | null): string {
  if (!fullName?.trim()) {
    return 'Athlete';
  }
  return fullName.trim().split(/\s+/)[0] ?? 'Athlete';
}
