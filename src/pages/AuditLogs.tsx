import React from 'react';
import { History, Search } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import DataTable from '../components/DataTable';
import type { AuditLog } from '../types';

const mockAuditLogs: AuditLog[] = [
  {
    id: '1',
    action: 'Bodyguard Verification',
    userId: 'admin123',
    userType: 'admin',
    timestamp: '2024-03-15T10:30:00Z',
    details: 'Verified bodyguard ID: BG123',
  },
  // Add more mock data as needed
];

const columns = [
  { key: 'action', label: 'Action' },
  { key: 'userType', label: 'User Type' },
  { key: 'userId', label: 'User ID' },
  {
    key: 'timestamp',
    label: 'Timestamp',
    render: (date: string) => new Date(date).toLocaleString(),
  },
  { key: 'details', label: 'Details' },
];

const AuditLogs = () => {
  return (
    <div className="p-6">
      <PageHeader
        title="Audit Logs"
        icon={History}
        actions={
          <div className="flex space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search logs..."
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>
        }
      />

      <div className="bg-white rounded-lg shadow-md">
        <DataTable
          columns={columns}
          data={mockAuditLogs}
          onRowClick={(row) => console.log('Clicked row:', row)}
        />
      </div>
    </div>
  );
};

export default AuditLogs;