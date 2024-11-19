import React from 'react';
import { Users, Search } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import type { Client } from '../types';

const mockClients: Client[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    totalBookings: 12,
    status: 'active',
    joinedDate: '2024-01-15',
  },
  // Add more mock data as needed
];

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'totalBookings', label: 'Total Bookings' },
  {
    key: 'status',
    label: 'Status',
    render: (status: string) => (
      <StatusBadge
        status={status}
        variant={status === 'active' ? 'success' : 'error'}
      />
    ),
  },
  {
    key: 'joinedDate',
    label: 'Joined Date',
    render: (date: string) => new Date(date).toLocaleDateString(),
  },
];

const ClientsList = () => {
  return (
    <div className="p-6">
      <PageHeader
        title="Clients"
        icon={Users}
        actions={
          <div className="flex space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search clients..."
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
          data={mockClients}
          onRowClick={(row) => console.log('Clicked row:', row)}
        />
      </div>
    </div>
  );
};

export default ClientsList;