import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, KeyboardAvoidingView, TouchableOpacity, ScrollView, Keyboard } from 'react-native';
import { supabase } from '../lib/supabase';

import Loader from '../components/Loader';

export default function SignupScreen({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [code, setCode] = useState('');
  const [errorText, setErrorText] = useState('');
  const [loading, setLoading] = useState(false);

  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const codeRef = useRef();

  const handleSignup = async () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword || !code) {
      setErrorText('All fields are required. Please fill all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorText('Passwords do not match');
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          recruitment_code: code,
        },
      },
    });


    setLoading(false);

    if (error) {
      Alert.alert('Signup Failed', error.message);
    } else {
      Alert.alert('Signup Success', 'Check your email to confirm your account');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }
  };

  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <KeyboardAvoidingView enabled>
          <Text style={styles.title}>Register</Text>

          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
              returnKeyType="next"
              onSubmitEditing={() => lastNameRef.current.focus()}
            />
          </View>

          <View style={styles.SectionStyle}>
            <TextInput
              ref={lastNameRef}
              style={styles.inputStyle}
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
              returnKeyType="next"
              onSubmitEditing={() => emailRef.current.focus()}
            />
          </View>

          <View style={styles.SectionStyle}>
            <TextInput
              ref={emailRef}
              style={styles.inputStyle}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current.focus()}
            />
          </View>

          <View style={styles.SectionStyle}>
            <TextInput
              ref={passwordRef}
              style={styles.inputStyle}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              returnKeyType="next"
              onSubmitEditing={() => confirmPasswordRef.current.focus()}
            />
          </View>

          <View style={styles.SectionStyle}>
            <TextInput
              ref={confirmPasswordRef}
              style={styles.inputStyle}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              returnKeyType="next"
              onSubmitEditing={() => codeRef.current.focus()}
            />
          </View>

          <View style={styles.SectionStyle}>
            <TextInput
              ref={codeRef}
              style={styles.inputStyle}
              placeholder="Recruitment Code"
              value={code}
              onChangeText={setCode}
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
            />
          </View>

          {errorText !== '' && (
            <Text style={styles.errorTextStyle}>{errorText}</Text>
          )}

          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSignup}>
            <Text style={styles.buttonTextStyle}>REGISTER</Text>
          </TouchableOpacity>

          <Text
            style={styles.registerTextStyle}
            onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Login' }] })}>
            Already have an account? Login
          </Text>
        </KeyboardAvoidingView>
      </ScrollView>
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
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 24,
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 50,
    marginVertical: 8,
    borderColor: '#e5e7eb',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  inputStyle: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
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
  registerTextStyle: {
    color: '#3b82f6',
    textAlign: 'center',
    marginTop: 16,
    fontSize: 14,
    fontWeight: '500',
  },
  errorTextStyle: {
    color: '#ef4444',
    textAlign: 'center',
    fontSize: 13,
    marginTop: 8,
  }
});
