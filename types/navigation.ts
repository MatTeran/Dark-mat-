import type { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type WorkoutStackParamList = {
  WorkoutList: undefined;
  WorkoutDetails: { workoutId?: string } | undefined;
};

export type CommunityStackParamList = {
  CommunityHome: undefined;
  AnnouncementDetail: { announcementId: string };
  TeamChat: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Schedule: undefined;
  Community: NavigatorScreenParams<CommunityStackParamList> | undefined;
  WorkoutLog: NavigatorScreenParams<WorkoutStackParamList> | undefined;
  Profile: undefined;
};

/** High-level root routes — detailed params live in navigation/types.ts */
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};
