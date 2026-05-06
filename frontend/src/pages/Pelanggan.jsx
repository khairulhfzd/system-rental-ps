import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { FaSearch } from 'react-icons/fa';

const Pelanggan = () => {
    const [pelanggan, setPelanggan] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchPelanggan();
    }, [searchTerm]);

    const fetchPelanggan = async () => {
        try {
            const res = await axios.get(`/pelanggan${searchTerm ? `?keyword=${searchTerm}` : ''}`);
            setPelanggan(res.data);
        } catch (error) {
            console.error('Error fetching customers', error);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Customers Directory</h1>

                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search customer..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {pelanggan.map((p, idx) => (
                            <tr key={p.id_pelanggan} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{idx + 1}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{p.nama}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.no_hp}</td>
                            </tr>
                        ))}
                        {pelanggan.length === 0 && (
                            <tr>
                                <td colSpan="3" className="px-6 py-4 text-center text-gray-500">No customers found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Pelanggan;
