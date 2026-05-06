import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUserCircle, FaGamepad } from 'react-icons/fa';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        navigate('/login');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <header className="bg-dark-panel border-b border-dark-border shadow-md z-10 relative text-slate-200">
            <div className="flex items-center justify-between px-8 py-5">
                <div className="flex items-center gap-3">
                    <FaGamepad className="text-primary text-xl" />
                    <Link to="/" className="text-xl font-bold tracking-wider uppercase text-white drop-shadow-md hover:text-primary transition">
                        Console{' '}
                        <span className="text-primary">
                            {role === 'admin' ? 'Overlord' : 'Terminal'}
                        </span>
                    </Link>
                </div>

                {token ? (
                    <div className="flex items-center space-x-6">
                        <div className="hidden md:flex items-center space-x-3 text-xs font-semibold text-slate-300">
                            {role === 'admin' && (
                                <>
                                    <Link to="/admin" className="hover:text-white transition">Dashboard</Link>
                                    <Link to="/admin/transaksi" className="hover:text-white transition">Transaksi</Link>
                                </>
                            )}
                            {role === 'user' && (
                                <>
                                    <Link to="/products" className="hover:text-white transition">Products</Link>
                                    <Link to="/user/orders" className="hover:text-white transition">My Orders</Link>
                                </>
                            )}
                        </div>
                        <div className="flex items-center text-slate-300">
                            <FaUserCircle className="text-2xl text-primary mr-3 shadow-[0_0_10px_rgba(139,92,246,0.5)] rounded-full" />
                            <span className="font-semibold tracking-wide">{username}</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="px-5 py-2 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/10 hover:text-red-300 transition duration-300 font-medium text-sm"
                        >
                            Disconnect
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center space-x-4">
                        <Link
                            to="/products"
                            className="px-4 py-2 text-sm font-medium text-slate-200 rounded-lg hover:bg-white/5 border border-white/10 transition"
                        >
                            Browse PS
                        </Link>
                        <button
                            onClick={handleLogin}
                            className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition duration-300 font-medium text-sm"
                        >
                            Login
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Navbar;
