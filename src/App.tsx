import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './hooks/useAuth';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { MoneyReceipts } from './pages/MoneyReceipts';
import { Invoices } from './pages/Invoices';
import { NewMoneyReceipt } from './pages/NewMoneyReceipt';
import { NewInvoice } from './pages/NewInvoice';

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="money-receipts" element={<MoneyReceipts />} />
            <Route path="money-receipts/new" element={<NewMoneyReceipt />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="invoices/new" element={<NewInvoice />} />
            <Route path="users" element={<div>Users Coming Soon</div>} />
            <Route path="settings" element={<div>Settings Coming Soon</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </AuthProvider>
  );
}

export default App;