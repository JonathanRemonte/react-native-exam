import React, { useState, createRef } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, ScrollView, Keyboard, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { supabase } from '@lib/supabase'

import Loader from '@components/Loader';

import { validateLogin } from '../utils/validators';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const passwordInputRef = createRef();

  const handleLogin = async () => {
    const validationError = validateLogin(email, password);

    if (validationError) {
      setErrortext(validationError);
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (error) {
      setErrortext(`Login failed: ${error.message}`);
    } else {
      setEmail('');
      setPassword('');
      setErrortext('');
      navigation.reset({
        index: 0,
        routes: [{ name: 'AuthenticatedPages' }],
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
          <Text style={styles.title}>Login</Text>

          <View style={styles.sectionStyle}>
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={styles.inputStyle}
              placeholder='Enter Email'
              keyboardType="email-address"
              returnKeyType="next"
              autoCapitalize="none"
              onSubmitEditing={() =>
                passwordInputRef.current &&
                passwordInputRef.current.focus()
              }
              />
          </View>

          <View style={styles.sectionStyle}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              style={styles.inputStyle}
              placeholder='Enter Password'
              keyboardType="default"
              ref={passwordInputRef}
              secureTextEntry
              onSubmitEditing={Keyboard.dismiss}
            />
          </View>

          {errortext != '' ? (
            <Text style={styles.errorTextStyle}>
              {errortext}
            </Text>
          ) : null}

          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleLogin}>
            <Text style={styles.buttonTextStyle}>LOGIN</Text>
          </TouchableOpacity>

          <Text
            style={styles.registerTextStyle}
            onPress={() => 
              {
                setErrortext('');
                navigation.navigate('ResetPassword');
              }}>
            Forgot Password?
          </Text>

          <Text
            style={styles.registerTextStyle}
            onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Signup' }] })}>
            New Here ? Register
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
    color: '#1e81b0',
    textAlign: 'center',
    marginBottom: 24,
  },
  sectionStyle: {
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
    backgroundColor: '#76b5c5',
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
    color: '#1e81b0',
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