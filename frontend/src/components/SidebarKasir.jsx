import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaTasks, FaFileContract, FaGamepad } from 'react-icons/fa';

const SidebarKasir = () => {
    const location = useLocation();

    const links = [
        { name: 'POS Terminal', path: '/kasir', icon: <FaTachometerAlt /> },
        { name: 'Active Ops', path: '/kasir/transaksi', icon: <FaTasks /> },
        { name: 'Client Grid', path: '/kasir/pelanggan', icon: <FaUsers /> },
        { name: 'Docs Vault', path: '/kasir/kontrak', icon: <FaFileContract /> },
    ];

    return (
        <div className="flex flex-col w-72 bg-dark-bg border-r border-dark-border shadow-2xl z-20">
            <div className="flex items-center justify-center h-20 border-b border-dark-border bg-dark-panel">
                <Link to="/" className="text-2xl font-black tracking-widest text-white hover:text-accent transition flex items-center gap-2">
                    <FaGamepad className="text-accent drop-shadow-[0_0_10px_rgba(217,70,239,0.8)]" /> <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-primary">NEXUS</span>
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
                                            ? 'bg-accent/20 text-accent border border-accent/50 shadow-[0_0_15px_rgba(217,70,239,0.2)]'
                                            : 'text-slate-400 hover:text-white hover:bg-dark-panel'
                                        }`}
                                >
                                    <span className={`mr-4 text-lg ${isActive ? 'text-accent' : 'text-slate-500 group-hover:text-accent transition'}`}>
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
                Terminal v1.1.0
            </div>
        </div>
    );
};

export default SidebarKasir;
