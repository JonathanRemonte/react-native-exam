import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HomeScreen from '@screens/Home';
import InviteScreen from '@screens/Invite';
import TeamScreen from '@screens/Team';

const Tab = createMaterialTopTabNavigator();

export default function MaterialTabNav() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      swipeEnabled={true}
      tabBarPosition="bottom"
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Invite') {
            iconName = focused ? 'send' : 'send-outline';
          } else if (route.name === 'Team') {
            iconName = focused ? 'people' : 'people-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#76b5c5',
        tabBarInactiveTintColor: '#6b7280',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 0.3,
          borderTopColor: '#e5e7eb',
          height: 60 + insets.bottom,
          paddingBottom: -10 + insets.bottom,
          paddingTop: 8,
        }
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerTitle: 'Dashboard' }} />
      <Tab.Screen name="Invite" component={InviteScreen} options={{ title: 'Invite' }} />
      <Tab.Screen name="Team" component={TeamScreen} options={{ title: 'Team' }} />
    </Tab.Navigator>
  );
}
