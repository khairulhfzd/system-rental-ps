import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Laporan = () => {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const chartRes = await axios.get('/laporan/bulanan');
            const data = chartRes.data;

            setChartData({
                labels: data.map(d => d.date),
                datasets: [
                    {
                        label: 'Daily Revenue Trends (Rp)',
                        data: data.map(d => d.revenue),
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        tension: 0.4,
                        fill: true,
                    }
                ]
            });
        } catch (error) {
            console.error('Failed to fetch report data', error);
        }
    };

    return (
        <div className="text-slate-200">
            <h1 className="text-3xl font-bold text-white mb-6 tracking-wide">Revenue Analytics Reports</h1>

            <div className="bg-dark-panel p-8 rounded-2xl border border-dark-border shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                <h2 className="text-xl font-bold text-white mb-6 tracking-wider">Daily Revenue Trajectory</h2>
                <div className="h-96">
                    <Line
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

export default Laporan;
