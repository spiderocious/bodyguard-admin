import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { HeadphonesIcon, MessageSquare } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import StatusBadge from '../components/StatusBadge';

const SupportTicketDetails = () => {
  const { id } = useParams();
  const [reply, setReply] = useState('');

  // Mock data
  const ticket = {
    id,
    subject: 'Payment Issue with Recent Booking',
    status: 'open',
    priority: 'high',
    createdAt: '2024-03-15T10:30:00Z',
    user: {
      name: 'Alice Johnson',
      type: 'client',
      email: 'alice.j@example.com',
    },
    description: 'I was charged twice for my recent booking (ID: BK123). Please help resolve this issue.',
    messages: [
      {
        id: 1,
        sender: 'Alice Johnson',
        role: 'client',
        message: 'I was charged twice for my recent booking (ID: BK123). Please help resolve this issue.',
        timestamp: '2024-03-15T10:30:00Z',
      },
      {
        id: 2,
        sender: 'Support Team',
        role: 'admin',
        message: 'Hi Alice, we\'re looking into this issue. Could you please provide your transaction IDs?',
        timestamp: '2024-03-15T10:35:00Z',
      },
      {
        id: 3,
        sender: 'Alice Johnson',
        role: 'client',
        message: 'Sure, the transaction IDs are: TX123 and TX124',
        timestamp: '2024-03-15T10:40:00Z',
      },
    ],
  };

  const handleSendReply = () => {
    console.log('Sending reply:', reply);
    setReply('');
  };

  return (
    <div className="p-6">
      <PageHeader
        title="Support Ticket Details"
        icon={HeadphonesIcon}
        actions={
          <div className="flex space-x-3">
            <button className="btn bg-green-600 text-white hover:bg-green-700">
              Mark as Resolved
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">{ticket.subject}</h2>
              <div className="flex space-x-3">
                <StatusBadge
                  status={ticket.status}
                  variant={ticket.status === 'open' ? 'error' : 'success'}
                />
                <StatusBadge
                  status={ticket.priority}
                  variant={ticket.priority === 'high' ? 'error' : 'warning'}
                />
              </div>
            </div>

            <div className="space-y-6">
              {ticket.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === 'admin' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-lg rounded-lg p-4 ${
                      message.role === 'admin'
                        ? 'bg-blue-100'
                        : 'bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{message.sender}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(message.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p>{message.message}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reply
              </label>
              <div className="space-y-3">
                <textarea
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Type your reply..."
                />
                <button
                  className="btn btn-primary flex items-center space-x-2"
                  onClick={handleSendReply}
                >
                  <MessageSquare size={20} />
                  <span>Send Reply</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Ticket Information</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Reported By</label>
                <p className="font-medium">{ticket.user.name}</p>
                <p className="text-sm text-gray-500">{ticket.user.email}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">User Type</label>
                <p className="font-medium capitalize">{ticket.user.type}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Created At</label>
                <p className="font-medium">
                  {new Date(ticket.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportTicketDetails;