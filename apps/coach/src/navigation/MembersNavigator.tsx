import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAppTheme, fontFamilies } from '@darkmat/shared';

import { MemberDetailScreen } from '../screens/members/MemberDetailScreen';
import { MembersScreen } from '../screens/members/MembersScreen';
import type { MembersStackParamList } from './types';

const Stack = createNativeStackNavigator<MembersStackParamList>();

export function MembersNavigator() {
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
        name="MembersHome"
        component={MembersScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MemberDetail"
        component={MemberDetailScreen}
        options={{ title: 'Member' }}
      />
    </Stack.Navigator>
  );
}

export function shouldHideMembersTabBar(route: object) {
  const routeName = getFocusedRouteNameFromRoute(route as never) ?? 'MembersHome';
  return routeName !== 'MembersHome';
}
