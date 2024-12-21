import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import MainLayout from './components/Layout/MainLayout';
import Dashboard from './pages/Dashboard';
import InstanceControl from './pages/InstanceControl';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="instances/:instanceId" element={<InstanceControl />} />
          {/* Otras rutas aquí */}
        </Route>
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </Router>
  </React.StrictMode>
);