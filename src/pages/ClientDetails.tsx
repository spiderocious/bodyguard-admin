import React from 'react';
import { useParams } from 'react-router-dom';
import { Users, MapPin, Phone, Mail, Calendar } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';

const ClientDetails = () => {
  const { id } = useParams();

  // Mock data
  const client = {
    id,
    name: 'Alice Johnson',
    status: 'active',
    email: 'alice.j@example.com',
    phone: '+1 234-567-8901',
    location: 'Los Angeles, USA',
    joinedDate: '2024-01-15',
    totalBookings: 12,
    totalSpent: '$3,600',
    lastBooking: '2024-03-10',
    profilePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
  };

  const recentBookings = [
    {
      id: '1',
      date: '2024-03-10',
      bodyguard: 'John Doe',
      duration: '4 hours',
      amount: '$400',
      status: 'completed',
    },
    // Add more bookings...
  ];

  const bookingColumns = [
    { key: 'date', label: 'Date' },
    { key: 'bodyguard', label: 'Bodyguard' },
    { key: 'duration', label: 'Duration' },
    { key: 'amount', label: 'Amount' },
    {
      key: 'status',
      label: 'Status',
      render: (status: string) => (
        <StatusBadge
          status={status}
          variant={status === 'completed' ? 'success' : 'warning'}
        />
      ),
    },
  ];

  return (
    <div className="p-6">
      <PageHeader title="Client Details" icon={Users} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">{client.name}</h2>
                <StatusBadge status={client.status} variant="success" />
              </div>
              <img
                src={client.profilePhoto}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <MapPin className="text-gray-400" size={20} />
                <span>{client.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="text-gray-400" size={20} />
                <span>{client.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="text-gray-400" size={20} />
                <span>{client.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="text-gray-400" size={20} />
                <span>Joined {new Date(client.joinedDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>
            <DataTable columns={bookingColumns} data={recentBookings} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Client Stats</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Total Bookings</label>
                <p className="text-2xl font-bold">{client.totalBookings}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Total Spent</label>
                <p className="text-2xl font-bold">{client.totalSpent}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Last Booking</label>
                <p className="text-2xl font-bold">
                  {new Date(client.lastBooking).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;