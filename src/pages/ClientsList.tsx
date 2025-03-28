import React, { useEffect } from 'react';
import { Shield, Search } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import type { Bodyguard } from '../types';
import { useNavigate } from 'react-router-dom';
import { getAPIBodyguards, getAPIClients } from '../services/api.service';

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
  { key: 'firstName', label: 'Name' },
  { key: 'lastName', label: 'Name' },
  { key: 'email', label: 'Email Address' },
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
];

const ClientsList = () => {
  const navigate = useNavigate()
  const [bodyguards, setBodyguards] = React.useState([]);
  const goToBodyguardDetails = (id: string) => navigate(`/bodyguards/${id}`)

    useEffect(() => {
      getBodyguards();
    }, []);
  
    const getBodyguards = async () => {
      const res = await getAPIClients("");
      setBodyguards(res); // Fetch stats from API
      // Fetch stats from API
    };
  const search = async () => {
    // Search bodyguards
    const res = await getAPIClients("");
      setBodyguards(res); 
  }
  return (
    <div className="p-6">
      <PageHeader 
        title="Clients" 
        icon={Shield}
        actions={
          <div className="flex space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search bodyguards..."
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => getAPIBodyguards(e.target.value)}
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              <button className="btn btn-primary hidden" onClick={search}>Search</button>
            </div>
            <button className="btn btn-primary hidden">Add Bodyguard</button>
          </div>
        }
      />
      
      <div className="bg-white rounded-lg shadow-md">
        <DataTable 
          columns={columns} 
          data={bodyguards}
          onRowClick={(row) => goToBodyguardDetails(row.id)}
        />
      </div>
    </div>
  );
};

export default ClientsList;