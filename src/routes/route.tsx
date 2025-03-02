import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Registration';
import DashboardLayout from '../components/layouts/DashboardLayout';
import MoneyReceipt from '../pages/dashboard/MoneyReceipt';
import ReceiptForm from '../pages/dashboard/ReceiptForm';
import Invoice from '../pages/dashboard/Invoice';
import TrainingRequest from '../pages/dashboard/TrainingRequest';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Dashboard Routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<MoneyReceipt />} />
        <Route path="money-receipt" element={<MoneyReceipt />} />
        <Route path="money-receipt/create" element={<ReceiptForm />} />
        <Route path="invoice" element={<Invoice />} />
        <Route path="training-request" element={<TrainingRequest />} />
      </Route>
      
      {/* Redirect root to dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" />} />
      
      {/* Catch all - redirect to dashboard */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default AppRoutes;