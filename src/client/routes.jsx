import { Routes, Route, Navigate } from 'react-router-dom';
import ClientLayout from './components/Layout/ClientLayout';
import Dashboard from './pages/Dashboard';
import WhatsAppConnect from './pages/Dashboard/WhatsAppConnect';
import Settings from './pages/Settings';

export default function ClientRoutes() {
  return (
    <Routes>
      <Route path="/client" element={<ClientLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="whatsapp" element={<WhatsAppConnect />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/client" replace />} />
    </Routes>
  );
}