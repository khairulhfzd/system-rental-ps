import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../api/axios';
import { FaGamepad } from 'react-icons/fa';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/auth/login', { username, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('role', res.data.role);
            localStorage.setItem('username', res.data.username);

            if (res.data.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/user/orders');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-dark-bg relative overflow-hidden font-sans">
            {/* Luxurious Background Parallax Elements */}
            <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop")', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'contrast(1.2) saturate(1.5) blur(4px)' }}></div>
            <div className="absolute inset-0 bg-dark-bg/80 z-0"></div>
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary rounded-full mix-blend-screen filter blur-[150px] opacity-30 animate-pulse z-0"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-accent rounded-full mix-blend-screen filter blur-[120px] opacity-20 z-0"></div>

            <div className="bg-dark-panel/60 backdrop-blur-2xl border border-white/10 p-12 rounded-3xl w-full max-w-lg relative z-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7),inset_0_0_20px_rgba(255,255,255,0.02)] transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(139,92,246,0.2),inset_0_0_20px_rgba(255,255,255,0.05)]">

                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>

                <div className="flex justify-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent border border-primary/30 flex items-center justify-center shadow-[inset_0_0_20px_rgba(139,92,246,0.3)]">
                        <Link to="/" className="text-3xl text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
                            <FaGamepad />
                        </Link>
                    </div>
                </div>

                <h2 className="text-4xl font-black text-center text-white mb-2 tracking-tight">
                    Nexus <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Portal</span>
                </h2>
                <p className="text-slate-400 text-center mb-10 text-sm font-mono tracking-widest uppercase">System Initialization</p>

                {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl mb-8 text-center text-sm font-semibold shadow-[0_0_15px_rgba(239,68,68,0.2)]">{error}</div>}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-slate-300 font-bold mb-2 text-sm uppercase tracking-wider">Operator ID</label>
                        <div className="relative group">
                            <input
                                type="text"
                                className="w-full px-5 py-4 bg-[#0a0a0e] border border-white/10 rounded-xl text-white font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-300 placeholder-slate-500 shadow-inner hover:border-white/20"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                required
                            />
                            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-500">
                                <span className="font-mono text-xs opacity-50">#ID</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-slate-300 font-bold text-sm uppercase tracking-wider">Access Node</label>
                            <a href="#" className="text-xs text-purple-400 hover:text-fuchsia-400 transition">Forgot Key?</a>
                        </div>
                        <div className="relative group">
                            <input
                                type="password"
                                className="w-full px-5 py-4 bg-[#0a0a0e] border border-white/10 rounded-xl text-white font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-300 placeholder-slate-500 shadow-inner hover:border-white/20 tracking-widest"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-500">
                                <span className="font-mono text-xs opacity-50">***</span>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-4 bg-gradient-to-r from-primary to-accent relative overflow-hidden group text-white font-black py-4 px-6 rounded-xl hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] transition duration-500 transform hover:-translate-y-1 tracking-widest uppercase"
                    >
                        <div className="absolute inset-0 w-0 bg-white/20 transition-all duration-500 ease-out group-hover:w-full"></div>
                        <span className="relative z-10 flex items-center justify-center gap-2">Initialize Session</span>
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-white/5 text-center">
                    <Link to="/" className="text-slate-500 hover:text-white text-sm font-semibold transition flex items-center justify-center gap-2 group">
                        <span className="group-hover:-translate-x-1 transition">←</span> Abort Initialization
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
