export type AuthStackParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Schedule: undefined;
  WorkoutLog: undefined;
  Profile: undefined;
};

/** High-level root routes — detailed params live in navigation/types.ts */
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};
