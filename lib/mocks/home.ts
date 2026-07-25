import type {
  ActivityItem,
  NextClass,
  QuickAction,
  UpcomingEvent,
} from '../../types/home';
import { toNextClassCardModel } from '../../utils/schedule';

/** Live next class from the official weekly board. */
export const NEXT_CLASS: NextClass = toNextClassCardModel() ?? {
  id: 'fallback-open-gym',
  title: 'Open Gym',
  coach: 'Open Mat Academy',
  startsAt: new Date().toISOString(),
  room: 'Tracy · Naglee Rd',
  durationMinutes: 60,
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
    id: 'journey',
    label: 'Journey',
    subtitle: 'Progress',
    icon: 'map-outline',
  },
];

export const RECENT_ACTIVITY: ActivityItem[] = [
  {
    id: 'act-1',
    title: 'Logged open mat',
    detail: 'GI / No GI · 90 min',
    occurredAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
  },
  {
    id: 'act-2',
    title: 'Checked in',
    detail: 'Adult/Teen BJJ (No GI)',
    occurredAt: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(),
  },
  {
    id: 'act-3',
    title: 'Morning GI',
    detail: 'Roll Call · Band App',
    occurredAt: new Date(Date.now() - 1000 * 60 * 60 * 70).toISOString(),
  },
];

export const UPCOMING_EVENTS: UpcomingEvent[] = [
  {
    id: 'evt-1',
    title: 'Saturday Open Mat',
    dateLabel: 'Sat · Weekly',
    meta: 'GI / No GI · 10:00 AM – 12:00 PM',
  },
  {
    id: 'evt-2',
    title: 'Open Gym Weekend',
    dateLabel: 'Sat–Sun',
    meta: '10:00 AM – 5:30 PM · Tracy',
  },
];
