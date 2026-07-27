import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAppTheme, fontFamilies } from '@darkmat/shared';

import { AnnouncementFormScreen } from '../screens/announcements/AnnouncementFormScreen';
import { AnnouncementsScreen } from '../screens/announcements/AnnouncementsScreen';
import { MoreScreen } from '../screens/more/MoreScreen';
import type { MoreStackParamList } from './types';

const Stack = createNativeStackNavigator<MoreStackParamList>();

export function MoreNavigator() {
  const { colors } = useAppTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.primaryBackground },
        headerTintColor: colors.goldAccent,
        headerTitleStyle: {
          fontFamily: fontFamilies.semibold,
          color: colors.text,
        },
        contentStyle: { backgroundColor: colors.primaryBackground },
      }}
    >
      <Stack.Screen
        name="MoreHome"
        component={MoreScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Announcements"
        component={AnnouncementsScreen}
        options={{ title: 'Announcements' }}
      />
      <Stack.Screen
        name="AnnouncementForm"
        component={AnnouncementFormScreen}
        options={{ title: 'Announcement' }}
      />
    </Stack.Navigator>
  );
}

export function shouldHideMoreTabBar(route: object) {
  const routeName = getFocusedRouteNameFromRoute(route as never) ?? 'MoreHome';
  return routeName !== 'MoreHome';
}
