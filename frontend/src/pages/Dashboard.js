import React from 'react';
import { motion } from 'framer-motion';
import { useWWTPData } from '../hooks/useWWTPData';
import { useAnomalies } from '../hooks/useAnomalies';
import { FiActivity, FiDroplet, FiWind, FiAlertTriangle } from 'react-icons/fi';

const StatCard = ({ title, value, unit, icon: Icon, trend, colorClass }) => (
    <motion.div
        className="glass-panel"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
    >
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl bg-opacity-20 ${colorClass}`}>
                <Icon size={24} />
            </div>
            {trend && (
                <span className={`text-sm ${trend > 0 ? 'text-[var(--status-danger)]' : 'text-[var(--status-good)]'}`}>
                    {trend > 0 ? '+' : ''}{trend}%
                </span>
            )}
        </div>
        <h3 className="text-[var(--text-muted)] text-sm font-medium mb-1">{title}</h3>
        <div className="text-3xl font-bold">
            {value} <span className="text-lg text-[var(--text-muted)]">{unit}</span>
        </div>
    </motion.div>
);

const Dashboard = () => {
    const { data, loading: dataLoading } = useWWTPData(0, 10);
    const { anomalies, loading: anomaliesLoading } = useAnomalies(5);

    const latestData = data.items.length > 0 ? data.items[0] : null;

    if (dataLoading) {
        return <div className="text-gradient text-xl animate-pulse">Loading Dashboard...</div>;
    }

    return (
        <div className="animate-fade-in flex flex-col gap-4 sm:gap-6 w-full max-w-7xl mx-auto px-1 sm:px-0">
            <header className="mb-2 sm:mb-4">
                <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Plant Overview</h1>
                <p className="text-[var(--text-muted)] text-sm sm:text-base">Real-time performance metrics and AI-driven insights.</p>
            </header>

            {latestData && (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                    gap: '1rem'
                }}>
                    <StatCard
                        title="COD"
                        value={latestData.cod.toFixed(1)} unit="mg/L"
                        icon={FiActivity} trend={-2.4} colorClass="text-[var(--accent-primary)] bg-[var(--accent-primary)]"
                    />
                    <StatCard
                        title="DO"
                        value={latestData.do.toFixed(2)} unit="mg/L"
                        icon={FiWind} trend={1.2} colorClass="text-[#4facfe] bg-[#4facfe]"
                    />
                    <StatCard
                        title="MLSS"
                        value={Math.round(latestData.mlss)} unit="mg/L"
                        icon={FiDroplet} trend={0.5} colorClass="text-[#d8b4e2] bg-[#d8b4e2]"
                    />
                    <StatCard
                        title="Turbidity"
                        value={latestData.turbidity.toFixed(1)} unit="NTU"
                        icon={FiDroplet} trend={5.1} colorClass="text-[var(--status-warning)] bg-[var(--status-warning)]"
                    />
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
                <div className="glass-panel lg:col-span-2">
                    <h2 className="text-xl font-semibold mb-4 text-gradient">System Health</h2>
                    <div style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                        <p className="text-center px-4 italic">Detailed charts are available on the Trends page.</p>
                    </div>
                </div>

                <div className="glass-panel lg:col-span-1">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[var(--status-danger)]">
                        <FiAlertTriangle /> Recent Anomalies
                    </h2>
                    {anomaliesLoading ? (
                        <p className="text-[var(--text-muted)] animate-pulse">Scanning...</p>
                    ) : anomalies.length === 0 ? (
                        <p className="text-[var(--status-good)]">No recent anomalies detected.</p>
                    ) : (
                        <ul className="flex flex-col gap-3">
                            {anomalies.map((anomaly, idx) => (
                                <li key={idx} className="p-3 bg-red-500 bg-opacity-10 border-l-4 border-[var(--status-danger)] rounded-r-lg">
                                    <p className="text-sm font-medium mb-1">
                                        {anomaly.anomaly_rule ? "Threshold Alert" : "Pattern Anomaly"}
                                    </p>
                                    <div className="flex gap-4 text-xs text-[var(--text-muted)]">
                                        <span>DO: {anomaly.do?.toFixed(2)}</span>
                                        <span>pH: {anomaly.ph?.toFixed(2)}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
