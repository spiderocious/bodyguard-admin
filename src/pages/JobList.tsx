import React, { useEffect } from 'react';
import { Briefcase, Search } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import { useNavigate } from 'react-router-dom';
import { getAllJobs } from '../services/api.service';

export const mockJobs = [
  {
    id: 'job09a689617359146846279549119693',
    status: 'PENDING',
    address: {
      venue: '2237 Bell Spring',
      state: 'Lagos'
    },
    serviceType: 'Bodyguard',
    uniform: {
      type: 'Sweatshirt',
      color: 'green',
      addOns: []
    },
    dates: [
      {
        start: '2024-01-03T05:35:29.667Z',
        end: '2024-01-03T07:35:29.667Z',
        status: 'PENDING',
        payment: {
          amount: 900,
          hours: 2,
          currentRate: 450
        }
      }
    ],
    description: 'Try to compress the PCI sensor, maybe it will parse the back-end port!',
    notes: 'We need to calculate the optical HDD panel!',
    clientID: 'user7befb5d17354493711271198598c8f',
    bodyguardID: 'user7befb5d17354493711271198598c8f',
    accepted: false,
    totalHours: 2,
    payment: {
      amount: 1100,
      status: true,
      totalRateAmount: 900,
      totalFees: 200,
      currentRate: 450,
      hours: 2,
      paid: true
    },
    rating: 2.5,
    location: {
      lat: '-25.6392',
      long: '88.6724'
    },
    createdAt: '2025-01-03T14:31:24.641Z'
  }
];

const formatDate = (dateString: any) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};



export const jobColumns = [
  { 
    key: 'serviceType', 
    label: 'Service Type'
  },
  { 
    key: 'status', 
    label: 'Status',
    render: (status: any) => (
      <StatusBadge 
        status={status} 
        variant={
          status === 'COMPLETED' ? 'success' : 
          status === 'PENDING' ? 'warning' : 
          status === 'CANCELLED' ? 'error' : 
          'info'
        } 
      />
    )
  },
  { 
    key: 'address', 
    label: 'Location',
    render: (address: any) => `${address.venue}, ${address.state}`
  },
  {
    key: 'dates',
    label: 'Date & Time',
    render: (dates: any) => dates[0] ? formatDate(dates[0].start) : 'N/A'
  },
  {
    key: 'payment',
    label: 'Amount',
    render: (payment: any) => formatCurrency(payment.amount)
  },
  {
    key: 'totalHours',
    label: 'Duration',
    render: (hours: any) => `${hours} ${hours === 1 ? 'hour' : 'hours'}`
  },
  // {
  //   key: 'accepted',
  //   label: 'Status',
  //   render: (accepted: any) => (
  //     <span className={`px-2 py-1 rounded-full text-sm ${
  //       accepted ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
  //     }`}>
  //       {accepted ? 'Accepted' : 'Pending'}
  //     </span>
  //   )
  // }
];

const JobsList = () => {
  const navigate = useNavigate();
  const goToJobDetails = (data: any) => {
    localStorage.setItem('job', JSON.stringify(data));
    navigate(`/jobs/${data.id}`);
  };
  const [jobs, setJobs] = React.useState([]);
    const goToBodyguardDetails = (id: string) => navigate(`/bodyguards/${id}`)
  
      useEffect(() => {
        getJobs();
      }, []);
    
      const getJobs = async () => {
        const res = await getAllJobs();
        setJobs(res.jobs); // Fetch stats from API
        // Fetch stats from API
      };

  return (
    <div className="p-6">
      <PageHeader 
        title="All Jobs" 
        icon={Briefcase}
        actions={
          <div className="flex space-x-4 hidden">
            <div className="relative">
              <input
                type="text"
                placeholder="Search jobs..."
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
            {/* <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Create New Job
            </button> */}
          </div>
        }
      />
      
      <div className="mt-6 bg-white rounded-lg shadow-md">
        <DataTable 
          columns={jobColumns} 
          data={jobs}
          onRowClick={(row) => goToJobDetails(row)}
        />
      </div>
    </div>
  );
};

export default JobsList;

export const formatCurrency = (amount: any) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN'
  }).format(amount);
};