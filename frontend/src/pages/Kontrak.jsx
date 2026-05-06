import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { FaFilePdf } from 'react-icons/fa';

const Kontrak = () => {
    const [kontrakList, setKontrakList] = useState([]);

    useEffect(() => {
        fetchKontrak();
    }, []);

    const fetchKontrak = async () => {
        try {
            const res = await axios.get('/kontrak');
            setKontrakList(res.data);
        } catch (err) {
            console.error('Error fetching contracts', err);
        }
    };

    const handleDownload = (fileName) => {
        // Assuming backend serves static files at /uploads/contracts
        window.open(`http://localhost:5000/uploads/contracts/${fileName}`, '_blank');
    };

    return (
        <div className="text-slate-200">
            <h1 className="text-3xl font-bold text-white mb-6 tracking-wide">Digital Contracts Vault</h1>

            <div className="bg-dark-panel border border-dark-border rounded-xl shadow-lg p-6 text-center text-slate-400">
                <h3 className="mb-2">Automated cryptographic proof of transaction.</h3>
                <p className="text-sm">Compiled in real-time upon session finalization.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {kontrakList.map((k) => (
                    <div key={k.id_kontrak} className="bg-dark-panel p-6 rounded-2xl border border-dark-border hover:border-accent/50 transition duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(217,70,239,0.15)] relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-6 border-b border-dark-border pb-4">
                                <h3 className="text-xl font-black text-white font-mono tracking-widest drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">TRX-{k.id_transaksi}</h3>
                                <FaFilePdf className="text-4xl text-accent drop-shadow-[0_0_10px_rgba(217,70,239,0.5)] group-hover:scale-110 transition duration-300" />
                            </div>
                            <div className="text-sm text-slate-400 mb-6 space-y-2 font-medium">
                                <p><span className="text-slate-500 uppercase text-xs tracking-wider mr-2">Client:</span> <span className="text-white">{k.nama_pelanggan}</span></p>
                                <p><span className="text-slate-500 uppercase text-xs tracking-wider mr-2">System:</span> <span className="text-primary">{k.nama_ps}</span></p>
                                <p><span className="text-slate-500 uppercase text-xs tracking-wider mr-2">Timestamp:</span> <span className="text-white">{new Date(k.tanggal_kontrak).toLocaleDateString()}</span></p>
                                <p><span className="text-slate-500 uppercase text-xs tracking-wider mr-2">Revenue:</span> <span className="text-accent font-bold tracking-wider">Rp {Number(k.total_bayar).toLocaleString()}</span></p>
                            </div>
                            <button
                                onClick={() => handleDownload(k.file_kontrak)}
                                className="w-full bg-accent/10 text-accent font-bold py-3 rounded-lg border border-accent/50 hover:bg-accent hover:text-white transition duration-300 hover:shadow-[0_0_15px_rgba(217,70,239,0.5)] flex items-center justify-center gap-2"
                            >
                                <FaFilePdf /> Extract Record
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {kontrakList.length === 0 && (
                <div className="mt-12 text-center text-slate-500 font-mono">ENCRYPTED DATABASE EMPTY</div>
            )}
        </div>
    );
};

export default Kontrak;
