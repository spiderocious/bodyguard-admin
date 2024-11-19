import React from 'react';
import { FileCheck, Search } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';

interface KycRequest {
  id: string;
  bodyguardName: string;
  documentType: string;
  submissionDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

const mockKycRequests: KycRequest[] = [
  {
    id: '1',
    bodyguardName: 'John Doe',
    documentType: 'ID Verification',
    submissionDate: '2024-03-10',
    status: 'pending',
  },
  // Add more mock data as needed
];

const columns = [
  { key: 'bodyguardName', label: 'Bodyguard Name' },
  { key: 'documentType', label: 'Document Type' },
  {
    key: 'submissionDate',
    label: 'Submission Date',
    render: (date: string) => new Date(date).toLocaleDateString(),
  },
  {
    key: 'status',
    label: 'Status',
    render: (status: string) => (
      <StatusBadge
        status={status}
        variant={
          status === 'approved'
            ? 'success'
            : status === 'pending'
            ? 'warning'
            : 'error'
        }
      />
    ),
  },
];

const KycVerification = () => {
  return (
    <div className="p-6">
      <PageHeader
        title="KYC Verification"
        icon={FileCheck}
        actions={
          <div className="flex space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search verifications..."
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
          data={mockKycRequests}
          onRowClick={(row) => console.log('Clicked row:', row)}
        />
      </div>
    </div>
  );
};

export default KycVerification;