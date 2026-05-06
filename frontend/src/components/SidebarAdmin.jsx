import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaGamepad, FaUsers, FaTasks, FaChartBar, FaFileContract, FaUserCircle } from 'react-icons/fa';

const SidebarAdmin = () => {
    const location = useLocation();

    const links = [
        { name: 'Command Center', path: '/admin', icon: <FaTachometerAlt /> },
        { name: 'Hardware', path: '/admin/playstation', icon: <FaGamepad /> },
        { name: 'Users DB', path: '/admin/users', icon: <FaUserCircle /> },
        { name: 'Clients (CRM)', path: '/admin/pelanggan', icon: <FaUsers /> },
        { name: 'Operations', path: '/admin/transaksi', icon: <FaTasks /> },
        { name: 'Analytics', path: '/admin/laporan', icon: <FaChartBar /> },
        { name: 'Contracts Vault', path: '/admin/kontrak', icon: <FaFileContract /> },
    ];

    return (
        <div className="flex flex-col w-72 bg-dark-bg border-r border-dark-border shadow-2xl z-20">
            <div className="flex items-center justify-center h-20 border-b border-dark-border bg-dark-panel">
                <Link to="/" className="text-2xl font-black tracking-widest text-white hover:text-primary transition flex items-center gap-2">
                    <FaGamepad className="text-primary" /> <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">NEXUS</span>
                </Link>
            </div>
            <div className="overflow-y-auto overflow-x-hidden flex-grow py-6">
                <ul className="flex flex-col space-y-2 px-4">
                    {links.map((link) => {
                        const isActive = location.pathname === link.path;
                        return (
                            <li key={link.name}>
                                <Link
                                    to={link.path}
                                    className={`flex items-center px-4 py-3 rounded-xl transition duration-300 group ${isActive
                                            ? 'bg-primary/20 text-primary border border-primary/50 shadow-[0_0_15px_rgba(139,92,246,0.2)]'
                                            : 'text-slate-400 hover:text-white hover:bg-dark-panel'
                                        }`}
                                >
                                    <span className={`mr-4 text-lg ${isActive ? 'text-primary' : 'text-slate-500 group-hover:text-primary'}`}>
                                        {link.icon}
                                    </span>
                                    <span className="font-semibold tracking-wide text-sm">{link.name}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
            {/* Version foot */}
            <div className="p-4 border-t border-dark-border text-center text-xs text-slate-600 font-mono">
                System v2.4.0
            </div>
        </div>
    );
};

export default SidebarAdmin;
