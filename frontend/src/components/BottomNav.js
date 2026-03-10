import React from 'react';
import { NavLink } from 'react-router-dom';
import { RiDashboardLine, RiBarChartLine, RiNotification3Line, RiSettings4Line } from 'react-icons/ri';
import './BottomNav.css';

const BottomNav = () => {
    return (
        <nav className="bottom-nav">
            <NavLink to="/dashboard" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
                <RiDashboardLine className="nav-icon" />
                <span>Dash</span>
            </NavLink>
            <NavLink to="/trends" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
                <RiBarChartLine className="nav-icon" />
                <span>Trends</span>
            </NavLink>
            <NavLink to="/alerts" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
                <RiNotification3Line className="nav-icon" />
                <span>Alerts</span>
            </NavLink>
            <NavLink to="/settings" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
                <RiSettings4Line className="nav-icon" />
                <span>Admin</span>
            </NavLink>
        </nav>
    );
};

export default BottomNav;
