import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { TabBarIcon } from '../components';
import {
  HomeScreen,
  ProfileScreen,
  ScheduleScreen,
  WorkoutLogScreen,
} from '../screens';
import { colors, fontFamilies } from '../lib/theme';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.primaryBackground,
          borderTopColor: colors.border,
          height: 64,
          paddingTop: 6,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: colors.goldAccent,
        tabBarInactiveTintColor: colors.secondaryText,
        tabBarLabelStyle: {
          fontFamily: fontFamilies.medium,
          fontSize: 11,
          letterSpacing: 0.2,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name={focused ? 'calendar' : 'calendar-outline'}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="WorkoutLog"
        component={WorkoutLogScreen}
        options={{
          title: 'Log',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name={focused ? 'barbell' : 'barbell-outline'}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name={focused ? 'person' : 'person-outline'}
              focused={focused}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
