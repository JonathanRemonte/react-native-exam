import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MaterialTabNav from '@navigation/MaterialTabNav';
import LoginScreen from '@screens/Login';
import SignupScreen from '@screens/Signup';
import ResetPasswordScreen from '@screens/ResetPassword';
import RenderLogoutButton from '@components/Logout';

const Stack = createNativeStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator 
      initialRouteName="AuthenticatedPages"     // for temp app exits
      screenOptions={{
        headerStyle: { backgroundColor: 'lightblue' },
      }}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: 'Login', headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ title: 'Sign up', headerShown: false }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        options={{ title: 'Reset Password', headerShown: false }}
      />
      <Stack.Screen
        name="AuthenticatedPages"
        component={MaterialTabNav}
        options={{ 
          headerShown: true, 
          headerTitle: "MLM Monitoring", 
          headerTitleStyle: {
            fontWeight: 'bold'
          },
          headerRight: RenderLogoutButton,
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: '#76b5c5',
        }}
      />
    </Stack.Navigator>
  );
}