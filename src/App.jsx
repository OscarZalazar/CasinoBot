import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Users from './pages/Users';
import Clients from './pages/Clients';
import Transactions from './pages/Transactions';
import Logs from './pages/Logs';
import InstanceControl from './pages/InstanceControl';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="settings" element={<Settings />} />
        <Route path="users" element={<Users />} />
        <Route path="clients" element={<Clients />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="logs" element={<Logs />} />
        <Route path="instances/:instanceId" element={<InstanceControl />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}