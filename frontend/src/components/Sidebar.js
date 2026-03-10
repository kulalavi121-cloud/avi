import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiTrendingUp, FiAlertCircle, FiSettings } from 'react-icons/fi';
import './Sidebar.css';

const Sidebar = () => {
    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: <FiHome size={22} /> },
        { name: 'Trends & Analytics', path: '/trends', icon: <FiTrendingUp size={22} /> },
        { name: 'Alerts', path: '/alerts', icon: <FiAlertCircle size={22} /> },
        { name: 'Settings', path: '/settings', icon: <FiSettings size={22} /> },
    ];

    return (
        <motion.aside
            className="sidebar glass-panel"
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <div className="sidebar-header">
                <div className="logo-container">
                    <div className="logo-icon glass-panel" />
                    <h2 className="text-gradient">AquaFlow<br /><span style={{ fontSize: '0.65em', color: 'var(--text-muted)' }}>WWTP AI OS</span></h2>
                </div>
            </div>

            <nav className="sidebar-nav">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    >
                        <span className="nav-icon">{item.icon}</span>
                        <span className="nav-label">{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="sidebar-footer">
                <div className="status-indicator">
                    <div className="pulse-dot"></div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>System Active</span>
                </div>
            </div>
        </motion.aside>
    );
};

export default Sidebar;
