import React from 'react';
import { DollarSign, Search } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import type { Payment } from '../types';

const mockPayments: Payment[] = [
  {
    id: '1',
    amount: 500,
    status: 'completed',
    type: 'booking',
    date: '2024-03-15T10:30:00Z',
    from: 'Client A',
    to: 'Bodyguard B',
  },
  // Add more mock data as needed
];

const columns = [
  {
    key: 'amount',
    label: 'Amount',
    render: (amount: number) => `$${amount.toFixed(2)}`,
  },
  { key: 'type', label: 'Type' },
  {
    key: 'status',
    label: 'Status',
    render: (status: string) => (
      <StatusBadge
        status={status}
        variant={
          status === 'completed'
            ? 'success'
            : status === 'pending'
            ? 'warning'
            : 'error'
        }
      />
    ),
  },
  { key: 'from', label: 'From' },
  { key: 'to', label: 'To' },
  {
    key: 'date',
    label: 'Date',
    render: (date: string) => new Date(date).toLocaleString(),
  },
];

const Payments = () => {
  return (
    <div className="p-6">
      <PageHeader
        title="Payments"
        icon={DollarSign}
        actions={
          <div className="flex space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search payments..."
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
          data={mockPayments}
          onRowClick={(row) => console.log('Clicked row:', row)}
        />
      </div>
    </div>
  );
};

export default Payments;