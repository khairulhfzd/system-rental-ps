import React, { useState, useEffect, useMemo } from 'react';
import axios from '../api/axios';
import { FaStopCircle, FaCheckCircle, FaClock, FaImage } from 'react-icons/fa';

const Transaksi = () => {
    const [transaksiList, setTransaksiList] = useState([]);
    const [loadingActionId, setLoadingActionId] = useState(null);

    useEffect(() => {
        fetchTransaksi();
    }, []);

    const fetchTransaksi = async () => {
        try {
            const res = await axios.get('/transaksi');
            setTransaksiList(res.data);
        } catch (err) {
            console.error('Error fetching transactions', err);
        }
    };

    const activeRentals = useMemo(
        () => transaksiList.filter(t => !t.waktu_selesai && t.status_pembayaran === 'Sudah Bayar'),
        [transaksiList]
    );

    const handleEndRental = async (id) => {
        if (!window.confirm('Akhiri sesi rental ini?')) return;
        try {
            setLoadingActionId(id);
            await axios.post(`/transaksi/end/${id}`);
            await fetchTransaksi();
            alert('Rental berhasil diakhiri. Unit dikembalikan ke status Available.');
        } catch (err) {
            console.error('Error ending rental', err);
            alert(err.response?.data?.message || 'Gagal mengakhiri rental');
        } finally {
            setLoadingActionId(null);
        }
    };

    const handleApprovePayment = async (id) => {
        if (!window.confirm('Setujui pembayaran untuk transaksi ini?')) return;
        try {
            setLoadingActionId(id);
            await axios.put(`/transaksi/approve/${id}`);
            await fetchTransaksi();
            alert('Pembayaran disetujui dan kontrak digital dibuat.');
        } catch (err) {
            console.error('Error approving payment', err);
            alert(err.response?.data?.message || 'Gagal menyetujui pembayaran');
        } finally {
            setLoadingActionId(null);
        }
    };

    const renderStatusBadge = (status) => {
        if (status === 'Sudah Bayar') {
            return (
                <span className="px-3 py-1 inline-flex text-xs font-bold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    <FaCheckCircle className="mr-1" /> Sudah Bayar
                </span>
            );
        }
        if (status === 'Pending') {
            return (
                <span className="px-3 py-1 inline-flex text-xs font-bold rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40">
                    <FaClock className="mr-1" /> Pending
                </span>
            );
        }
        return (
            <span className="px-3 py-1 inline-flex text-xs font-bold rounded-full bg-red-500/20 text-red-400 border border-red-500/40">
                Belum Bayar
            </span>
        );
    };

    const getProofUrl = (path) => {
        if (!path) return null;
        // Stored path like "uploads/payments/xxx.png"
        return `http://localhost:5000/${path}`;
    };

    return (
        <div className="text-slate-200">
            <h1 className="text-3xl font-bold text-white mb-4 tracking-wide">Transactions</h1>

            {/* Active Rentals Tracker */}
            <div className="mb-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-dark-panel border border-dark-border rounded-2xl p-5 shadow-lg">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Active Rentals</p>
                    <p className="text-3xl font-black text-white">{activeRentals.length}</p>
                    <p className="text-xs text-slate-500 mt-1">Unit dengan pembayaran selesai dan belum diakhiri.</p>
                </div>
                <div className="bg-dark-panel border border-dark-border rounded-2xl p-5 shadow-lg">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Pending Payments</p>
                    <p className="text-3xl font-black text-amber-400">
                        {transaksiList.filter(t => t.status_pembayaran === 'Pending').length}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">Menunggu verifikasi admin.</p>
                </div>
                <div className="bg-dark-panel border border-dark-border rounded-2xl p-5 shadow-lg">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Unpaid Orders</p>
                    <p className="text-3xl font-black text-red-400">
                        {transaksiList.filter(t => t.status_pembayaran === 'Belum Bayar').length}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">User sudah booking tapi belum upload bukti.</p>
                </div>
            </div>

            <div className="bg-dark-panel rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.5)] overflow-hidden border border-dark-border">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-dark-border">
                        <thead className="bg-dark-bg/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">ID</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">User / Kontak</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">PlayStation</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">Waktu</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">Pembayaran</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">Sesi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-dark-panel divide-y divide-dark-border">
                            {transaksiList.map((t) => {
                                const proofUrl = getProofUrl(t.bukti_pembayaran);
                                const isActiveSession = !t.waktu_selesai && t.status_pembayaran === 'Sudah Bayar';

                                return (
                                    <tr key={t.id_transaksi} className="hover:bg-dark-bg/30 transition duration-300">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-400">
                                            TRX-{t.id_transaksi}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                            <div className="font-semibold">{t.nama_pemesan}</div>
                                            <div className="text-xs text-slate-400">{t.no_hp}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-primary">
                                            {t.nama_ps}
                                            <div className="text-xs text-slate-500">Durasi: {t.durasi} jam</div>
                                            <div className="text-xs text-fuchsia-400 font-semibold">
                                                {t.total_bayar
                                                    ? `Rp ${Number(t.total_bayar).toLocaleString('id-ID')}`
                                                    : '-'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                                            <div>Mulai: {new Date(t.waktu_mulai).toLocaleString('id-ID')}</div>
                                            <div>
                                                Selesai:{' '}
                                                {t.waktu_selesai
                                                    ? new Date(t.waktu_selesai).toLocaleString('id-ID')
                                                    : '-'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <div className="mb-2">{renderStatusBadge(t.status_pembayaran)}</div>
                                            {proofUrl ? (
                                                <a
                                                    href={proofUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-flex items-center text-xs text-slate-300 hover:text-white underline underline-offset-2"
                                                >
                                                    <FaImage className="mr-1" /> Lihat Bukti
                                                </a>
                                            ) : (
                                                <p className="text-xs text-slate-500">Belum ada bukti</p>
                                            )}

                                            {t.status_pembayaran === 'Pending' && (
                                                <button
                                                    onClick={() => handleApprovePayment(t.id_transaksi)}
                                                    disabled={loadingActionId === t.id_transaksi}
                                                    className={`mt-2 px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center ${
                                                        loadingActionId === t.id_transaksi
                                                            ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                                                            : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500 hover:text-white'
                                                    }`}
                                                >
                                                    <FaCheckCircle className="mr-1" /> Approve
                                                </button>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            {isActiveSession ? (
                                                <div>
                                                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 mb-2">
                                                        Active
                                                    </span>
                                                    <button
                                                        onClick={() => handleEndRental(t.id_transaksi)}
                                                        disabled={loadingActionId === t.id_transaksi}
                                                        className={`flex items-center px-4 py-2 rounded-lg font-bold shadow-lg text-xs transition duration-300 ${
                                                            loadingActionId === t.id_transaksi
                                                                ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                                                                : 'bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500 hover:text-white hover:shadow-[0_0_15px_rgba(239,68,68,0.5)]'
                                                        }`}
                                                    >
                                                        <FaStopCircle className="mr-2" /> End Session
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                                                    Completed
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                            {transaksiList.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center text-slate-500 font-mono">
                                        NO TRANSACTION DATA
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Transaksi;
