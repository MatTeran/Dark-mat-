export * as authApi from './supabase/auth';
export {
  getSupabaseClient,
  isSupabaseConfigured,
} from './supabase/client';
export {
  createAnnouncementsRepository,
  createMemoryAnnouncementsRepository,
  createSupabaseAnnouncementsRepository,
  type AnnouncementsRepository,
} from './repositories/announcementsRepository';
export {
  createAttendanceRepository,
  createMemoryAttendanceRepository,
  createSupabaseAttendanceRepository,
  type AttendanceRepository,
} from './repositories/attendanceRepository';
export {
  createClassesRepository,
  createMemoryClassesRepository,
  createSupabaseClassesRepository,
  type ClassesRepository,
} from './repositories/classesRepository';
export {
  createCoachNotesRepository,
  createMemoryCoachNotesRepository,
  createSupabaseCoachNotesRepository,
  type CoachNotesRepository,
} from './repositories/coachNotesRepository';
export {
  createMembersRepository,
  createMemoryMembersRepository,
  type MembersRepository,
} from './repositories/membersRepository';
