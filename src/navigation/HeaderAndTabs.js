import React from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { supabase } from '@lib/supabase';
import HomeScreen from '@screens/Home';
import InviteScreen from '@screens/Invite';
import TeamScreen from '@screens/Team';

const Tab = createBottomTabNavigator();

export default function HeaderAndTabs() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  // Display modal prompt before logout
  const confirmLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            const { error } = await supabase.auth.signOut();
            if (error) {
              Alert.alert('Logout Failed', error.message);
            } else {
              navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  // Dynamically render logout header button
  const renderLogoutButton = () => (
    <TouchableOpacity onPress={confirmLogout} style={{ marginRight: 16 }}>
      <Ionicons name="log-out-outline" size={24} color="#111827" />
    </TouchableOpacity>
  );

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: true,
        headerRight: renderLogoutButton,
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
          paddingBottom: insets.bottom,
          paddingTop: 8,
        },
        headerStyle: {
          backgroundColor: 'white',
        },
        headerTintColor: '#76b5c5',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerTitle: 'Dashboard' }} />
      <Tab.Screen name="Invite" component={InviteScreen} options={{ title: 'Invite' }} />
      <Tab.Screen name="Team" component={TeamScreen} options={{ title: 'Team' }} />
    </Tab.Navigator>
  );
}
