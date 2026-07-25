import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import { useAuth } from '../hooks';
import { colors } from '../lib/theme';
import { AuthNavigator } from './AuthNavigator';
import { MainTabNavigator } from './MainTabNavigator';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.primaryBackground,
    card: colors.primaryBackground,
    primary: colors.goldAccent,
    text: colors.text,
    border: colors.border,
    notification: colors.goldAccent,
  },
};

/**
 * Top-level navigator: Auth stack vs Main tabs based on session gate.
 */
export function RootNavigator() {
  const { isAuthenticated, enterApp, exitApp } = useAuth();

  return (
    <NavigationContainer theme={navigationTheme}>
      <StatusBar style="light" />
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
        {isAuthenticated ? (
          <Stack.Screen name="Main">
            {() => <MainTabNavigator onSignOut={exitApp} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Auth">
            {() => <AuthNavigator onAuthenticated={enterApp} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
