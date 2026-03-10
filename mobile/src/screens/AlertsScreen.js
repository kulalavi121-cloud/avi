import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import { AlertTriangle, Info, CheckCircle } from 'lucide-react-native';
import { fetchAnomalies } from '../services/api';

export default function AlertsScreen() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('all');

  const loadAlerts = async () => {
    try {
      const data = await fetchAnomalies(50);
      setAlerts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadAlerts();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadAlerts();
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true;
    const score = alert.anomaly_score || 0;
    const severity = score > 0.8 ? 'high' : score > 0.5 ? 'medium' : 'low';
    return severity === filter;
  });

  const getSeverity = (score) => {
    if (score > 0.8) return { color: '#ef4444', label: 'High', icon: AlertTriangle };
    if (score > 0.5) return { color: '#f59e0b', label: 'Medium', icon: AlertTriangle };
    return { color: '#10b981', label: 'Low', icon: Info };
  };

  const renderItem = ({ item }) => {
    const { color, label, icon: Icon } = getSeverity(item.anomaly_score);
    return (
      <View style={[styles.alertCard, { borderLeftColor: color }]}>
        <View style={styles.alertHeader}>
          <View style={[styles.iconContainer, { backgroundColor: `${color}22` }]}>
            <Icon size={20} color={color} />
          </View>
          <Text style={[styles.severityLabel, { color }]}>{label} Severity</Text>
          <Text style={styles.alertDate}>Recent</Text>
        </View>
        <Text style={styles.alertTitle}>Parameter Anomaly Detected</Text>
        <Text style={styles.alertDescription}>
          AI Engine flagged an anomaly score of {(item.anomaly_score || 0).toFixed(3)}. 
          Parameters like COD ({item.cod?.toFixed(1) || 'N/A'}) may be out of range.
        </Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Investigate</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>System Alerts</Text>
        <View style={styles.filterBar}>
          {['all', 'high', 'medium', 'low'].map(f => (
            <TouchableOpacity 
              key={f} 
              onPress={() => setFilter(f)}
              style={[styles.filterButton, filter === f && styles.filterButtonActive]}
            >
              <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <FlatList
        data={filteredAlerts}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={
          !loading && (
            <View style={styles.emptyContainer}>
              <CheckCircle size={48} color="#10b981" />
              <Text style={styles.emptyTitle}>All Systems Nominal</Text>
              <Text style={styles.emptySubtitle}>No anomalies detected matching criteria.</Text>
            </View>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  filterBar: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
  },
  filterButtonActive: {
    backgroundColor: '#1e293b',
  },
  filterText: {
    fontSize: 14,
    color: '#64748b',
  },
  filterTextActive: {
    color: '#fff',
  },
  listContent: {
    padding: 16,
  },
  alertCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    padding: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  severityLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    flex: 1,
  },
  alertDate: {
    fontSize: 12,
    color: '#94a3b8',
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  alertDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#3b82f6',
  },
  actionButtonText: {
    color: '#3b82f6',
    fontWeight: '600',
    fontSize: 14,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#64748b',
  },
});
