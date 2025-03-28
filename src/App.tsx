import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import JobsList from './pages/JobList';
import JobDetailsPage from './pages/JobDetails';
import Login from './pages/Login';
import { isUserLoggedIn } from './services/api.service';

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = isUserLoggedIn(); 
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 ml-64 overflow-auto">
        {children}
      </main>
    </div>
  );
};

// Public Layout
const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};
console.log('here');

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={
          <PublicLayout>
            <Login />
          </PublicLayout>
        } />

        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedLayout>
            <Dashboard />
          </ProtectedLayout>
        } />
        <Route path="/bodyguards" element={
          <ProtectedLayout>
            <BodyguardsList />
          </ProtectedLayout>
        } />
        <Route path="/bodyguards/:id" element={
          <ProtectedLayout>
            <BodyguardDetails />
          </ProtectedLayout>
        } />
        <Route path="/clients" element={
          <ProtectedLayout>
            <ClientsList />
          </ProtectedLayout>
        } />
        <Route path="/jobs" element={
          <ProtectedLayout>
            <JobsList />
          </ProtectedLayout>
        } />
        <Route path="/jobs/:id" element={
          <ProtectedLayout>
            <JobDetailsPage />
          </ProtectedLayout>
        } />
        <Route path="/clients/:id" element={
          <ProtectedLayout>
            <ClientDetails />
          </ProtectedLayout>
        } />
        <Route path="/verification" element={
          <ProtectedLayout>
            <KycVerification />
          </ProtectedLayout>
        } />
        <Route path="/verification/:id" element={
          <ProtectedLayout>
            <KycVerificationDetails />
          </ProtectedLayout>
        } />
        <Route path="/support" element={
          <ProtectedLayout>
            <Support />
          </ProtectedLayout>
        } />
        <Route path="/support/:id" element={
          <ProtectedLayout>
            <SupportTicketDetails />
          </ProtectedLayout>
        } />
        <Route path="/payments" element={
          <ProtectedLayout>
            <Payments />
          </ProtectedLayout>
        } />
        <Route path="/payments/:id" element={
          <ProtectedLayout>
            <PaymentDetails />
          </ProtectedLayout>
        } />
        <Route path="/audit" element={
          <ProtectedLayout>
            <AuditLogs />
          </ProtectedLayout>
        } />
        <Route path="/audit/:id" element={
          <ProtectedLayout>
            <AuditLogDetails />
          </ProtectedLayout>
        } />
        <Route path="/settings" element={
          <ProtectedLayout>
            <Settings />
          </ProtectedLayout>
        } />

        {/* Catch all route - redirect to login if not authenticated */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;