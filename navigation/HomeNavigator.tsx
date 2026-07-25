import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { JourneyScreen } from '../screens';
import { HomeScreen } from '../screens/main/HomeScreen';
import { colors } from '../lib/theme';
import type { HomeStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function HomeNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.primaryBackground },
        animation: 'fade',
      }}
    >
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="Journey" component={JourneyScreen} />
    </Stack.Navigator>
  );
}

export function shouldHideHomeTabBar(route: unknown): boolean {
  const routeName = getFocusedRouteNameFromRoute(route as never) ?? 'HomeMain';
  return routeName === 'Journey';
}
