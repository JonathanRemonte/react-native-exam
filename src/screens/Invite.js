import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import Loader from '@components/Loader';

export default function InviteScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInvite = () => {
    if (!email) {
      Alert.alert('Input Required', 'Please enter an email to send an invite.');
      return;
    }
    // Replace this with real invite logic (e.g., Supabase function)
    Alert.alert('Invite Sent', `An invitation was sent to ${email}`);
    setEmail('');
  };

  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
        <KeyboardAvoidingView enabled>
          <Text style={styles.title}>Invite a New Member</Text>
          <Text style={styles.description}>
            Send an invitation to someone by entering their email below.
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter email address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TouchableOpacity style={styles.button} onPress={handleInvite}>
            <Text style={styles.buttonText}>Send Invite</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f9fafb',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
    color: '#111827',
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#ffffff',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#1e81b0',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
});