import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Shield, MapPin, Phone, Mail, AlertCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Modal from '../components/Modal';
import StatusBadge from '../components/StatusBadge';

const BodyguardDetails = () => {
  const { id } = useParams();
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [suspensionReason, setSuspensionReason] = useState('');

  // Mock data
  const bodyguard = {
    id,
    name: 'John Doe',
    status: 'active',
    rating: 4.8,
    height: '6\'2"',
    weight: '190 lbs',
    location: 'New York, USA',
    phone: '+1 234-567-8900',
    email: 'john.doe@example.com',
    address: '123 Security St, NY 10001',
    specializations: ['VIP Protection', 'Event Security', 'Close Protection'],
    languages: ['English', 'Spanish'],
    experience: '8 years',
    certifications: ['CPO License', 'First Aid', 'Firearms Training'],
    completedJobs: 156,
    totalEarnings: '$45,000',
    joinedDate: '2023-01-15',
    facePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    fullBodyPhoto: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7',
  };

  const handleSuspend = () => {
    console.log('Suspending bodyguard with reason:', suspensionReason);
    setShowSuspendModal(false);
  };

  return (
    <div className="p-6">
      <PageHeader
        title="Bodyguard Details"
        icon={Shield}
        actions={
          <button
            onClick={() => setShowSuspendModal(true)}
            className="btn bg-red-600 text-white hover:bg-red-700"
          >
            Suspend Bodyguard
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">{bodyguard.name}</h2>
                <div className="flex items-center space-x-4">
                  <StatusBadge status={bodyguard.status} variant="success" />
                  <span className="text-yellow-500">★ {bodyguard.rating}</span>
                </div>
              </div>
              <img
                src={bodyguard.facePhoto}
                alt="Face"
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <MapPin className="text-gray-400" size={20} />
                <span>{bodyguard.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="text-gray-400" size={20} />
                <span>{bodyguard.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="text-gray-400" size={20} />
                <span>{bodyguard.email}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Physical Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500">Height</label>
                <p>{bodyguard.height}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Weight</label>
                <p>{bodyguard.weight}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Specializations</h3>
            <div className="flex flex-wrap gap-2">
              {bodyguard.specializations.map((spec) => (
                <span
                  key={spec}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Performance Stats</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Completed Jobs</label>
                <p className="text-2xl font-bold">{bodyguard.completedJobs}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Total Earnings</label>
                <p className="text-2xl font-bold">{bodyguard.totalEarnings}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Documents</h3>
            <div className="space-y-4">
              {bodyguard.certifications.map((cert) => (
                <div key={cert} className="flex items-center justify-between">
                  <span>{cert}</span>
                  <button className="text-blue-600 hover:underline">View</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showSuspendModal}
        onClose={() => setShowSuspendModal(false)}
        title="Suspend Bodyguard"
        actions={
          <>
            <button
              className="btn btn-secondary"
              onClick={() => setShowSuspendModal(false)}
            >
              Cancel
            </button>
            <button className="btn bg-red-600 text-white hover:bg-red-700" onClick={handleSuspend}>
              Suspend
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="flex items-start space-x-2 text-yellow-600">
            <AlertCircle className="mt-1" size={20} />
            <p>This action will immediately suspend the bodyguard's account and prevent them from accepting new jobs.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Suspension Reason
            </label>
            <textarea
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              value={suspensionReason}
              onChange={(e) => setSuspensionReason(e.target.value)}
              placeholder="Enter the reason for suspension..."
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BodyguardDetails;