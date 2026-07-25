export type Weekday =
  | 'mon'
  | 'tue'
  | 'wed'
  | 'thu'
  | 'fri'
  | 'sat'
  | 'sun';

export type Discipline =
  | 'adult_bjj'
  | 'youth_bjj'
  | 'pee_wee_bjj'
  | 'womens_bjj'
  | 'boxing'
  | 'muay_thai'
  | 'wrestling'
  | 'peak_performance'
  | 'tae_kwon_do'
  | 'open_mat'
  | 'open_gym';

export interface ScheduleClass {
  id: string;
  day: Weekday;
  title: string;
  startTime: string; // HH:mm 24h
  endTime: string; // HH:mm 24h
  discipline: Discipline;
  notes?: string;
}
