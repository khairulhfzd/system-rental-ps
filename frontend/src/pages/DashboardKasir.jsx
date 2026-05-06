import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

const DashboardKasir = () => {
    const [psList, setPsList] = useState([]);
    const [pelanggan, setPelanggan] = useState([]);

    const [selectedPs, setSelectedPs] = useState('');
    const [selectedPelanggan, setSelectedPelanggan] = useState('');

    const [newPelanggan, setNewPelanggan] = useState({ nama: '', no_hp: '' });
    const [isNewPelanggan, setIsNewPelanggan] = useState(false);

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const psRes = await axios.get('/ps');
            setPsList(psRes.data.filter(ps => ps.status === 'Available'));

            const pelRes = await axios.get('/pelanggan');
            setPelanggan(pelRes.data);
        } catch (err) {
            console.error('Failed to fetch data', err);
        }
    };

    const handleStartRental = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            let pelangganId = selectedPelanggan;

            // Create new customer if selected
            if (isNewPelanggan) {
                if (!newPelanggan.nama || !newPelanggan.no_hp) {
                    setError('Please fill out all new customer fields');
                    return;
                }
                const createPelRes = await axios.post('/pelanggan', newPelanggan);
                pelangganId = createPelRes.data.id_pelanggan;
            }

            if (!selectedPs || !pelangganId) {
                setError('Please select PlayStation and Customer');
                return;
            }

            await axios.post('/transaksi/start', { id_ps: selectedPs, id_pelanggan: pelangganId });
            setMessage('Rental started successfully!');

            // Reset form
            setSelectedPs('');
            setSelectedPelanggan('');
            setIsNewPelanggan(false);
            setNewPelanggan({ nama: '', no_hp: '' });
            fetchData(); // Refresh available PS lists

        } catch (err) {
            setError(err.response?.data?.message || 'Failed to start rental');
        }
    };

    return (
        <div className="text-slate-200">
            <h1 className="text-3xl font-bold text-white mb-8 tracking-wide">POS Terminal</h1>

            <div className="bg-dark-panel p-10 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)] max-w-2xl mx-auto border border-dark-border relative overflow-hidden">
                {/* Decorative corner glow */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent filter blur-[80px] opacity-20 rounded-full"></div>

                <h2 className="text-2xl font-bold text-white mb-8 text-center tracking-wide">Initialize New Session</h2>

                {message && <div className="bg-green-500/20 border border-green-500/50 text-green-400 p-3 rounded-lg mb-6 text-center text-sm">{message}</div>}
                {error && <div className="bg-red-500/20 border border-red-500/50 text-red-400 p-3 rounded-lg mb-6 text-center text-sm">{error}</div>}

                <form onSubmit={handleStartRental} className="relative z-10">
                    <div className="mb-6">
                        <label className="block text-slate-300 font-medium mb-2 text-sm">Select Hardware Unit</label>
                        <select
                            className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition appearance-none"
                            value={selectedPs}
                            onChange={(e) => setSelectedPs(e.target.value)}
                            required
                        >
                            <option value="" className="text-slate-500">-- Target Available Unit --</option>
                            {psList.map(ps => (
                                <option key={ps.id_ps} value={ps.id_ps} className="bg-dark-bg text-white">
                                    {ps.nama_ps} ({ps.tipe_ps}) - Rp {Number(ps.harga_per_jam).toLocaleString()}/hr
                                </option>
                            ))}
                        </select>
                        {psList.length === 0 && <p className="text-red-400 text-xs mt-2 font-mono">WARNING: No units online.</p>}
                    </div>

                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-3">
                            <label className="block text-slate-300 font-medium text-sm">Client Identifier</label>
                            <label className="flex items-center text-xs text-accent cursor-pointer hover:text-accent-hover transition">
                                <input
                                    type="checkbox"
                                    className="mr-2 accent-accent cursor-pointer"
                                    checked={isNewPelanggan}
                                    onChange={() => setIsNewPelanggan(!isNewPelanggan)}
                                />
                                Register New Client?
                            </label>
                        </div>

                        {!isNewPelanggan ? (
                            <select
                                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition appearance-none"
                                value={selectedPelanggan}
                                onChange={(e) => setSelectedPelanggan(e.target.value)}
                                required={!isNewPelanggan}
                            >
                                <option value="" className="text-slate-500">-- Choose Existing Profile --</option>
                                {pelanggan.map(p => (
                                    <option key={p.id_pelanggan} value={p.id_pelanggan} className="bg-dark-bg text-white">
                                        {p.nama} ({p.no_hp})
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <div className="space-y-4 bg-dark-bg p-5 rounded-xl border border-dark-border shadow-inner">
                                <div>
                                    <label className="block text-slate-400 text-xs font-mono mb-1 uppercase tracking-wider">Legal Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 bg-dark-panel border border-dark-border rounded focus:ring-2 focus:ring-accent text-white"
                                        value={newPelanggan.nama}
                                        onChange={(e) => setNewPelanggan({ ...newPelanggan, nama: e.target.value })}
                                        required={isNewPelanggan}
                                    />
                                </div>
                                <div>
                                    <label className="block text-slate-400 text-xs font-mono mb-1 uppercase tracking-wider">Comms Link (Phone)</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 bg-dark-panel border border-dark-border rounded focus:ring-2 focus:ring-accent text-white"
                                        value={newPelanggan.no_hp}
                                        onChange={(e) => setNewPelanggan({ ...newPelanggan, no_hp: e.target.value })}
                                        required={isNewPelanggan}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-accent to-primary text-white font-bold py-4 rounded-xl hover:shadow-[0_0_25px_rgba(217,70,239,0.5)] transition duration-300 transform hover:-translate-y-1 text-lg tracking-widest uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={psList.length === 0}
                    >
                        EXECUTE RENTAL
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DashboardKasir;
