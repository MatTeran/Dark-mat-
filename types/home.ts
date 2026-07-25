export interface NextClass {
  id: string;
  title: string;
  coach: string;
  startsAt: string;
  room: string;
  durationMinutes: number;
}

export interface ActivityItem {
  id: string;
  title: string;
  detail: string;
  occurredAt: string;
}

export interface UpcomingEvent {
  id: string;
  title: string;
  dateLabel: string;
  meta: string;
}

export type QuickActionId = 'schedule' | 'logWorkout' | 'checkIn' | 'profile';

export interface QuickAction {
  id: QuickActionId;
  label: string;
  subtitle: string;
  icon: 'calendar-outline' | 'barbell-outline' | 'checkmark-circle-outline' | 'person-outline';
}
