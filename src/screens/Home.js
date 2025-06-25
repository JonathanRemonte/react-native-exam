import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, StyleSheet, SafeAreaView,
  StatusBar, ActivityIndicator
} from 'react-native';
import { supabase } from '@lib/supabase';
import { MaterialIcons } from '@expo/vector-icons';

const mockDashboardData = {
  totalDownlines: 3,
  recentPayouts: [
    { id: '1', amount: 600.0, date: '2025-06-20' },
    { id: '2', amount: 500.5, date: '2025-06-15' },
    { id: '3', amount: 400.0, date: '2025-06-16' },
    { id: '4', amount: 300.0, date: '2025-06-30' },
    { id: '5', amount: 200.0, date: '2025-06-18' },
    { id: '6', amount: 100.0, date: '2025-06-05' },
  ],
};

export default function HomeScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data?.session) {
        navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
      } else {
        const user = data.session.user;                         // get session user data
        const userName = user.user_metadata?.first_name         // get user first name
        const totalEarnings = mockDashboardData.recentPayouts.reduce((sum, item) => sum + item.amount, 0);    // get sum of all payouts
        setDashboardData({ ...mockDashboardData, totalEarnings, userName });
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading || !dashboardData) {                              // renders activity indicator when loading or no dashboard data fetched
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Checking session...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Text style={styles.headerText}>
        Welcome back, <Text style={{textDecorationLine: 'underline'}}>{dashboardData.userName}</Text>!
      </Text>
      <Text style={styles.subHeaderText}>Here’s your current dashboard:</Text>

      {/* Metrics */}
      <View style={styles.metricsRow}>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Total Downlines</Text>
          <Text style={styles.metricValue}>{dashboardData.totalDownlines}</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Total Earnings</Text>
          <Text style={styles.metricValue}>₱{dashboardData.totalEarnings.toFixed(2)}</Text>
        </View>
      </View>

      {/* Recent Payouts */}
      <Text style={styles.sectionTitle}>Recent Payouts</Text>
      <FlatList
        data={[...dashboardData.recentPayouts].sort((a, b) => new Date(b.date) - new Date(a.date))}     // sorts payouts according to most recent
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.payoutItem}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name="payments" size={24} color="#10b981" />
              <Text style={styles.payoutAmount}>₱{item.amount.toFixed(2)}</Text>
            </View>
            <Text style={styles.payoutDate}>{item.date}</Text>
          </View>
        )}
        style={styles.payoutList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    paddingHorizontal: 20,
    paddingTop: StatusBar.currentHeight,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },
  subHeaderText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 20,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  metricCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    flex: 1,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  metricLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 10,
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
    alignItems: 'center',
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
    marginLeft: 8,
  },
  payoutDate: {
    fontSize: 14,
    color: '#6b7280',
  },
  actionButton: {
    backgroundColor: '#3b82f6',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});