import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';

import { supabase } from '@lib/supabase';
import Loader from '@components/Loader';

const mockTeam = [
  { id: '1', name: 'Jane Dela Cruz', email: 'jane@example.com', role: 'Member' },
  { id: '2', name: 'Mark Santos', email: 'mark@example.com', role: 'Member' },
  { id: '3', name: 'Ana Reyes', email: 'ana@example.com', role: 'Member' },
];

export default function TeamScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [team, setTeam] = useState([]);                   // array of all names
  const [filteredTeam, setFilteredTeam] = useState([]);   // array of search filtered names

  useEffect(() => {
    const checkAuthAndLoad = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data?.session) {
        navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
      } else {

        // Simulate team fetch (replace with Supabase query if needed)
        setTeam(mockTeam);
        setFilteredTeam(mockTeam);
        
        setLoading(false);
      }
    };

    checkAuthAndLoad();
  }, []);

  const handleSearch = (text) => {
    setSearch(text);
    const filtered = team.filter((member) =>
      member.name.toLowerCase().includes(text.toLowerCase()) ||
      member.email.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredTeam(filtered);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Checking session...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Loader loading={loading} />
      <SafeAreaView>
        <Text style={styles.title}>Your Team</Text>
        <Text style={styles.subtitle}>List of members under your network</Text>

        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or email"
          value={search}
          onChangeText={handleSearch}
          autoCapitalize="none"
        />

        <FlatList
          data={filteredTeam}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingTop: 12 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardRow}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.role}>{item.role}</Text>
              </View>
              <Text style={styles.email}>{item.email}</Text>
            </View>
          )}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  role: {
    fontSize: 14,
    color: '#1e81b0',
    fontWeight: '500',
  },
  email: {
    fontSize: 13,
    color: '#6b7280',
  },
});