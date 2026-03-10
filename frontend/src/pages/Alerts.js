import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertTriangle, FiCheckCircle, FiInfo } from 'react-icons/fi';
import { fetchAnomalies } from '../services/api';

const Alerts = () => {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const loadAlerts = async () => {
            try {
                const data = await fetchAnomalies(50);
                setAlerts(data);
            } catch (error) {
                console.error("Failed to fetch anomalies", error);
            } finally {
                setLoading(false);
            }
        };
        loadAlerts();
    }, []);

    const filteredAlerts = alerts.filter(alert => {
        if (!alert) return false;
        if (filter === 'all') return true;

        const score = alert.anomaly_score || 0;
        const severity = score > 0.8 ? 'high' :
            score > 0.5 ? 'medium' : 'low';
        return severity === filter;
    });

    const getSeverityDetails = (score = 0) => {
        if (score > 0.8) return { color: 'var(--status-danger)', label: 'High Severity', icon: <FiAlertTriangle /> };
        if (score > 0.5) return { color: 'var(--status-warning)', label: 'Medium Severity', icon: <FiAlertTriangle /> };
        return { color: 'var(--status-good)', label: 'Low Severity', icon: <FiInfo /> };
    };

    return (
        <motion.div
            className="alerts-container animate-fade-in px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem sm:gap-2rem' }}
        >
            <div className="header-section flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-gradient text-3xl sm:text-4xl font-bold mb-1 sm:mb-2">System Alerts</h1>
                    <p className="text-sm sm:text-base text-[var(--text-muted)]">Monitor and respond to AI-detected anomalies in real-time.</p>
                </div>

                <div className="glass-panel" style={{ padding: '0.5rem', display: 'flex', gap: '0.5rem', borderRadius: '12px' }}>
                    {['all', 'high', 'medium', 'low'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '8px',
                                border: 'none',
                                background: filter === f ? 'rgba(255,255,255,0.1)' : 'transparent',
                                color: filter === f ? 'var(--text-main)' : 'var(--text-muted)',
                                cursor: 'pointer',
                                textTransform: 'capitalize',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
                    <div className="pulse-dot" style={{ width: '20px', height: '20px' }}></div>
                </div>
            ) : filteredAlerts.length === 0 ? (
                <div className="glass-panel" style={{ textAlign: 'center', padding: '4rem' }}>
                    <FiCheckCircle size={48} color="var(--status-good)" style={{ marginBottom: '1rem' }} />
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>All Systems Nominal</h3>
                    <p style={{ color: 'var(--text-muted)' }}>No anomalies detected matching the current criteria.</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gap: '1rem' }}>
                    <AnimatePresence>
                        {filteredAlerts.map((alert, index) => {
                            const { color, label, icon } = getSeverityDetails(alert.anomaly_score);
                            return (
                                <motion.div
                                    key={alert.id || index}
                                    className="glass-panel flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 border-l-4 p-4 sm:p-6"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    style={{ borderLeftColor: color }}
                                >
                                    <div className="hidden sm:flex" style={{
                                        width: '48px', height: '48px',
                                        borderRadius: '50%',
                                        background: `${color}22`,
                                        alignItems: 'center', justifyContent: 'center',
                                        color: color,
                                        fontSize: '1.5rem',
                                        flexShrink: 0
                                    }}>
                                        {icon}
                                    </div>

                                    <div style={{ flexGrow: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Parameter Anomaly Detected</h3>
                                            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                                {alert.date ? new Date(alert.date).toLocaleDateString() : 'Recent'}
                                            </span>
                                        </div>
                                        <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.95rem', lineHeight: '1.5' }}>
                                            AI Engine flagged an anomaly score of <strong>{(alert.anomaly_score || 0).toFixed(3)}</strong>.
                                            Parameters such as COD ({alert.cod?.toFixed(1) || 'N/A'}) or BOD ({alert.bod?.toFixed(1) || 'N/A'}) may be out of optimal ranges.
                                        </p>
                                    </div>

                                    <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                                        <button className="flex-1 sm:flex-none bg-[var(--accent-primary)] bg-opacity-10 border border-[var(--accent-primary)] text-[var(--accent-primary)] p-2 sm:px-4 sm:py-2 rounded-lg text-sm font-medium">
                                            Investigate
                                        </button>
                                        <button className="flex-1 sm:flex-none bg-transparent border border-transparent text-[var(--text-muted)] p-2 sm:px-4 sm:py-2 rounded-lg text-sm hover:text-[var(--text-main)] transition-colors">
                                            Dismiss
                                        </button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            )}
        </motion.div>
    );
};

export default Alerts;
