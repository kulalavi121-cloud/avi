import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl, Dimensions } from 'react-native';
import { Activity, Droplet, Wind, AlertTriangle } from 'lucide-react-native';
import { fetchWWTPData, fetchAnomalies } from '../services/api';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

const StatCard = ({ title, value, unit, icon: Icon, trend, color }) => (
  <View style={[styles.card, { borderLeftColor: color, borderLeftWidth: 4 }]}>
    <View style={styles.cardHeader}>
      <View style={[styles.iconContainer, { backgroundColor: `${color}22` }]}>
        <Icon size={20} color={color} />
      </View>
      {trend && (
        <Text style={[styles.trend, { color: trend > 0 ? '#ef4444' : '#10b981' }]}>
          {trend > 0 ? '+' : ''}{trend}%
        </Text>
      )}
    </View>
    <Text style={styles.cardTitle}>{title}</Text>
    <View style={styles.valueContainer}>
      <Text style={styles.cardValue}>{value}</Text>
      <Text style={styles.cardUnit}>{unit}</Text>
    </View>
  </View>
);

export default function DashboardScreen() {
  const [data, setData] = useState({ items: [] });
  const [anomalies, setAnomalies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      const [wwtpData, anomalyData] = await Promise.all([
        fetchWWTPData(0, 10),
        fetchAnomalies(5)
      ]);
      setData(wwtpData);
      setAnomalies(anomalyData);
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

  const latestData = data.items.length > 0 ? data.items[0] : null;

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Plant Overview</Text>
        <Text style={styles.headerSubtitle}>Real-time metrics and AI insights</Text>
      </View>

      {latestData && (
        <View style={styles.statsGrid}>
          <StatCard
            title="COD"
            value={latestData.cod.toFixed(1)}
            unit="mg/L"
            icon={Activity}
            trend={-2.4}
            color="#3b82f6"
          />
          <StatCard
            title="DO"
            value={latestData.do.toFixed(2)}
            unit="mg/L"
            icon={Wind}
            trend={1.2}
            color="#06b6d4"
          />
          <StatCard
            title="MLSS"
            value={Math.round(latestData.mlss)}
            unit="mg/L"
            icon={Droplet}
            trend={0.5}
            color="#a855f7"
          />
          <StatCard
            title="Turbidity"
            value={latestData.turbidity.toFixed(1)}
            unit="NTU"
            icon={Droplet}
            trend={5.1}
            color="#f59e0b"
          />
        </View>
      )}

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <AlertTriangle size={20} color="#ef4444" />
          <Text style={styles.sectionTitle}>Recent Anomalies</Text>
        </View>
        
        {anomalies.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No recent anomalies detected.</Text>
          </View>
        ) : (
          anomalies.map((anomaly, idx) => (
            <View key={idx} style={styles.anomalyItem}>
              <View style={styles.anomalyIndicator} />
              <View style={styles.anomalyContent}>
                <Text style={styles.anomalyTitle}>
                  {anomaly.anomaly_rule ? "Threshold Alert" : "Pattern Anomaly"}
                </Text>
                <Text style={styles.anomalyDetails}>
                  DO: {anomaly.do?.toFixed(2)} | pH: {anomaly.ph?.toFixed(2)}
                </Text>
              </View>
            </View>
          ))
        )}
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
  header: {
    marginBottom: 20,
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    padding: 8,
    borderRadius: 8,
  },
  trend: {
    fontSize: 12,
    fontWeight: '600',
  },
  cardTitle: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 4,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  cardUnit: {
    fontSize: 14,
    color: '#94a3b8',
    marginLeft: 4,
  },
  section: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ef4444',
  },
  emptyContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
  },
  emptyText: {
    color: '#64748b',
  },
  anomalyItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  anomalyIndicator: {
    width: 4,
    backgroundColor: '#ef4444',
  },
  anomalyContent: {
    padding: 16,
    flex: 1,
  },
  anomalyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  anomalyDetails: {
    fontSize: 14,
    color: '#64748b',
  },
});
