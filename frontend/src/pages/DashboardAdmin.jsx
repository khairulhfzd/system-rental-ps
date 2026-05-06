import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const DashboardAdmin = () => {
    const [stats, setStats] = useState({
        total_transaksi: 0,
        total_revenue: 0,
        total_pelanggan: 0,
        active_ps: 0
    });

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const statsRes = await axios.get('/laporan/harian');
            setStats(statsRes.data);

            const chartRes = await axios.get('/laporan/bulanan');
            const data = chartRes.data;

            setChartData({
                labels: data.map(d => d.date),
                datasets: [
                    {
                        label: 'Revenue (Rp)',
                        data: data.map(d => d.revenue),
                        backgroundColor: 'rgba(59, 130, 246, 0.7)',
                    }
                ]
            });
        } catch (error) {
            console.error('Failed to fetch dashboard data', error);
        }
    };

    return (
        <div className="text-slate-200">
            <h1 className="text-3xl font-bold text-white mb-8 tracking-wide">Command Center</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div className="bg-dark-panel p-6 rounded-2xl border border-dark-border hover:border-primary/50 transition duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500 rounded-bl-full flex items-center justify-center text-white opacity-20 group-hover:scale-110 transition duration-300"></div>
                    <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Total Transactions Today</h3>
                    <p className="text-4xl font-black text-white">{stats.total_transaksi}</p>
                </div>
                <div className="bg-dark-panel p-6 rounded-2xl border border-dark-border hover:border-primary/50 transition duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-green-500 rounded-bl-full flex items-center justify-center text-white opacity-20 group-hover:scale-110 transition duration-300"></div>
                    <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Total Revenue Today</h3>
                    <p className="text-3xl font-black text-white">Rp {Number(stats.total_revenue).toLocaleString()}</p>
                </div>
                <div className="bg-dark-panel p-6 rounded-2xl border border-dark-border hover:border-primary/50 transition duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500 rounded-bl-full flex items-center justify-center text-white opacity-20 group-hover:scale-110 transition duration-300"></div>
                    <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Total Customers</h3>
                    <p className="text-4xl font-black text-white">{stats.total_pelanggan}</p>
                </div>
                <div className="bg-dark-panel p-6 rounded-2xl border border-dark-border hover:border-primary/50 transition duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-500 rounded-bl-full flex items-center justify-center text-white opacity-20 group-hover:scale-110 transition duration-300"></div>
                    <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Active PlayStation</h3>
                    <p className="text-4xl font-black text-white">{stats.active_ps}</p>
                </div>
            </div>

            {/* Chart Section */}
            <div className="bg-dark-panel p-8 rounded-2xl border border-dark-border shadow-xl">
                <h2 className="text-xl font-bold text-white mb-6 tracking-wide">Revenue Chart</h2>
                <div className="h-96">
                    <Bar
                        data={chartData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { position: 'top', labels: { color: '#cbd5e1' } },
                            },
                            scales: {
                                x: { ticks: { color: '#94a3b8' }, grid: { color: '#2a2a35' } },
                                y: { ticks: { color: '#94a3b8' }, grid: { color: '#2a2a35' } }
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default DashboardAdmin;
