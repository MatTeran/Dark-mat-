import { WEEKDAYS, WEEKLY_SCHEDULE } from '../lib/data/schedule';
import type { NextClass } from '../types/home';
import type { ScheduleClass, Weekday } from '../types/schedule';

const WEEKDAY_BY_JS_DAY: Weekday[] = [
  'sun',
  'mon',
  'tue',
  'wed',
  'thu',
  'fri',
  'sat',
];

export function getWeekdayFromDate(date: Date): Weekday {
  return WEEKDAY_BY_JS_DAY[date.getDay()] ?? 'mon';
}

export function getWeekdayLabel(day: Weekday): string {
  return WEEKDAYS.find((item) => item.key === day)?.label ?? day;
}

function parseTimeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

function durationMinutes(startTime: string, endTime: string): number {
  return Math.max(parseTimeToMinutes(endTime) - parseTimeToMinutes(startTime), 0);
}

export function formatTimeRange(startTime: string, endTime: string): string {
  return `${formatClock(startTime)} – ${formatClock(endTime)}`;
}

export function formatClock(time: string): string {
  const [hourRaw, minuteRaw] = time.split(':').map(Number);
  const period = hourRaw >= 12 ? 'PM' : 'AM';
  const hour12 = hourRaw % 12 || 12;
  return `${hour12}:${String(minuteRaw).padStart(2, '0')} ${period}`;
}

export function getClassesForDay(day: Weekday): ScheduleClass[] {
  return WEEKLY_SCHEDULE.filter((item) => item.day === day).sort(
    (a, b) => parseTimeToMinutes(a.startTime) - parseTimeToMinutes(b.startTime),
  );
}

function buildOccurrenceDate(from: Date, dayOffset: number, time: string): Date {
  const [hours, minutes] = time.split(':').map(Number);
  const date = new Date(from);
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + dayOffset);
  date.setHours(hours, minutes, 0, 0);
  return date;
}

/**
 * Next upcoming class from the weekly board, looking up to 7 days ahead.
 */
export function getNextScheduledClass(now = new Date()): {
  classItem: ScheduleClass;
  startsAt: Date;
} | null {
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const todayIndex = now.getDay(); // 0 Sun

  for (let offset = 0; offset < 7; offset += 1) {
    const jsDay = (todayIndex + offset) % 7;
    const weekday = WEEKDAY_BY_JS_DAY[jsDay];
    const classes = getClassesForDay(weekday);

    for (const classItem of classes) {
      const startMinutes = parseTimeToMinutes(classItem.startTime);
      if (offset === 0 && startMinutes <= currentMinutes) {
        continue;
      }

      return {
        classItem,
        startsAt: buildOccurrenceDate(now, offset, classItem.startTime),
      };
    }
  }

  return null;
}

export function toNextClassCardModel(now = new Date()): NextClass | null {
  const next = getNextScheduledClass(now);
  if (!next) {
    return null;
  }

  return {
    id: next.classItem.id,
    title: next.classItem.title,
    coach: next.classItem.notes ?? 'Open Mat Academy',
    startsAt: next.startsAt.toISOString(),
    room: 'Tracy · Naglee Rd',
    durationMinutes: durationMinutes(
      next.classItem.startTime,
      next.classItem.endTime,
    ),
  };
}
