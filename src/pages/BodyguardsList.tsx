import React from 'react';
import { Shield, Search } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import type { Bodyguard } from '../types';

const mockBodyguards: Bodyguard[] = [
  {
    id: '1',
    name: 'John Doe',
    status: 'verified',
    rating: 4.8,
    jobsCompleted: 156,
    location: 'New York, USA',
    specializations: ['VIP Protection', 'Event Security'],
    verificationStatus: 'verified',
  },
  // Add more mock data as needed
];

const columns = [
  { key: 'name', label: 'Name' },
  { 
    key: 'status', 
    label: 'Status',
    render: (status: string) => (
      <StatusBadge 
        status={status} 
        variant={status === 'verified' ? 'success' : status === 'pending' ? 'warning' : 'error'} 
      />
    )
  },
  { key: 'rating', label: 'Rating' },
  { key: 'jobsCompleted', label: 'Jobs Completed' },
  { key: 'location', label: 'Location' },
];

const BodyguardsList = () => {
  return (
    <div className="p-6">
      <PageHeader 
        title="Bodyguards" 
        icon={Shield}
        actions={
          <div className="flex space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search bodyguards..."
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
            <button className="btn btn-primary">Add Bodyguard</button>
          </div>
        }
      />
      
      <div className="bg-white rounded-lg shadow-md">
        <DataTable 
          columns={columns} 
          data={mockBodyguards}
          onRowClick={(row) => console.log('Clicked row:', row)}
        />
      </div>
    </div>
  );
};

export default BodyguardsList;