import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaGamepad, FaHistory, FaSignOutAlt } from 'react-icons/fa';

const SidebarUser = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('username');
        navigate('/login');
    };

    return (
        <div className="w-64 bg-[#0a0a0e] text-white flex flex-col border-r border-[#1a1a24] shadow-[5px_0_15px_rgba(0,0,0,0.5)] z-20">
            <div className="p-6 pb-2 border-b border-[#1a1a24]">
                <h1 className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500 flex items-center gap-2">
                    <FaGamepad className="text-purple-500 text-2xl drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
                    NEXUS
                </h1>
                <p className="text-slate-500 text-[10px] uppercase tracking-widest mt-1 ml-9 font-semibold">User Terminal</p>
            </div>

            <nav className="flex-1 px-4 py-8 space-y-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 ml-4 block border-b border-slate-800 pb-2">Menu</span>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 font-semibold text-sm ${isActive
                            ? 'bg-purple-900/40 text-purple-300 border border-purple-500/30 shadow-[inset_0_0_15px_rgba(139,92,246,0.2)]'
                            : 'text-slate-400 hover:bg-[#15151e] hover:text-white'
                        }`
                    }
                >
                    <FaHome className="text-lg" /> Dashboard Utama
                </NavLink>

                <NavLink
                    to="/products"
                    className={({ isActive }) =>
                        `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 font-semibold text-sm ${isActive
                            ? 'bg-purple-900/40 text-purple-300 border border-purple-500/30 shadow-[inset_0_0_15px_rgba(139,92,246,0.2)]'
                            : 'text-slate-400 hover:bg-[#15151e] hover:text-white'
                        }`
                    }
                >
                    <FaGamepad className="text-lg" /> Booking PS
                </NavLink>

                <NavLink
                    to="/user/orders"
                    className={({ isActive }) =>
                        `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 font-semibold text-sm ${isActive
                            ? 'bg-purple-900/40 text-purple-300 border border-purple-500/30 shadow-[inset_0_0_15px_rgba(139,92,246,0.2)]'
                            : 'text-slate-400 hover:bg-[#15151e] hover:text-white'
                        }`
                    }
                >
                    <FaHistory className="text-lg" /> My Orders
                </NavLink>
            </nav>

            <div className="p-6 border-t border-[#1a1a24]">
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-3 text-red-400 rounded-xl hover:bg-red-500/10 hover:text-red-300 transition-all font-semibold text-sm"
                >
                    <FaSignOutAlt className="text-lg" /> Disconnect
                </button>
            </div>
        </div>
    );
};

export default SidebarUser;
