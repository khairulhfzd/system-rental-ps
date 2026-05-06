import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { FaPlaystation, FaClock, FaCheckCircle, FaMoneyBillWave, FaUpload, FaSpinner } from 'react-icons/fa';

const UserOrders = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [uploadingId, setUploadingId] = useState(null);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const res = await axios.get('/transaksi/my-transactions');
            setTransactions(res.data);
            setLoading(false);
        } catch (err) {
            setError('Gagal memuat data transaksi');
            setLoading(false);
        }
    };

    const handleFileUpload = async (event, id_transaksi) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('paymentProof', file);

        setUploadingId(id_transaksi);
        try {
            await axios.post(`/transaksi/upload-proof/${id_transaksi}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert('Bukti pembayaran berhasil diunggah! Menunggu verifikasi admin.');
            fetchTransactions();
        } catch (err) {
            alert(err.response?.data?.message || 'Gagal mengunggah bukti');
        } finally {
            setUploadingId(null);
        }
    };

    if (loading) return <div className="text-slate-400">Memuat data pesanan...</div>;
    if (error) return <div className="text-red-500 bg-red-500/10 p-4 rounded-xl">{error}</div>;

    return (
        <div>
            <h2 className="text-3xl font-black text-white mb-2">My <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-fuchsia-500">Orders</span></h2>
            <p className="text-slate-400 mb-8">Pantau pesanan rental PlayStation dan selesaikan pembayaranmu di sini.</p>

            {transactions.length === 0 ? (
                <div className="bg-[#15151e] border border-white/5 rounded-2xl p-10 text-center">
                    <p className="text-slate-400">Kamu belum pernah menyewa PlayStation. Yuk booking sekarang!</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {transactions.map(order => (
                        <div key={order.id_transaksi} className="bg-[#15151e] border border-white/5 rounded-2xl p-6 hover:border-purple-500/30 transition-all shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600/20 to-transparent border border-purple-500/20 flex items-center justify-center text-purple-400 text-2xl">
                                    <FaPlaystation />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1">{order.nama_ps}</h3>
                                    <div className="flex gap-4 text-xs font-semibold text-slate-400">
                                        <div className="flex items-center gap-1"><FaClock className="text-purple-400" /> {order.durasi} Jam</div>
                                        <div className="flex items-center gap-1"><FaMoneyBillWave className="text-emerald-400" /> Rp {order.total_bayar.toLocaleString('id-ID')}</div>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-2">Waktu Mulai: {new Date(order.waktu_mulai).toLocaleString('id-ID')}</p>
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-3 w-full md:w-auto border-t border-white/5 md:border-t-0 pt-4 md:pt-0">
                                <span className={`px-4 py-1.5 rounded-full text-xs font-bold w-full md:w-auto text-center ${order.status_pembayaran === 'Sudah Bayar' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                                        order.status_pembayaran === 'Pending' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                                            'bg-red-500/20 text-red-400 border border-red-500/30'
                                    }`}>
                                    Status: {order.status_pembayaran}
                                </span>

                                {order.status_pembayaran === 'Belum Bayar' && (
                                    <label className="cursor-pointer w-full md:w-auto text-center px-6 py-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:shadow-[0_0_15px_rgba(217,70,239,0.4)] text-white text-sm font-bold rounded-xl transition duration-300">
                                        {uploadingId === order.id_transaksi ? <><FaSpinner className="animate-spin inline mr-2" /> Mengunggah...</> : <><FaUpload className="inline mr-2" /> Unggah Bukti TF</>}
                                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, order.id_transaksi)} disabled={uploadingId === order.id_transaksi} />
                                    </label>
                                )}

                                {order.status_pembayaran === 'Pending' && (
                                    <p className="text-xs text-slate-500 font-medium">Menunggu Verifikasi Admin...</p>
                                )}

                                {order.status_pembayaran === 'Sudah Bayar' && (
                                    <p className="text-xs text-emerald-400 font-medium flex items-center gap-1"><FaCheckCircle /> Pembayaran Selesai</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserOrders;
