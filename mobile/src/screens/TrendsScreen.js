import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, RefreshControl } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { fetchWWTPData } from '../services/api';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 1,
  color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(100, 116, 139, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '4',
    strokeWidth: '2',
    stroke: '#3b82f6',
  },
};

export default function TrendsScreen() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      const response = await fetchWWTPData(0, 10);
      setData([...response.items].reverse());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.center}>
        <Text>Loading Analytics...</Text>
      </View>
    );
  }

  const codData = {
    labels: data.map((_, i) => i === 0 || i === data.length - 1 ? '' : ''), // Minimal labels for mobile
    datasets: [{ data: data.map(item => item.cod) }],
  };

  const doData = {
    labels: data.map((_, i) => i === 0 || i === data.length - 1 ? '' : ''),
    datasets: [{ data: data.map(item => item.do) }],
    color: (opacity = 1) => `rgba(6, 182, 212, ${opacity})`,
  };

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Trends & Analytics</Text>
        <Text style={styles.headerSubtitle}>Historical performance metrics</Text>
      </View>

      <View style={styles.chartSection}>
        <Text style={styles.chartTitle}>COD Stream (mg/L)</Text>
        <LineChart
          data={codData}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      </View>

      <View style={styles.chartSection}>
        <Text style={[styles.chartTitle, { color: '#06b6d4' }]}>DO Level (mg/L)</Text>
        <LineChart
          data={doData}
          width={screenWidth - 32}
          height={220}
          chartConfig={{...chartConfig, color: (opacity = 1) => `rgba(6, 182, 212, ${opacity})` }}
          bezier
          style={styles.chart}
        />
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginBottom: 24,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 4,
  },
  chartSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});
