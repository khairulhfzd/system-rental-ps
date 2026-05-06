import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import DashboardAdmin from './pages/DashboardAdmin';
import PlayStation from './pages/PlayStation';
import Pelanggan from './pages/Pelanggan';
import Transaksi from './pages/Transaksi';
import Users from './pages/Users';
import Laporan from './pages/Laporan';
import Kontrak from './pages/Kontrak';

// New User Pages
import Product from './pages/Product';
import UserOrders from './pages/UserOrders';

import Navbar from './components/Navbar';
import SidebarAdmin from './components/SidebarAdmin';
import SidebarUser from './components/SidebarUser';

const AdminLayout = () => {
    return (
        <div className="flex h-screen bg-dark-bg font-sans overflow-hidden">
            <SidebarAdmin />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-dark-bg p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

const UserLayout = () => {
    return (
        <div className="flex h-screen bg-dark-bg font-sans overflow-hidden">
            <SidebarUser />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-dark-bg p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

// Main Layout for Public/Shared pages that need Navbar but no Sidebar
const MainLayout = () => {
    return (
        <div className="flex h-screen bg-dark-bg font-sans overflow-hidden">
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-dark-bg">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />

                {/* Public Products Page (Requires Navbar but no Sidebar) */}
                <Route element={<MainLayout />}>
                    <Route path="/products" element={<Product />} />
                </Route>

                {/* Admin Routes */}
                <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                    <Route element={<AdminLayout />}>
                        <Route path="/admin" element={<DashboardAdmin />} />
                        <Route path="/admin/playstation" element={<PlayStation />} />
                        <Route path="/admin/pelanggan" element={<Pelanggan />} />
                        <Route path="/admin/transaksi" element={<Transaksi />} />
                        <Route path="/admin/users" element={<Users />} />
                        <Route path="/admin/laporan" element={<Laporan />} />
                        <Route path="/admin/kontrak" element={<Kontrak />} />
                    </Route>
                </Route>

                {/* User Routes */}
                <Route element={<ProtectedRoute allowedRoles={['user']} />}>
                    <Route element={<UserLayout />}>
                        <Route path="/user/orders" element={<UserOrders />} />
                    </Route>
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
