import type {
  ActivityItem,
  NextClass,
  QuickAction,
  UpcomingEvent,
} from '../../types/home';

/** Placeholder dashboard data — replace with Supabase queries later. */
export const NEXT_CLASS: NextClass = {
  id: 'class-1',
  title: 'Gi Fundamentals',
  coach: 'Coach Rivera',
  startsAt: new Date(Date.now() + 1000 * 60 * 60 * 5).toISOString(),
  room: 'Mat Room A',
  durationMinutes: 75,
};

export const QUICK_ACTIONS: QuickAction[] = [
  {
    id: 'schedule',
    label: 'Schedule',
    subtitle: 'Classes',
    icon: 'calendar-outline',
  },
  {
    id: 'logWorkout',
    label: 'Log Workout',
    subtitle: 'Training',
    icon: 'barbell-outline',
  },
  {
    id: 'checkIn',
    label: 'Check In',
    subtitle: 'Tonight',
    icon: 'checkmark-circle-outline',
  },
  {
    id: 'profile',
    label: 'Profile',
    subtitle: 'Account',
    icon: 'person-outline',
  },
];

export const RECENT_ACTIVITY: ActivityItem[] = [
  {
    id: 'act-1',
    title: 'Logged open mat',
    detail: '6 rounds · 90 min',
    occurredAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
  },
  {
    id: 'act-2',
    title: 'Checked in',
    detail: 'No-Gi Sparring',
    occurredAt: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(),
  },
  {
    id: 'act-3',
    title: 'Booked class',
    detail: 'Gi Fundamentals',
    occurredAt: new Date(Date.now() - 1000 * 60 * 60 * 70).toISOString(),
  },
];

export const UPCOMING_EVENTS: UpcomingEvent[] = [
  {
    id: 'evt-1',
    title: 'In-House Tournament',
    dateLabel: 'Sat · Aug 2',
    meta: 'All belts · 10:00 AM',
  },
  {
    id: 'evt-2',
    title: 'Belt Promotion Ceremony',
    dateLabel: 'Fri · Aug 15',
    meta: 'Main academy · 7:00 PM',
  },
];
