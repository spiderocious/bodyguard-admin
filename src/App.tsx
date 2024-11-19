import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import BodyguardsList from './pages/BodyguardsList';
import BodyguardDetails from './pages/BodyguardDetails';
import ClientsList from './pages/ClientsList';
import ClientDetails from './pages/ClientDetails';
import KycVerification from './pages/KycVerification';
import KycVerificationDetails from './pages/KycVerificationDetails';
import Support from './pages/Support';
import SupportTicketDetails from './pages/SupportTicketDetails';
import Payments from './pages/Payments';
import PaymentDetails from './pages/PaymentDetails';
import AuditLogs from './pages/AuditLogs';
import AuditLogDetails from './pages/AuditLogDetails';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 ml-64 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/bodyguards" element={<BodyguardsList />} />
            <Route path="/bodyguards/:id" element={<BodyguardDetails />} />
            <Route path="/clients" element={<ClientsList />} />
            <Route path="/clients/:id" element={<ClientDetails />} />
            <Route path="/verification" element={<KycVerification />} />
            <Route path="/verification/:id" element={<KycVerificationDetails />} />
            <Route path="/support" element={<Support />} />
            <Route path="/support/:id" element={<SupportTicketDetails />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/payments/:id" element={<PaymentDetails />} />
            <Route path="/audit" element={<AuditLogs />} />
            <Route path="/audit/:id" element={<AuditLogDetails />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;