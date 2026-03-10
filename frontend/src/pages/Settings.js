import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiBell, FiShield, FiDatabase, FiCpu } from 'react-icons/fi';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [notifications, setNotifications] = useState(true);
    const [autoOptimize, setAutoOptimize] = useState(false);
    const [aiEngine, setAiEngine] = useState('advanced');

    const tabs = [
        { id: 'profile', label: 'User Profile', icon: <FiUser /> },
        { id: 'notifications', label: 'Notifications', icon: <FiBell /> },
        { id: 'security', label: 'Security', icon: <FiShield /> },
        { id: 'system', label: 'System Preferences', icon: <FiCpu /> },
        { id: 'data', label: 'Data Management', icon: <FiDatabase /> },
    ];

    const ToggleSwitch = ({ checked, onChange }) => (
        <div
            onClick={() => onChange(!checked)}
            style={{
                width: '46px',
                height: '24px',
                background: checked ? 'var(--accent-primary)' : 'rgba(255,255,255,0.2)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                padding: '2px',
                cursor: 'pointer',
                transition: 'background 0.3s ease'
            }}
        >
            <motion.div
                layout
                style={{
                    width: '20px',
                    height: '20px',
                    background: '#fff',
                    borderRadius: '50%',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
                animate={{ x: checked ? 22 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
        </div>
    );

    return (
        <motion.div
            className="settings-container animate-fade-in px-4 sm:px-0"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem sm:gap-2rem' }}
        >
            <div className="header-section mb-2 sm:mb-4">
                <h1 className="text-gradient text-3xl sm:text-4xl font-bold mb-2">Settings</h1>
                <p className="text-sm sm:text-base" style={{ color: 'var(--text-muted)' }}>Configure your AquaFlow AI OS experience and system parameters.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch lg:items-flex-start">
                <div className="glass-panel overflow-x-auto lg:overflow-visible" style={{ minWidth: '100%', lg: { minWidth: '280px' }, padding: '0.75rem', display: 'flex', flexDirection: 'row', lg: { flexDirection: 'column' }, gap: '0.5rem' }}>
                    <div className="flex lg:flex-col gap-2 w-full">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-3 p-3 sm:p-4 rounded-xl transition-all relative border flex-shrink-0 lg:flex-shrink ${activeTab === tab.id ? 'bg-[var(--accent-primary)] bg-opacity-10 border-[var(--accent-primary)]' : 'bg-transparent border-transparent'
                                    }`}
                                style={{
                                    color: activeTab === tab.id ? 'var(--accent-primary)' : 'var(--text-muted)',
                                    textAlign: 'left',
                                    fontSize: '0.9rem sm:1rem'
                                }}
                            >
                                <span className="text-lg sm:text-xl">{tab.icon}</span>
                                <span className="whitespace-nowrap">{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="glass-panel flex-grow p-5 sm:p-10 min-h-[400px]">
                    <AnimatePresence mode="wait">
                        {activeTab === 'system' && (
                            <motion.div
                                key="system"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <h2 style={{ marginBottom: '2rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '1rem' }}>
                                    System Preferences
                                </h2>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Enable Notifications</h3>
                                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>Receive alerts for high severity anomalies</p>
                                        </div>
                                        <ToggleSwitch checked={notifications} onChange={setNotifications} />
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Autonomous Optimization</h3>
                                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>Allow AI to automatically adjust process parameters</p>
                                        </div>
                                        <ToggleSwitch checked={autoOptimize} onChange={setAutoOptimize} />
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <h3 style={{ fontSize: '1.1rem', margin: 0 }}>AI Inference Engine Level</h3>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>Select the complexity of the predictive model used</p>

                                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                            {['basic', 'advanced', 'experimental'].map(level => (
                                                <button
                                                    key={level}
                                                    onClick={() => setAiEngine(level)}
                                                    style={{
                                                        padding: '0.75rem 1.5rem',
                                                        borderRadius: '8px',
                                                        background: aiEngine === level ? 'rgba(0, 242, 254, 0.15)' : 'rgba(255,255,255,0.05)',
                                                        border: `1px solid ${aiEngine === level ? 'var(--accent-primary)' : 'rgba(255,255,255,0.1)'}`,
                                                        color: aiEngine === level ? 'var(--accent-primary)' : 'var(--text-muted)',
                                                        cursor: 'pointer',
                                                        textTransform: 'capitalize',
                                                        flex: 1,
                                                        transition: 'all 0.2s'
                                                    }}
                                                >
                                                    {level}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                                        <button style={{
                                            background: 'var(--accent-gradient)',
                                            color: '#000',
                                            fontWeight: '600',
                                            border: 'none',
                                            padding: '0.75rem 2rem',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            boxShadow: '0 4px 15px rgba(0, 242, 254, 0.3)',
                                            transition: 'transform 0.2s'
                                        }}
                                            onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                                            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                                        >
                                            Save Preferences
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'profile' && (
                            <motion.div
                                key="profile"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                            >
                                <h2 style={{ marginBottom: '2rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '1rem' }}>
                                    User Profile
                                </h2>
                                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginBottom: '3rem' }}>
                                    <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: '700', color: '#000' }}>
                                        JD
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>John Doe</h3>
                                        <p style={{ color: 'var(--text-muted)', margin: 0 }}>System Administrator • AquaFlow WWTP</p>
                                    </div>
                                    <button style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', padding: '0.5rem 1rem', borderRadius: '8px', color: 'var(--text-main)', cursor: 'pointer' }}>Edit Photo</button>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <label style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Full Name</label>
                                        <input type="text" defaultValue="John Doe" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', padding: '0.75rem', borderRadius: '8px', color: 'var(--text-main)' }} />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <label style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Email Address</label>
                                        <input type="email" defaultValue="j.doe@aquaflow.ai" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', padding: '0.75rem', borderRadius: '8px', color: 'var(--text-main)' }} />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'notifications' && (
                            <motion.div
                                key="notifications"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                            >
                                <h2 style={{ marginBottom: '2rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '1rem' }}>
                                    Notification Settings
                                </h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                    {[
                                        { title: 'System Health Alerts', desc: 'Critical hardware and software status updates' },
                                        { title: 'Real-time Anomalies', desc: 'Instant notifications when parameter drift is detected' },
                                        { title: 'Weekly Performance Reports', desc: 'Summary of plant efficiency and energy savings' },
                                        { title: 'Security Logins', desc: 'Alerts for any new device access' }
                                    ].map((item, idx) => (
                                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div>
                                                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{item.title}</h3>
                                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>{item.desc}</p>
                                            </div>
                                            <ToggleSwitch checked={idx < 3} onChange={() => { }} />
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'security' && (
                            <motion.div
                                key="security"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                            >
                                <h2 style={{ marginBottom: '2rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '1rem' }}>
                                    Security & Access
                                </h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                    <div className="glass-panel" style={{ background: 'rgba(219, 39, 119, 0.05)', borderColor: 'rgba(219, 39, 119, 0.2)' }}>
                                        <h3 style={{ color: '#db2777', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Two-Factor Authentication</h3>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Add an extra layer of security to your account by requiring more than just a password to log in.</p>
                                        <button style={{ background: '#db2777', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Enable 2FA</button>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <h3 style={{ fontSize: '1.1rem' }}>Active Sessions</h3>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
                                            <div>
                                                <div style={{ fontWeight: '600' }}>Windows 11 • Chrome Dashboard</div>
                                                <div style={{ fontSize: '0.85rem', color: 'var(--status-good)' }}>Current Session • Delhi, India</div>
                                            </div>
                                            <FiShield color="var(--status-good)" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'data' && (
                            <motion.div
                                key="data"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                            >
                                <h2 style={{ marginBottom: '2rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '1rem' }}>
                                    Data Management
                                </h2>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                    <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <FiDatabase size={24} color="var(--accent-primary)" />
                                        <h3 style={{ margin: 0 }}>Database Export</h3>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Download a complete snapshot of plant telemetrics in CSV or JSON format.</p>
                                        <button style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', padding: '0.5rem', borderRadius: '8px', color: 'var(--text-main)', cursor: 'pointer', marginTop: 'auto' }}>Export Data</button>
                                    </div>
                                    <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <FiCpu size={24} color="var(--accent-secondary)" />
                                        <h3 style={{ margin: 0 }}>Auto-Purge</h3>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Automatically archive sensor data older than 12 months to optimize performance.</p>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                                            <span style={{ fontSize: '0.85rem' }}>Enable Purging</span>
                                            <ToggleSwitch checked={true} onChange={() => { }} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
};

export default Settings;
