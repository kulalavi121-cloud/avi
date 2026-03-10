import React from 'react';
import { motion } from 'framer-motion';
import { useWWTPData } from '../hooks/useWWTPData';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="glass-panel" style={{ padding: '10px 15px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <p className="text-[var(--text-muted)] text-sm mb-2">{label}</p>
                {payload.map((entry, index) => (
                    <p key={index} style={{ color: entry.color, fontWeight: 'bold' }}>
                        {entry.name}: {entry.value}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const Trends = () => {
    const { data, loading } = useWWTPData(0, 30); // get last 30 readings

    if (loading) {
        return <div className="text-gradient text-xl animate-pulse">Loading Analytics...</div>;
    }

    // Reverse data to show oldest to newest on X axis
    const chartData = [...data.items].reverse().map(item => ({
        ...item,
        formattedDate: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }));

    return (
        <motion.div
            className="animate-fade-in flex flex-col gap-4 sm:gap-6 w-full max-w-7xl mx-auto px-1 sm:px-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <header className="mb-2 sm:mb-4">
                <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Trends & Analytics</h1>
                <p className="text-[var(--text-muted)] text-sm sm:text-base">Historical performance and AI-smoothed models.</p>
            </header>

            <div className="glass-panel" style={{ height: '300px' }}>
                <h3 className="text-lg font-semibold mb-4 sm:mb-6">COD Stream</h3>
                <ResponsiveContainer width="100%" height="80%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorCod" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis
                            dataKey="formattedDate"
                            stroke="var(--text-muted)"
                            tick={{ fill: 'var(--text-muted)', fontSize: 10 }}
                            axisLine={false}
                            tickLine={false}
                            minTickGap={30}
                        />
                        <YAxis stroke="var(--text-muted)" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
                        <Tooltip content={<CustomTooltip />} />
                        <Area type="monotone" dataKey="cod" stroke="var(--accent-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorCod)" name="COD" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="glass-panel" style={{ height: '280px' }}>
                    <h3 className="text-lg font-semibold mb-4 text-[#d8b4e2]">MLSS Level</h3>
                    <ResponsiveContainer width="100%" height="80%">
                        <AreaChart data={chartData} margin={{ left: -20 }}>
                            <defs>
                                <linearGradient id="colorMlss" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#d8b4e2" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="#d8b4e2" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Area type="monotone" dataKey="mlss" stroke="#d8b4e2" strokeWidth={3} fillOpacity={1} fill="url(#colorMlss)" name="MLSS" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="glass-panel" style={{ height: '280px' }}>
                    <h3 className="text-lg font-semibold mb-4 text-[#4facfe]">DO Level</h3>
                    <ResponsiveContainer width="100%" height="80%">
                        <AreaChart data={chartData} margin={{ left: -20 }}>
                            <defs>
                                <linearGradient id="colorDo" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#4facfe" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="#4facfe" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Area type="monotone" dataKey="do" stroke="#4facfe" strokeWidth={3} fillOpacity={1} fill="url(#colorDo)" name="DO" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </motion.div>
    );
};

export default Trends;
