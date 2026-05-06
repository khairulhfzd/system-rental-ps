import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Product = () => {
    const [playstations, setPlaystations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    // Booking Form State
    const [selectedPS, setSelectedPS] = useState(null);
    const [namaPemesan, setNamaPemesan] = useState('');
    const [noHp, setNoHp] = useState('');
    const [durasi, setDurasi] = useState(1);

    useEffect(() => {
        fetchPlaystations();
    }, []);

    const fetchPlaystations = async () => {
        try {
            // /api/ps GET is public on backend
            const res = await axios.get('/ps');
            setPlaystations(res.data);
            setLoading(false);
        } catch (err) {
            setError('Gagal memuat data PlayStation. Coba lagi nanti.');
            setLoading(false);
        }
    };

    const handleBook = async (e) => {
        e.preventDefault();
        if (!token) {
            alert('Silakan login terlebih dahulu untuk melakukan booking.');
            navigate('/login');
            return;
        }
        try {
            const res = await axios.post('/transaksi/start', {
                id_ps: selectedPS.id_ps,
                nama_pemesan: namaPemesan,
                no_hp: noHp,
                durasi: parseInt(durasi)
            });
            alert('Booking Successful! Please proceed to payment in your Dashboard.');
            navigate('/user/orders');
        } catch (err) {
            alert(err.response?.data?.message || 'Error booking PlayStation');
        }
    };

    if (loading) return <div className="text-white text-center p-10">Loading...</div>;

    return (
        <div className="min-h-screen bg-[#0a0a0e] text-white p-8">
            <h1 className="text-4xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-fuchsia-500">Katalog PlayStation</h1>
            <p className="text-slate-400 mb-10">Pilih console favoritmu dan mulai bermain!</p>

            {error && <p className="text-red-500 bg-red-500/10 p-4 rounded-xl mb-6">{error}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {playstations.map((ps) => (
                    <div key={ps.id_ps} className="bg-[#15151e] rounded-2xl p-6 border border-white/5 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] transition-all duration-300">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold">{ps.nama_ps}</h3>
                            <span className={`px-3 py-1 text-xs font-bold rounded-full ${ps.status === 'Available' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                                    ps.status === 'Playing' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                                        'bg-red-500/20 text-red-400 border border-red-500/30'
                                }`}>
                                {ps.status}
                            </span>
                        </div>
                        <p className="text-slate-400 text-sm mb-4">Tipe: <span className="text-white font-medium">{ps.tipe_ps}</span></p>
                        <div className="text-2xl font-black text-purple-400 mb-6">
                            Rp {ps.harga_per_jam.toLocaleString('id-ID')} <span className="text-sm text-slate-500 font-normal">/ jam</span>
                        </div>

                        <button
                            onClick={() => {
                                if (!token) {
                                    alert('Silakan login terlebih dahulu untuk melakukan booking.');
                                    navigate('/login');
                                    return;
                                }
                                setSelectedPS(ps);
                            }}
                            disabled={ps.status !== 'Available'}
                            className={`w-full py-3 rounded-xl font-bold transition-all ${ps.status === 'Available'
                                    ? 'bg-purple-600 hover:bg-purple-500 text-white hover:shadow-[0_0_15px_rgba(139,92,246,0.5)]'
                                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                }`}
                        >
                            {ps.status === 'Available' ? 'Sewa Sekarang' : 'Tidak Tersedia'}
                        </button>
                    </div>
                ))}
            </div>

            {/* Booking Modal */}
            {selectedPS && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-[#15151e] border border-white/10 rounded-2xl p-8 w-full max-w-md shadow-2xl">
                        <h2 className="text-2xl font-bold mb-4">Sewa {selectedPS.nama_ps}</h2>
                        <form onSubmit={handleBook} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Nama Pemesan</label>
                                <input type="text" required value={namaPemesan} onChange={e => setNamaPemesan(e.target.value)}
                                    className="w-full bg-[#0a0a0e] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                                    placeholder="Masukkan nama" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">No HP</label>
                                <input type="text" required value={noHp} onChange={e => setNoHp(e.target.value)}
                                    className="w-full bg-[#0a0a0e] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                                    placeholder="08123456789" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Durasi (Jam)</label>
                                <input type="number" min="1" max="24" required value={durasi} onChange={e => setDurasi(e.target.value)}
                                    className="w-full bg-[#0a0a0e] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition" />
                            </div>
                            <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                                <div>
                                    <p className="text-sm text-slate-400">Total Bayar</p>
                                    <p className="text-2xl font-bold text-fuchsia-400">Rp {(selectedPS.harga_per_jam * durasi).toLocaleString('id-ID')}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button type="button" onClick={() => setSelectedPS(null)} className="px-5 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition">Batal</button>
                                    <button type="submit" className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-bold hover:shadow-[0_0_20px_rgba(217,70,239,0.4)] transition">Pesan</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Product;
