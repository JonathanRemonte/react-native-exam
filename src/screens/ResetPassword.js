import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import { supabase } from '../lib/supabase';

import Loader from '../components/Loader';

export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [errorText, setErrorText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!email) {
      setErrorText('Please enter your email');
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://expo.dev'
    });

    setLoading(false);

    if (error) {
      Alert.alert('Reset Failed', error.message);
    } else {
      Alert.alert('Reset Link Sent', 'Check your inbox for instructions');
      navigation.goBack();
    }
  };

  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={28} color="#3b82f6" />
      </TouchableOpacity>

      <KeyboardAvoidingView enabled>
        <Text style={styles.title}>Reset Password</Text>

        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholder='Enter your email to reset password'
          autoCapitalize="none"
          keyboardType="email-address"
        />

        {errorText !== '' && (
          <Text style={styles.errorTextStyle}>{errorText}</Text>
        )}

        <TouchableOpacity
          title={loading ? 'Sending...' : 'Send Reset Link'}
          style={styles.buttonStyle}
          onPress={handleReset}
          disabled={loading}>
          <Text style={styles.buttonTextStyle}>SEND EMAIL</Text>
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
  buttonStyle: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonTextStyle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 6,
    marginBottom: 16,
  },
  errorTextStyle: {
    color: '#ef4444',
    textAlign: 'center',
    fontSize: 13,
    marginTop: 8,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    padding: 4,
    zIndex: 100,
  }
});