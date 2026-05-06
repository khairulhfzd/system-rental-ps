import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const PlayStation = () => {
    const [psList, setPsList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ nama_ps: '', tipe_ps: '', harga_per_jam: '', status: 'Available' });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchPS();
    }, []);

    const fetchPS = async () => {
        try {
            const res = await axios.get('/ps');
            setPsList(res.data);
        } catch (error) {
            console.error('Error fetching PlayStation units', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`/ps/${editingId}`, formData);
            } else {
                await axios.post('/ps', formData);
            }
            setShowModal(false);
            fetchPS();
            setFormData({ nama_ps: '', tipe_ps: '', harga_per_jam: '', status: 'Available' });
            setEditingId(null);
        } catch (error) {
            console.error('Error saving PlayStation', error);
        }
    };

    const handleEdit = (ps) => {
        setFormData({ nama_ps: ps.nama_ps, tipe_ps: ps.tipe_ps, harga_per_jam: ps.harga_per_jam, status: ps.status });
        setEditingId(ps.id_ps);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this PlayStation unit?')) {
            try {
                await axios.delete(`/ps/${id}`);
                fetchPS();
            } catch (error) {
                console.error('Error deleting PlayStation', error);
            }
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Available': return 'bg-green-100 text-green-800';
            case 'Playing': return 'bg-blue-100 text-blue-800';
            case 'Maintenance': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">PlayStation Management</h1>
                <button
                    onClick={() => { setShowModal(true); setEditingId(null); setFormData({ nama_ps: '', tipe_ps: '', harga_per_jam: '', status: 'Available' }); }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition"
                >
                    <FaPlus className="mr-2" /> Add PS
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price / Hour</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {psList.map(ps => (
                            <tr key={ps.id_ps} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ps.nama_ps}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ps.tipe_ps}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rp {Number(ps.harga_per_jam).toLocaleString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(ps.status)}`}>
                                        {ps.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button onClick={() => handleEdit(ps)} className="text-blue-600 hover:text-blue-900 mr-4">
                                        <FaEdit />
                                    </button>
                                    <button onClick={() => handleDelete(ps.id_ps)} className="text-red-600 hover:text-red-900">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">
                            {editingId ? 'Edit PlayStation' : 'Add New PlayStation'}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">Name</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    value={formData.nama_ps}
                                    onChange={(e) => setFormData({ ...formData, nama_ps: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">Type (e.g., PS4, PS5)</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    value={formData.tipe_ps}
                                    onChange={(e) => setFormData({ ...formData, tipe_ps: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">Price Per Hour (Rp)</label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    value={formData.harga_per_jam}
                                    onChange={(e) => setFormData({ ...formData, harga_per_jam: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 font-medium mb-2">Status</label>
                                <select
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                >
                                    <option value="Available">Available</option>
                                    <option value="Playing">Playing</option>
                                    <option value="Maintenance">Maintenance</option>
                                </select>
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PlayStation;
