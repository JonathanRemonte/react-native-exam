import React from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '@lib/supabase';

const RenderLogoutButton = () => {
  const navigation = useNavigation(); // navigation hook

  // ✅ Moved inside component to access navigation
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

  return (
    <TouchableOpacity onPress={confirmLogout} style={{ marginRight: 10 }}>
      <Ionicons name="log-out-outline" size={24} color="#76b5c5" />
    </TouchableOpacity>
  );
};

export default RenderLogoutButton;