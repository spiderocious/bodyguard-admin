import React from 'react';
import { useParams } from 'react-router-dom';
import { DollarSign, FileText, User, Calendar } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import StatusBadge from '../components/StatusBadge';

const PaymentDetails = () => {
  const { id } = useParams();

  // Mock data
  const payment = {
    id,
    amount: 500,
    status: 'completed',
    type: 'booking',
    date: '2024-03-15T10:30:00Z',
    from: {
      name: 'Alice Johnson',
      type: 'client',
      email: 'alice.j@example.com',
    },
    to: {
      name: 'John Doe',
      type: 'bodyguard',
      email: 'john.d@example.com',
    },
    booking: {
      id: 'BK123',
      date: '2024-03-14T14:00:00Z',
      duration: '4 hours',
      location: 'New York, USA',
    },
    transaction: {
      id: 'TX123',
      gateway: 'Stripe',
      fee: 25,
      net: 475,
    },
  };

  return (
    <div className="p-6">
      <PageHeader title="Payment Details" icon={DollarSign} />

     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">${payment.amount}</h2>
                <StatusBadge
                  status={payment.status}
                  variant={payment.status === 'completed' ? 'success' : 'warning'}
                />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Transaction ID</p>
                <p className="font-medium">{payment.transaction.id}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-gray-500">From</label>
                <div className="flex items-center space-x-2 mt-1">
                  <User className="text-gray-400" size={20} />
                  <div>
                    <p className="font-medium">{payment.from.name}</p>
                    <p className="text-sm text-gray-500">{payment.from.email}</p>
                  </div>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-500">To</label>
                <div className="flex items-center space-x-2 mt-1">
                  <User className="text-gray-400" size={20} />
                  <div>
                    <p className="font-medium">{payment.to.name}</p>
                    <p className="text-sm text-gray-500">{payment.to.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Booking Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500">Booking ID</label>
                <p className="font-medium">{payment.booking.id}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Duration</label>
                <p className="font-medium">{payment.booking.duration}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Date</label>
                <p className="font-medium">
                  {new Date(payment.booking.date).toLocaleString()}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Location</label>
                <p className="font-medium">{payment.booking.location}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Transaction Details</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Payment Gateway</label>
                <p className="font-medium">{payment.transaction.gateway}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Platform Fee</label>
                <p className="font-medium">${payment.transaction.fee}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Net Amount</label>
                <p className="font-medium">${payment.transaction.net}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Date</label>
                <p className="font-medium">
                  {new Date(payment.date).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Actions</h3>
            <div className="space-y-3">
              <button className="btn btn-secondary w-full flex items-center justify-center space-x-2">
                <FileText size={20} />
                <span>Download Invoice</span>
              </button>
              <button className="btn btn-secondary w-full flex items-center justify-center space-x-2">
                <Calendar size={20} />
                <span>View Booking</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;