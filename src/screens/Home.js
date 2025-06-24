import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, Platform, StatusBar, ActivityIndicator, Alert } from 'react-native';
import { supabase } from '@lib/supabase';

import Loader from '@components/Loader';

const mockDashboardData = {
  totalDownlines: 12,
  totalEarnings: 1540.25,
  recentPayouts: [
    { id: '1', amount: 150.0, date: '2025-06-20' },
    { id: '2', amount: 300.5, date: '2025-06-15' },
    { id: '3', amount: 250.0, date: '2025-06-10' },
  ],
};

export default function HomeScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {

    // Checks for existing sessions
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data?.session) {
        navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
      } else {

        // Replace with real Supabase fetch here if needed
        setDashboardData(mockDashboardData);

        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Visual for session checking
  if (loading || !dashboardData) {
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
        <View style={styles.card}>
          <Text style={styles.label}>Total Downlines</Text>
          <Text style={styles.value}>{dashboardData.totalDownlines}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Total Earnings</Text>
          <Text style={styles.value}>₱{dashboardData.totalEarnings.toFixed(2)}</Text>
        </View>

        <Text style={styles.sectionTitle}>Recent Payouts</Text>

        <FlatList
          data={dashboardData.recentPayouts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.payoutItem}>
              <Text style={styles.payoutAmount}>₱{item.amount.toFixed(2)}</Text>
              <Text style={styles.payoutDate}>{item.date}</Text>
            </View>
          )}
          style={styles.payoutList}
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
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 4,
  },
  value: {
    fontSize: 22,
    fontWeight: '600',
    color: '#111827',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginVertical: 12,
  },
  payoutList: {
    marginBottom: 20,
  },
  payoutItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 1,
    elevation: 1,
  },
  payoutAmount: {
    fontSize: 16,
    fontWeight: '500',
    color: '#10b981',
  },
  payoutDate: {
    fontSize: 14,
    color: '#6b7280',
  },
});